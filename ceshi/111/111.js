/*
[rewrite_local]
# 统一处理脚本

^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/111.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/
(function() {
    // 获取原始响应体
    const url = $request.url;
    let body = $response.body;

    try {
        let obj = JSON.parse(body);

        // 根据 URL 判断执行不同的处理逻辑
        if (url.includes("/bapi/order/creation")) {
    obj.code = 200;
}
       // 返回修改后的响应体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.error("解析 JSON 失败:", e);
        $done({ body: body });
    }
})();