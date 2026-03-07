/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版) v4
 * @description YouTube 双语字幕：先由 YouTube 机器翻译，再用 GPT 润色。
 *              GPT 超时或失败时自动回退到机器翻译版本，保证字幕始终可用。
 *
 * 工作原理：
 *  1. request 阶段（timedtext）：在字幕请求 URL 里注入 tlang 参数，
 *     让 YouTube 服务器直接返回机器翻译字幕（同 DualSubs 方案）
 *  2. response 阶段（timedtext）：拿到机器翻译字幕后，
 *     提取原文+译文，用 GPT 对译文进行润色，替换回字幕
 *     GPT 超时/失败时直接返回机器翻译原文，不影响观看
 *
 * [rewrite_local]
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 * ^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext(\?.*)?$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 * ^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js

 *
 * [mitm]
 * hostname = www.youtube.com, m.youtube.com, youtubei.googleapis.com
 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- [1. 读取 BoxJS 配置] ---
const boxConfig = {
  url:         $.getdata("ytb_gpt_api_url")  || "https://open.lxcloud.dev/v1/chat/completions",
  key:         $.getdata("ytb_gpt_api_key")  || "",
  model:       $.getdata("ytb_gpt_model")    || "gpt-4o-mini",
  target_lang: $.getdata("ytb_gpt_lang")     || "zh-Hans"  // BCP-47 语言代码，用于 tlang 参数
};

const HISTORY_KEY     = "ytb_subtitle_history";
const HISTORY_MAX_LEN = 10;

const url        = $request.url;
const isPlayer   = url.includes("/youtubei/v1/player");
const isSubtitle = url.includes("/api/timedtext");

// ==========================================
// 2. 请求阶段 (Request Mode)
// ==========================================
if (typeof $response === "undefined") {

  // A. Player 请求：强制开启自动字幕
  if (isPlayer && $request.body) {
    try {
      let bodyObj = JSON.parse($request.body);
      if (bodyObj.playbackContext && bodyObj.playbackContext.contentPlaybackContext) {
        bodyObj.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true;
        console.log(`[${scriptName}] ✅ 已开启自动字幕`);
      }
      return $done({ body: JSON.stringify(bodyObj) });
    } catch (e) {
      console.log(`[${scriptName}] Player request 解析失败: ${e.message}`);
      return $done({});
    }
  }

  // B. 字幕请求（script-request-header）：注入 tlang 让 YouTube 返回机器翻译
  if (isSubtitle) {
    try {
      // 在请求 URL 里追加 tlang 和 fmt 参数
      // tlang: 目标语言（如 zh-Hans）
      // YouTube 会在字幕里同时返回原文和译文
      let newUrl = url;
      if (!newUrl.includes("tlang=")) {
        newUrl += "&tlang=" + boxConfig.target_lang;
      }
      if (!newUrl.includes("fmt=")) {
        newUrl += "&fmt=srv3";
      }
      console.log(`[${scriptName}] 🌐 注入 tlang=${boxConfig.target_lang}`);
      return $done({ url: newUrl });
    } catch (e) {
      console.log(`[${scriptName}] 字幕请求注入失败: ${e.message}`);
      return $done({});
    }
  }

  return $done({});
}

// ==========================================
// 3. 响应阶段 (Response Mode)
// ==========================================
else {

  // A. Player 响应：激活翻译选项
  if (isPlayer) {
    try {
      let obj = JSON.parse($response.body);
      if (obj.captions && obj.captions.playerCaptionsTracklistRenderer) {
        const tracklist = obj.captions.playerCaptionsTracklistRenderer;
        if (Array.isArray(tracklist.captionTracks)) {
          tracklist.captionTracks.forEach(track => { track.isTranslatable = true; });
        }
        tracklist.translationLanguages = [
          { languageCode: "zh-Hans", languageName: { runs: [{ text: "中文（GPT润色）" }] } },
          { languageCode: "en",      languageName: { runs: [{ text: "English" }] } }
        ];
        console.log(`[${scriptName}] 🔍 已激活翻译选项`);
      }
      return $done({ body: JSON.stringify(obj) });
    } catch (e) {
      console.log(`[${scriptName}] Player 响应解析失败: ${e.message}`);
      return $done({});
    }
  }

  // B. 字幕响应：提取机器翻译，用 GPT 润色
  if (isSubtitle) {
    const body    = $response.body || "";
    const trimmed = body.trim();

    if (trimmed.startsWith("<")) {
      return polishXmlSubtitle(body);
    } else {
      return polishJsonSubtitle(body);
    }
  }

  return $done({});
}

