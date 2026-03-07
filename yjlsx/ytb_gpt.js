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
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body ytb_gpt.js
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body ytb_gpt.js
 * ^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext(\?.*)?$ url script-request-header ytb_gpt.js
 * ^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext(\?.*)?$ url script-response-body ytb_gpt.js
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

  // 字幕请求直接放行
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

  // B. 字幕响应：每次只翻译第一句
  if (isSubtitle) {
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
// 4. 处理 JSON 字幕 — 逐句串行翻译，超时保留已翻译部分
// ==========================================
function handleJsonSubtitle(body) {
  try {
    let subtitleObj = JSON.parse(body);
    if (!Array.isArray(subtitleObj.events)) {
      return $done({ body: body });
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

    if (translateList.length === 0 || !boxConfig.key) {
      return $done({ body: body });
    }

    console.log(`[${scriptName}] 🎬 共 ${translateList.length} 句，逐句翻译`);

    // 记录开始时间，超过 8 秒停止，保留已翻译部分
    const startTime = Date.now();
    const TIME_LIMIT = 8000;

    function translateNext(i) {
      // 超时或翻译完毕，返回当前结果
      if (i >= translateList.length || Date.now() - startTime > TIME_LIMIT) {
        console.log(`[${scriptName}] ✅ 完成 ${i}/${translateList.length} 句`);
        return $done({ body: JSON.stringify(subtitleObj) });
      }

      const item = translateList[i];
      const gptRequest = buildGptRequest(item.text);

      $.fetch(gptRequest).then(
        response => {
          try {
            if (!response || typeof response.body !== "string") {
              return $done({ body: JSON.stringify(subtitleObj) });
            }
            const json = JSON.parse(response.body);
            if (json.error && json.error.message) {
              console.log(`[${scriptName}] GPT 错误: ${json.error.message}`);
              return $done({ body: JSON.stringify(subtitleObj) });
            }
            const translated = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
            if (translated && translated.trim()) {
              const event = subtitleObj.events[item.index];
              if (event && event.segs && event.segs.length) {
                event.segs.push({ utf8: "\n" + translated.trim() });
              }
            }
            // 继续下一句
            translateNext(i + 1);
          } catch (e) {
            console.log(`[${scriptName}] 解析失败: ${e.message}`);
            return $done({ body: JSON.stringify(subtitleObj) });
          }
        },
        err => {
          console.log(`[${scriptName}] 请求失败: ${JSON.stringify(err)}`);
          return $done({ body: JSON.stringify(subtitleObj) });
        }
      );
    }

    translateNext(0);

  } catch (e) {
    console.log(`[${scriptName}] JSON 解析失败: ${e.message}`);
    return $done({ body: body });
  }
}

// ==========================================
// 5. 处理 XML 字幕 — 逐句串行翻译，超时保留已翻译部分
// ==========================================
function handleXmlSubtitle(body) {
  try {
    const makePTagRe = () => /<p([^>]*)>([\s\S]*?)<\/p>/g;
    const pTagRe = makePTagRe();
    let match;
    let texts = [];
    let order = 0;

    while ((match = pTagRe.exec(body)) !== null) {
      const attr    = match[1] || "";
      const inner   = match[2] || "";
      const decoded = decodeHtml(inner.replace(/<[^>]+>/g, "")).trim();
      if (decoded) {
        texts.push({ order, attr, inner, decoded, start: match.index, end: pTagRe.lastIndex, full: match[0] });
      }
      order++;
    }

    if (texts.length === 0 || !boxConfig.key) {
      return $done({ body: body });
    }

    console.log(`[${scriptName}] 🎬 共 ${texts.length} 句，逐句翻译`);

    const startTime = Date.now();
    const TIME_LIMIT = 8000;
    // 用 map 存翻译结果 order -> translated
    const translationMap = {};

    function translateNext(i) {
      if (i >= texts.length || Date.now() - startTime > TIME_LIMIT) {
        // 重建 XML
        const pTagRe2 = makePTagRe();
        let result  = "";
        let lastIdx = 0;
        let cur     = 0;
        let applied = 0;

        while ((match = pTagRe2.exec(body)) !== null) {
          result += body.slice(lastIdx, match.index);
          const attr  = match[1] || "";
          const inner = match[2] || "";
          const translated = translationMap[cur];
          if (translated) {
            applied++;
            const plain = decodeHtml(inner.replace(/<[^>]+>/g, ""));
            result += "<p" + attr + ">" + encodeHtml(plain + "\n" + translated) + "</p>";
          } else {
            result += match[0];
          }
          lastIdx = pTagRe2.lastIndex;
          cur++;
        }
        result += body.slice(lastIdx);

        console.log(`[${scriptName}] ✅ XML 完成 ${i}/${texts.length} 句，应用 ${applied} 条`);
        return $done({ body: result });
      }

      const item = texts[i];
      const gptRequest = buildGptRequest(item.decoded);

      $.fetch(gptRequest).then(
        response => {
          try {
            if (!response || typeof response.body !== "string") {
              return translateNext(texts.length); // 跳到重建
            }
            const json = JSON.parse(response.body);
            if (json.error && json.error.message) {
              console.log(`[${scriptName}] GPT 错误: ${json.error.message}`);
              return translateNext(texts.length);
            }
            const translated = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
            if (translated && translated.trim()) {
              translationMap[item.order] = translated.trim();
            }
            translateNext(i + 1);
          } catch (e) {
            console.log(`[${scriptName}] 解析失败: ${e.message}`);
            return translateNext(texts.length);
          }
        },
        err => {
          console.log(`[${scriptName}] 请求失败: ${JSON.stringify(err)}`);
          return translateNext(texts.length);
        }
      );
    }

    translateNext(0);

  } catch (e) {
    console.log(`[${scriptName}] XML 解析失败: ${e.message}`);
    return $done({ body: body });
  }
}

// ==========================================
// 6. 构造 GPT 翻译请求（单句）
// ==========================================
function buildGptRequest(text) {
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
        // 不用 system prompt，减少 token，加快响应
        { role: "user", content: "Translate to " + boxConfig.target_lang + ", output translation only:\n" + text }
      ],
      stream:     false,
      max_tokens: 100,
      temperature: 0
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