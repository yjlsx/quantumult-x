/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版)
 * @description 结合 BoxJS 动态配置 API Key 和中转地址，实现 YouTube 双语字幕（原文 + 翻译）。
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
 * # 字幕响应：执行 GPT 翻译并合成双语字幕（拦截所有 timedtext）
 * ^https?:\/\/((www|m)\.youtube\.com|[\w-]+\.googlevideo\.com)\/api\/timedtext(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * [mitm]
 * hostname = www.youtube.com, m.youtube.com, *.googlevideo.com, youtubei.googleapis.com
 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- [1. 读取 BoxJS 配置] ---
const boxConfig = {
  url: $.getdata("ytb_gpt_api_url") || "https://api.openai.com/v1/chat/completions",
  key: $.getdata("ytb_gpt_api_key") || "",
  model: $.getdata("ytb_gpt_model") || "gpt-4o-mini",
  target_lang: $.getdata("ytb_gpt_lang") || "中文"
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
          { languageCode: "zh-Hans", languageName: { runs: [{ text: "中文（凉心 GPT）" }] } },
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
    if (!boxConfig.key) {
      console.log(`⚠️ [${scriptName}] 未设置 API Key，跳过翻译`);
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

// 处理 JSON 字幕 (srv3/json3)
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

    const rawText = translateList
      .map((item, i) => `[${i}] ${item.text}`)
      .join("\n");

    const gptRequest = buildGptRequest(rawText);

    $.fetch(gptRequest).then(
      response => {
        try {
          const json = JSON.parse(response.body);
          const translatedContent = json.choices?.[0]?.message?.content;
          if (!translatedContent) {
            console.log(`[${scriptName}] GPT 返回内容为空或格式异常 (JSON)`);
            return $done({});
          }

          const lines = translatedContent.split("\n");
          let applied = 0;
          lines.forEach(line => {
            const match = line.match(/^\[(\d+)\]\s*(.*)/);
            if (match) {
              const idx = parseInt(match[1], 10);
              const translated = match[2];
              const originalIndex = translateList[idx]?.index;
              if (
                typeof originalIndex === "number" &&
                subtitleObj.events[originalIndex]?.segs?.[0]?.utf8 !== undefined
              ) {
                subtitleObj.events[originalIndex].segs[0].utf8 += `\n${translated}`;
                applied++;
              }
            }
          });

          console.log(`[${scriptName}] ✅ JSON 模式已应用翻译片段数量: ${applied}`);
          return $done({ body: JSON.stringify(subtitleObj) });
        } catch (e) {
          console.log(`[${scriptName}] 解析 GPT 返回失败 (JSON): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败 (JSON): ${err}`);
        return $done({});
      }
    );
  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (JSON): ${e.message}`);
    return $done({});
  }
}

// 处理 XML 字幕 (format="3" text/xml, <timedtext><body><p>...)
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

    const rawText = texts
      .map((item, i) => `[${i}] ${item.decoded}`)
      .join("\n");

    const gptRequest = buildGptRequest(rawText);

    $.fetch(gptRequest).then(
      response => {
        try {
          const json = JSON.parse(response.body);
          const translatedContent = json.choices?.[0]?.message?.content;
          if (!translatedContent) {
            console.log(`[${scriptName}] GPT 返回内容为空或格式异常 (XML)`);
            return $done({});
          }

          const lines = translatedContent.split("\n");
          const translationMap = {}; // order -> translated
          lines.forEach(line => {
            const match = line.match(/^\[(\d+)\]\s*(.*)/);
            if (match) {
              const idx = parseInt(match[1], 10);
              const translated = match[2];
              if (texts[idx]) {
                translationMap[texts[idx].order] = translated;
              }
            }
          });

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
          console.log(`[${scriptName}] 解析 GPT 返回失败 (XML): ${e.message}`);
          return $done({});
        }
      },
      err => {
        console.log(`[${scriptName}] GPT 请求失败 (XML): ${err}`);
        return $done({});
      }
    );
  } catch (e) {
    console.log(`[${scriptName}] 字幕响应解析失败 (XML): ${e.message}`);
    return $done({});
  }
}

function buildGptRequest(rawText) {
  return {
    url: boxConfig.url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${boxConfig.key}`
    },
    body: JSON.stringify({
      model: boxConfig.model,
      messages: [
        {
          role: "system",
          content: `You are a professional subtitle translator. Translate into ${boxConfig.target_lang}. Keep index [n].`
        },
        { role: "user", content: rawText }
      ]
    })
  };
}

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
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- [4. 环境兼容封装] ---
function Env(name) {
  return {
    getdata: key => $prefs.valueForKey(key),
    fetch: options => $task.fetch(options)
  };
}
