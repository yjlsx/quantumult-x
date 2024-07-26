
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/v1/fusion/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v5/login_by_token url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/mobile/vipinfoV2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gatewayretry\.kugou\.com/v2/get_login_extend_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js

[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com
 */

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('v5/login_by_token')) {
   obj.data.user_type =13;
   obj.data.vip_end_time = "2099-12-31 15:14:48";
   obj.data.su_vip_end_time = "2099-12-31 15:14:48";
   obj.data.m_end_time = "2099-12-31 15:14:48";
   obj.data.su_vip_y_endtime = "2099-12-31 15:14:48";
   obj.data.t_expire_time = 1724570088;
   obj.data.is_vip = 1;
   obj.data.m_type = 1;
   obj.data.vip_type = 6;   
}


if (url.includes('/v2/get_login_extend_info')) {
    // 这里根据需要修改相应的字段
    obj.data.vipinfo.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.vipinfo.su_vip_begin_time = "2022-03-17 09:05:55";
    
    obj.data.vipinfo.user_type = 13;
    obj.data.vipinfo.svip_level = 9;
    obj.data.vipinfo.m_type = 1;
  }

if (url.includes('/mobile/vipinfoV2')) {
  if (obj.data) {
     if (!Array.isArray(obj.data.vip_list)) {
        obj.data.vip_list = [];
      }
  obj.data.vip_list.forEach(item => {
    if (item.end_time) {
      item.end_time = "2099-12-31 23:59:59";
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    } else {
      item.end_time = "2099-12-31 23:59:59"; // 如果没有 end_time 字段则创建并赋值
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    }
  });
  if (!Array.isArray(obj.data.m_list)) {
    obj.data.m_list = [];
  }
  obj.data.m_list.forEach(item => {
    if (item.end_time) {
      item.end_time = "2099-12-31 23:59:59";
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    } else {
      item.end_time = "2099-12-31 23:59:59"; // 如果没有 end_time 字段则创建并赋值
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    }
  });
  if (!Array.isArray(obj.data.h_list)) {
    obj.data.h_list = [];
  }
  obj.data.h_list.forEach(item => {
    if (item.end_time) {
      item.end_time = "2099-12-31 23:59:59";
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    } else {
      item.end_time = "2099-12-31 23:59:59"; // 如果没有 end_time 字段则创建并赋值
      item.type = 1;
      item.begin_time = "2024-07-26 15:14:09";
    }
  });
    obj.data.vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.m_type = 1;
    obj.data.viptype = 6;
    obj.data.user_type = 13;
    obj.data.su_vip_upgrade_days = 9999;
    obj.data.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.super_vip_upgrade_month = 9999;
    obj.data.h_end_time = "2099-12-31 23:59:59";
    obj.data.vip_end_time = "2099-12-31 23:59:59";
    obj.data.svip_level = 1;
    obj.data.is_vip = 1;
    obj.data.svip_score = 999999;
    obj.data.svip_end_time = "2099-12-31 23:59:59";
    obj.data.su_vip_end_time = "2099-12-31 23:59:59";
    obj.data.m_end_time = "2099-12-31 23:59:59";
  }
}

if (url.includes('/v1/fusion/userinfo')) {
if (obj.data && obj.data.get_vip_info_v3 && Array.isArray(obj.data.get_vip_info_v3.vip_list)) {
  obj.data.get_vip_info_v3.vip_list.forEach(item => {
    if (!item.end_time) {
      item.end_time = "2099-12-31 23:59:59";
    }
    if (!item.begin_time) {
      item.begin_time = "2024-07-26 15:14:09"; // 如果没有 begin_time 字段则创建并赋值
    }
    if (!item.type) {
      item.type = 1; // 如果没有 type 字段则创建并赋值
    }
  });
}

if (obj.data && obj.data.get_vip_info_v3) {
    obj.data.get_vip_info_v3.data.vip_type = 6;
    obj.data.get_vip_info_v3.data.vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.data.m_type = 1; 
    obj.data.get_vip_info_v3.data.su_vip_upgrade_days = 9999;
    obj.data.get_vip_info_v3.data.super_vip_upgrade_month = 9999;
    obj.data.get_vip_info_v3.data.su_vip_y_endtime = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.data.m_end_time = "2099-12-31 23:59:59";
    obj.data.get_vip_info_v3.data.is_vip = 1;
  }  
}

if (url.includes('/ocean/v6/theme/list')) {
// 遍历 info 数组并更新 free_end_time
    if (obj.data && Array.isArray(obj.data.info)) {
  obj.data.info.forEach(item => {
    if (item.limit_free_info && typeof item.limit_free_info.free_end_time !== 'undefined') {
      item.limit_free_info.free_end_time = 4102415999;
       }
     });
   }
}
.


$done({ body: JSON.stringify(obj) });
