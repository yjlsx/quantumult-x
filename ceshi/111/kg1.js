/*
[rewrite_local]
^https://gateway\.kugou\.com/v5/url?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios\?tab=superVip  url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
[mitm]
hostname = gateway.kugou.com
*/

const url = $request.url;
const headers = $request.headers;

if (url.includes("/v5/url?")) {
    // 提取 hash 参数
    const hashMatch = url.match(/hash=([0-9a-fA-F]{32})/);
    const hash = hashMatch ? hashMatch[1] : '';

    const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
    headers['x-router'] = 'm.kugou.com';

    // 返回修改后的请求
    $done({
        url: newUrl,
        headers: headers
    });
}

// 判断是否为 `gateway.kugou.com/vipcenter/ios` 请求
if (url.includes("/vipcenter/ios?is_new_song=0")) {
    // 只保留基地址
    const newUrl = "https://gateway.kugou.com/vipcenter/ios";

    // 返回修改后的 URL
    $done({
        url: newUrl
    });
}


if (true) {
    $done({});
}
