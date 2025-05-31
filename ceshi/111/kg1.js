/*
[rewrite_local]
^https:\/\/gateway\.kugou\.com\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

[mitm]
hostname = gateway.kugou.com, m.kugou.com
*/

const url = $request.url;
const headers = $request.headers;

console.log("🧭 当前请求 URL：" + url);

// 处理 /v5/url 和 /tracker/v5/url 请求重写
if (url.includes("/v5/url?") || url.includes("/tracker/v5/url?")) {
    const hashMatch = url.match(/hash=([0-9a-fA-F]{32})/);
    const hash = hashMatch ? hashMatch[1] : '';

    console.log("🔍 检测 hash 参数：" + (hash || "未找到"));

    if (hash) {
        const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
        headers['x-router'] = 'm.kugou.com';

        console.log("✅ 请求重写成功！");
        console.log("🎯 新 URL：" + newUrl);

        $done({
            url: newUrl,
            headers: headers
        });
    } else {
        console.log("❌ 未检测到合法 hash，跳过重写。");
        $done({});
    }
    return;
}

// 处理 /vipcenter/ios 请求头修改
if (url.includes("/vipcenter/ios")) {
    console.log("🧾 命中 VIPCenter 请求头重写逻辑");

    const originalHeaders = $request.headers;
    const newHeaders = {
        ...originalHeaders,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'http://openplat-user.kugou.com/'
    };

    console.log("✅ VIPCenter 请求头修改成功");
    $done({ headers: newHeaders });
    return;
}

// 未命中重写逻辑
console.log("ℹ️ 非目标请求，无需处理");
$done({});
