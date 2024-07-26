/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite]
^https:\/\/gateway\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/vip\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/vipuser\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^http:\/\/login\.user\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/gateway3\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/vipos\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
*
[mitm]
hostname = gateway.kugou.com, gateway3.kugou.com, vip.kugou.com, vipuser.kygou.com, login.user.kugou.com, userinfoservice.kugou.com, vipos.kugou.com,  gatewayretry.kugou.com
*/
var body = $response.body;
body = body.replace(/"is_special_vip" : 0/g, '"is_special_vip" : 1');
body = body.replace(/("vip_end_time" : )(".*?"|)(,|})/g, '$1"2099-12-31 23:59:59"$3');
body = body.replace(/("m_end_time" : )(".*?"|)(,|})/g, '$1"2098-12-31 23:59:59"$3');

body = body.replace(/("su_vip_y_endtime" : )(".*?"|)(,|})/g, '$1"2099-11-21 23:59:59"$3');
body = body.replace(/("vip_y_endtime" : )(".*?"|)(,|})/g, '$1"2099-12-31 23:59:59"$3');
body = body.replace(/("su_vip_end_time" : )(".*?"|)(,|})/g, '$1"2099-11-21 23:59:59"$3');

body = body.replace(/("end_time" : )(".*?"|)(,|})/g, '$1"2099-12-31 23:59:59"$3');
body = body.replace(/("svip_end_time" : )(".*?"|)(,|})/g, '$1"2099-12-31 23:59:59"$3');
body = body.replace(/("su_vip_clearday" : )(".*?"|)(,|})/g, '$1"2022-03-17 09:05:55"$3');

body = body.replace(/("m_y_endtime" : )(".*?"|)(,|})/g, '$1"2099-12-31 23:59:59"$3');
body = body.replace(/("h_end_time" : )(".*?"|)(,|})/g, '$1"2022-03-17 09:05:55"$3');
body = body.replace(/("annual_fee_end_time" : )(".*?"|)(,|})/g, '$1"2022-03-17 09:05:55"$3');
body = body.replace(/("bookvip_end_time" : )(".*?"|)(,|})/g, '$1"2022-03-17 09:05:55"$3');
body = body.replace(/("is_special_vip" : )\d+|"is_special_vip" : ""/g, '$1 1');
body = body.replace(/("is_free_vip" : )\d+|"is_free_vip" : ""/g, '$1 1');
body = body.replace(/("vip_switch" : )\d+|"vip_switch" : ""/g, '$1 1');
body = body.replace(/("vip_type" : )\d+|"vip_type" : ""/g, '$1 1');
body = body.replace(/("su_vip_upgrade_days" : )\d+|"su_vip_upgrade_days" : ""/g, '$1 999999');
body = body.replace(/"h_signed" : " "/g, '"h_signed" : "ssvip"');
body = body.replace(/("svip_left_days" : )\d+|"svip_left_days" : ""/g, '$1 999999');
body = body.replace(/("t_expire_time" : )\d+|"t_expire_time" : ""/g, '$1 4102444800');
body = body.replace(/"end_time" : \d+/g, '"end_time" : 4102444800');
// 替换 vipinfo 对象内各字段的值为 1，假设字段名是唯一的且不重复
body = body.replace(/("is_vip" : )\d+/g, '$1 1');
body = body.replace(/("y_type" : )\d+/g, '$1 1');
body = body.replace(/("vip_type" : )\d+/g, '$1 4');
body = body.replace(/("m_type" : )\d+/g, '$1 1');
body = body.replace(/("svip_level" : )\d+/g, '$1 8');
body = body.replace(/("svip_score" : )\d+/g, '$1 99999');
body = body.replace(/("vip_statu" : )\d+/g, '$1 1');
body = body.replace(/("user_type" : )\d+/g, '$1 20');
body = body.replace(/("user_y_type" : )\d+/g, '$1 1');
// 修改会员到期天数
body = body.replace(/("content\":\"您的会员)(\*\*\*)(天后到期")/g, '$1 99999 $3');

// 替换空字符串情况
body = body.replace(/("vip_type" : "")/g, '"vip_type" : 6');
body = body.replace(/("m_type" : "")/g, '"m_type" : 1');
body = body.replace(/("originalPrice" : )\d+|"originalPrice" : ""/g, '$1 0');
body = body.replace(/("price_text" : )\"d+|"price_text" : ""/g, '$1 0');
body = body.replace(/"price_text" : "\d+"/g, '"price_text" : "0"');
body = body.replace(/"price" : \d+/g, '"price" : 0');

$done({body: body});

