
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https:\/\/gateway3\.kugou\.com\/v6\/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/mobile\/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/v1\/fusion\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/listening\/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/ocean\/v6\/theme\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/ip\/api\/v1\/overseas\/check_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/ads\.gateway\/v2\/task_video\/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/v2\/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/updateservice\/v1\/get_dev_user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/ads\.gateway\/v5\/task_video\/qualification url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/userinfoservice\/v2\/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/v5\/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/tools\.mobile\/api\/v2\/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/mobile\/vipinfoV2&code url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/gateway3\.kugou\.com\/ads\.gateway\/v2\/task_video\/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https:\/\/vip\.kugou\.com\/v1\/union\/list_quota_plus url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js

[mitm]
hostname = gateway.kugou.com,gateway3.kugou.com,vip.kugou.com
 */

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);


const endpoints = {
    vip: '/ip/api/v1/overseas/check_v2',
    vap: '/ads.gateway/v2/task_video/unlogin_guide',
    get: '/v2/get_vip_config',
    svip: '/updateservice/v1/get_dev_user',
    time: '/list_v2',
    ssvip: '/v6/login_by_openplat',
    data: '/get_login_extend',
    vipinfo: '/mobile/vipinfoV2',
    inte: '/v1/fusion/userinfo',
    coupon: '/listening/coupon_package',
    prom: '/promotionvip',
    ads: '/ads.gateway/v5/task_video/qualification',
    user: 'userinfoservice/v2/get_login_extend_info',
    token: '/v5/login_by_token',
    path1: '/tools.mobile/api/v2/theme',
    path2: '/v1/login_by_quick_token'
};

if (url.includes(endpoints.user)) {
    obj.data.ads = {};
    obj.data.vipinfo.su_vip_y_endtime = "2099-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_clearday = "2022-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_end_time = "2099-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55"; 
    obj.data.svip_score = 999999; 
    obj.data.vip_type = 0; 
    obj.data.svip_level = 20;    
    
}

if (url.includes(endpoints.ads)) {
    obj.data.ads = [];
    obj.data.ad_show_freq = [];
    obj.data.is_free_vip = 1;
    obj.data.free_mode_user = 0;
    obj.data.user_conf.is_auto_open_fm = 1;
    for (let task of obj.data.tasks_info) {
        task.used_times = task.total_number;
    }
   
}

if (url.includes(endpoints.vip)) {
    obj.info.is_special_vip = 1;
    obj.info.vip_switch = 1;
    
}

if (url.includes(endpoints.vap)) {
    obj.data.is_vip = 1;
    obj.data["vip_end_time"] = "2099-03-17 09:05:55";
    obj.data["m_end_time"] = "2099-03-17 09:05:55";
    obj.data["vip_begin_time"] = "2022-03-17 09:05:55";
    obj.data["vip_end_time"] = "2099-03-17 09:05:55";
    obj.data["vip_y_endtime"] = "2099-03-17 09:05:55";
    obj.data["su_vip_begin_time"] = "2022-03-17 09:05:55";
    obj.data["su_vip_end_time"] = "2099-03-17 09:05:55";
    obj.data["su_vip_y_endtime"] = "2099-03-17 09:05:55";
    obj.data["vip_clearday"] = "2022-03-17 09:05:55";
    obj.data["m_begin_time"] = "2022-03-17 09:05:55";
    obj.data["m_end_time"] = "2099-03-17 09:05:55";
    obj.data["m_y_endtime"] = "2099-03-17 09:05:55";
    obj.data["m_clearday"] = "2022-03-17 09:05:55";
    obj.data["h_begin_time"] = "2022-03-17 09:05:55";
    obj.data["h_end_time"] = "2099-03-17 09:05:55";
    obj.data["h_signed"] = "ssvip";
    obj.data["vip_type"] = 1;
    obj.data["su_vip_upgrade_days"] = 9999;
    obj.data["su_vip_begin_time"] = "2022-03-17 09:05:55";
    obj.data["su_vip_y_endtime"] = "2099-03-17 09:05:55";
    obj.data.producttype = "ssvip";
    obj.data.svip_level = 9;
    
}

