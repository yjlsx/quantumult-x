/* 
[rewrite_local]
^https:\\//gateway\.kugou\.com\/v6\/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
[mitm]
hostname = gateway.kugou.com,
*/

// 双斜杠后的内容在js里是属于注释内容不会生效
var body = $response.body; // 声明一个变量body并以响应消息体赋值
var obj = JSON.parse(body); // JSON.parse()将json形式的body转变成对象处理
var user = {};
obj.is_vip = 1
obj.user_y_type = 512
obj.vip_begin_time = 2022-03-17 09:05:55
obj.vip_end_time = 2099-03-17 09:05:55
obj.m_end_time = 2099-03-17 09:05:55
obj.vip_type = 5120
obj.su_vip_begin_time = 2022-03-17 09:05:55
obj.su_vip_end_time = 2099-03-17 09:05:55
obj.su_vip_y_endtime = 2099-03-17 09:05:55
obj.m_begin_time = 2022-03-17 09:05:55


body = JSON.stringify(obj); // 重新打包回json字符串$done(body); // 结束修改

$done(body); // 结束修改
