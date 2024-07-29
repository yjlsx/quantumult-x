
/**
 [rewrite_local]
# Kugou Music Rewrite Rules
^https://gateway\.kugou\.com/tools.mobile/v2/theme/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/category url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/promotionvip/v3/vip_level/welfare_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/get_res_privilege url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js
^https://gateway\.kugou\.com/ocean/v6/theme/record_save url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou1.js


[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com
 */

const timestamp = Math.floor(Date.now() / 1000);
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/ocean/v6/theme/category')) {
    if (body.data && body.data.info) {
       body.data.info.forEach(section => {
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
          theme.limit_free_info.limit_free_status = 1;
          theme.limit_free_info.free_end_time = 4102444799;
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
    obj.data.forbid_type =0;
    obj.data.is_privilege = 1; //原来8
    if(obj.data.extra_info.extra_type) {
    obj.data.extra_info.extra_type = 0;
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

if (url.includes('/ocean/v6/theme/record_save')) {
    obj.errcode =0;
    obj.status = 1;
}




$done({ body: JSON.stringify(obj) });