
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/tools.mobile/v2/theme/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/category url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/get_res_privilege url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/record_save url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/v3/search/mixed url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/gateway\.kugou\.com\/vipdress\/v1\/record_rack\/set_user_record_rack url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/vipdress\.kugou\.com\/v1\/record_rack\/get_record_rack_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/vipdress\.kugou\.com\/v1\/dress_sales\/get_dress_by_version url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/vip/v1/fusion/userinfo url script-response-bodyhttps://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/gateway\.kugou\.com\/player\/v1\/model\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/gateway\.kugou\.com\/media\.store\/v1\/album\/check_buy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https:\/\/gateway\.kugou\.com\/vipdress\/v1\/favor\/list\? url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https?:\/\/(gateway|vipdress)\.kugou\.com\/.*(get_dress_authority_list|check_user_dress) url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https?:\/\/gateway\.kugou\.com\/.*(model\/list|set_record_rack_check|set_user_record_rack)  url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js

# 拦截铭牌列表接口
^https?:\/\/welfare\.kugou\.com\/nameplate\/v1\/get_nameplate_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https?:\/\/welfare\.kugou\.com\/nameplate\/v1\/set_user_nameplate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js





[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com */

const timestamp = Math.floor(Date.now() / 1000);
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/ocean/v6/theme/category')) {

    obj.data.info.forEach(category => {
  category.themes.forEach(theme => {
    if (theme.limit_free_info) {
      theme.limit_free_info.free_end_time = 4102415999; // 2099-12-31 23:59:59
         }
     });
  });  

    if (obj.data && obj.data.info) {
       obj.data.info.forEach(section => {
    if (section.themes) {
      section.themes.forEach(theme => {
        theme.privilege = 1;
        theme.privileges = [
             1,
             99
        ];
    if(theme.toast_title) {
        delete theme.toast_title
        delete theme.toast_content
            }
        if (theme.limit_free_info) {
          theme.limit_free_info.toast_type = 4;
          theme.limit_free_info.free_end_time = 4102415999; // 2099-12-31 23:59:59
          theme.limit_free_info.limit_free_status = 1;
          theme.limit_free_info.free_end_offline = 0;
           }
        });
      }
    });
  }
}

if (url.includes('/tools.mobile/v2/theme/info')) {
     if (obj.data && obj.data.vip_level) {
    obj.data.vip_level = 0;
    }
     if (obj.data && obj.data.privilege) {
    obj.data.privilege = 1;
    obj.data.privileges = [
             1,
             99
        ];
    }
    if (!obj.data.limit_free_info) {
      obj.data.limit_free_info = {
         "toast_type": 4,
         "free_start_time": 1721908800,
         "limit_free_status": 1,
         "free_end_time": 4102415999,
         "free_end_offline": 0
    };
} else {
    obj.data.limit_free_info = {
        "toast_type": 4,
        "free_start_time": 1721908800,
        "limit_free_status": 1,
        "free_end_time": 4102415999,
        "free_end_offline": 0
      };
   }
}

if (url.includes('/promotionvip/v3/vip_level/welfare_list')) {
    if (obj && obj.data) {
        obj.data.grade = 8;       
        if (obj.data.list) {
            for (let key in obj.data.list) {
                if (obj.data.list.hasOwnProperty(key) && Array.isArray(obj.data.list[key])) {
                    obj.data.list[key].forEach(item => {
                        if ('recv_limit' in item) {
                            delete item.desc
                            item.receive = 1;
                            item.recv_limit = 999;
                            item.welfare_num = 20;
                        }
                    });
                }
            }
        }
    }
}

if (url.includes('/ocean/v6/theme/get_res_privilege')) {
    // 确保 obj 和 data 存在
    if (obj && obj.data) {
        // 更新 forbid_type 和 is_privilege
        obj.data.forbid_type = 0;
        obj.data.is_privilege = 1;

        // 确保 extra_info 对象存在
        if (obj.data.extra_info) {
            obj.data.extra_info.extra_type = 0;
        } else {
            obj.data.extra_info = {
                extra_type: 0
            };
        }
    }
}



