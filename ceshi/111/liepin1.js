/*
[rewrite_local]
# 统一处理脚本
^https://api-pay\.liepin\.com/api/com\.liepin\.pay\.apple\.create-order url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin1.js




*
[mitm]
hostname = api-pay.liepin.com, api-wanda.liepin.com, api-c.liepin.com
*/

(function() {
    try {
        // 获取原始请求体
        let body = $request.body;
        let obj = JSON.parse(body);

        if (obj.data) {
            // 将订单金额修改为 0
            obj.data.orderMoney = 0;
            // 可选：修改订单描述，便于调试确认
            obj.data.orderDesc = "猎聘同道-增值订单(免费)";
        }

        // 返回修改后的请求体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("订单金额重写失败:", e.message);
        $done({});
    }
})();
