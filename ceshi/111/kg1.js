/*
[rewrite_local]
# 请求头重写规则 - 重定向原始请求
^https:\/\/gateway\.kugou\.com\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

# 响应体重写规则 - 针对重定向后的URL
^https:\/\/m\.kugou\.com\/app\/i\/getSongInfo\.php\?cmd=playInfo&hash=([0-9a-fA-F]{32}) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

[mitm]
hostname = gateway.kugou.com, m.kugou.com
*/

// ====== 请求处理部分 ======
if (typeof $request !== 'undefined') {
    const url = $request.url;
    const headers = $request.headers;

    // 处理 /v5/url 和 /tracker/v5/url 请求 - 重定向到新URL
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
            ...originalHeaders,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            'Referer': 'http://openplat-user.kugou.com/'
        };
        
        $done({
            headers: newHeaders
        });
        return;
    }
}

// ====== 响应处理部分 ======
if (typeof $response !== 'undefined') {
    let body = $response.body;
    const url = $request.url; // 获取当前请求的URL
    
    // 只处理重定向后URL的响应体
    if (url.includes("https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo")) {
        try {
            // 解析JSON响应体
            const obj = JSON.parse(body);
            
            // 修改关键字段
            if (obj.hasOwnProperty('fail_process')) {
                obj.fail_process = 0; // 设置为0表示成功
            }
            
            if (obj.hasOwnProperty('error')) {
                obj.error = ""; // 清空错误信息
            }
            
            // 确保状态码正确
            if (obj.errcode !== undefined && obj.errcode !== 0) {
                obj.errcode = 0;
            }
            
            if (obj.status !== undefined && obj.status !== 1) {
                obj.status = 1; // 设置为成功状态
            }
            
            // 重新序列化为JSON
            body = JSON.stringify(obj);
        } catch (e) {
            console.log("JSON解析失败，不修改响应体");
        }
    }
    
    $done({ body });
}

// 默认不修改其他请求
$done({});