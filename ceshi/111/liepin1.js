/*
[rewrite_local]
# 统一处理脚本
^https://api-pay\.liepin\.com/api/com\.liepin\.pay\.apple\.create-order url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin1.js
^https:\/\/api-c\.liepin\.com\/api\/com\.liepin\.cbusi\.cashier\.pay-sign$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin1.js




*
[mitm]
hostname = api-pay.liepin.com, api-wanda.liepin.com, api-c.liepin.com
*/

(function() {
    try {
        // 获取原始请求体
        let body = $request.body;
        let obj = JSON.parse(body);
        
        // 判断请求的URL来决定重写内容
        let url = $request.url;

        if (url.includes("api-pay.liepin.com/api/com.liepin.pay.apple.create-order")) {
            // 如果是第一个地址，修改订单金额为0
            if (obj.data) {
                obj.data.orderMoney = 0;
                obj.data.orderDesc = "猎聘同道-增值订单(免费)";
            }
        } else if (url.includes("api-c.liepin.com/api/com.liepin.cbusi.cashier.pay-sign")) {
            // 如果是第二个地址，修改支付方式为1
          if (obj.body) {
                // 这里直接修改请求体中的payKind和orderDesc
                obj.body.payKind = 1;  // 修改支付方式为1
                obj.body.orderDesc = "猎聘同道-支付订单(支付方式为1)";
             }
        }

        // 返回修改后的请求体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("请求体重写失败:", e.message);
        $done({});
    }
})();

