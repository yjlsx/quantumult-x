// 假设在 rewrite 规则中已经获取了 URL 请求中的 query 参数对象和 headers 对象
let query = $request.query || {};
let headers = $request.headers || {};

// 检查请求的 URL 是否为目标地址
if ($request.url.indexOf('https://mobile-stream.api.mgtv.com/v1/video/source') !== -1) {

    // 定义需要保留的查询参数和默认值
    const requiredParams = {
        'seekSourceType': '0',
        'keepPlay': '0',
        'enableDolphinEncrypted': '0',
        'maxSpeed': '3',
        'fileSourceType': '1',
        'disableCelluar': '0',
        'disableP2P': '0',
        'disableKeyframe': '0',
        'enableDolphinAntiLeech': '0',
        'enableDolphinSDK': '0',
        'localAbr': '0',
        'toDataType': '201',
        'toModuleId': '14',
        'mediaType': '0',
        'plId': '0'
        // 添加任何其他默认值或固定值参数
    };

    // 定义排序顺序
    const paramOrder = [
        'seekSourceType', 'keepPlay', 'enableDolphinEncrypted', 'maxSpeed', 'fileSourceType', 
        'disableCelluar', 'disableP2P', 'disableKeyframe', 'enableDolphinAntiLeech', 'enableDolphinSDK', 
        'localAbr', 'toDataType', 'toModuleId', 'mediaType', 'plId'
        // 添加需要的其他参数，如果有的话
    ];

    // 删除不需要的查询参数
    for (let param in query) {
        if (!(param in requiredParams)) {
            delete query[param];
        }
    }

    // 添加或更新查询参数
    paramOrder.forEach(param => {
        if (!(param in query)) {
            query[param] = requiredParams[param];
        }
    });

    // 处理 Cookie
    let cookies = headers['Cookie'] || '';
    // 只保留 PLANBZP 字段
    let newCookie = cookies.split(';').filter(cookie => cookie.trim().startsWith('PLANBZP=')).join('; ').trim();
    headers['Cookie'] = newCookie;

    // 构建新的 URL
    const newUrl = $request.url.split('?')[0] + '?' + paramOrder.map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');

    // 返回新的重写请求
    $done({url: newUrl, headers: headers});
}