if (url.includes(endpoints.get)) {
    obj.data["multiplatform_vip_expire_prompt_myinfo_config_0"] = "{\"content\":{\"content\":\"您的会员9999天后到期\"},\"data\":[{\"value\":0,\"index\":1,\"n\":1}]}";
    obj.data["cache_expired_check"] = 0;
    obj.data["multiplatform_vip_text_user_label_contentv2_10"] = "{\"40\":[{\"k\":119,\"v\":{\"showH5Mode\":1,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\",\"jumpMode\":1,\"count\":0}}]}";
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
    obj.data["multiplatform_vip_text_user_label_contentv2_17"] = "{}";
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
    obj.data["multiplatform_vip_text_user_label_rulev3_35"] = "{\"id\":\"57\",\"data\":[{\"index\":1,\"value\":4096},{\"index\":1,\"value\":1073741824,\"n\":1},{\"index\":1,\"value\": 536870912,\"n\":1}]}";
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
obj.data["multiplatform_vip_text_vip_link"] = ["永久会员"];
obj.data["multiplatform_musical_note_pendant_icon_urls"] = {
    "playVideoAdIcon": "http://imge.kugou.com/commendpic/20210624/20210624165236427044.gif",
    "waitReceiveIcon": "http://imge.kugou.com/commendpic/20210624/20210624165230422467.gif",
    "signIcon": "http://imge.kugou.com/commendpic/20210624/20210624165222529131.gif",
     "listenIcon": "http://imge.kugou.com/commendpic/20210804/20210804165216373472.gif",
    "playIcon": "http://imge.kugou.com/commendpic/20210624/20210624165211161676.gif"
};
obj.data["multiplatform_music_expire_prompt_myinfo_today_config_num"] = 1;
obj.data["multiplatform_music_expire_prompt_myinfo_today_config_0"] = {
    "content": {
        "content": "永久会员",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};

}

if (url.includes(endpoints.svip)) {
    obj.data.is_svip = 1;
    obj.data.svip_level = 20;
    obj.data.svip_expire_time = 4099365113;
    obj.data.svip_use_days = 9999999;
    
}

if (url.includes(endpoints.token)) {
    obj.data.is_vip = 1;
    obj.data.vip_clearday = "2022-03-17 09:05:55";
    obj.data.vip_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begintime = "2022-03-17 09:05:55";
    obj.data.svip_expire_time = 4099365113;
    obj.data.vip_level = 20;
   
}

if (url.includes(endpoints.vipinfo)) {
    obj.data.endtime = "2099-03-17 09:05:55";
    obj.data.begintime = "2022-03-17 09:05:55";
    obj.data.clearday = "2022-03-17 09:05:55";
    obj.data["vip_y_endtime"] = "2099-03-17 09:05:55";
    obj.data.vip_type = 1;
    obj.data.svip_expire_time = 4099365113;
    obj.data.vip_level = 20;
    
}

if (url.includes(endpoints.ssvip)) {
    obj.data.is_svip = 1;
    obj.data.vip_type = 1;
    obj.data.svip_expire_time = 4099365113;
   
}

if (url.includes(endpoints.path1)) {
    obj.data.is_vip = 1;
    obj.data.is_svip = 1;
    obj.data.vip_level = 20;
    obj.data.vip_type = 1;
    obj.data.vip_endtime = "2099-03-17 09:05:55";
    obj.data.svip_expire_time = 4099365113;
    
}

if (url.includes(endpoints.path2)) {
    obj.data.is_vip = 1;
    obj.data.vip_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begintime = "2022-03-17 09:05:55";
    obj.data.vip_clearday = "2022-03-17 09:05:55";
    obj.data.svip_expire_time = 4099365113;
    obj.data.vip_level = 20;
 
}

    $done({ body: JSON.stringify(obj) });
