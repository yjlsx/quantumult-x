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

  // B. 字幕翻译：拦截所有 timedtext 响应，直接做双语（不再依赖 subtype 标记）
  if (isSubtitle) {
    if (!boxConfig.key) {
      console.log(`⚠️ [${scriptName}] 未设置 API Key，跳过翻译`);
      return $done({});
    }

    try {
      let subtitleObj = JSON.parse($response.body);
      if (!Array.isArray(subtitleObj.events)) {
        console.log(`[${scriptName}] 字幕结构中 events 不存在或不是数组，可能不是 JSON3，跳过`);
        return $done({});
      }

      let translateList = [];
      subtitleObj.events.forEach((event, index) => {
        if (event.segs && event.segs.length > 0) {
          let text = event.segs.map(s => s.utf8).join("").trim();
          // 如果已经是双语（包含换行），可以选择跳过，这里简单判断
          if (text && text !== "\n" && !text.includes("\n")) {
            translateList.push({ index, text });
          }
        }
      });

      if (translateList.length === 0) {
        console.log(`[${scriptName}] 无可翻译的字幕片段`);
        return $done({});
      }

      console.log(`[${scriptName}] 🎬 准备翻译字幕片段数量: ${translateList.length}`);

      const rawText = translateList
        .map((item, i) => `[${i}] ${item.text}`)
        .join("\n");

      const gptRequest = {
        url: boxConfig.url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${boxConfig.key}`
        },
        body: JSON.stringify({
          model: boxConfig.model,
          messages: [
            { role: "system", content: `You are a professional subtitle translator. Translate into ${boxConfig.target_lang}. Keep index [n].` },
            { role: "user", content: rawText }
          ]
        })
      };

      $.fetch(gptRequest).then(
        response => {
          try {
            const json = JSON.parse(response.body);
            const translatedContent = json.choices?.[0]?.message?.content;
            if (!translatedContent) {
              console.log(`[${scriptName}] GPT 返回内容为空或格式异常`);
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

            console.log(`[${scriptName}] ✅ 已应用翻译片段数量: ${applied}`);
            return $done({ body: JSON.stringify(subtitleObj) });
          } catch (e) {
            console.log(`[${scriptName}] 解析 GPT 返回失败: ${e.message}`);
            return $done({});
          }
        },
        err => {
          console.log(`[${scriptName}] GPT 请求失败: ${err}`);
          return $done({});
        }
      );
    } catch (e) {
      console.log(`[${scriptName}] 字幕响应解析失败: ${e.message}`);
      return $done({});
    }
  }

  // 其他响应直接放行
  return $done({});
}

// --- [4. 环境兼容封装] ---
function Env(name) {
  return {
    getdata: key => $prefs.valueForKey(key),
    fetch: options => $task.fetch(options)
  };
}
