/**
 * @name YouTube Subtitle GPT Translator (BoxJS 版)
 * @description 结合 BoxJS 动态配置 API Key 和中转地址，实现 YouTube 双语翻译。

[rewrite_local]
^https?:\/\/[\w-]+\.googlevideo\.com\/timedtext url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/ytb_gpt.js

[mitm]
hostname = *.googlevideo.com

 */

const scriptName = "ytb字幕";
const $ = new Env(scriptName);

// --- 读取 BoxJS 配置 ---
const boxConfig = {
    url: $.getdata("ytb_gpt_api_url") || "https://api.openai.com/v1/chat/completions",
    key: $.getdata("ytb_gpt_api_key") || "",
    model: $.getdata("ytb_gpt_model") || "gpt-4o-mini",
    target_lang: $.getdata("ytb_gpt_lang") || "中文"
};

let body = $response.body;
if (!body || !boxConfig.key) {
    if (!boxConfig.key) console.log(` [${scriptName}] 未设置 API Key，跳过翻译`);
    $done({});
}

try {
    let subtitleObj = JSON.parse(body);
    let translateList = [];
    
    // 提取有效字幕
    subtitleObj.events.forEach((event, index) => {
        if (event.segs && event.segs.length > 0) {
            let fullText = event.segs.map(s => s.utf8).join("").trim();
            if (fullText && fullText !== "\n") {
                translateList.push({ index, text: fullText });
            }
        }
    });

    if (translateList.length === 0) $done({});

    const rawText = translateList.map((item, i) => `[${i}] ${item.text}`).join("\n");

    const request = {
        url: boxConfig.url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${boxConfig.key}`
        },
        timeout: 10,
        body: JSON.stringify({
            model: boxConfig.model,
            messages: [
                { role: "system", content: `You are a professional subtitle translator. Translate the following video subtitles into ${boxConfig.target_lang}. Keep the bracketed index like [0], [1]. Return only the translated text.` },
                { role: "user", content: rawText }
            ],
            temperature: 0.3
        })
    };

    console.log(` [${scriptName}] 正在使用 ${boxConfig.model} 翻译 ${translateList.length} 行文本...`);

    $.fetch(request).then(response => {
        try {
            const resData = JSON.parse(response.body);
            const translatedContent = resData.choices[0].message.content;
            const lines = translatedContent.split('\n');
            
            lines.forEach(line => {
                const match = line.match(/^\[(\d+)\]\s*(.*)/);
                if (match) {
                    const idx = parseInt(match[1]);
                    const translatedText = match[2];
                    const originalIndex = translateList[idx].index;
                    
                    if (subtitleObj.events[originalIndex].segs[0]) {
                        // 双语显示逻辑
                        subtitleObj.events[originalIndex].segs[0].utf8 += `\n${translatedText}`;
                    }
                }
            });

            console.log(` [${scriptName}] 翻译成功`);
            $done({ body: JSON.stringify(subtitleObj) });
        } catch (e) {
            console.log(` [${scriptName}] 解析失败: ${e.message}`);
            $done({});
        }
    }, reason => {
        console.log(` [${scriptName}] API 请求失败: ${reason.error}`);
        $done({});
    });

} catch (e) {
    $done({});
}

// --- 极简 Env 环境兼容封装 ---
function Env(n) {
    return {
        getdata: (k) => $prefs.valueForKey(k),
        fetch: (opt) => $task.fetch(opt),
        log: (m) => console.log(m)
    };
}
