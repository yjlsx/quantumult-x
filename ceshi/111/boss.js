/*
[rewrite_local]
# 统一处理脚本
^https://m\.zhipin\.com/wapi/zpitem/geek/vip/privilegeV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/boss.js

*
[mitm]
hostname = m.zhipin.com
*/



(function() {
    // 获取原始响应体和请求 URL
    const url = $request.url;
    let body = $response.body;

    try {
        let obj = JSON.parse(body);

        // 处理特定 URL 的响应体
        if (url.includes("https://m.zhipin.com/wapi/zpitem/geek/vip/privilegeV2?source=1")) {
            function modifyPrices(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(item => modifyPrices(item));
                } else if (typeof obj === "object") {
                    for (let key in obj) {
                        if (key === "price" || key === "originprice") {
                            obj[key] = 0;
                        } else {
                            modifyPrices(obj[key]);
                        }
                    }
                }
            }
            
            modifyPrices(obj);
        }

        // 返回修改后的响应体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({ body: body });
    }
})();
