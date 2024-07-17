/**
[rewrite_local]
# 统一处理脚本
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/queryApp url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_classDetail_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_myMessage\?clientId= url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/my_moneybag url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
*
[mitm]
hostname = proxyweb.yiwenjy.com

*/

const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 根据 URL 判断执行不同的处理逻辑
if (url.includes("/yiwen_mobile/queryApp") || url.includes("/yiwen_mobile/query_classDetail_info")) {
    // 对应 queryApp 和 query_classDetail_info 的处理逻辑
    if (obj.msg === "查询成功" && obj.data) {
        body = body.replace(/("tryBuy"\s*:\s*)\d+/g, '$12');
        body = body.replace(/("leven"\s*:\s*)\d+/g, '$10');
        body = body.replace(/("isLook"\s*:\s*)\d+/g, '$11');
        body = body.replace(/("type"\s*:\s*)\d+/g, '$11');
    }
} 

if (url.includes("/yiwen_mobile/query_myMessage")) {
    // 对应 query_myMessage 的处理逻辑
    if (obj.data && obj.data.coin !== undefined && obj.data.integral !== undefined) {
        obj.data.coin = 999999;
        obj.data.integral = 999999;
    }
}

if (url.indexOf("my_moneybag") !== -1) {
    // 修改我的钱包 balance 和 code 字段的值
    obj.data.balance = 999999;  // 修改为你想要的 balance 值
    obj.coin = 999999;  // 修改为你想要的 coin 值
}

$done({ body: JSON.stringify(obj) });



