
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v5/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/mobile/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gatewayretry\.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v1/get_remain_quota url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/goodsmstore/v1/get_remain_quota url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/detail url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://vip\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v3/get_my_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v4/follow_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_recv url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js

[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com
 */

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('v5/login_by_token')) {
    obj.data.user_type = 20;
    obj.data.vip_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_end_time = "2099-12-31 15:14:48";
    obj.data.m_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_y_endtime = "2099-12-31 15:14:48";
    obj.data.su_vip_clearday = "2024-07-26 15:14:09";
    obj.data.vip_begin_time = "2024-07-26 15:14:09";
    obj.data.m_begin_time = "2024-07-26 15:14:09";
    obj.data.su_vip_begin_time = "2024-07-26 15:14:09";
    obj.data.is_vip = 1;
    obj.data.m_type = 1;
    obj.data.vip_type = 4;   
}

if (url.includes('/v2/get_login_extend_info')) {
    obj.data.vipinfo.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_begin_time = "2024-07-26 15:14:09";
    obj.data.vipinfo.su_vip_clearday = "2024-07-26 15:14:09";
    obj.data.vipinfo.user_type = 20;
    obj.data.vipinfo.svip_level = 8;
    obj.data.vipinfo.m_type = 1;
if(obj.data.vipinfo.svip_score){
    obj.data.vipinfo.svip_score = 999999;
      }
if(obj.data.vipinfo.vip_type){
    obj.data.vipinfo.vip_type = 4;
      }
if(obj.data.vipinfo.svip_level){
    obj.data.vipinfo.svip_level = 8;
      }
}

if (url.includes('/mobile/vipinfoV2')) {
    if (obj.data) {
        if (!Array.isArray(obj.data.vip_list)) {
            obj.data.vip_list = [];
        }
        obj.data.vip_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.type = 1;
            item.begin_time = "2024-07-26 15:14:09";
        });
        if (!Array.isArray(obj.data.m_list)) {
            obj.data.m_list = [];
        }
        obj.data.m_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.type = 1;
            item.begin_time = "2024-07-26 15:14:09";
        });
        if (!Array.isArray(obj.data.h_list)) {
            obj.data.h_list = [];
        }
        obj.data.h_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.type = 1;
            item.begin_time = "2024-07-26 15:14:09";
        });
        if (!Array.isArray(obj.error.vip_list)) {
            obj.error.vip_list = [];
        }
        obj.error.vip_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.type = 1;
            item.begin_time = "2024-07-26 15:14:09";
        });
        if (!Array.isArray(obj.error.m_list)) {
            obj.error.m_list = [];
        }
        obj.error.m_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.type = 1;
            item.begin_time = "2024-07-26 15:14:09";
        });
        obj.data.vip_y_endtime = "2099-12-31 23:59:59";
        obj.data.m_type = 1;
        obj.data.vip_type = 4;
        obj.data.viptype = 4;
        obj.data.user_type = 20;
        obj.data.su_vip_upgrade_days = 99999;
        obj.data.vip_begin_time = "2024-07-26 15:14:09";
        obj.data.svip_begin_time = "2024-07-26 15:14:09";
        obj.data.su_vip_begin_time = "2024-07-26 15:14:09";
        obj.data.m_begin_time = "2024-07-26 15:14:09";
        obj.data.m_clearday = "2024-07-26 15:14:09";
        obj.data.su_vip_y_endtime = "2099-12-31 23:59:59";
        obj.data.super_vip_upgrade_month = 9999;
        obj.data.h_end_time = "2099-12-31 23:59:59";
        obj.data.m_y_endtime = "2099-12-31 23:59:59";
        obj.data.vip_end_time = "2099-12-31 23:59:59";
        obj.data.svip_level = 8;
        obj.data.is_vip = 1;
        obj.data.svip_score = 999999;
        obj.data.svip_end_time = "2099-12-31 23:59:59";
        obj.data.su_vip_end_time = "2099-12-31 23:59:59";
        obj.data.m_end_time = "2098-12-31 23:59:59";
        obj.error.vip_type = 4;
        obj.error.vip_begin_time = "2024-07-26 15:14:09";
        obj.error.svip_begin_time = "2024-07-26 15:14:09";
        obj.error.m_begin_time = "2024-07-26 15:14:09";
        obj.error.m_clearday = "2024-07-26 15:14:09";
        obj.error.vip_clearday = "2024-07-26 15:14:09";
        obj.error.vip_y_endtime = "2099-12-31 23:59:59";
        obj.error.user_type = 20;
        obj.error.m_type = 1;
        obj.error.su_vip_upgrade_days = 99999;
        obj.error.super_vip_upgrade_month = 9999;
        obj.error.su_vip_end_time = "2099-12-31 23:59:59";
        obj.error.h_end_time = "2099-12-31 23:59:59";
        obj.error.vip_end_time = "2099-12-31 23:59:59";
        obj.error.svip_end_time = "2099-12-31 23:59:59";
        obj.error.svip_level = 8;
        obj.error.svip_score = 999999;
        obj.error.is_vip = 1;
        obj.error.m_end_time = "2099-12-31 23:59:59";
    }
}