// ==========================================
// 4. GPT 润色 JSON 字幕
//    YouTube 返回的 JSON 里，原文在 segs[].utf8，
//    机器翻译在 pens[].iw 或者直接在 utf8 里（取决于格式）
//    最简单的方式：直接把已有的 utf8 文本（YouTube 已翻译好的）
//    提取出来发给 GPT 润色，再写回去
// ==========================================
function polishJsonSubtitle(body) {
  try {
    let subtitleObj = JSON.parse(body);
    if (!Array.isArray(subtitleObj.events)) {
      console.log(`[${scriptName}] JSON events 不存在，直接返回`);
      return $done({ body: body });
    }

    // 收集所有有文字的 event（YouTube 机器翻译已在 utf8 里）
    let translateList = [];
    subtitleObj.events.forEach((event, index) => {
      if (event.segs && event.segs.length > 0) {
        const text = event.segs.map(s => s.utf8).join("").trim();
        if (text && text !== "\n" && !text.includes("\n")) {
          translateList.push({ index, text });
        }
      }
    });

    if (translateList.length === 0) {
      console.log(`[${scriptName}] 无字幕内容，直接返回`);
      return $done({ body: body });
    }

    // 没有 API Key 则直接返回机器翻译
    if (!boxConfig.key) {
      console.log(`[${scriptName}] 无 API Key，返回机器翻译`);
      return $done({ body: body });
    }

    // 只取前 20 句发给 GPT 润色（控制耗时）
    const MAX = 20;
    const batch = translateList.slice(0, MAX);

    console.log(`[${scriptName}] 🧩 JSON 润色 ${batch.length}/${translateList.length} 句`);

    const rawText      = batch.map((item, i) => `[${i}] ${item.text}`).join("\n");
    const contextBlock = buildContextBlock();
    const gptRequest   = buildPolishRequest(rawText, contextBlock);

    $.fetch(gptRequest).then(
      response => {
        try {
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 无响应，回退机器翻译`);
            return $done({ body: body });
          }
          const json = JSON.parse(response.body);
          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误: ${json.error.message}，回退机器翻译`);
            return $done({ body: body });
          }
          const content = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
          if (!content) {
            console.log(`[${scriptName}] GPT 内容为空，回退机器翻译`);
            return $done({ body: body });
          }

          saveHistory(batch.map(item => item.text));

          let applied = 0;
          content.split("\n").forEach(line => {
            const match = line.match(/^\[(\d+)\]\s*(.*)/);
            if (!match) return;
            const idx = parseInt(match[1], 10);
            const polished = match[2].trim();
            const originalIndex = (batch[idx] !== undefined) ? batch[idx].index : undefined;
            if (!polished || typeof originalIndex !== "number") return;
            const event = subtitleObj.events[originalIndex];
            if (!event || !event.segs || !event.segs.length) return;
            // 用润色后的译文替换原机器翻译
            event.segs[0].utf8 = polished;
            applied++;
          });

          console.log(`[${scriptName}] ✅ JSON 润色完成 ${applied} 句`);
          return $done({ body: JSON.stringify(subtitleObj) });
        } catch (e) {
          console.log(`[${scriptName}] GPT 解析失败，回退机器翻译: ${e.message}`);
          return $done({ body: body });
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败，回退机器翻译: ${JSON.stringify(err)}`);
        return $done({ body: body });
      }
    );

  } catch (e) {
    console.log(`[${scriptName}] JSON 解析失败: ${e.message}`);
    return $done({ body: body });
  }
}

// ==========================================
// 5. GPT 润色 XML 字幕
// ==========================================
function polishXmlSubtitle(body) {
  try {
    const makePTagRe = () => /<p([^>]*)>([\s\S]*?)<\/p>/g;

    let match;
    let texts = [];
    let order = 0;
    const pTagRe = makePTagRe();

    while ((match = pTagRe.exec(body)) !== null) {
      const attr    = match[1] || "";
      const inner   = match[2] || "";
      const decoded = decodeHtml(inner.replace(/<[^>]+>/g, "")).trim();
      if (decoded) {
        texts.push({ order, attr, inner, decoded });
      }
      order++;
    }

    if (texts.length === 0) {
      console.log(`[${scriptName}] XML 无字幕内容，直接返回`);
      return $done({ body: body });
    }

    // 没有 API Key 则直接返回机器翻译
    if (!boxConfig.key) {
      console.log(`[${scriptName}] 无 API Key，返回机器翻译`);
      return $done({ body: body });
    }

    const MAX   = 20;
    const batch = texts.slice(0, MAX);

    console.log(`[${scriptName}] 🧩 XML 润色 ${batch.length}/${texts.length} 句`);

    const rawText      = batch.map((item, i) => `[${i}] ${item.decoded}`).join("\n");
    const contextBlock = buildContextBlock();
    const gptRequest   = buildPolishRequest(rawText, contextBlock);

    $.fetch(gptRequest).then(
      response => {
        try {
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 无响应，回退机器翻译`);
            return $done({ body: body });
          }
          const json = JSON.parse(response.body);
          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误: ${json.error.message}，回退机器翻译`);
            return $done({ body: body });
          }
          const content = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
          if (!content) {
            console.log(`[${scriptName}] GPT 内容为空，回退机器翻译`);
            return $done({ body: body });
          }

          saveHistory(batch.map(item => item.decoded));

          // 收集润色结果
          const polishMap = {};
          content.split("\n").forEach(line => {
            const m = line.match(/^\[(\d+)\]\s*(.*)/);
            if (m && batch[parseInt(m[1], 10)] && m[2].trim()) {
              polishMap[batch[parseInt(m[1], 10)].order] = m[2].trim();
            }
          });

          // 重建 XML，替换润色后的译文
          const pTagRe2 = makePTagRe();
          let result  = "";
          let lastIdx = 0;
          let applied = 0;
          let cur     = 0;

          while ((match = pTagRe2.exec(body)) !== null) {
            result += body.slice(lastIdx, match.index);
            const attr  = match[1] || "";
            const inner = match[2] || "";
            const polished = polishMap[cur];
            if (polished) {
              applied++;
              result += `<p${attr}>${encodeHtml(polished)}</p>`;
            } else {
              result += match[0];
            }
            lastIdx = pTagRe2.lastIndex;
            cur++;
          }
          result += body.slice(lastIdx);

          console.log(`[${scriptName}] ✅ XML 润色完成 ${applied} 句`);
          return $done({ body: result });
        } catch (e) {
          console.log(`[${scriptName}] GPT 解析失败，回退机器翻译: ${e.message}`);
          return $done({ body: body });
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败，回退机器翻译: ${JSON.stringify(err)}`);
        return $done({ body: body });
      }
    );

  } catch (e) {
    console.log(`[${scriptName}] XML 解析失败: ${e.message}`);
    return $done({ body: body });
  }
}

