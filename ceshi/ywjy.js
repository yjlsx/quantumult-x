
/**
 * App : 弈文教育
 * By @yjlsx
 * 脚本功能：vip题库全部购买，可免费刷题；无限金币和积分（纯属娱乐），可以免费用金币购买，但刷新后会失效！
 * 使用方法：添加相关规则到quantumult x，进入首页的金币主页，提示获取cookie成功，把rewrite和hostname关闭，以免每次运行都会获取cookie.
 * Date: 2024.07.19
 * 此脚本仅个人使用，请勿用于非法途径！
 
*⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

[rewrite_local]
# 统一处理脚本
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/queryApp url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_classDetail_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_myMessage url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/my_moneybag url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/ioscoin_buy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_useCoupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb\.yiwenjy\.com/yiwen_mobile/query_myOrder url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb.\yiwenjy\.com/yiwen_mobile/queryAppProductDetail url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb.\yiwenjy\.com/yiwen_mobile/queryAppProductList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js
^https://proxyweb.\yiwenjy\.com/yiwen_mobile/qeuryAppSubjectList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js

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


if (url.indexOf("/yiwen_mobile/qeuryAppSubjectList") !== -1) {
    obj.msg = "成功";
    obj.code = 0;
}

if (url.indexOf("/yiwen_mobile/query_useCoupon") !== -1) {
    obj.data.account = 999999;
    obj.data.coin = 999999;
}

// 根据 订单修改
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
            item.hasBuy = 2;
            item.hasAuth = true;
            item.endTimeMonth = 99999;
    }
  }
}

 $done({ body: JSON.stringify(obj) })





