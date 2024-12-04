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

    // 修改请求地址
    const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;

    // 修改请求头
    headers['x-router'] = 'm.kugou.com';

    // 返回修改后的请求
    $done({
        url: newUrl,
        headers: headers
    });
}

// 判断是否为 `gateway.kugou.com/vipcenter/ios` 请求
if (url.includes('gateway.kugou.com/vipcenter/ios')) {
    // 修改请求头中的 User-Agent
    headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
    headers['Accept-Encoding'] = 'gzip, deflate, br';

    $done({
        headers: headers
    });
}

if (true) {
    $done({});
}
