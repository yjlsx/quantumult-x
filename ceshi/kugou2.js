
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/v6/login_by_openplat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/mobile/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/listening/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ip/api/v1/overseas/check_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ads\.gateway/v2/task_video/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/v2/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/updateservice/v1/get_dev_user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ads\.gateway/v5/task_video/qualification url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/userinfoservice/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/v5/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/tools\.mobile/api/v2/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/mobile/vipinfoV2&code url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ads\.gateway/v2/task_video/unlogin_guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://vip\.kugou\.com/v1/union/list_quota_plus url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^http://login\.user\.kugou\.com/v5/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://vipuser\.kugou\.com/v2/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://vip\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/tools.mobile/api/v2/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/v1/login_by_quick_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js
^https://gateway\.kugou\.com/ip/api/v1/overeas/check_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou2.js

[mitm]
hostname = gateway.kugou.com, gateway3.kugou.com, vip.kugou.com, vipuser.kygou.com, login.user.kugou.com, userinfoservice.kugou.com
 */

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('https://gateway.kugou.com/ip/api/v1/overseas/check_v2')) {
  // 修改info中的部分属性值
    obj.info.is_special_vip = 1;
    obj.info.vip_switch = 0;
    obj.info.flag = 0;
    obj.info.is_operator = 1;
  }


if (url.includes('/userinfoservice/v2/get_login_extend_info')) {
    obj.data.ads = {};
    obj.data.vipinfo.su_vip_y_endtime = "2099-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_clearday = "2022-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_end_time = "2099-03-17 09:05:55"; 
    obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55"; 
    obj.data.svip_score = 999999; 
    obj.data.vip_type = 0; 
    obj.data.svip_level = 9;    
}

if (url.includes('/v2/get_login_extend_info')) {
    // 这里根据需要修改相应的字段
    obj.data.vipinfo.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.bookvip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55";
    
    obj.data.vipinfo.user_type = 1;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.m_type = 1;
    obj.data.vipinfo.autotype = 0;
    obj.data.vipinfo.autoChargeType = 0;
    obj.data.vipinfo.autoVipType = 0;
    obj.data.vipinfo.autostatus = 0;
  }


if (url.includes('/ads.gateway/v5/task_video/qualification')) {
    obj.data.ads = [];
    obj.data.ad_show_freq = [];
    obj.data.is_free_vip = 1;
    obj.data.free_mode_user = 0;
    obj.data.user_conf.is_auto_open_fm = 1;
    for (let task of obj.data.tasks_info) {
        task.used_times = task.total_number;
    }
}

if (url.includes( '/ip/api/v1/overseas/check_v2')) {
    obj.info.is_special_vip = 1;
    obj.info.vip_switch = 1;
    body = JSON.stringify(obj);
}