if (url.includes('/ocean/v6/theme/list')) {
  if (obj.data && Array.isArray(obj.data.info)) {
    obj.data.info.forEach(item => {
      if (item.limit_free_info) {
        item.limit_free_info.limit_free_status = 1;
        item.limit_free_info.free_end_time = 4102415999;
      }
    });
  }
}
/*
if (url.includes('/v3/search/mixed')) {
    if (obj.data && obj.data.lists) {
        obj.data.lists.forEach(list => {
            if (list.istagresult === 0 && list.lists) { // 注意这里调整了条件
                list.lists.forEach(item => {
                    item.FailProcess = 0;
                    item.Privilege = 8;
                    item.AlbumPrivilege = 8;
                    item.PayType = 3;
                    if (item.HQ) {
                        item.HQ.Privilege = 8;
                    }
                    if (item.SQ) {
                        item.SQ.Privilege = 8;
                    }
                    if (item.Res) {
                        item.Res.Privilege = 8;
                    }
                });
            }
        });
    }
}
*/

if (url.includes('/record_rack/get_record_rack_list')) {
    if (obj && obj.data && Array.isArray(obj.data.record_rack)) {
        obj.data.record_rack.forEach(record => {
            record.free_type = 3;
        });
    }
    obj.data.is_end = 0;
}


if (url.includes('/ocean/v6/theme/record_save')) {
    obj.errcode =0;
    obj.status = 1;
}


if (url.includes('/album/check_buy')) {
      obj.data[0].is_buy = 1;
}



if ($request.url.includes('/v1/dress_sales/get_dress_by_version')) {

  if (obj && Array.isArray(obj.data)) {
    obj.data.forEach(item => {
      item.is_purchase = 1; // 改为已购买
    });
  }
} 


// 1. 处理图标列表权限 (Authority List)
if ($request.url.includes('/vipdress/v1/authority/get_dress_authority_list')) {
  if (obj && obj.data && Array.isArray(obj.data.authority_data)) {
    // 处理主列表
    obj.data.authority_data.forEach(item => {
      item.free_type = 1;        // 设为免费状态
      if (item.label_name) item.label_name = ""; 
      if (item.ext_info) {
        item.ext_info.intro = ""; // 清空“超级VIP专享”提示
        item.ext_info.url_type = 1;
      }
    });
    // 处理当前选中项状态
    if (obj.data.other_authority_data) {
      obj.data.other_authority_data.free_type = 1;
    }
  }
}

if (url.includes("/vip/v1/fusion/userinfo") && obj?.data?.get_vip_info_v3?.data) {
  let d = obj.data.get_vip_info_v3.data;

  d.is_vip = 1;
  d.vip_type = 4;
  d.user_type = 20;
  d.producttype = 4;
  d.autotype = 1;
  d.autoVipType = 1;
  d.autostatus = 1;
  d.first_svip = 1;
  d.super_vip_upgrade_month = 999;

  d.vip_begin_time = "2024-07-01 00:00:00";
  d.vip_end_time = "2099-12-31 23:59:59";
  d.vip_y_endtime = "2099-12-31 23:59:59";

  d.su_vip_begin_time = "2024-07-01 00:00:00";
  d.su_vip_end_time = "2099-12-31 23:59:59";
  d.su_vip_y_endtime = "2099-12-31 23:59:59";
  d.su_vip_upgrade_days = 99999;
  d.super_vip_upgrade_month = 9999;

  d.svip_upgrade_info = {
    days: 99999,
    autotype: 1,
    next_price: 0,
    ts: 1751557983,
    price: 0,
    activity_id: 123456,
    sign: "fake_sign_001"
  };

  d.su_vip_upgrade_info = {
    days: 99999,
    ts: 1751557983,
    next_price: 0,
    autotype: 1,
    activity_model_type: 0,
    price: 0,
    activity_id: 123456,
    sign: "fake_sign_002"
  };

  d.vip_list = {
    "1": {
      type: 1,
      begin_time: "2024-07-01 00:00:00",
      end_time: "2099-12-31 23:59:59"
    }
  };

  d.m_list = {
    "1": {
      type: 1,
      begin_time: "2024-07-01 00:00:00",
      end_time: "2099-12-31 23:59:59"
    }
  };

  d.h_list = {
    "1": {
      type: 1,
      begin_time: "2024-07-01 00:00:00",
      end_time: "2099-12-31 23:59:59"
    }
  };

  d.h_type = 1;
  d.m_type = 1;
  d.y_type = 1;
  d.m_is_old = 0;
  d.expire_sign_3 = 0;
  d.signed_svip_before = 1;
  d.svip_first_autotype76 = 0;
  d.svip_first_autotype78 = 0;
  d.svip_first_autotype79 = 0;
  d.svip_score = 999999;
  d.servertime = "2025-07-03 23:59:59";
  d.m_begin_time = "2024-07-01 00:00:00";
  d.m_end_time = "2099-12-31 23:59:59";
  d.m_y_endtime = "2099-12-31 23:59:59";
}

