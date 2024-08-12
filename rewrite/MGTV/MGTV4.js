// 假设在 rewrite 规则中已经获取了 URL 请求中的 query 参数对象和 headers 对象
let query = $request.query || {};
let headers = $request.headers || {};

// 检查请求的 URL 是否为目标地址
if ($request.url.indexOf('https://mobile-stream.api.mgtv.com/v1/video/source') !== -1) {

    // 第一步：删除不需要的 query 参数
    delete query['pvod'];
    delete query['drmcp'];
    delete query['sdrm'];
    delete query['ignorePreviewAndOthers'];
    delete query['exdef']; // 移除 exdef 参数

    // 第二步：添加或修改 query 参数
    query['seekSourceType'] = '0';
    query['keepPlay'] = '0';
    query['enableDolphinEncrypted'] = '0';
    query['maxSpeed'] = '3';
    query['fileSourceType'] = '1';
    query['disableCelluar'] = '0';
    query['disableP2P'] = '0';
    query['disableKeyframe'] = '0';
    query['enableDolphinAntiLeech'] = '0';
    query['enableDolphinSDK'] = '0';
    query['localAbr'] = '0';
    query['toDataType'] = '201';
    query['toModuleId'] = '14';
    query['mediaType'] = '0';
    query['plId'] = '0';

    // 处理 Cookie
    let cookies = headers['Cookie'] || '';
    // 只保留 PLANBZP 字段
    let newCookie = cookies.split(';').filter(cookie => cookie.trim().startsWith('PLANBZP=')).join('; ').trim();
    headers['Cookie'] = newCookie;

    // 构建新的 URL
    const newUrl = $request.url.split('?')[0] + '?' + Object.keys(query).map(key => key + '=' + encodeURIComponent(query[key])).join('&');

    // 返回新的重写请求
    $done({url: newUrl, headers: headers});
}
