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
body = body.replace(/"su_vip_y_endtime" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"su_vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"su_vip_y_endtime" : ""/g, '"su_vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_y_endtime" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_y_endtime" : ""/g, '"vip_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_endtime" :"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"vip_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_endtime" : ""/g, '"vip_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_end_time" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"vip_end_time" : ""/g, '"vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"end_time" : ""/g, '"end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"svip_end_time" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"svip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"svip_end_time" : ""/g, '"svip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"su_vip_clearday" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"su_vip_clearday" : "2022-03-17 09:05:55"');
body = body.replace(/"su_vip_clearday" : ""/g, '"su_vip_clearday" : "2022-03-17 09:05:55"');
body = body.replace(/"su_vip_end_time" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"su_vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"su_vip_end_time" : ""/g, '"su_vip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"m_y_endtime" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"m_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"m_y_endtime" : ""/g, '"m_y_endtime" : "2099-03-17 09:05:55"');
body = body.replace(/"m_end_time" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"m_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"m_end_time" : ""/g, '"m_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"h_end_time" : "\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"/g, '"h_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"h_end_time" : ""/g, '"h_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"annual_fee_end_time" : ""/g, '"annual_fee_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"bookvip_end_time" : ""/g, '"bookvip_end_time" : "2099-03-17 09:05:55"');
body = body.replace(/"is_special_vip" : \d+/g, '"is_special_vip" : 1');
body = body.replace(/"is_free_vip" : \d+/g, '"is_free_vip" : 1');
body = body.replace(/"is_vip" : \d+/g, '"is_vip" : 1');
body = body.replace(/"is_svip" : \d+/g, '"is_svip" : 1');
body = body.replace(/"vip_switch" : \d+/g, '"vip_switch" : 1');
body = body.replace(/"h_signed" : " "/g, '"h_signed" : "ssvip"');
body = body.replace(/"vip_type" : \d+/g, '"vip_type" : 1');
body = body.replace(/"vip_type" : ""/g, '"vip_type" : 1');
body = body.replace(/"svip_score" : \d+/g, '"svip_score": 999999');
body = body.replace(/"svip_level" : \d+/g, '"svip_level": 9');
body = body.replace(/"su_vip_upgrade_days" : \d+/g, '"su_vip_upgrade_days": 99999');
body = body.replace(/"y_type" : \d+/g, '"y_type" : 1');
body = body.replace(/"m_type" : \d+/g, '"m_type" : 1');
body = body.replace(/"user_type" : \d+/g, '"user_type" : 1');
body = body.replace(/"svip_level" : \d+/g, '"svip_level" : 9');
body = body.replace(/"vip_statu" : \d+/g, '"vip_statu" : 1');
body = body.replace(/"svip_level" : \d+/g, '"svip_level" : 9');
body = body.replace(/"svip_left_days" : \d+/g, '"svip_left_days" : 99999');
body = body.replace(/"t_expire_time" : \d+/g, '"t_expire_time" : 4102444800');



$done({body: body});

