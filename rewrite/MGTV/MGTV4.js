// 解析查询参数为对象
function parseQuery(url) {
    const query = {};
    const queryString = url.split('?')[1];
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            query[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }
    return query;
}

// 生成查询字符串
function generateQueryString(query) {
    return Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');
}

// 合并两个查询对象，只保留第一个地址的字段，并用第二个地址的值覆盖
function mergeQueries(baseQuery, additionalQuery) {
    const mergedQuery = {};
    // 仅保留第一个地址的字段，用第二个地址的值进行覆盖
    Object.keys(baseQuery).forEach(key => {
        if (additionalQuery[key] !== undefined) {
            mergedQuery[key] = additionalQuery[key];
        } else {
            mergedQuery[key] = baseQuery[key];
        }
    });
    return mergedQuery;
}

// 处理请求的函数
function rewriteRequest(requestUrl, baseUrl, headers) {
    // 解析第一个地址的查询参数
    const baseQuery = parseQuery(baseUrl);
    // 解析请求地址的查询参数
    const currentQuery = parseQuery(requestUrl);

    // 合并查询参数，保留第一个地址中的字段，使用请求地址中的值覆盖
    const mergedQuery = mergeQueries(baseQuery, currentQuery);

    // 提取 PLANBZP 并移除其他 Cookie 字段
    const newHeaders = { ...headers };
    const planBzP = newHeaders['Cookie'] ? newHeaders['Cookie'].split('; ').find(cookie => cookie.startsWith('PLANBZP=')) : null;
    delete newHeaders['Cookie'];
    if (planBzP) {
        newHeaders['Cookie'] = planBzP;
    }

    // 构建新的 URL
    const newUrl = requestUrl.split('?')[0] + '?' + generateQueryString(mergedQuery);

    return { url: newUrl, headers: newHeaders };
}

// 提取第一个地址（baseUrl）的查询参数
const baseUrl = 'https://mobile-stream.api.mgtv.com/v1/video/source?seekSourceType=0&keepPlay=0&enableDolphinEncrypted=0&toModuleId=14&maxSpeed=3&fileSourceType=1&suuid=7d27cdccd20fad8b5ac627c24bff8742&hdts=h265,h264&plId=0&localAbr=0&disableKeyframe=0&enableDolphinAntiLeech=0&mediaType=0&toDataType=201&jumpUrl=&platform=5&videoId=21535165&enableDolphinSDK=0&disableCelluar=0&exdef=%7B%22support%22:%221%22,%22sceen_size%22:%221170*2532%22,%22h264%22:%7B%22support%22:%221%22,%22hdr%22:%7B%22support%22:%221%22,%22max_def%22:%221920x1080%22,%22max_def_fps%22:%2260%22,%22hdr_type%22:%222%22,%22bit_depth%22:%228%22%7D,%22sdr%22:%7B%22max_def%22:%221920x1080%22,%22max_def_fps%22:%2260%22%7D%7D,%22support_wanos%22:%220%22,%22sceen_fps%22:%2260%22,%22version%22:%222%22,%22screen_hdr_type%22:%221%22,%22h265%22:%7B%22support%22:%221%22,%22hdr%22:%7B%22support%22:%221%22,%22max_def%22:%221920x1080%22,%22max_def_fps%22:%2260%22,%22hdr_type%22:%222%22,%22bit_depth%22:%2210%22%7D,%22sdr%22:%7B%22max_def%22:%221920x1080%22,%22max_def_fps%22:%2260%22%7D%7D%7D&clipId=625757&fromModuleId=14&minSpeed=0.25&uabrAwayTs=0&disableABR=0&localPlayVideoId=0&disableP2P=0&localVideoWatchTime=0&_support=10101001&abroad=0&ageMode=0&appVersion=8.0.2&ch=AppStore&device=iPhone&did=f88dff2fee2c4fbe6588f067472bb698b2786345&dname=iPhone&mac=f88dff2fee2c4fbe6588f067472bb698b2786345&osType=ios&osVersion=17.0&seqId=835355339aa51b3ac41c0a73981cd879&src=mgtv&testversion=&ticket=09C12C0C662E35479AF37E5B47D5FD5B';

// 处理请求并返回结果
const { url, headers } = rewriteRequest($request.url, baseUrl, $request.headers);
$done({ url, headers });
