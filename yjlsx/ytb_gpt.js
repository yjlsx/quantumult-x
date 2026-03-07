/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版) v3
 * @description 结合 BoxJS 动态配置 GPT 接口，实现 YouTube 双语字幕（原文 + 翻译）。
 *
 * 建议 Quantumult X 配置片段：
 *
 * [rewrite_local]
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/((www|m)\.youtube\.com|[\w-]+\.googlevideo\.com)\/api\/timedtext(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * [mitm]
 * hostname = www.youtube.com, m.youtube.com, *.googlevideo.com, youtubei.googleapis.com
 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- [1. 读取 BoxJS 配置] ---
const boxConfig = {
  url:         $.getdata("ytb_gpt_api_url")  || "https://open.lxcloud.dev/v1/chat/completions",
  key:         $.getdata("ytb_gpt_api_key")  || "",
  model:       $.getdata("ytb_gpt_model")    || "gpt-4o-mini",
  target_lang: $.getdata("ytb_gpt_lang")     || "中文"
};

// 👇 在这里加一行打印
console.log(`[${scriptName}] BoxJS 配置: ` + JSON.stringify({
  url: boxConfig.url,
  key: boxConfig.key ? boxConfig.key.slice(0, 10) + '...' : '(empty)',
  model: boxConfig.model,
  lang: boxConfig.target_lang
}));

const HISTORY_KEY     = "ytb_subtitle_history";
const HISTORY_MAX_LEN = 10;

const url        = $request.url;
const isPlayer   = url.includes("/youtubei/v1/player");
const isSubtitle = url.includes("/api/timedtext");

// ==========================================
// 2. 请求阶段 (Request Mode)
// ==========================================
if (typeof $response === "undefined") {
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
  return $done({});
}

// ==========================================
// 3. 响应阶段 (Response Mode)
// ==========================================
else {
  // A. 修改 Player 响应，激活翻译选项
  if (isPlayer) {
    try {
      let obj = JSON.parse($response.body);
      if (obj.captions && obj.captions.playerCaptionsTracklistRenderer) {
        console.log(`[${scriptName}] 🔍 正在激活可翻译属性...`);
        const tracklist = obj.captions.playerCaptionsTracklistRenderer;
        if (Array.isArray(tracklist.captionTracks)) {
          tracklist.captionTracks.forEach(track => {
            track.isTranslatable = true;
          });
        }
        tracklist.translationLanguages = [
          { languageCode: "zh-Hans", languageName: { runs: [{ text: "中文（凉心 GPT）" }] } },
          { languageCode: "en",      languageName: { runs: [{ text: "English" }] } }
        ];
      }
      return $done({ body: JSON.stringify(obj) });
    } catch (e) {
      console.log(`[${scriptName}] Player 响应解析失败: ${e.message}`);
      return $done({});
    }
  }

  // B. 字幕翻译
  if (isSubtitle) {
    if (!boxConfig.key) {
      console.log(`⚠️ [${scriptName}] 未设置 API Key，跳过翻译`);
      return $done({});
    }

    const body    = $response.body || "";
    const trimmed = body.trim();

    if (trimmed.startsWith("<")) {
      return handleXmlSubtitle(body);
    } else {
      return handleJsonSubtitle(body);
    }
  }

  return $done({});
}

// ==========================================
// 4. 处理 JSON 字幕 (srv3/json3)
// ==========================================
function handleJsonSubtitle(body) {
  try {
    let subtitleObj = JSON.parse(body);
    if (!Array.isArray(subtitleObj.events)) {
      console.log(`[${scriptName}] 字幕结构中 events 不是数组，跳过`);
      return $done({});
    }

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
      console.log(`[${scriptName}] 无可翻译的字幕片段 (JSON)`);
      return $done({});
    }

    const MAX_LINES_JSON = 30;
    const MAX_CHARS_JSON = 2500;
    const batch = [];
    let charCount = 0;
    for (let i = 0; i < translateList.length; i++) {
      const item = translateList[i];
      const len  = item.text.length;
      if (batch.length >= MAX_LINES_JSON || charCount + len > MAX_CHARS_JSON) break;
      batch.push(item);
      charCount += len;
    }

    if (batch.length === 0) {
      console.log(`[${scriptName}] 本批无可翻译片段，跳过 (JSON)`);
      return $done({});
    }

    console.log(`[${scriptName}] 🧩 JSON 本批: ${batch.length}/${translateList.length} 行，约 ${charCount} 字符`);

    const rawText      = batch.map((item, i) => `[${i}] ${item.text}`).join("\n");
    const contextBlock = buildContextBlock();
    const gptRequest   = buildGptRequest(rawText, contextBlock);

    // [fix1] 不在外层调用 $done，完全依赖异步回调返回结果
    $.fetch(gptRequest).then(
      response => {
        try {
          console.log(`[${scriptName}] GPT 原始返回前200 (JSON): ${String(response.body).slice(0, 200)}`);
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 返回为空 (JSON)`);
            return $done({});
          }
          const json = JSON.parse(response.body);
          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误 (JSON): ${json.error.message}`);
            return $done({});
          }

          const translatedContent = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
          if (!translatedContent) {
            console.log(`[${scriptName}] GPT 返回内容为空 (JSON)`);
            return $done({});
          }

          // [v3] 翻译成功后，将本批原文存入历史
          saveHistory(batch.map(item => item.text));

          const lines = translatedContent.split("\n");
          let applied = 0;
          lines.forEach(line => {
            const match = line.match(/^\[(\d+)\]\s*(.*)/);
            if (!match) return;
            const idx           = parseInt(match[1], 10);
            const translated    = match[2].trim();
            const originalIndex = (batch[idx] !== undefined) ? batch[idx].index : undefined;
            if (!translated || typeof originalIndex !== "number") return;

            const event = subtitleObj.events[originalIndex];
            if (!event || !event.segs || !event.segs.length) return;

            // [fix3] 保留所有原始 segs，在末尾追加译文 seg
            event.segs.push({ utf8: `\n${translated}` });
            applied++;
          });

          console.log(`[${scriptName}] ✅ JSON 模式已应用翻译: ${applied} 条`);
          return $done({ body: JSON.stringify(subtitleObj) });
        } catch (e) {
          console.log(`[${scriptName}] 解析 GPT 返回失败 (JSON): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败 (JSON): ${JSON.stringify(err)}`);
        return $done({});
      }
    );

  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (JSON): ${e.message}`);
    return $done({});
  }
}

// ==========================================
// 5. 处理 XML 字幕 (format="3" text/xml)
// ==========================================
function handleXmlSubtitle(body) {
  try {
    // [fix2] 工厂函数，每次调用返回全新的 RegExp，lastIndex 永远从 0 开始
    const makePTagRe = () => /<p([^>]*)>([\s\S]*?)<\/p>/g;

    let match;
    let texts = [];
    let order = 0;
    const pTagRe = makePTagRe();

    while ((match = pTagRe.exec(body)) !== null) {
      const attr          = match[1] || "";
      const inner         = match[2] || "";
      const innerStripped = inner.replace(/<[^>]+>/g, "");
      const decoded       = decodeHtml(innerStripped).trim();
      if (decoded) {
        texts.push({ order, attr, inner, decoded });
      }
      order++;
    }

    if (texts.length === 0) {
      console.log(`[${scriptName}] 无可翻译的字幕片段 (XML)`);
      return $done({});
    }

    const MAX_LINES = 30;
    const MAX_CHARS = 2500;
    const batch = [];
    let charCount = 0;
    for (let i = 0; i < texts.length; i++) {
      const item = texts[i];
      const len  = item.decoded.length;
      if (batch.length >= MAX_LINES || charCount + len > MAX_CHARS) break;
      batch.push(item);
      charCount += len;
    }

    if (batch.length === 0) {
      console.log(`[${scriptName}] 本批无可翻译片段，跳过 (XML)`);
      return $done({});
    }

    console.log(`[${scriptName}] 🧩 XML 本批: ${batch.length}/${texts.length} 行，约 ${charCount} 字符`);

    const rawText      = batch.map((item, i) => `[${i}] ${item.decoded}`).join("\n");
    const contextBlock  = buildContextBlock();
    const gptRequest    = buildGptRequest(rawText, contextBlock);

    // [fix1] 不在外层调用 $done，完全依赖异步回调返回结果
    $.fetch(gptRequest).then(
      response => {
        try {
          console.log(`[${scriptName}] GPT 原始返回前200 (XML): ${String(response.body).slice(0, 200)}`);
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 返回为空 (XML)`);
            return $done({});
          }
          const json = JSON.parse(response.body);
          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误 (XML): ${json.error.message}`);
            return $done({});
          }

          const translatedContent = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
          if (!translatedContent) {
            console.log(`[${scriptName}] GPT 返回内容为空 (XML)`);
            return $done({});
          }

          // [v3] 翻译成功后，将本批原文存入历史
          saveHistory(batch.map(item => item.decoded));

          const lines = translatedContent.split("\n");
          const translationMap = {};
          lines.forEach(line => {
            const match = line.match(/^\[(\d+)\]\s*(.*)/);
            if (match) {
              const idx        = parseInt(match[1], 10);
              const translated = match[2].trim();
              if (batch[idx] && translated) {
                translationMap[batch[idx].order] = translated;
              }
            }
          });

          // [fix2] 用全新的 RegExp 重建 XML，lastIndex 必然从 0 开始
          const pTagRe2    = makePTagRe();
          let result       = "";
          let lastIndex    = 0;
          let applied      = 0;
          let currentOrder = 0;

          while ((match = pTagRe2.exec(body)) !== null) {
            const start = match.index;
            const end   = pTagRe2.lastIndex;
            const attr  = match[1] || "";
            const inner = match[2] || "";

            result += body.slice(lastIndex, start);

            const translated = translationMap[currentOrder];
            if (translated) {
              applied++;
              const originalPlain = decodeHtml(inner.replace(/<[^>]+>/g, ""));
              const newPlain      = originalPlain + "\n" + translated;
              result += `<p${attr}>${encodeHtml(newPlain)}</p>`;
            } else {
              result += match[0];
            }

            lastIndex = end;
            currentOrder++;
          }

          result += body.slice(lastIndex);

          console.log(`[${scriptName}] ✅ XML 模式已应用翻译: ${applied} 条`);
          return $done({ body: result });
        } catch (e) {
          console.log(`[${scriptName}] 解析 GPT 返回失败 (XML): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败 (XML): ${JSON.stringify(err)}`);
        return $done({});
      }
    );

  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (XML): ${e.message}`);
    return $done({});
  }
}

