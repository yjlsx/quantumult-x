
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v5/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/mobile/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gatewayretry\.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/get_remain_quota url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/goodsmstore/v1/get_remain_quota url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/detail url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://vip\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v3/get_my_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v4/follow_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_recv url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/listening/coupon_package url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/ocean/v6/theme url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/tools.mobile/v2/theme/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v1/get_res_privilege/lite url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/b_res_vip url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/welfare/diy/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/userbalance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://sentry\.kugou\.com/api/89/store url reject-200
^https://gateway\.kugou\.com/v5/url url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/get_res_privilege url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/get_b_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/consumption url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v1/get_buy_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https://gateway\.kugou\.com/v3/search/mixed url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\\//vip\.kugou\.com\/user\/vipinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/gatewayretry\.kugou\.com\/v2\/get_kg_bg_pics url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou.js
^https:\/\/gateway\.kugou\.com\/vipdress\/v1\/record_rack\/set_user_record_rack url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/vipdress\.kugou\.com\/v1\/record_rack\/get_record_rack_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js


[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com,
 */

const timestamp = Math.floor(Date.now() / 1000);
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

if (url.includes('/v1/userinfo')) {
    obj.data.vip_type = 4;   
    obj.data.user_type = 20;
    obj.data.m_type = 1;
    obj.data.vip_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_y_endtime = "2099-12-31 15:14:48";
    obj.data.su_vip_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_begin_time = "2024-07-26 15:14:09";
    obj.data.svip_level = 8;
    obj.data.svip_score = 999999;
    obj.data.su_vip_clearday = "2024-07-26 15:14:09";
    obj.data.m_end_time = "2099-12-31 15:14:48";
}

if (url.includes('/v2/get_login_extend_info')) {
    obj.data.vipinfo.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.bookvip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_begin_time = "2024-07-26 15:14:09";
    obj.data.vipinfo.su_vip_clearday = "2024-07-26 15:14:09";
    obj.data.vipinfo.user_type = 20;
    obj.data.vipinfo.svip_level = 8;
    obj.data.vipinfo.m_type = 1;
    obj.data.vipinfo.vip_type = 4;
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
        if (obj.data.vip_list.length === 0) {
            obj.data.vip_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.vip_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }
        if (!Array.isArray(obj.data.m_list)) {
            obj.data.m_list = [];
        }
        if (obj.data.m_list.length === 0) {
            obj.data.m_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.m_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }
        if (!Array.isArray(obj.data.h_list)) {
            obj.data.h_list = [];
        }
        if (obj.data.h_list.length === 0) {
            obj.data.h_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.h_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }
        if (!Array.isArray(obj.error.vip_list)) {
            obj.error.vip_list = [];
        }
        if (obj.error.vip_list.length === 0) {
            obj.error.vip_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.error.vip_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }
        if (!Array.isArray(obj.error.m_list)) {
            obj.error.m_list = [];
        }
        if (obj.error.m_list.length === 0) {
            obj.error.m_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.error.m_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }
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
        obj.data.vip_clearday = "2024-07-26 15:14:09";
        obj.data.su_vip_clearday = "2024-07-26 15:14:09";
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
        obj.error.su_vip_begin_time = "2024-07-26 15:14:09";
        obj.error.m_begin_time = "2024-07-26 15:14:09";
        obj.error.m_clearday = "2024-07-26 15:14:09";
        obj.error.vip_clearday = "2024-07-26 15:14:09";
        obj.error.su_vip_clearday = "2024-07-26 15:14:09";
        obj.error.vip_y_endtime = "2099-12-31 23:59:59";
        obj.error.user_type = 20;
        obj.error.m_type = 1;
        obj.error.su_vip_upgrade_days = 99999;
        obj.error.super_vip_upgrade_month = 9999;
        obj.error.su_vip_end_time = "2099-12-31 23:59:59";
        obj.error.su_vip_y_endtime = "2099-12-31 23:59:59";
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
    if (obj.data && obj.data.get_vip_info_v3) {
        // 确保 vip_list 是一个数组
        if (!Array.isArray(obj.data.get_vip_info_v3.data.vip_list)) {
            obj.data.get_vip_info_v3.data.vip_list = [];
        }
        // 更新 vip_list 的元素或添加新元素
        if (obj.data.get_vip_info_v3.data.vip_list.length === 0) {
            obj.data.get_vip_info_v3.data.vip_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.get_vip_info_v3.data.vip_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }

        // 确保 m_list 是一个数组
        if (!Array.isArray(obj.data.get_vip_info_v3.data.m_list)) {
            obj.data.get_vip_info_v3.data.m_list = [];
        }
        // 更新 m_list 的元素或添加新元素
        if (obj.data.get_vip_info_v3.data.m_list.length === 0) {
            obj.data.get_vip_info_v3.data.m_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.get_vip_info_v3.data.m_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }

        // 确保 h_list 是一个数组
        if (!Array.isArray(obj.data.get_vip_info_v3.data.h_list)) {
            obj.data.get_vip_info_v3.data.h_list = [];
        }
        // 更新 h_list 的元素或添加新元素
        if (obj.data.get_vip_info_v3.data.h_list.length === 0) {
            obj.data.get_vip_info_v3.data.h_list.push({
                end_time: "2099-12-31 23:59:59",
                type: 1,
                begin_time: "2024-07-26 15:14:09"
            });
        } else {
            obj.data.get_vip_info_v3.data.h_list.forEach(item => {
                item.end_time = "2099-12-31 23:59:59";
                item.type = 1;
                item.begin_time = "2024-07-26 15:14:09";
            });
        }

        // 更新 vip_info_v3 的其他属性
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


if (url.includes('/v1/get_remain_quota') || url.includes('/goodsmstore/v1/get_remain_quota')) {
    obj.data.m_clearday = "4102444799";
    obj.data.upgrade = 4;
    obj.data.m_type = 1;
    obj.data.total = 99999;
    obj.data.remain = 99998;
}

if (url.includes('/promotionvip/v3/vip_level/detail')) {
    obj.data.grade = 8;
    obj.data.daily_growth = 15;
    obj.data.growth = 999999;
    obj.data.level_start_growth = 108000;
    obj.data.next_level_growth = 0;
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
}

if (url.includes('/listening/coupon_package')) {
    obj.data.gift_card_cnt = 9;
    obj.data.listen_coupon_cnt = 10;
    obj.data.super_welfare = 1;
    obj.data.super_welfare_v2_cnt = 1;
    obj.data.download_cnt = 9;
    obj.data.mp3_download_cnt = 9;
}

if (url.includes('/v1/get_res_privilege/lite')) {
    obj.userinfo.m_type = 1;
    obj.userinfo.vip_type = 4;
    obj.userinfo.quota_remain = 999999;
    obj.vip_user_type = 3;
}

if (url.includes('/v1/b_res_vip')) {
    obj.error_code = 0;
    obj.status = 1;
    obj.message = "开始下载";
    obj.mstore_location = 'hxy:${timestamp}';
}
if (url.includes('/welfare/diy/v1') || url.includes('/v1/consumption')) {
    obj.error_code = 0;
    obj.status = 1;
}
if (url.includes('/v5/url')) {
    obj.status = 1;
    obj.fail_process = 0
}

if (url.includes('/v1/get_res_privilege')) {
    function modifyFields(item) {
        // 修改指定的字段
        item.trans_param.cpy_level = 1;
        item.trans_param.cpy_grade = 20;
        item.trans_param.musicpack_advance = 0;
        item._msg = "Allow: the audio is free.";
        item.privilege = 1;
        item.rebuy_pay_type = 2;
        item.status = 2;
        item.price = 0;
        item.pkg_price = 1;
        item.pay_type = 2;
        item.fail_process = 0;
        item.pay_block_tpl = 1;
        item.buy_count_kubi = 999999;
        item.expire = 4102444799;
        delete item.popup;
    }

    if (obj && obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            // 修改主对象的字段
            modifyFields(item);

            // 修改 relate_goods 数组中每个对象的字段
            if (item.relate_goods && Array.isArray(item.relate_goods)) {
                item.relate_goods.forEach(good => {
                    modifyFields(good);
                });
            }
        });
    }

    // 修改顶层的 vip_user_type 字段
    if (obj.vip_user_type) {
        obj.vip_user_type = 3;
    }
}

if (url.includes('/user/vipinfo')) {
    obj.data.is_vip = 1;   
    obj.data.vip_type = 4;   
    obj.data.user_type = 20;
    obj.data.m_type = 1;
    obj.data.m_y_endtime = "2099-12-31 15:14:48";
    obj.data.h_y_endtime = "2099-12-31 15:14:48";
    obj.data.vip_y_endtime = "2099-12-31 15:14:48";
    obj.data.vip_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_y_endtime = "2099-12-31 15:14:48";
    obj.data.su_vip_end_time = "2099-12-31 15:14:48";
    obj.data.su_vip_begin_time = "2024-07-26 15:14:09";
    obj.data.svip_level = 8;
    obj.data.svip_score = 999999;
    obj.data.vip_clearday = "2024-07-26 15:14:09";
    obj.data.su_vip_clearday = "2024-07-26 15:14:09";
    obj.data.m_end_time = "2099-12-31 15:14:48";
}

if (url.includes('/v2/get_kg_bg_pics')) {
    if (obj && obj.data && Array.isArray(obj.data.lists)) {
        obj.data.lists.forEach(list => {
            if (list.pics && Array.isArray(list.pics)) {
                list.pics.forEach(pic => {
                    // 设置每个 pic 的 is_suvip 属性为 1
                    pic.is_suvip = 1;
                });
            }
        });
    }
}


if (url.includes('/v1/get_b_info') || url.includes('/v1/get_buy_info')) {
    if (obj && obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            item.buy = 1; 
            item.pay_type = 2;
            item.addtime = timestamp;
            });
        }
}


if (url.includes('/v1/userbalance')) {
    obj.data = 999999;
}




$done({ body: JSON.stringify(obj) });
