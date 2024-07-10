
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
    user: 'userinfoservice/v2/get_login_extend_info', // path
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
    obj.data.vipinfo.svip_score = 999999; 
    obj.data.vipinfo.vip_type = 0; 
    obj.data.vipinfo.svip_level = 20;    
    body = JSON.stringify(obj);
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
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.vip)) {
    obj.info.is_special_vip = 1;
    obj.info.vip_switch = 1;
    body = JSON.stringify(obj);
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
    body = JSON.stringify(obj);
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

if (url.includes(endpoints.get)) {
    obj.data["multiplatform_vip_expire_prompt_myinfo_config_0"] = "{\"content\":{\"content\":\"您的会员9999天后到期\"},\"data\":[{\"value\":0,\"index\":1,\"n\":1}]}";
    obj.data["cache_expired_check"] = 0;
    obj.data["multiplatform_vip_text_user_label_contentv2_10"] = "{\"40\":[{\"k\":119,\"v\":{\"showH5Mode\":1,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\"}}],\"41\":[{\"k\":119,\"v\":{\"showH5Mode\":1,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\"}}]}";
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.svip)) {
    obj.data["exp_days"] = 9999;
    obj.data["product_viplist"] = [
        {
            "is_auto_continue": 1,
            "begin_time": "2022-03-17 09:05:55",
            "end_time": "2099-03-17 09:05:55",
            "id": 1,
            "product_id": 1,
            "auto_type": 1,
            "product_name": "svip",
            "is_exp": 0,
            "auto_flg": 1,
            "begin_time_text": "2022-03-17",
            "end_time_text": "2099-03-17",
            "sort": 2,
            "user_vip_type": 1,
            "user_product_type": "ssvip",
            "begin_time_show_text": "2022年03月17日",
            "end_time_show_text": "2099年03月17日",
            "user_product_level": 9,
            "is_user_subscribe_product": 1,
            "product_type_name": "svip",
            "sortname": "超级会员",
            "auto_tip": "已开通自动续费",
            "is_autopay_text": 1,
            "renew_mode": 1,
            "user_product_user_product_type": "ssvip",
            "is_open_renew": 1,
            "isautopayflag": 1
        }
    ];
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.time)) {
    obj.data.exp_time = 999999999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.ssvip)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.data)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.vipinfo)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.inte)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.coupon)) {
    obj.data.list[0].endtime = "2099-03-17 09:05:55";
    obj.data.list[0].expire_day = 9999;
    obj.data.list[0].expire_end_day = 9999;
    obj.data.list[0].is_expire = 0;
    obj.data.list[0].start_time = "2022-03-17 09:05:55";
    obj.data.list[0].end_time = "2099-03-17 09:05:55";
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.prom)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.token)) {
    obj.data.is_special_vip = 1;
    obj.data.vip_level = 9;
    obj.data.svip_level = 9;
    obj.data.vip_exp = 9999;
    obj.data.is_vip = 1;
    obj.data.is_svip = 1;
    obj.data.vip_exp_day = 9999;
    obj.data.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.path1)) {
    obj.data.is_special_vip = 1;
    obj.data.vip_level = 9;
    obj.data.svip_level = 9;
    obj.data.vip_exp = 9999;
    obj.data.is_vip = 1;
    obj.data.is_svip = 1;
    obj.data.vip_exp_day = 9999;
    obj.data.svip_exp = 9999;
    body = JSON.stringify(obj);
}

if (url.includes(endpoints.path2)) {
    obj.data.vipinfo.is_special_vip = 1;
    obj.data.vipinfo.vip_level = 9;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.vip_exp = 9999;
    obj.data.vipinfo.is_vip = 1;
    obj.data.vipinfo.is_svip = 1;
    obj.data.vipinfo.vip_exp_day = 9999;
    obj.data.vipinfo.svip_exp = 9999;
    body = JSON.stringify(obj);
}

$done({ body });