if (url.includes('/v1/fusion/userinfo')) {
    if (obj.data && obj.data.get_vip_info_v3 && Array.isArray(obj.data.get_vip_info_v3.data.vip_list)) {
         if (!Array.isArray(obj.data.get_vip_info_v3.data.vip_list)) {
            obj.data.get_vip_info_v3.data.vip_list = [];
        }
       obj.data.get_vip_info_v3.data.vip_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.begin_time = "2024-07-26 15:14:09";
            item.type = 1;
        });
         if (!Array.isArray(obj.data.get_vip_info_v3.data.m_list)) {
            obj.data.get_vip_info_v3.data.m_list = [];
        }
       obj.data.get_vip_info_v3.data.m_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.begin_time = "2024-07-26 15:14:09";
            item.type = 1;
        });
         if (!Array.isArray(obj.data.get_vip_info_v3.data.h_list)) {
            obj.data.get_vip_info_v3.data.h_list = [];
        }
       obj.data.get_vip_info_v3.data.h_list.forEach(item => {
            item.end_time = "2099-12-31 23:59:59";
            item.begin_time = "2024-07-26 15:14:09";
            item.type = 1;
        });

        obj.data.get_vip_info_v3.data.vip_type = 4;
        obj.data.get_vip_info_v3.data.vip_y_endtime = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.vip_begin_time = "2024-07-26 15:14:09";
        obj.data.get_vip_info_v3.data.svip_begin_time = "2024-07-26 15:14:09";
        obj.data.get_vip_info_v3.data.m_begin_time = "2024-07-26 15:14:09";
        obj.data.get_vip_info_v3.data.m_type = 1; 
        obj.data.get_vip_info_v3.data.user_type = 20; 
        obj.data.get_vip_info_v3.data.su_vip_upgrade_days = 9999;
        obj.data.get_vip_info_v3.data.super_vip_upgrade_month = 9999;
        obj.data.get_vip_info_v3.data.svip_upgrade_month = 9999;
        obj.data.get_vip_info_v3.data.su_vip_y_endtime = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.m_end_time = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.m_y_endtime = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.svip_end_time = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.su_vip_clearday = "2024-07-26 15:14:09";
        obj.data.get_vip_info_v3.data.vip_clearday = "2024-07-26 15:14:09";
        obj.data.get_vip_info_v3.data.su_vip_end_time = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.vip_end_time = "2099-12-31 23:59:59";
        obj.data.get_vip_info_v3.data.is_vip = 1;
        obj.data.get_vip_info_v3.data.svip99 = 1;
        obj.data.get_vip_info_v3.data.svip_level = 8;
        obj.data.get_vip_info_v3.data.svip_score = 999999;

    }
}

if (url.includes('/ocean/v6/theme/list')) {
    if (obj.data && Array.isArray(obj.data.info)) {
        obj.data.info.forEach(item => {
            if (item.limit_free_info && typeof item.limit_free_info.free_end_time !== 'undefined') {
                item.limit_free_info.free_end_time = 4102415999;
            }
        });
    }
}

if (url.includes('/v1/get_remain_quota') || url.includes('/goodsmstore/v1/get_remain_quota')) {
    obj.data.m_clearday = "4102444799";
    obj.data.m_type = 1;
    obj.data.total = 99999;
    obj.data.remain = 99998;
}

if (url.includes('/promotionvip/v3/vip_level/detail')) {
    obj.data.grade = 8;
    obj.data.growth = 999999;
    obj.data.level_start_growth = 108000;
    obj.data.next_level_growth = 99;
}

if (url.includes('/promotionvip/v3/vip_level/welfare_list')) {
    if (obj && obj.data) {
        obj.data.grade = 8;       
        if (obj.data.list) {
            for (let key in obj.data.list) {
                if (obj.data.list.hasOwnProperty(key) && Array.isArray(obj.data.list[key])) {
                    obj.data.list[key].forEach(item => {
                        if ('recv_limit' in item) {
                            item.receive = 0;
                            item.recv_limit = 999;
                            item.welfare_num = 20;
                        }
                    });
                }
            }
        }
    }
}



if (url.includes('/v3/get_my_info')) {
    if (obj.data) {
        obj.data.svip_score = 999999;
        obj.data.svip_level = 8;
        obj.data.vip_type = 4;
        obj.data.user_type = 20;
        obj.data.musical_visible = 1;
        obj.data.timbre_visible = 1;
        obj.data["1ting_visible"] = 1;
        obj.data["1video_visible"] = 1;
        obj.data.usermedal_visible = 1;
        obj.data.yaicreation_visible = 1;
        obj.data.collectlist_visible = 1;
        obj.data.su_vip_begin_time = "2024-07-26 15:14:09";
        obj.data.su_vip_y_endtime = "2099-12-31 23:59:59";
        obj.data.su_vip_clearday = "2024-07-26 15:14:09";
        obj.data.su_vip_end_time = "2099-12-31 23:59:59";
    }
}


if (url.includes('/v4/follow_list')) {
    if (obj.data && Array.isArray(obj.data.lists)) {
        obj.data.lists.forEach(item => {
            if ('vip_type' in item) {
                item.vip_type = 4; 
            }
            if ('m_type' in item) {
                item.m_type = 1; 
            }
            if ('svip_level' in item) {
                item.svip_level = 8; 
            }
        });
    }
}

if (url.includes('/promotionvip/v3/vip_level/welfare_recv')) {
    obj.errcode = 0;
    obj.status = 1;
    obj.errmsg = "";
    obj.data.id = 16;
}


$done({ body: JSON.stringify(obj) });
