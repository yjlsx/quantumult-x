/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版)
 * @description 结合 BoxJS 动态配置 API Key 和中转地址，实现 YTb 双语翻译。

[rewrite_local]
^https?:\/\/[\w-]+\.youtube\.com\/youtubei\/v1\/player url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
^https?:\/\/((www|m)\.youtube\.com|[\w-]+\.googlevideo\.com)\/api\/timedtext url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/ytb_gpt.js
 

[mitm]
hostname = www.youtube.com, m.youtube.com, *.googlevideo.com, youtubei.googleapis.com

 */


const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- 1. 读取 BoxJS 配置 ---
const boxConfig = {
    url: $.getdata("ytb_gpt_api_url") || "https://api.openai.com/v1/chat/completions",
    key: $.getdata("ytb_gpt_api_key") || "",
    model: $.getdata("ytb_gpt_model") || "gpt-5.1",
    target_lang: $.getdata("ytb_gpt_lang") || "中文"
};

const url = $request.url;
const isPlayer = url.includes("/youtubei/v1/player");
const isSubtitle = url.includes("/api/timedtext");

// --- 2. 核心逻辑：诱导激活 (借鉴 DualSubs) ---
if (isPlayer) {
    let body = $response.body;
    if (body) {
        try {
            let obj = JSON.parse(body);
            if (obj.captions?.playerCaptionsTracklistRenderer) {
                console.log(`[${scriptName}] 🔍 发现字幕列表，正在诱导激活...`);
                // 强行开启所有轨道的翻译开关
                obj.captions.playerCaptionsTracklistRenderer.captionTracks.forEach(track => {
                    track.isTranslatable = true;
                });
                // 注入默认翻译语言
                if (!obj.captions.playerCaptionsTracklistRenderer.translationLanguages) {
                    obj.captions.playerCaptionsTracklistRenderer.translationLanguages = [
                        { languageCode: "zh-Hans", languageName: { runs: [{ text: "中文（凉心翻译）" }] } }
                    ];
                }
            }
            $done({ body: JSON.stringify(obj) });
        } catch (e) {
            console.log(`[${scriptName}] Player 激活失败 (可能是 Protobuf 格式): ${e.message}`);
            $done({});
        }
    } else { $done({}); }
}

// --- 3. 核心逻辑：GPT 翻译 ---
else if (isSubtitle) {
    if (!boxConfig.key) {
        console.log(`⚠️ [${scriptName}] 未设置 API Key，跳过翻译`);
        $done({});
    }

    let body = $response.body;
    try {
        let subtitleObj = JSON.parse(body);
        let translateList = [];
        
        subtitleObj.events.forEach((event, index) => {
            if (event.segs && event.segs.length > 0) {
                let fullText = event.segs.map(s => s.utf8).join("").trim();
                if (fullText && fullText !== "\n") translateList.push({ index, text: fullText });
            }
        });

        if (translateList.length === 0) $done({});

        const rawText = translateList.map((item, i) => `[${i}] ${item.text}`).join("\n");

        const request = {
            url: boxConfig.url,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${boxConfig.key}` },
            body: JSON.stringify({
                model: boxConfig.model,
                messages: [
                    { role: "system", content: `You are a professional subtitle translator. Translate into ${boxConfig.target_lang}. Keep index [n].` },
                    { role: "user", content: rawText }
                ]
            })
        };

        $.fetch(request).then(response => {
            try {
                const translatedContent = JSON.parse(response.body).choices[0].message.content;
                const lines = translatedContent.split('\n');
                lines.forEach(line => {
                    const match = line.match(/^\[(\d+)\]\s*(.*)/);
                    if (match) {
                        const idx = parseInt(match[1]);
                        const originalIndex = translateList[idx].index;
                        // 双语拼接
                        subtitleObj.events[originalIndex].segs[0].utf8 += `\n${match[2]}`;
                    }
                });
                $done({ body: JSON.stringify(subtitleObj) });
            } catch (e) { $done({}); }
        }, () => $done({}));
    } catch (e) { $done({}); }
} else { $done({}); }

// --- Env 兼容层 ---
function Env(n){return{getdata:(k)=>$prefs.valueForKey(k),fetch:(o)=>$task.fetch(o)}}