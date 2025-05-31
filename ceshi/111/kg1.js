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

// 处理 /v5/url 和 /tracker/v5/url 请求
if (url.includes("/v5/url?") || url.includes("/tracker/v5/url?")) {
    // 提取 hash 参数
    const hashMatch = url.match(/hash=([0-9a-fA-F]{32})/);
    const hash = hashMatch ? hashMatch[1] : '';
    
    if (hash) {
        const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
        headers['x-router'] = 'm.kugou.com';
        
        $done({
            url: newUrl,
            headers: headers
        });
    } else {
        $done({});
    }
    return;
}

// 处理 /vipcenter/ios 请求
if (url.includes("/vipcenter/ios")) {
    // 获取原请求头
    const originalHeaders = $request.headers;
    
    // 只修改必要的头信息
    const newHeaders = {
        ...originalHeaders,  // 保留所有原请求头
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'http://openplat-user.kugou.com/'
    };
    
    $done({
        headers: newHeaders
    });
    return;
}

// 默认不修改其他请求
$done({});