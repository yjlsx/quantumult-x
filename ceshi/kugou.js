/* 
[rewrite_local]
^https:\\//gateway\.kugou\.com\/v6\/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/mobile\/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/v1\/fusion\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/listening\/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/ocean\/v6\/theme\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js

[mitm]
hostname = gateway.kugou.com,
*/

// 双斜杠后的内容在js里是属于注释内容不会生效
var body = $response.body; // 声明一个变量body并以响应消息体赋值
var obj = JSON.parse(body); // JSON.parse()将json形式的body转变成对象处理
var user = {};
obj.is_vip = 1;
obj.user_y_type = 512;
obj.vip_begin_time = 2022-03-17 09:05:55;
obj.vip_end_time = 2099-03-17 09:05:55;
obj.m_end_time = 2099-03-17 09:05:55;
obj.vip_type = 5120;
obj.svip_level = 9;
obj.su_vip_begin_time = 2022-03-17 09:05:55;
obj.su_vip_end_time = 2099-03-17 09:05:55;
obj.su_vip_y_endtime = 2099-03-17 09:05:55;
obj.m_begin_time = 2022-03-17 09:05:55;
obj.su_vip_clearday = 9999;
obj.autoVipType = 5120;
obj.svip7free = 1;

body = JSON.stringify(obj); // 重新打包回json字符串$done(body); // 结束修改

if ($request.url.indexOf("\/v6\/login_by_openplat") != -1) {
// 判断请求路径存在则调用函数re()调试该路径下的响应体  
  re('gift_card_cnt@listening_coupon_cnt@super_welfare@super_welfare_v2_cnt@download_cnt@hw_coupon_cnt@mp3_download_cnt@mcoupon_cnt@vip_coupon_cnt', '"gift_card_cnt" : 1@"listening_coupon_cnt" :1@"super_welfare" :1@"super_welfare_v2_cnt" ： 1@"download_cnt" : 1@"hw_coupon_cnt" : 1@"mp3_download_cnt" : 1@"mcoupon_cnt" : 1@"vip_coupon_cnt" : 1') 
// 匹配里若需用到正则的反斜杠语句像\d+、\w+时请用双反斜杆\\d+、\\w+
}
if ($request.url.indexOf("\/listening\/coupon_package") != -1) {
  re('gift_card_cnt@listening_coupon_cnt@super_welfare@super_welfare_v2_cnt@download_cnt@hw_coupon_cnt@mp3_download_cnt@mcoupon_cnt@vip_coupon_cnt', '"gift_card_cnt" : 1@"listening_coupon_cnt" :1@"super_welfare" :1@"super_welfare_v2_cnt" ： 1@"download_cnt" : 1@"hw_coupon_cnt" : 1@"mp3_download_cnt" : 1@"mcoupon_cnt" : 1@"vip_coupon_cnt" : 1') 
}
if ($request.url.indexOf("\/v1\/fusion\/userinfo") != -1) {
  re('gift_card_cnt@listening_coupon_cnt@super_welfare@super_welfare_v2_cnt@download_cnt@hw_coupon_cnt@mp3_download_cnt@mcoupon_cnt@vip_coupon_cnt', '"gift_card_cnt" : 1@"listening_coupon_cnt" :1@"super_welfare" :1@"super_welfare_v2_cnt" ： 1@"download_cnt" : 1@"hw_coupon_cnt" : 1@"mp3_download_cnt" : 1@"mcoupon_cnt" : 1@"vip_coupon_cnt" : 1') 
}
if ($request.url.indexOf("\/ocean\/v6\/theme\/list") != -1) {
  re('"free_end_time"', '"free_end_time" : 4070880000') 
}
function re() { 
 var body = $response.body; 
  if (arguments[0].includes("@")) {  
  var regs = arguments[0].split("@");  
  var strs = arguments[1].split("@");  
  for (i = 0;i < regs.length;i++) {   
   var reg = new RegExp(regs[i],"g");   
  body = body.replace(reg, strs[i]); 
    }
 } 
   else {  
       var reg = new RegExp(arguments[0],"g");  
       body = body.replace(reg, arguments[1]);
} 

$done(body);
} // 结束修改
