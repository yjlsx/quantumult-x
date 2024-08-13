/* 
[rewrite_local]
^https:\/\/gateway3\.kugou\.com\/v6\/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/mobile\/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/v1\/fusion\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/listening\/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/ocean\/v6\/theme\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway\.kugou\.com\/ocean\/v6\/theme\/category url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js

^https:\/\/gateway3\.kugou\.com\/ip\/api\/v1\/overseas\/check_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/ads\.gateway\/v2\/task_video\/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/v2\/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/updateservice\/v1\/get_dev_user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//gateway3\.kugou\.com\/ads\.gateway\/v5\/task_video\/qualification url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/userinfoservice\/v2\/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/(v6\/login_by_openplat|mobile\/vipinfoV2|v1\/fusion\/userinfo|listening\/coupon_package|ocean\/v6\/theme\/list|ip\/api\/v1\/overseas\/check_v2|ads\.gateway\/v2\/task_video\/unlogin_guide|v2\/get_vip_config|updateservice\/v1\/get_dev_user|ads\.gateway\/v5\/task_video\/qualification|userinfoservice\/v2\/get_login_extend_info|v5\/login_by_token|v1/login_by_quick_token) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^http:\/\/adserviceretry\.kglink\.cn\/v4\/mobile_splash url reject-200
^https:\/\/welfare\.kugou\.com\/diy\/v1\/get_official_theme url script-analyze-echo-response https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/theme.json
^https:\/\/gateway3\.kugou\.com\/v5\/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/tools\.mobile\/api\/v2\/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/mobile\/vipinfoV2&code url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\/\/gateway3\.kugou\.com\/ads\.gateway\/v2\/task_video\/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//vip\.kugou\.com\/v1\/union\/list_quota_plus url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
^https:\\//vip\.kugou\.com\/user\/vipinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js

[mitm]
hostname = gateway.kugou.com, gateway3.kugou.com, vip.kugou.com
*/

