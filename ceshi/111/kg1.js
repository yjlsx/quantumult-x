/*
[rewrite_local]
^https://gateway\.kugou\.com/v5/url?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

[mitm]
hostname = gateway.kugou.com
*/

const url = $request.url;
const headers = $request.headers;

if (url.includes("/v5/url?")) {
    // 解析原请求的 hash 值
    const hashMatch = url.match(/hash=([0-9a-fA-F]{32})/);
    const hash = hashMatch ? hashMatch[1] : '';
    
    // 修改请求地址
    const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
    
    // 修改请求头
    headers['x-router'] = 'm.kugou.com';
    
    $done({
        url: newUrl,
        headers: headers
    });
} else {
    // 如果不符合条件，则直接返回原响应
    $done({});
}