// ==========================================
// 6. 构造 GPT 润色请求
//    输入是已有的机器翻译文本，让 GPT 润色使其更自然
// ==========================================
function buildPolishRequest(rawText, contextBlock) {
  const userContent = contextBlock
    ? rawText + "\n\n[Context for reference only — DO NOT OUTPUT:\n" + contextBlock + "]"
    : rawText;

  return {
    url:    boxConfig.url,
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": "Bearer " + boxConfig.key
    },
    body: JSON.stringify({
      model: boxConfig.model,
      messages: [
        {
          role: "system",
          content: "You are a subtitle polishing tool. The user will give you machine-translated " + boxConfig.target_lang + " subtitles in the format \"[n] text\". Your job is to improve the naturalness and readability of each line while keeping the meaning intact. Output ONLY the polished lines in the same \"[n] text\" format, one line per input line, no extra commentary."
        },
        { role: "user", content: userContent }
      ],
      stream:            false,
      max_tokens:        1000,
      temperature:       0.3,
      top_p:             1,
      frequency_penalty: 0,
      presence_penalty:  0
    })
  };
}

// ==========================================
// 7. HTML 转义/反转义
// ==========================================
function decodeHtml(str) {
  return str
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'");
}

function encodeHtml(str) {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}

// --- [8. 环境兼容封装] ---
function Env(name) {
  return {
    getdata: key        => $prefs.valueForKey(key),
    setdata: (key, val) => $prefs.setValueForKey(val, key),
    fetch:   options    => $task.fetch(options)
  };
}

// ==========================================
// 9. 字幕上下文历史管理
// ==========================================
function loadHistory() {
  try {
    const raw = $.getdata(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) { return []; }
}

function saveHistory(newLines) {
  try {
    let history = loadHistory().concat(newLines);
    if (history.length > HISTORY_MAX_LEN) {
      history = history.slice(history.length - HISTORY_MAX_LEN);
    }
    $.setdata(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.log("[" + scriptName + "] 历史记录保存失败: " + e.message);
  }
}

function buildContextBlock() {
  const history = loadHistory();
  if (history.length === 0) return "";
  return history.join("\n");
}