// 双斜杠后的内容在js里是属于注释内容不会生效
*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
const vip = '/ip/api/v1/overseas/check_v2';
const vap = '/ads.gateway/v2/task_video/unlogin_guide';
const get = '/v2/get_vip_config';
const svip = '/updateservice/v1/get_dev_user';
const time = '/list_v2';
const ssvip = '/v6/login_by_openplat';
const data = '/get_login_extend';
const vipinfo = '/mobile/vipinfoV2';
const inte = '/v1/fusion/userinfo';
const coupon = '/listening/coupon_package';
const prom = '/promotionvip';
const ads = '/ads.gateway/v5/task_video/qualification';
const user = 'userinfoservice/v2/get_login_extend_info';     //path
const token = '/v5/login_by_token';
const path1 = '/tools.mobile/api/v2/theme';
const path2 = '/v1/login_by_quick_token';
const path3 = '/user/vipinfo';
const path4 = '/ocean/v6/theme/category';


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
obj.data["vip_end_time"] = "2099-12-01 23:58:59";
obj.data["m_end_time"] = "2099-12-01 23:58:59";
obj.data["vip_begin_time"] = "2022-03-17 09:05:55";
obj.data["vip_end_time"] = "2099-12-01 23:58:59";
obj.data["vip_y_endtime"] = "2099-12-01 23:58:59";
obj.data["su_vip_begin_time"] = "2022-03-17 09:05:55";
obj.data["su_vip_end_time"] = "2099-12-01 23:58:59";
obj.data["su_vip_y_endtime"] = "2099-12-01 23:58:59";
obj.data["vip_clearday"] = "2022-03-17 09:05:55";
obj.data["m_begin_time"] = "2022-03-17 09:05:55";
obj.data["m_end_time"] = "2099-12-01 23:58:59";
obj.data["m_y_endtime"] = "2099-12-01 23:58:59";
obj.data["m_clearday"] = "2022-03-17 09:05:55";
obj.data["h_begin_time"] = "2022-03-17 09:05:55";
obj.data["h_end_time"] = "2099-12-01 23:58:59";
obj.data["h_signed"] = "ssvip";
obj.data["vip_type"] = 1; // 修改 vip_type 为 1
obj.data["su_vip_upgrade_days"] = 9999;
obj.data["su_vip_begin_time"] = "2022-03-17 09:05:55";
obj.data["su_vip_y_endtime"] = "2099-12-01 23:58:59";
obj.data.pr0ducttype = "ssvip";
obj.data.svip_level = 9;
body = JSON.stringify(obj);
}
if (url.indexOf(get) != -1) {    
// 修改 VIP 到期提示配置
obj.data["multiplatform_vip_expire_prompt_myinfo_config_0"] = "{\"content\":{\"content\":\"您的会员9999天后到期\"},\"data\":[{\"value\":0,\"index\":1,\"n\":1}]}";
// 修改缓存过期检查标志
obj.data["cache_expired_check"] = 0;
// 修改多平台 VIP 文本标签内容配置
obj.data["multiplatform_vip_text_user_label_contentv2_10"] = "{\"40\":[{\"k\":119,\"v\":{\"showH5Mode\":1,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\",\"jumpMode\":1,\"count\":0}}]}";
// 增加无限免费听歌权益
obj.data["multiplatform_vip_text_user_label_contentv2_10"]["40"].push({
  "k": 100,
  "v": {
    "open": 1,
    "showH5Mode": 0,
    "jumpUrl": "https://h5.kugou.com/vipfreemode/v-35ffb015/index.html",
    "jumpMode": 1,
    "count": 0,
    "rewardTipText": "已获得无限免费听歌权益",
    "strengthenCount": 999999,
    "strengthenMaxCount": 999999
  }
});
obj.data["multiplatform_vip_text_user_label_contentv2_10"] = labelContent;
let labelContent7 = obj.data["multiplatform_vip_text_user_label_contentv2_7"];
if (!labelContent7) {
    labelContent7 = {};
}
labelContent7["1"] = [{
    "k": 46,
    "v": {
        "normalText": "含%d首会员歌曲，开会员享完整版"
    }
}, {
    "k": 47,
    "v": {
        "v3": "开会员畅享该歌曲完整版"
    }
}];
// 修改多平台 VIP 文本标签内容配置
obj.data["multiplatform_vip_text_user_label_contentv2_17"] = "{}";
// 修改多平台会员已过期提示配置
obj.data["multiplatform_vip_expire_prompt_myinfo_config_num"] = 1;
obj.data["multiplatform_vip_expire_prompt_myinfo_config_0"] = {
    "content": {
        "content": "您的会员9999天后到期",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};
// 修改多平台音乐已过期提示配置
obj.data["multiplatform_music_already_expire_myinfo_config_num"] = 1;
obj.data["multiplatform_music_already_expire_myinfo_config_0"] = {
    "content": {
        "content": "永久音乐包会员", 
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};
// 修改多平台 VIP 文本标签内容配置
obj.data["multiplatform_vip_text_user_label_rulev3_35"] = "{\"id\":\"57\",\"data\":[{\"index\":1,\"value\":4096},{\"index\":1,\"value\":1073741824,\"n\":1},{\"index\":1,\"value\": 536870912,\"n\":1}]}";

// 修改多平台会员已过期提示配置
obj.data["multiplatform_vip_already_expire_myinfo_config_0"] = {
    "content": {
        "content": "永久豪华VIP会员",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};

// 修改音乐会员今日到期提示配置
obj.data["multiplatform_music_expire_prompt_myinfo_today_config_0"] = {
    "content": {
        "content": "您是永久会员",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};
// 修改会员特权链接文本配置
obj.data["multiplatform_vip_text_vip_link"] = ["永久会员"];

// 修改音乐符挂件图标链接配置
obj.data["multiplatform_musical_note_pendant_icon_urls"] = {
    "playVideoAdIcon": "http://imge.kugou.com/commendpic/20210624/20210624165236427044.gif",
    "waitReceiveIcon": "http://imge.kugou.com/commendpic/20210624/20210624165230422467.gif",
    "signIcon": "http://imge.kugou.com/commendpic/20210624/20210624165222529131.gif",
    "listenIcon": "http://imge.kugou.com/commendpic/20210804/20210804103305346492.gif",
    "goldenIcon": "http://imge.kugou.com/commendpic/20210803/20210803174750309789.gif"
};

// 修改会员队列列表按钮配置
obj.data["multiplatform_vip_text_queue_list_btn_config_0"] = {
    "data": [{
            "value": 33554432,
            "index": 1,
            "n": 1
        },
        {
            "value": 1073741824,
            "index": 2,
            "n": 1
        }
    ]
};

// 修改会员今日到期提示配置
obj.data["multiplatform_vip_expire_prompt_myinfo_today_config_0"] = {
    "content": {
        "content": "您是永久会员",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};
body = JSON.stringify(obj);
}
if (url.indexOf(path1) != -1) {    
obj.data.vip_level = 9; 
body = JSON.stringify(obj);
}
if (url.indexOf(svip) != -1) {    
obj.data.list.p_grade = 20; 
obj.data.list.vipinfo.is_vip = 1;
obj.data.list.vipinfo.vip.type = 1;
obj.data.list.vipinfo.svip.level = 9;
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
if (url.indexOf(path2) != -1) {    
obj.data.user_type = 1;
obj.data.vip_token = "9999999999";
obj.data.vip_end_time = "2099-12-01 23:58:59";
obj.data.su_vip_end_time = "2099-12-01 23:58:59";
obj.data.m_end_time = "2099-12-01 23:58:59";
obj.data.su_vip_y_endtime = "2099-12-01 23:58:59";
obj.data.t_expire_time = 4102444800;
obj.data.is_vip = 1;
obj.data.user_y_type = 1;
obj.data.m_type = 1;
obj.data.vip_type = 1;
body = JSON.stringify(obj);
}

if (url.indexOf(path3) != -1) {   
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

if (url.indexOf(path4) != -1) { 
obj.data.info.forEach(category => {
  category.themes.forEach(theme => {
    if (theme.limit_free_info) {
      theme.limit_free_info.free_end_time = 4102415999; // 2099-12-31 23:59:59
         }
     });
  });  
body = JSON.stringify(obj);
}


var body2 = $response.body;
var obj = JSON.parse(body2);
obj2.data["vip_end_time"] = "永久";
obj2.data["m_end_time"] = "";

obj2.data.txvideo = "VIP";
obj2.data.mangotv2021_mk_auto.bought = 1;
obj2.data.mangotv2021_mk_auto.remain_quota = 9999;
obj2.data.ykvideo.mobile = "18812345678";
obj2.data.ykvideo.bind_mobile = "18812345678";


// 合并两个响应体处理结果
let mergedBody = { 
    "response1": JSON.parse(body1),
    "response2": JSON.parse(body2)
};

// 将合并后的结果转换为字符串并返回
$done({ body: JSON.stringify(mergedBody) });