if (url.includes("/vipdress/v1/favor/list")) {

    if (obj?.data) {
      let list = obj.data.list || obj.data.config || obj.data.items;

      if (Array.isArray(list)) {
        list.forEach(item => {
          if ('end_time' in item) item.end_time = "2099-12-31 23:59:59";
          if ('expire_time' in item) item.expire_time = "2099-12-31 23:59:59";
          // 解锁状态
          if ('locked' in item) item.locked = false;
          if ('status' in item && (item.status === "locked" || item.status === "expired")) {
            item.status = "available";
          }
          if (item.name && !item.name.includes("解锁")) {
            item.name = "解锁 - " + item.name;
          }
        });
      }
    }
  }


if (url.includes('/v1/authority/check_user_dress')) {
    obj.errcode = 0;
    obj.status = 1;
    if (obj.data && Array.isArray(obj.data.dress_list)) {
        obj.data.dress_list.forEach(item => {
            item.has_authority = true; 
            item.free_type = 1;        
            item.popup_type = 0;     
            item.popup_info = null;     
            
            if (item.dress_id) {
                item.can_use = 1;      
                item.is_buy = 1;       
            }
        });
    }
}


if (url.includes("/player/v1/model/list")) {
    if (obj.data) {
        let str = JSON.stringify(obj.data);
        // 全局替换：开启权限、设为免费、开启使用开关
        str = str.replace(/"is_free":\s?"\d"/g, '"is_free":"1"')
                 .replace(/"can_use":\s?0/g, '"can_use":1')
                 .replace(/"has_authority":\s?false/g, '"has_authority":true')
                 .replace(/"free_type":\s?\d/g, '"free_type":1')
                 .replace(/"is_buy":\s?0/g, '"is_buy":1');
        obj.data = JSON.parse(str);
    }
}


if (url.includes("record_rack/set_record_rack_check") || url.includes("record_rack/set_user_record_rack")) {
    obj.errcode = 0;
    obj.status = 1;
    obj.errmsg = "";
    
    if (!obj.data) obj.data = {};
    obj.data.can_use = 1;
    obj.data.is_set = 1;
    obj.data.record_rack_status = 1; 
    obj.data.need_popup = false;
    obj.data.popup_type = 0;
    obj.data.is_buy = 1; 
    
    const trashFields = ["popup_info", "popup_Info", "popup_info_v2", "popup_Info_v2", "button_info"];
    trashFields.forEach(field => {
        delete obj.data[field]; 
    });
    obj.data.vip_type = 4; 
    obj.data.m_type = 1;
    obj.data.has_authority = true;
    obj.data.access = 1;
}


  // --- 铭牌佩戴权限绕过 
   if (url.includes("nameplate/v1/set_user_nameplate")) {
        console.log("检测到铭牌设置请求，正在强制授权...");
        obj.status = 1;
        obj.error_code = 0;
        if (obj.data) {
            obj.data.intro = "已成功佩戴限定铭牌";
            obj.data.button_txt = "已拥有";
            // 某些情况下需要强制 nameplate_type 匹配，通常 5 是动态限定
            obj.data.nameplate_type = 5; 
        }
    }

// --- 针对 get_nameplate_list 列表接口的解锁 ---
if (url.indexOf("nameplate/v1/get_nameplate_list") != -1) {
    // 遍历列表，解锁所有铭牌
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(group => {
            if (group.list) {
                group.list.forEach(item => {
                    item.intro = "";          
                    item.label_name = "";    
                    item.change_type = 1;     
                    item.act_end_time = "2099-12-31 23:59:59"; 
                });
            }
        });
    }
} else if (url.indexOf("nameplate/v1/set_user_nameplate") != -1) {
    // 强制返回佩戴成功
    obj.status = 1;
    obj.error_code = 0;
} else if (url.indexOf("popup/v1/info") != -1) {
    // 屏蔽“权限不足”的弹窗提示
    if (obj.data && obj.data.nameplate_popup_info) {
        obj.data.nameplate_popup_info.popup_status = 0;
    }
}


$done({ body: JSON.stringify(obj) });