/**
[rewrite_local]
# 统一处理脚本
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/queryApp url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_classDetail_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_myMessage url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/my_moneybag url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/ioscoin_buy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_useCoupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/queryAppSubjectMenu\?pageNum=1&pageSize=20 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/data.json
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_myOrder url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb.\yiwenjy\.com/yiwen_mobile/queryAppProductDetail url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb.\yiwenjy\.com/yiwen_mobile/queryAppProductList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
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
        body = body.replace(/("tryBuy"\s*:\s*)\d+/g, '2');
        body = body.replace(/("leven"\s*:\s*)\d+/g, '0');
        body = body.replace(/("isLook"\s*:\s*)\d+/g, '1');
        body = body.replace(/("type"\s*:\s*)\d+/g, '1');
        body = body.replace(/("hasBuy"\s*:\s*)\d+/g, '2');
        body = body.replace(/("endTimeMonth"\s*:\s*)\d+/g, '99');
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
    obj.data.coin = 999999;  // 修改为你想要的 coin 值
}

if (url.indexOf("/yiwen_mobile/ioscoin_buy") !== -1) {
    obj.msg = "成功";
    obj.code = 0;
} 
if (url.indexOf("/yiwen_mobile/query_useCoupon") !== -1) {
    obj.data.account = 999999;
    obj.data.coin = 999999;
}

// 根据 URL 判断执行不同的处理逻辑
if (url.includes("/yiwen_mobile/query_myOrder")) {
    // 检查响应体中的data字段是否存在
    if (obj && obj.data && obj.data.list) {
        for (let order of obj.data.list) {
            order.status = 2;
            order.sourceType = 2;
            for (let detail of order.orderDetails) {
                detail.goodStatus = 2;
            }
        }
    }
}

if (url.includes("/yiwen_mobile/queryAppProductDetail")) {
    // 检查响应体中的data字段是否存在
    if (obj && obj.msg === "查询成功" && obj.data) {
        // 修改响应体中的数据
        obj.data.hasBuy = 2;
        obj.data.hasAuth = true;
        obj.data.downAuth = 1;
        obj.data.endTime = "2099-12-31";
        obj.data.endTimeMonth = 999999;
   }
}

if (url.includes("/yiwen_mobile/queryAppProductList")) {
    if (obj && obj.data && obj.data.list && Array.isArray(obj.data.list)) {
       for (let item of obj.data.list) {
        if (item.hasBuy === 1) {
            item.hasBuy = 2;
            item.hasAuth = true;
            item.endTimeMonth = 99999;
        }
    }
  }
}

 $done({ body: JSON.stringify(obj) })





