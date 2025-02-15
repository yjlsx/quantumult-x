/*
[rewrite_local]
^https://gateway\.kugou\.com/v5/url?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios  url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
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
    // 获取原请求头
    const originalHeaders = $request.headers;

    // 修改请求头（保留原 Cookie）
    const newHeaders = {
        'Cookie' : originalHeaders['Cookie'],  // 保留原 Cookie
        'Accept' : `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Connection' : `keep-alive`,
        'Sec-Fetch-Mode' : `navigate`,
        'Host' : `gateway.kugou.com`,
        'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,
        'Sec-Fetch-Site' : `same-origin`,
        'Referer' : `http://openplat-user.kugou.com/`,
        'Sec-Fetch-Dest' : `document`,
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`  // 修复了这个问题
    };

    // 返回修改后的请求头
    $done({
        headers: newHeaders
    });
}

// 最后的默认响应（没有任何特定条件时返回空对象）
if (true) {
    $done({});
}
