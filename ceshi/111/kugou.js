/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite]
^https:\/\/gateway\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/vip\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/vipuser\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^http:\/\/login\.user\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/gateway3\.kugou\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
*
[mitm]
hostname = gateway.kugou.com, gateway3.kugou.com, vip.kugou.com, vipuser.kygou.com, login.user.kugou.com, userinfoservice.kugou.com
*/
var body = $response.body;
body = body.replace(/"is_special_vip" : 0/g, '"is_special_vip" : 1');
body = body.replace(/"su_vip_y_endtime" : \d+/g, '"su_vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_y_endtime" : \d+/g, '"vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_endtime" : \d+/g, '"vip_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_end_time" : \d+/g, '"vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"svip_end_time" : \d+/g, '"svip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"su_vip_clearday" : \d+/g, '"su_vip_clearday" : "2022-03-17 09:05:55"');
body = body.replace(/"su_vip_end_time" : \d+/g, '"su_vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"m_y_endtime" : \d+/g, '"m_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"m_end_time" : \d+/g, '"m_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"h_end_time" : \d+/g, '"h_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"annual_fee_end_time" : \d+/g, '"annual_fee_end_time" : "2099-03-17 09:05:55"');

body = body.replace(/"bookvip_end_time" : \d+/g, '"bookvip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"is_special_vip" : 0/g, '"is_special_vip" : 1');
body = body.replace(/"is_free_vip" : 0/g, '"is_free_vip" : 1');
body = body.replace(/"is_vip" : 0/g, '"is_vip" : 1');
body = body.replace(/"is_svip" : 0/g, '"is_svip" : 1');
body = body.replace(/"vip_switch" : 0/g, '"vip_switch" : 1');
body = body.replace(/"h_signed" : " "/g, '"h_signed" : "ssvip"');
body = body.replace(/"vip_type" : 0/g, '"vip_type" : 1');
body = body.replace(/"svip_score" : \d+/g, '"svip_score": 999999');
body = body.replace(/"svip_level" : \d+/g, '"svip_level": 9');
body = body.replace(/"su_vip_upgrade_days" : \d+/g, '"su_vip_upgrade_days": 99999');
body = body.replace(/"y_type" : 0/g, '"y_type" : 1');
body = body.replace(/"m_type" : 0/g, '"m_type" : 1');
body = body.replace(/"user_type" : 0/g, '"user_type" : 1');
body = body.replace(/"svip_level" : \d+/g, '"svip_level" : 9');
body = body.replace(/"vip_statu" : 0/g, '"vip_statu" : 1');
body = body.replace(/"svip_level" : \d+/g, '"svip_level" : 9');
body = body.replace(/"svip_left_days" : \d+/g, '"svip_left_days" : 99999');
body = body.replace(/"t_expire_time" : \d+/g, '"t_expire_time" : 4102444800');



$done({body: body});

