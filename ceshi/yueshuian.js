/**
*
[rewrite_local]
^https://iosapi\.yueshuian\.com//front/customer/findById\.json url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/yueshuian.js

*
[mitm]
hostname = iosapi.yueshuian.com

*/
let obj = JSON.parse($response.body);

if (obj && obj.data) {
    obj.data.isVip = true;
    obj.data.vipMonth = 9999;
    obj.data.gold = 999999;
    obj.data.vipDueDate = 4102415999000; // 设置为2099-12-31的时间戳
    obj.data.vipDueDateStr = "2099-12-31"; // 设置为2099-12-31的日期字符串
}

$done({body: JSON.stringify(obj)});
