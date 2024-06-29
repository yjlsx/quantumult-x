/* 
[rewrite_local]
^https:\\//gateway\.kugou\.com\/v6\/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/mobile\/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/v1\/fusion\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/listening\/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/ocean\/v6\/theme\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/ip\/api\/v1\/overseas\/check_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/ads\.gateway\/v2\/task_video\/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/v2\/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/updateservice\/v1\/get_dev_user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js

^https:\\//gateway\.kugou\.com\/.?urlparam.+$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^http:\/\/adserviceretry\.kglink\.cn\/v4\/mobile_splash url reject-200


[mitm]
hostname = gateway.kugou.com,
*/

// 双斜杠后的内容在js里是属于注释内容不会生效
*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
const vip = '/overseas';
const vap = '/task_video';
const get = '/get_vip_config';
const svip = '/updateservice';
const time = '/list_v2';
const ssvip = '/login_by_openplat';
const data = '/get_login_extend';
const vipinfo = '/mobile/vipinfo';
const inte = '/fusion';
const coupon = '/listening';
const prom = '/promotionvip';

if (url.indexOf(vip) != -1) {    
obj.info.is_special_vip = 1;  
obj.info.vip_switch = 1;  */一致
body = JSON.stringify(obj);
}
if (url.indexOf(vap) != -1) {    
obj.data.is_vip = 1; 
body = JSON.stringify(obj);
}
if (url.indexOf(get) != -1) {    
obj.data.multiplatform_vip_expire_prompt_myinfo_config_0 ="{\"content\":{\"content\":\"您的会员***天后到期\"},\"data\":[{\"value\":9999,\"index\":1,\"n\":1}]}"; 
body = JSON.stringify(obj);
}
if (url.indexOf(svip) != -1) {    
obj.data.list.p_grade = 20; 
obj.data.list.vipinfo.is_vip = 1;
obj.data.list.vipinfo.vip.type = 5120;
obj.data.list.vipinfo.svip.level = 20;
obj.data.list.vipinfo.svip.score = 99999;
obj.data.list.vipinfo.vip_statu = 1;       */user_type=0  user_y_type = 0
body = JSON.stringify(obj);
}
if (url.indexOf(time) != -1) {    
obj.data.list.start_time = 1672502400; 
obj.data.list.end_time = 4070880000; 
obj.data.list.type =ssvip; 
body = JSON.stringify(obj);
}
if (url.indexOf(ssvip) != -1) {    
obj.data.user_type = vip; 
obj.data.vip_end_time = 2099-03-17 09:05:55; 
obj.data.su_vip_end_time = 2099-03-17 09:05:55; 
obj.data.vip_begin_time = 2022-03-17 09:05:55;
obj.data.m_end_time = 2099-03-17 09:05:55; 
obj.data.su_vip_begin_time = 2022-03-17 09:05:55;
obj.data.su_vip_y_endtime = 2099-03-17 09:05:55;
obj.data.is_vip = 1; 
obj.data.su_vip_clearday = 4070880000; 
obj.data.vip_type = ssvip; 
body = JSON.stringify(obj);
}
if (url.indexOf(data) != -1) {    
obj.data.vipinfo.su_vip_y_endtime = 2099-03-17 09:05:55;
obj.data.vipinfo.su_vip_clearday = 4070880000; 
obj.data.vipinfo.su_vip_end_time = 2099-03-17 09:05:55; 
obj.data.vipinfo.su_vip_begin_time = 2022-03-17 09:05:55;
obj.data.vipinfo.svip_score = 99999;
obj.data.vipinfo.vip_type = ssvip; 
obj.data.vipinfo.svip_level = 20; 
body = JSON.stringify(obj);
}
if (url.indexOf(vipinfo) != -1) {   
obj.data.vip_begin_time = 2022-03-17 09:05:55;
obj.data.vip_type = ssvip;  
obj.data.vip_y_endtime = 2099-03-17 09:05:55;
obj.data.su_vip_upgrade_days = 9999;
obj.data.su_vip_begin_time = 2022-03-17 09:05:55;
obj.data.super_vip_upgrade_month = 999;
obj.data.su_vip_y_end_time = 2099-03-17 09:05:55;
obj.data.su_vip_y_endtime = 2099-03-17 09:05:55;
obj.data.vip_endtime = 2099-03-17 09:05:55; 
obj.data.svip_level = 20; 
obj.data.su_vip_clearday = 4070880000; 
obj.data.svip_score = 99999;
obj.data.is_vip = 1;
obj.data.su_vip_end_time = 2099-03-17 09:05:55; 
obj.data.m_end_time = 2099-03-17 09:05:55; 
obj.data.m_y_endtime = 2099-03-17 09:05:55; 
obj.data.vip_clearday = 4070880000; 
obj.data.m_clearday = 4070880000; 
obj.data.h_end_time = 2099-03-17 09:05:55; 
body = JSON.stringify(obj);
}
if (url.indexOf(inte) != -1) {   
obj.data.vip_integral = 99999;
obj.data.get_vip_info_v3.data.vip_type = ssvip;
obj.data.get_vip_info_v3.data.vip_y_endtime = 2099-03-17 09:05:55;
obj.data.get_vip_info_v3.data.su_vip_upgrade_days = 9999;
obj.data.get_vip_info_v3.data.su_vip_upgrade_month = 999;
obj.data.get_vip_info_v3.data.h_end_time = 2099-03-17 09:05:55; 
obj.data.get_vip_info_v3.data.vip_end_time = 2099-03-17 09:05:55; 
obj.data.get_vip_info_v3.data.svip99 = 1;
obj.data.get_vip_info_v3.data.svip_level = 20; 
obj.data.get_vip_info_v3.data.su_vip_clearday = 4070880000; 
obj.data.get_vip_info_v3.data.m_y_endtime = 2099-03-17 09:05:55; 
obj.data.get_vip_info_v3.data.svip7free = 1
obj.data.get_vip_info_v3.data.svip_score = 99999;
obj.data.get_vip_info_v3.data.is_vip = 1;
obj.data.get_vip_info_v3.data.su_vip_end_time = 2099-03-17 09:05:55; 
obj.data.get_vip_info_v3.data.m_end_time = 2099-03-17 09:05:55; 
obj.data.get_vip_info_v3.data.vip_clearday = 4070880000; 
body = JSON.stringify(obj);
}
if (url.indexOf(coupon) != -1) {    
obj.data.gift_card_cnt = 1; 
obj.data.super_welfare = 1;
obj.data.super_welfare_v2_cnt = 1;
obj.data.download_cnt = 1;   
obj.data.hw_coupon_cnt = 1;
obj.data.mp3_download_cnt = 1;
obj.data.mcoupon_cnt = 1;
obj.data.vip_coupon_cnt = 1;
body = JSON.stringify(obj);
}
if (url.indexOf(prom) != -1) {    
obj.data.grade = 99; 

body = JSON.stringify(obj);
}
$done({body});

