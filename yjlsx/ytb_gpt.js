/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版)
 * @description 结合 BoxJS 动态配置 GPT 接口，实现 YouTube 双语字幕（原文 + 翻译）。
 *
 * GPT 接口约定（OpenAI Chat Completions 兼容）：
 *  POST application/json
 *  body:
 *    {
 *      "model": "gpt-4o-mini",
 *      "messages": [
 *        { "role": "system", "content": "..." },
 *        { "role": "user", "content": "[0] text\n[1] text\n..." }
 *      ],
 *      ...
 *    }
 *  response:
 *    {
 *      "choices": [
 *        { "message": { "content": "[0] 译文\n[1] 译文\n..." } }
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
 * # 字幕响应：执行 GPT 翻译并合成双语字幕（拦截所有 timedtext）
 * ^https?:\/\/((www|m)\.youtube\.com|[\w-]+\.googlevideo\.com)\/api\/timedtext(\?.*)?$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 *
 * [mitm]
 * hostname = www.youtube.com, m.youtube.com, *.googlevideo.com, youtubei.googleapis.com
 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- [1. 读取 BoxJS 配置] ---
// ytb_gpt_api_url   → Chat Completions URL，例如 https://open.lxcloud.dev/v1/chat/completions
// ytb_gpt_api_key   → API Key（中转站 token）
// ytb_gpt_model     → 模型 ID（必须是此 token 有权限的）
// ytb_gpt_lang      → 目标语言描述（仅用于 prompt 文案，例如 “中文”）
const boxConfig = {
  url: $.getdata("ytb_gpt_api_url") || "https://open.lxcloud.dev/v1/chat/completions",
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

    const rawText = batch
      .map((item, i) => `[${i}] ${item.text}`)
      .join("\n");

    const gptRequest = buildGptRequest(rawText);

    $.fetch(gptRequest).then(
      response => {
        try {
          console.log(
            `[${scriptName}] GPT 原始返回前200 (JSON): ${String(response.body).slice(0, 200)}`
          );
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 返回为空或非字符串 (JSON)，跳过本次翻译`);
            return $done({});
          }
          const json = JSON.parse(response.body);

          // 处理 GPT 错误结构
          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误 (JSON): ${json.error.message}`);
            return $done({});
          }

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
              const originalIndex = batch[idx]?.index;
              if (
                translated &&
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

    const rawText = batch
      .map((item, i) => `[${i}] ${item.decoded}`)
      .join("\n");

    const gptRequest = buildGptRequest(rawText);

    $.fetch(gptRequest).then(
      response => {
        try {
          console.log(
            `[${scriptName}] GPT 原始返回前200 (XML): ${String(response.body).slice(0, 200)}`
          );
          if (!response || typeof response.body !== "string") {
            console.log(`[${scriptName}] GPT 返回为空或非字符串 (XML)，跳过本次翻译`);
            return $done({});
          }
          const json = JSON.parse(response.body);

          if (json.error && json.error.message) {
            console.log(`[${scriptName}] GPT 错误 (XML): ${json.error.message}`);
            return $done({});
          }

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
              if (batch[idx] && translated) {
                translationMap[batch[idx].order] = translated;
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
function buildGptRequest(rawText) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${boxConfig.key}`
  };

  return {
    url: boxConfig.url,
    method: "POST",
    headers,
    timeout: 15000, // 防止请求挂太久
    body: JSON.stringify({
      model: boxConfig.model,
      // 某些中转站支持 group，可按需保留/删除
      group: "default",
      messages: [
        {
          role: "system",
          content: `You are an expert subtitle translation engine for video dialogue.
Your job is to translate subtitles into ${boxConfig.target_lang} while 保持原句的语气、情绪和语境。

INPUT FORMAT
- The user will send multiple lines, each in the format: "[n] text".
- Each line is an independent subtitle segment, but you may use other lines as context to 理解含义、梗和指代。

OUTPUT RULES (VERY IMPORTANT)
1) For every input line "[n] text", output EXACTLY ONE line in the format:
   "[n] translated text"
2) 保持行号 n 不变，不要跳号，不要新增行号。
3) 不要合并多行，不要在一行里翻译多个编号。
4) 不要输出任何额外说明、空行、前后解释或摘要。
5) 如果某行原文是标记类内容（例如 [Music]、[Laughs]），可以根据需要翻译或保留英文，但仍然要按 "[n] ..." 的格式输出。

Your goal:
- Accurately convey the meaning of each line;
- Make the translation natural and easy to read as on-screen subtitles;
- STRICTLY obey the output format rules above.`
        },
        { role: "user", content: rawText }
      ],
      stream: false,
      max_tokens: 800,      // 控制返回长度，加快响应
      temperature: 0,       // 稳定翻译
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
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
    .replace(/</g, "&lt;")
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