/*
[rewrite_local]
# 请求头重写规则 - 重定向原始请求
^https:\/\/gateway\.kugou\.com\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

# 响应体重写规则 - 针对重定向后的URL（更精确的匹配）
^https:\/\/m\.kugou\.com\/app\/i\/getSongInfo\.php\?cmd=playInfo&hash=[0-9a-fA-F]{32} url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

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
    
    // 更精确地匹配重定向后URL
    if (url && url.includes("https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo")) {
        try {
            // 解析JSON响应体
            let obj = JSON.parse(body);
            
            console.log("原始响应体:", JSON.stringify(obj));
            
            // 修改关键字段 - 确保下载可用
            if ('fail_process' in obj) obj.fail_process = 0;
            if ('error' in obj) obj.error = "";
            if ('pay_type' in obj) obj.pay_type = 0;
            
            // 确保状态码正确
            if ('errcode' in obj && obj.errcode !== 0) obj.errcode = 0;
            if ('status' in obj && obj.status !== 1) obj.status = 1;
            
            // 修改特权字段 - 确保所有音质可用
            const privileges = [
                'privilege', '128privilege', '320privilege', 
                'sqprivilege', 'highprivilege'
            ];
            
            privileges.forEach(priv => {
                if (priv in obj) {
                    // 设置特权值为10（最高权限）
                    obj[priv] = 10;
                }
            });
            
            // 确保URL字段存在且有效
            if (!obj.url || obj.url === "") {
                // 尝试从backup_url获取
                if (obj.backup_url && obj.backup_url.length > 0) {
                    obj.url = obj.backup_url[0];
                }
            }
            
            console.log("修改后响应体:", JSON.stringify(obj));
            
            // 重新序列化为JSON
            body = JSON.stringify(obj);
        } catch (e) {
            console.log("JSON解析/修改失败: " + e);
        }
    }
    
    $done({ body });
}

// 默认不修改其他请求
$done({});