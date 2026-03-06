/**
 * @name YouTube Subtitle Translator (BoxJS 版, 通用翻译 API)
 * @description 结合 BoxJS 配置翻译接口，实现 YouTube 双语字幕（原文 + 翻译）。
 *
 * 翻译接口约定：
 *  POST application/json
 *  body:
 *    {
 *      "source_lang": "auto" 或 源语言代码,
 *      "target_lang": "目标语言代码 (例如 zh-CN)",
 *      "text_list": ["要翻译的字幕1", "要翻译的字幕2", ...]
 *    }
 *  response:
 *    {
 *      "translations": [
 *        { "detected_source_lang": "en", "text": "翻译结果1" },
 *        { "detected_source_lang": "en", "text": "翻译结果2" },
 *        ...
 *      ]
 *    }
 *
 * 建议 Quantumult X 配置片段：
 *
 * [rewrite_local]
 * # Player 请求：强制开启自动字幕
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * # Player 响应：激活翻译选项
 * ^https?:\/\/(www|m)\.youtube\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 * ^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * # 字幕响应：执行翻译并合成双语字幕（拦截所有 timedtext）
 * ^https?:\/\/((www|m)\.youtube\.com|[\w-]+\.googlevideo\.com)\/api\/timedtext(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * [mitm]
 * hostname = www.youtube.com, m.youtube.com, *.googlevideo.com, youtubei.googleapis.com
 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- [1. 读取 BoxJS 配置] ---
// ytb_gpt_api_url   → 翻译接口 URL
// ytb_gpt_api_key   → 接口 token（可选）
// ytb_gpt_lang      → 目标语言代码 (例如 zh-CN, en, ja)
const boxConfig = {
  url: $.getdata("ytb_gpt_api_url") || "https://your-translate-api.example.com/translate",
  key: $.getdata("ytb_gpt_api_key") || "",
  // 这里的 model 已经不再用于 ChatGPT，只保留字段占位，不再参与逻辑
  model: $.getdata("ytb_gpt_model") || "",
  target_lang: $.getdata("ytb_gpt_lang") || "zh-CN"
};

const url = $request.url;
const isPlayer = url.includes("/youtubei/v1/player");
const isSubtitle = url.includes("/api/timedtext");

// ==========================================
// 2. 请求阶段逻辑 (Request Mode)
// ==========================================
if (typeof $response === "undefined") {
  // 目前在请求阶段只处理 player 请求（强制自动字幕），字幕请求在响应阶段统一翻译
  if (isPlayer && $request.body) {
    try {
      let bodyObj = JSON.parse($request.body);
      if (bodyObj.playbackContext?.contentPlaybackContext) {
        bodyObj.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true;
        console.log(`[${scriptName}] ✅ 已开启自动字幕`);
      }
      return $done({ body: JSON.stringify(bodyObj) });
    } catch (e) {
      console.log(`[${scriptName}] Player request 解析失败: ${e.message}`);
      return $done({});
    }
  }

  // 其他请求直接放行
  return $done({});
}

// ==========================================
// 3. 响应阶段逻辑 (Response Mode)
// ==========================================
else {
  // A. 诱导激活：修改 Player 响应，让 App 显示翻译选项（不依赖也能翻译，只是更友好）
  if (isPlayer) {
    try {
      let obj = JSON.parse($response.body);
      if (obj.captions?.playerCaptionsTracklistRenderer) {
        console.log(`[${scriptName}] 🔍 正在激活可翻译属性...`);
        const tracklist = obj.captions.playerCaptionsTracklistRenderer;
        if (Array.isArray(tracklist.captionTracks)) {
          tracklist.captionTracks.forEach(track => {
            track.isTranslatable = true;
          });
        }
        tracklist.translationLanguages = [
          { languageCode: "zh-Hans", languageName: { runs: [{ text: "中文（自定义翻译）" }] } },
          { languageCode: "en", languageName: { runs: [{ text: "English" }] } }
        ];
      }
      return $done({ body: JSON.stringify(obj) });
    } catch (e) {
      console.log(`[${scriptName}] Player 响应解析失败: ${e.message}`);
      return $done({});
    }
  }

  // B. 字幕翻译：拦截所有 timedtext 响应，直接做双语
  if (isSubtitle) {
    if (!boxConfig.url) {
      console.log(`⚠️ [${scriptName}] 未配置翻译接口 URL，跳过翻译`);
      return $done({});
    }

    const body = $response.body || "";
    const trimmed = body.trim();

    // 根据第一个字符判断是 XML 还是 JSON
    if (trimmed.startsWith("<")) {
      // XML 格式字幕 (format=srv3 text/xml)
      return handleXmlSubtitle(body);
    } else {
      // JSON (srv3/json3) 格式字幕
      return handleJsonSubtitle(body);
    }
  }

  // 其他响应直接放行
  return $done({});
}

// ==========================================
// 4. 处理 JSON 字幕 (srv3/json3)
// ==========================================
function handleJsonSubtitle(body) {
  try {
    let subtitleObj = JSON.parse(body);
    if (!Array.isArray(subtitleObj.events)) {
      console.log(`[${scriptName}] 字幕结构中 events 不存在或不是数组，可能不是 JSON3，跳过`);
      return $done({});
    }

    let translateList = [];
    subtitleObj.events.forEach((event, index) => {
      if (event.segs && event.segs.length > 0) {
        let text = event.segs.map(s => s.utf8).join("").trim();
        if (text && text !== "\n" && !text.includes("\n")) {
          translateList.push({ index, text });
        }
      }
    });

    if (translateList.length === 0) {
      console.log(`[${scriptName}] 无可翻译的字幕片段 (JSON)`);
      return $done({});
    }

    console.log(`[${scriptName}] 🎬 JSON 字幕片段数量: ${translateList.length}`);

    // 分批控制：限制每次请求的行数和总字符数，避免超时
    const MAX_LINES_JSON = 30;
    const MAX_CHARS_JSON = 2500;
    const batch = [];
    let charCount = 0;
    for (let i = 0; i < translateList.length; i++) {
      const item = translateList[i];
      const len = item.text.length;
      if (batch.length >= MAX_LINES_JSON || charCount + len > MAX_CHARS_JSON) break;
      batch.push(item);
      charCount += len;
    }

    if (batch.length === 0) {
      console.log(`[${scriptName}] 本批无可翻译片段，跳过 (JSON)`);
      return $done({});
    }

    console.log(
      `[${scriptName}] 🧩 JSON 本批翻译片段: ${batch.length}/${translateList.length} 行，约 ${charCount} 字符`
    );

    const textArr = batch.map(item => item.text);
    const req = buildTranslateRequest(textArr);

    $.fetch(req).then(
      response => {
        try {
          console.log(
            `[${scriptName}] 翻译接口返回前200 (JSON): ${String(response.body).slice(0, 200)}`
          );
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] 翻译接口返回为空或非字符串 (JSON)，跳过本次翻译`);
            return $done({});
          }
          const data = JSON.parse(response.body);
          const translations = data.translations;
          if (!Array.isArray(translations) || translations.length === 0) {
            console.log(`[${scriptName}] 翻译接口返回内容为空或格式异常 (JSON)`);
            return $done({});
          }

          let applied = 0;
          for (let i = 0; i < translations.length && i < batch.length; i++) {
            const translated = translations[i]?.text;
            const originalIndex = batch[i].index;
            if (
              translated &&
              typeof originalIndex === "number" &&
              subtitleObj.events[originalIndex]?.segs?.[0]?.utf8 !== undefined
            ) {
              subtitleObj.events[originalIndex].segs[0].utf8 += `\n${translated}`;
              applied++;
            }
          }

          console.log(`[${scriptName}] ✅ JSON 模式已应用翻译片段数量: ${applied}`);
          return $done({ body: JSON.stringify(subtitleObj) });
        } catch (e) {
          console.log(`[${scriptName}] 解析翻译接口返回失败 (JSON): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] 翻译接口请求失败 (JSON): ${JSON.stringify(err)}`);
        return $done({});
      }
    );
  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (JSON): ${e.message}`);
    return $done({});
  }
}

// ==========================================
// 5. 处理 XML 字幕 (format="3" text/xml, <timedtext><body><p>...)
// ==========================================
function handleXmlSubtitle(body) {
  try {
    // 匹配 <p ...> ... </p>
    const pTagRe = /<p([^>]*)>([\s\S]*?)<\/p>/g;
    let match;
    let texts = []; // { order, attr, inner, decoded }
    let order = 0;

    while ((match = pTagRe.exec(body)) !== null) {
      const attr = match[1] || "";
      const inner = match[2] || "";
      // 去掉内部所有标签，只保留纯文本
      const innerStripped = inner.replace(/<[^>]+>/g, "");
      const decoded = decodeHtml(innerStripped).trim();
      // 只要有非空文本就翻译（包括 [music] 这类）
      if (decoded) {
        texts.push({ order, attr, inner, decoded });
      }
      order++;
    }

    if (texts.length === 0) {
      console.log(`[${scriptName}] 无可翻译的字幕片段 (XML)`);
      return $done({});
    }

    console.log(`[${scriptName}] 🎬 XML 字幕片段数量: ${texts.length}`);

    // 只翻译前 MAX_LINES 行，且总字符数不超过 MAX_CHARS，避免一次请求太长
    // 长视频容易超时，这里较为保守
    const MAX_LINES = 20;
    const MAX_CHARS = 2000;
    const batch = [];
    let charCount = 0;
    for (let i = 0; i < texts.length; i++) {
      const item = texts[i];
      const len = item.decoded.length;
      if (batch.length >= MAX_LINES || charCount + len > MAX_CHARS) break;
      batch.push(item);
      charCount += len;
    }

    console.log(
      `[${scriptName}] 🧩 本批翻译片段: ${batch.length}/${texts.length} 行，约 ${charCount} 字符`
    );

    if (batch.length === 0) {
      console.log(`[${scriptName}] 本批无可翻译片段，跳过 (XML)`);
      return $done({});
    }

    const textArr = batch.map(item => item.decoded);
    const req = buildTranslateRequest(textArr);

    $.fetch(req).then(
      response => {
        try {
          console.log(
            `[${scriptName}] 翻译接口返回前200 (XML): ${String(response.body).slice(0, 200)}`
          );
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] 翻译接口返回为空或非字符串 (XML)，跳过本次翻译`);
            return $done({});
          }
          const data = JSON.parse(response.body);
          const translations = data.translations;
          if (!Array.isArray(translations) || translations.length === 0) {
            console.log(`[${scriptName}] 翻译接口返回内容为空或格式异常 (XML)`);
            return $done({});
          }

          const translationMap = {}; // order -> translated
          for (let i = 0; i < translations.length && i < batch.length; i++) {
            const translated = translations[i]?.text;
            if (translated) {
              translationMap[batch[i].order] = translated;
            }
          }

          // 重建 XML 字符串
          let result = "";
          let lastIndex = 0;
          pTagRe.lastIndex = 0;
          let applied = 0;
          let currentOrder = 0;

          while ((match = pTagRe.exec(body)) !== null) {
            const start = match.index;
            const end = pTagRe.lastIndex;
            const attr = match[1] || "";
            const inner = match[2] || "";

            // 先把上一个位置到当前 <p> 之前的内容原样拼上
            result += body.slice(lastIndex, start);

            const translated = translationMap[currentOrder];
            if (translated) {
              applied++;
              // 原始纯文本
              const originalPlain = decodeHtml(inner.replace(/<[^>]+>/g, ""));
              const newPlain = originalPlain + "\n" + translated;
              const encoded = encodeHtml(newPlain);
              // 为简单起见，用纯文本覆盖原 <p> 内容，保留原有属性
              result += `<p${attr}>${encoded}</p>`;
            } else {
              // 不需要翻译的 <p> 原样保留
              result += match[0];
            }

            lastIndex = end;
            currentOrder++;
          }

          // 拼接最后一个 </p> 之后的尾部内容
          result += body.slice(lastIndex);

          console.log(`[${scriptName}] ✅ XML 模式已应用翻译片段数量: ${applied}`);
          return $done({ body: result });
        } catch (e) {
          console.log(`[${scriptName}] 解析翻译接口返回失败 (XML): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] 翻译接口请求失败 (XML): ${JSON.stringify(err)}`);
        return $done({});
      }
    );
  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (XML): ${e.message}`);
    return $done({});
  }
}

// ==========================================
// 6. 构造翻译接口请求
// ==========================================
function buildTranslateRequest(textArr) {
  const targetLang = boxConfig.target_lang || "zh-CN";

  const headers = {
    "Content-Type": "application/json"
  };
  if (boxConfig.key) {
    headers["Authorization"] = `Bearer ${boxConfig.key}`;
  }

  return {
    url: boxConfig.url,
    method: "POST",
    headers,
    timeout: 15000, // 防止请求挂太久
    body: JSON.stringify({
      source_lang: "auto",
      target_lang: targetLang,
      text_list: textArr
      // 若接口支持占位符，可按需开启：
      // placeholders: ["", "", "b"]
    })
  };
}

// ==========================================
// 7. HTML 转义/反转义
// ==========================================
function decodeHtml(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function encodeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;/g",)
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- [8. 环境兼容封装] ---
function Env(name) {
  return {
    getdata: key => $prefs.valueForKey(key),
    fetch: options => $task.fetch(options)
  };
}