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
^https:\\//gateway\.kugou\.com\/ads\.gateway\/v5\/task_video\/qualification url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/userinfoservice\/v2\/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/.?urlparam.+$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^http:\/\/adserviceretry\.kglink\.cn\/v4\/mobile_splash url reject-200
^https:\\//welfare\.kugou\.com\/diy\/v1\/get_official_theme url script-analyze-echo-response https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/theme.json
^https:\\//gateway\.kugou\.com\/v5\/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway\.kugou\.com\/tools\.mobile\/api\/v2\/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js

^http:\\//dynamicentry\.kugou\.com\/api\/v1\/entry\/index url reject-dict
^https:\\//gateway\.kugou\.com\/adp\/ad\/v1\/home_combine url reject-dict

[mitm]
hostname = gateway.kugou.com, dynamicentry.kugou.com
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
const ads = '/v5/task_video';
const user = '/get_login_extend_info';     //path
const token = '/login_by_token';
const path1 = '/tools';

if (url.indexOf(user) != -1) {   
obj.data.ads = { };
obj.data.vipinfo.su_vip_y_endtime = "2099-03-17 09:05:55"; 
obj.data.vipinfo.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.vipinfo.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55"; 
obj.data.vipinfo.svip_score = 999999; 
obj.data.vipinfo.vip_type = 0; 
obj.data.vipinfo.svip_level = 20;    
body = JSON.stringify(obj);
}
 if (url.indexOf(ads) != -1) {   
   obj.data.ads = [ ];
   obj.data.ad_show_freq = [ ]; //去广告
   obj.data.is_free_vip = 1;  
   obj.data.free_mode_user = 0;  
   obj.data.user_conf.is_auto_open_fm = 1;  //???
    for (let task  of obj.data.tasks_info){
          task.used_times = task.total_number;
       }  
   body = JSON.stringify(obj);
  }
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
obj.data.multiplatform_vip_text_vip_link_vipexpire = "[\"豪华VIP会员\"]";
obj.data.multiplatform_navigation_vip_text_ssvip_overdue = "[\"超级VIP会员\"]";
obj.data.multiplatform_vip_text_vip_link_musicexpire = "[\"您已开通会员\"]"；
obj.data.multiplatform_music_already_expire_myinfo_config_0 = "{\"content\":{\"content\":\"音乐包会员\"},\"data\":[{\"value\":1,\"index\":1,\"n\":1}]}"
obj.data.multiplatform_vip_text_user_label_contentv2_24 = "{\"1\":[{\"k\":125,\"v\":{\"content\":\"您的会员***天后到期\"}},{\"k\":80,\"version\":\"11569-99999\",\"v\":{\"open\":1,\"day\":999,\"time\":2,\"percent\":99}}]}"
body = JSON.stringify(obj);
}
if (url.indexOf(path1) != -1) {    
obj.data.vip_level = 9; 
body = JSON.stringify(obj);
}
if (url.indexOf(svip) != -1) {    
obj.data.list.p_grade = 20; 
obj.data.list.vipinfo.is_vip = 1;
obj.data.list.vipinfo.vip.type = 0;
obj.data.list.vipinfo.svip.level = 20;
obj.data.list.vipinfo.svip.score = 99999;
obj.data.list.vipinfo.vip_statu = 1;       */user_type=0  user_y_type = 0
body = JSON.stringify(obj);
}
if (url.indexOf(time) != -1) {    
obj.data.list.start_time = "2022-03-17 09:05:55"; 
obj.data.list.end_time = "2099-03-17 09:05:55"; 
obj.data.list.type =svip; 
body = JSON.stringify(obj);
}
if (url.indexOf(ssvip) != -1) {    
obj.data.user_type = 0; 
obj.data.vip_end_time = "2099-03-17 09:05:55"; 
obj.data.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.vip_begin_time = "2022-03-17 09:05:55";
obj.data.m_end_time = "2099-03-17 09:05:55"; 
obj.data.su_vip_begin_time = "2022-03-17 09:05:55";
obj.data.su_vip_y_endtime = "2099-03-17 09:05:55";
obj.data.is_vip = 1; 
obj.data.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.vip_type = 0; 
body = JSON.stringify(obj);
}
if (url.indexOf(data) != -1) {    
obj.data.vipinfo.su_vip_y_endtime = "2099-03-17 09:05:55";
obj.data.vipinfo.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.vipinfo.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55";
obj.data.vipinfo.svip_score = 99999;
obj.data.vipinfo.vip_type = 0; 
obj.data.vipinfo.svip_level = 20; 
body = JSON.stringify(obj);
}
if (url.indexOf(vipinfo) != -1) {   
obj.data.vip_begin_time = "2022-03-17 09:05:55";
obj.data.vip_type = 1;  
obj.data.vip_y_endtime = "2099-03-17 09:05:55";
obj.data.su_vip_upgrade_days = 9999;
obj.data.su_vip_begin_time = "2022-03-17 09:05:55";
obj.data.super_vip_upgrade_month = 9999;
obj.data.su_vip_y_end_time = "2099-03-17 09:05:55";
obj.data.su_vip_y_endtime = "2099-03-17 09:05:55";
obj.data.vip_endtime = "2099-03-17 09:05:55"; 
obj.data.svip_level = 9; 
obj.data.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.svip_score = 99999;
obj.data.is_vip = 1;
obj.data.producttype = svip;
obj.data.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.m_end_time = "2099-03-17 09:05:55"; 
obj.data.m_y_endtime = "2099-03-17 09:05:55"; 
obj.data.vip_clearday = "2022-03-17 09:05:55"; 
obj.data.m_clearday = "2022-03-17 09:05:55"; 
obj.data.h_end_time = "2099-03-17 09:05:55"; 
body = JSON.stringify(obj);
}
if (url.indexOf(token) != -1) {    
obj.data.vip_end_time = "2099-03-17 09:05:55"; 
obj.data.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.is_vip = 1;
obj.data.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.vip_begin_time = "2022-03-17 09:05:55"; 
obj.data.m_end_time = "2099-03-17 09:05:55"; 
obj.data.su_vip_begin_time = "2022-03-17 09:05:55";
obj.data.su_vip_y_endtime = "2099-03-17 09:05:55"; 
obj.data.m_begin_time = "2022-03-17 09:05:55"; 
body = JSON.stringify(obj);
}
if (url.indexOf(inte) != -1) {   
obj.data.vip_integral = 99999;
obj.data.get_vip_info_v3.data.vip_list = [^0];
obj.data.get_vip_info_v3.data.m_list = [^0];
obj.data.get_vip_info_v3.data.auto_list = [^0];
obj.data.get_vip_info_v3.data.vip_type = 0;
obj.data.get_vip_info_v3.data.vip_y_endtime = "2099-03-17 09:05:55";
obj.data.get_vip_info_v3.data.su_vip_upgrade_days = 9999;
obj.data.get_vip_info_v3.data.su_vip_upgrade_month = 999;
obj.data.get_vip_info_v3.data.h_end_time = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.vip_end_time = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.promise.start_time = "2022-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.promise.end_time = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.svip99 = 1;
obj.data.get_vip_info_v3.data.svip_level = 20; 
obj.data.get_vip_info_v3.data.su_vip_clearday = "2022-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.m_y_endtime = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.svip7free = 1
obj.data.get_vip_info_v3.data.svip_score = 99999;
obj.data.get_vip_info_v3.data.is_vip = 1;
obj.data.get_vip_info_v3.data.producttype = svip;
obj.data.get_vip_info_v3.data.su_vip_end_time = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.m_end_time = "2099-03-17 09:05:55"; 
obj.data.get_vip_info_v3.data.vip_clearday = "2022-03-17 09:05:55"; 
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

