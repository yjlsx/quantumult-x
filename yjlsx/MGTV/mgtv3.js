/*
[rewrite local]
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^http:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/user\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?ticket=[^&]+ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/theme\/card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/vipcenter\/themecard\/(list|set|get) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/(user_vip_coin\?version|renew_records) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/homepage\.bz\.mgtv\.com\/v3\/user\/userInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/(?:app\/vip\/benefits\/award\/recv|act\/vipbenefits\/detail) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https?:\/\/dc\.bz\.mgtv\.com\/dynamic\/v1\/channel\/index\/.*?\/vipSdkFlag=1$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js


*
[mitm]
hostname = vipact3.api.mgtv.com, as.mgtv.com, mobile-stream.api.mgtv.com, homepage.bz.mgtv.com, dc.bz.mgtv.com
*/

// 处理响应体的函数
function modifyResponse(response) {
  // 获取响应体
  let body = response.body;

  // 确保 body 存在
  if (body) {
    try {
      // 解析 JSON 数据
      let obj = JSON.parse(body);

      // 根据 URL 进行不同的处理
      if ($request.url.indexOf('/api/v1/act/assets/idxnum') !== -1) {
        // 修改响应数据
        if (obj.data) {
            obj.data.idx.vcoin = 99999;
            obj.data.idx.redeem = 99990;
            obj.data.idx.admission = 0;  // 门票
            obj.data.idx.award = 0; // 其他卡券
            obj.data.idx.union_vip = 1;
        }
      }

      if ($request.url.indexOf('/api/v1/app/vip/center/user/info') !== -1) {
        if (obj.data.vipinfo) {
        obj.data.vip_center_type = 2;
        obj.data.vip_end_time_desc = "2099年12月31日到期";
        obj.data.level = 9; 
        obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00"; 
        obj.data.vipinfo.type = "2"; 
        obj.data.vipinfo.growth.score = 99999; 
        obj.data.vipinfo.growth.level = 9; 
        obj.data.user_type_name = "会员用户";
        obj.data.vip_icon = "https://vipcdn.mgtv.com/act/assets/badge/icon/3/9.png"; 
        obj.data.vip_id = "3"; 
        obj.data.vip_end_time = "2099-12-31 00:00:00";
        obj.data.score = 99999; 
        obj.data.user_type = 0; 
        }
}


 if ($request.url.indexOf('/client/user/user_info') !== -1) {
        if (obj.data) {
            obj.data.contract_pc_mobile_vip_end_date = "2099-12-31";
            obj.data.universal_pc_mobile_vip_end_date = "2099-12-31";
            obj.data.vip_end_time = "2099-12-31 00:00:00";
            obj.data.bigscreen_vip_available = 1;
            obj.data.contract_full_screen_vip_flag = 0;
            obj.data.music_vip_end_time = "2099-12-31 00:00:00";
            obj.data.music_vip = 1;
            obj.data.universal_full_screen_vip_end_date = "2099-12-31";
            obj.data.vip_end_time_pc = "2099-12-31 00:00:00";
            obj.data.vip_name = "会员用户";
            obj.data.vip_end_date = "2099-12-31";
            obj.data.mpp_svip_end_date = "2099-12-31";
            obj.data.bigscreen_vip_end_date = "2099-12-31";
            obj.data.is_mpp_svip = 1;
            obj.data.growth.score = 99999; // 修改为适当的积分
            obj.data.growth.level = 9; // 修改为适当的 VIP 等级
            obj.data.growth.next_level_gap = 9; 
            obj.data.contract_full_screen_vip_end_date = "2099-12-31";
            obj.data.contract_pc_mobile_flag = 1;
            obj.data.vip_end_time_svip = "2099-12-31 00:00:00";
            obj.data.vip_end_time_fs = "2099-12-31 00:00:00";
            obj.data.vip_end_days = 9999;
            obj.data.vip_id = "1";
        }
 }


if ($request.url.indexOf('/api/v1/app/vip/center/vip/info') !== -1) {
  if (obj.data && obj.data.userinfo) {
    obj.data.vip_center_type = 2;
    obj.data.vip_end_time = "2099-12-31 00:00:00";
    obj.data.user_type_name = "会员用户";
    obj.data.vip_end_time_desc = "2099年12月31日到期";
    obj.data.userinfo.contract_pc_mobile_vip_end_date = "2099-12-31";
    obj.data.userinfo.bigscreen_vip_available = 1;
    obj.data.userinfo.contract_full_screen_vip_flag = 1;
    obj.data.userinfo.trial_vips = [
        {
          "pri_des" : "含SVIP剧场免费看、SVIP集抢先看等权益（手机/Pad/电脑可用）",
          "pri_type" : 0,
          "begin_time" : "2022-07-31 12:15:52",
          "end_time" : "2099-12-31 00:00:00"
        }   
    ];
    obj.data.userinfo.music_vip_end_time = "2099-12-31 00:00:00";
    obj.data.userinfo.music_vip = 1;
    obj.data.userinfo.universal_pc_mobile_vip_end_date = "2099-12-31";
    obj.data.userinfo.universal_full_screen_vip_end_date = "2099-12-31";
    obj.data.userinfo.vip_end_time_pc = "2099-12-31";
    obj.data.userinfo.vip_name = "芒果TV会员";
    obj.data.userinfo.vip_end_date = "2099-12-31";
    obj.data.userinfo.contract_full_screen_vip_end_date = "2099-12-31";
    obj.data.userinfo.bigscreen_vip_end_date = "2099-12-31";
    obj.data.userinfo.contract_pc_mobile_flag = 0;
    obj.data.userinfo.growth.score = 99999;
    obj.data.userinfo.growth.level = 9;
    obj.data.userinfo.is_mpp_svip = 1;
    obj.data.userinfo.mpp_svip_end_date = "2099-12-31";
    obj.data.userinfo.vip_end_time_fs = "2099-12-31 00:00:00";
    obj.data.userinfo.vip_end_days = 9999;
    obj.data.userinfo.vip_end_time_svip = "2099-12-31 00:00:00";
    obj.data.userinfo.first_recharge_time = "2022-12-31 00:00:00";
    obj.data.userinfo.vip_id = 1;
    obj.data.user_type = 0;
    obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00";
    obj.data.vipinfo.type = "2";
    obj.data.vipinfo.growth.score = 99999;
    obj.data.vipinfo.growth.level = 9;
  }
}

 if ($request.url.indexOf('/api/v1/app/vip/center/theme/card') !== -1) {
        if (obj.data) {
            obj.data.theme_card.pos = "9";
            obj.data.theme_card.card_style = 1;
            obj.data.theme_card.card_text_color = "#7A2F77";
            obj.data.theme_card.default_card_key = "8";
            obj.data.theme_card.button_background_color1 = "#9E70FA";
            obj.data.theme_card.button_background_color2 = "#D021E0";
            obj.data.theme_card.button_text_color = "#FFFFFF";
            obj.data.theme_card.img = "https://vipcdn.mgtv.com/act_op/20240416/9f83f5041eab464798bfe0328863cb79.jpg";
        }
 }

 if ($request.url.indexOf('/api/v1/act/vipcenter/themecard/list') !== -1) {
        if (obj.data && obj.data.list) {
          // 遍历 list 数组，修改每个 card_type
          obj.data.list.forEach(card => {
            card.card_type = 100;
            card.tag = "免费";
            card.rule = "登录用户均可使用";
          });
     }
 }

 if ($request.url.indexOf('/api/v1/act/vipcenter/themecard/set') !== -1) {
        if (obj.errno) {
         obj.errno = 0;
         obj.ret = 0;
        }
      let idMatch = $request.url.match(/id=(\d+)/);
      let idValue = idMatch ? idMatch[1] : null;
    if (idValue) {
    if (!obj.data) {
        obj.data = {};
      }
    if (obj.data && obj.data.buy_url) {
    delete obj.data.buy_url;
   }
    obj.data.img_id = idValue;
     }
}

 if ($request.url.indexOf('/api/v1/act/vipcenter/themecard/get') !== -1) {
   obj.data.theme_card_info.img = "https://vipcdn.mgtv.com/act_op/20240607/da4560ba1f5b4f62a4ce148c81cdf172.png";
   obj.data.theme_card_info.button_color = "#9E70FA";
}

    // 处理 '/client/user/user_vip_coin' 响应
 if ($request.url.indexOf('/client/user/user_vip_coin?version') !== -1) {
        if (obj.data) {
            obj.data.points = 99999;
            obj.data.stat = 99997;
        }
 }

 if ($request.url.indexOf('/v3\/user\/userInfo') !== -1) {
        if (obj.data) {
            obj.data.validPcSvip = 1;
            obj.data.level = 9;
            obj.data.vipType = 2;
        }
 }

  //领取福利
 if ($request.url.indexOf('/api/v1/app/vip/benefits/award/recv') !== -1) {
            obj.errno = 0;
            obj.ret = 0;
}

 if ($request.url.indexOf('/api/v1/act/vipbenefits/detail') !== -1) {
        if (obj.data) {
            obj.data.out_stock = 1;
        }
}

 if ($request.url.indexOf('/dynamic/v1/channel/index') !== -1) {
if (obj.data && obj.data.length > 0) {
    for (let i = 0; i < obj.data.length; i++) {
        if (obj.data[i].DSLList && obj.data[i].DSLList.length > 0) {
            for (let j = 0; j < obj.data[i].DSLList.length; j++) {
                if (obj.data[i].DSLList[j].data) {
                    let data = obj.data[i].DSLList[j].data;
               
                    if (data.hasOwnProperty('vip_icon')) {
                        data.vip_icon = "https://vipcdn.mgtv.com/act/assets/badge/icon/3/9.png"; 
                        data.card_text_color = "#7A2F77";
                        data.button_text_color = "#FFFFFF"; 
                        data.button_background_color1 = "#9E70FA";
                        data.card_style = 1;
                    }
                    if (data.hasOwnProperty('vip_center_type')) {
                        data.vip_center_type = 2;
                    }
                    if (data.hasOwnProperty('score')) {
                        data.score = 99999;
                    }
                    if (data.hasOwnProperty('theme_card_img')) {
                        data.theme_card_img = "https://vipcdn.mgtv.com/act_op/20240416/9f83f5041eab464798bfe0328863cb79.jpg";
                    }
                    if (data.hasOwnProperty('level')) {
                        data.level = 9;
                    }
                    if (data.hasOwnProperty('vip_center_type')) {
                        data.vip_center_type = 2;
                      }
                 }
              }
           }
       }
   }
}


      // 生成修改后的 JSON 响应体
      $done({ body: JSON.stringify(obj) });

    } catch (e) {
      // 增强错误日志
      console.log('解析响应体时出错:', e.message);
      console.log('原始响应体:', body);
      $done({});
    }
  } else {
    // 如果 body 属性不存在，返回原响应
    $done({});
  }
}

// 执行响应处理
modifyResponse($response);