// ==========================================
// 6. 构造 GPT Chat Completions 请求
// ==========================================
function buildGptRequest(rawText, contextBlock) {
  const userContent = contextBlock
    ? rawText + "\n\n[Previous subtitle context for reference only — DO NOT OUTPUT:\n" + contextBlock + "]"
    : rawText;
  return {
    url:     boxConfig.url,
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${boxConfig.key}`
    },
    // 不再显式设置 timeout，交给 Quantumult X 默认处理
    body: JSON.stringify({
      model: boxConfig.model,
      messages: [
        {
          role: "system",
          content: `You are a subtitle translator.
Translate all user content into ${boxConfig.target_lang}.

Input format:
- Multiple lines, each like: "[n] text".

Output rules (STRICT):
1) For every input line "[n] text", output EXACTLY one line: "[n] translated text".
2) Keep index n unchanged, no new or missing lines.
3) Do NOT merge lines, do NOT add explanations, comments, or blank lines.`
        },
        { role: "user", content: userContent }
      ],
      stream:            false,
      max_tokens:        1500,
      temperature:       0,
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
    setdata: (key, val) => $prefs.setValueForKey(val, key),  // QX: setValueForKey(value, key)
    fetch:   options    => $task.fetch(options)
  };
}

// ==========================================
// 9. 字幕上下文历史管理（$prefs 持久化）
// ==========================================

// 读取历史，返回字符串数组
function loadHistory() {
  try {
    const raw = $.getdata(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// 追加本批原文进历史，超出上限时滚动删除最旧条目
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

// 将历史拼成上下文文本块（仅供 GPT 理解语义，不输出）
function buildContextBlock() {
  const history = loadHistory();
  if (history.length === 0) return "";
  return history.join("\n");
}