if (url.includes('/ads.gateway/v2/task_video/unlogin_guide')) {
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

if (url.includes('/v2/get_vip_config')) {
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
obj.data["multiplatform_vip_expire_prompt_myinfo_today_config_num"] = 1;
obj.data["multiplatform_vip_expire_prompt_myinfo_today_config_0"] = {
    "content": {
        "content": "您是永久VIP会员",
    },
    "data": [{
        "value": 0,
        "index": 1,
        "n": 1
    }]
};
}

if (url.includes( '/updateservice/v1/get_dev_user')) {
    // 修改data中的字段
  if (obj.data && obj.data.list) {
    obj.data.list.forEach(item => {
      if (item.grade_info) {
        item.grade_info.duration = 999999; // 或者其他合适的高值
        item.grade_info.p_grade = 9;
      }
      if (item.vipinfo) {
        item.vipinfo.is_vip = 1;
        item.vipinfo.y_type = 1;
        item.vipinfo.vip_type = 1;
        item.vipinfo.m_type = 1;
        item.vipinfo.svip_level = 9;
        item.vipinfo.svip_score = 99999;
        item.vipinfo.vip_statu = 1;
        item.vipinfo.user_type = 1;
        item.vipinfo.user_y_type = 1;
      }
    });
  }
}

if (url.includes('/list_v2')) {
    obj.data.vip_end_time = "2099-03-17 09:05:55";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.svip_end_time = "2099-03-17 09:05:55";
    obj.data.svip_begin_time = "2022-03-17 09:05:55";
    obj.data.svip_left_days = 9999;
    obj.data.is_vip = 1;
    obj.data.is_svip = 1;
}

if (url.includes('/v6/login_by_openplat')) {
    obj.data.vip_end_time = "2099-03-17 09:05:55";
    obj.data.vip_y_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_clearday = "2022-03-17 09:05:55";
    obj.data.vip_type = 1;
}

if (url.includes('/userinfoservice/v2/get_login_extend_info')) {
    obj.data.vip_left_days = 9999;
    obj.data.svip_level = 9;
    obj.data.vip_type = 1;
    obj.data.vip_end_time = "2099-03-17 09:05:55";
    obj.data.vip_y_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_clearday = "2022-03-17 09:05:55";
}

if (url.includes('/mobile/vipinfoV2&code')) {
    // 修改data中的时间字段
  if (obj.data) {
    obj.data.vip_end_time = "2099-12-31 23:59:59";
    obj.data.m_end_time = "2099-12-31 23:59:59";
    obj.data.annual_fee_end_time = "2099-12-31 23:59:59";
    obj.data.roam_end_time = "2099-12-31 23:59:59";
    obj.data.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.su_vip_begin_time = "2022-03-17 09:05:55";
    obj.data.su_vip_clearday = "2099-12-31";
    
    obj.data.is_vip = 1;
    obj.data.user_type = 1;
    obj.data.svip_level = 1;
    obj.data.autotype = 0;
    obj.data.autoChargeType = 0;
    obj.data.autoVipType = 0;
    obj.data.autostatus = 0;
  }

  // 修改error中的时间字段
  if (obj.error) {
    obj.error.vip_end_time = "2099-12-31 23:59:59";
    obj.error.m_end_time = "2099-12-31 23:59:59";
    obj.error.annual_fee_end_time = "2099-12-31 23:59:59";
    obj.error.roam_end_time = "2099-12-31 23:59:59";
    obj.error.su_vip_end_time = "2099-12-31 23:59:59";
    obj.error.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.error.su_vip_begin_time = "2022-03-17 09:05:55";
    obj.error.su_vip_clearday = "2099-12-31";
    
    obj.error.is_vip = 1;
    obj.error.user_type = 1;
    obj.error.svip_level = 1;
    obj.error.autotype = 0;
    obj.error.autoChargeType = 0;
    obj.error.autoVipType = 0;
    obj.error.autostatus = 0;
  }

}

if (url.includes('https://vip.kugou.com/v1/fusion/userinfo')) {
  // 修改data中的时间字段和属性
  if (obj.data) {
    obj.data.get_vip_info_v3.vip_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.m_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.annual_fee_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.roam_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.su_vip_begin_time = "2022-03-17 09:05:55";
    obj.data.get_vip_info_v3.su_vip_clearday = "2099-12-31";
    
    obj.data.get_vip_info_v3.is_vip = 1;
    obj.data.get_vip_info_v3.user_type = 1;
    obj.data.get_vip_info_v3.svip_level = 1;
    obj.data.get_vip_info_v3.autotype = 0;
    obj.data.get_vip_info_v3.autoChargeType = 0;
    obj.data.get_vip_info_v3.autoVipType = 0;
    obj.data.get_vip_info_v3.autostatus = 0;
  }


if (url.includes('https://gateway\.kugou\.com/v1/fusion/userinfo')) {
    let vipInfo = obj.data.get_vip_info_v3.data;

  // 修改每个时间字段为具体时间
  vipInfo.vip_end_time = "2099-12-31 23:59:59";
  vipInfo.m_end_time = "2099-12-31 23:59:59";
  vipInfo.annual_fee_end_time = "2099-12-31 23:59:59";
  vipInfo.roam_end_time = "2099-12-31 23:59:59";
  vipInfo.su_vip_end_time = "2099-12-31 23:59:59";
  vipInfo.su_vip_y_endtime = "2099-12-31 23:59:59";

  // 修改 su_vip 相关时间字段
  vipInfo.su_vip_begin_time = "2022-03-17 09:05:55";
  vipInfo.su_vip_clearday = "2099-12-31";
  
  // 确保是 VIP
  vipInfo.is_vip = 1;
  vipInfo.user_type = 1;
  vipInfo.svip_level = 1;
  vipInfo.isExpiredMember = 0;
  vipInfo.new_user = 0;

  // 清空自动续费相关字段
  vipInfo.autotype = 0;
  vipInfo.autoChargeType = 0;
  vipInfo.isHifiAutoCharge = 0;
  vipInfo.autoVipType = 0;
  vipInfo.autostatus = 0;

  // 确保超级 VIP 信息正常
  vipInfo.su_vip_upgrade_info = {
    "days": 0,
    "autotype": 0,
    "next_price": 0,
    "ts": 0,
    "price": 0,
    "activity_id": 0,
    "sign": ""
  };

  // 确保承诺部分有效
  vipInfo.promise = {
    "sign_status": 1,
    "biz_sign": "VIP",
    "sign_valid": 1,
    "start_time": "2014-01-26 19:12:00",
    "withhold_count": 0,
    "last_withhold_time": "",
    "next_withhold_time": "",
    "first_price": 0,
    "end_time": "2099-12-31 23:59:59",
    "sign_type": 1,
    "total_count": 1,
    "next_price": 0
  };

}

if (url.includes('/listening/coupon_package')) {
   obj.data.vip_coupon_cnt = 1;
   obj.data.gift_card_cnt" = 1;
   obj.data.listen_coupon_cnt = 1;
   obj.data.super_welfare = 1;
   obj.data.super_welfare_v2_cnt = 1;
   obj.data.download_cnt = 1;
   obj.data.hw_coupon_cnt = 1;
   obj.data.mp3_download_cnt = 1;,
   obj.data.mcoupon_cnt = 1;
   obj.data.vip_coupon_cnt = 1;

}

if (url.includes('/promotionvip')) {
    obj.data.user_info.vip_type = 1;
    obj.data.user_info.vip_end_time = "2099-03-17 09:05:55";
    obj.data.user_info.vip_y_endtime = "2099-03-17 09:05:55";
    obj.data.user_info.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.user_info.vip_clearday = "2022-03-17 09:05:55";
}

if (url.includes('/tools.mobile/api/v2/theme')) {
    obj.data.is_vip = 1;
    obj.data.vip_type = 1;
    obj.data.vip_end_time = "2099-03-17 09:05:55";
    obj.data.vip_y_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_clearday = "2022-03-17 09:05:55";
}

if (url.includes('/v1/login_by_quick_token')) {
    obj.data.vip_end_time = "2099-03-17 09:05:55";
    obj.data.vip_y_endtime = "2099-03-17 09:05:55";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_clearday = "2022-03-17 09:05:55";
}

if (url.includes("login_by_token") && method === "POST") {
    obj.data.is_vip = 1;
    obj.data.vip_token = "99999999999";
    obj.data.roam_end_time = "2099-12-31 23:59:59";
    obj.data.user_type = 1;
    obj.data.vip_token = "9999999999";
    obj.data.roam_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_end_time = "2099-12-31 23:59:59";
    obj.data.t_expire_time = 4102444800; // Unix时间戳：2099-12-31 00:00:00
    obj.data.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.is_vip = 1;
    obj.data.su_vip_clearday = "2022-03-17 09:05:55";
    obj.data.su_vip_begin_time = "2022-03-17 09:05:55";
    obj.data.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.vip_begin_time = "2022-03-17 09:05:55";
    obj.data.m_end_time = "2099-12-31 23:59:59";
    obj.data.m_begin_time = "2022-03-17 09:05:55";
    obj.data.vip_type = 1;
}

$done({ body: JSON.stringify(obj) });
