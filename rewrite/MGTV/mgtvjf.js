/**************************************
*
[rewrite local]
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?(fe_version|invoker) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?(invoker|cxid) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=vip_growth url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/coin.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/viptype url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=mgtv_cashier url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/store\/v4\/products url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js

[mitm]
hostname = as.mgtv.com, vipact3.api.mgtv.com, oiiccdn.yydsii.com, messpro.hnwzinfo.com, nuc.api.mgtv.com
*************************************/


// 获取响应体
let body = $response.body;

// 提取 JSONP 函数名和内容
let jsonpMatch = body.match(/^jsonp_\d+_\d+\(/);
let jsonpEndMatch = body.match(/\)\s*$/);

if (jsonpMatch && jsonpEndMatch) {
    let jsonpFunction = jsonpMatch[0].replace(/[\(\s]/g, ''); // 提取 JSONP 函数名
    let jsonpBody = body.substring(jsonpMatch[0].length, body.length - jsonpEndMatch[0].length); // 提取 JSON 数据

    // 解析 JSON 数据
    let obj = JSON.parse(jsonpBody);

    // 处理 '/client/order/order_status' 响应
    if ($request.url.includes("https://as.mgtv.com/client/order/order_status")) {
            obj.data.status = 200
        if (obj.data && obj.data.order_pay_info && obj.data.order_pay_info.pay_info) {
            obj.data.order_pay_info.pay_info.settle_price = obj.data.order_pay_info.pay_info.pay_amount;
        }
        if (obj.data && obj.data.order_pay_info) {
            obj.data.order_pay_info.expired = 0; // 设置为未过期
        }
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    } 

    else if ($request.url.indexOf('/client/user/user_vip_coin?invoker') !== -1 || $request.url.indexOf('/user/user_vip_coin?fe_version') !== -1) {
         if (obj.data) {
            obj.data.points = 99999;
            obj.data.freeze = 99998;
            obj.data.stat = 99997;
         }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }

    else if ($request.url.includes('/api/v1/act/viptype')) {
         if (obj.data) {
            obj.data.vip_id = "mpp_svip";
            obj.data.userinfo.vipinfo.vip_end_time = "2099-12-31"; // 2099-12-31 的时间戳
            obj.data.userinfo.vipinfo.type = "2"; 
            obj.data.userinfo.vipinfo.growth.score = 99999;
            obj.data.userinfo.vipinfo.growth.level = 9;
         }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


    else if ($request.url.includes('/api/heartbeat/v1')) {
        if (obj.code) {
            obj.code = 200;
        }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }

    else if ($request.url.indexOf('/GetUserInfo?_from=vip_growth') !== -1) {
        if (obj.data && obj.data.vipinfo) {
          obj.data.isVip = 1;
          obj.data.vipExpiretime = 4102358400;
          obj.data.vipplatform = "mpp_svip";
          obj.data.vipinfo.vipExpiretime = 4102358400;
          obj.data.vipinfo.platform = "mpp_svip";
          obj.data.vipinfo.isvip = 1;
          obj.data.vipinfo.type = 2;
          obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00";
          obj.data.vipinfo.growth = {
            score: 99999,
            level: 9
          };
        }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


    else if ($request.url.indexOf('/GetUserInfo?_from=mgtv_cashier') !== -1) {
        if (obj.data && obj.data.vipinfo) {
          obj.data.isVip = 1;
          obj.data.vipExpiretime = 4102358400;
          obj.data.vipplatform = "mpp_svip";
          obj.data.vipinfo.vipExpiretime = 4102358400;
          obj.data.vipinfo.platform = "mpp_svip";
          obj.data.vipinfo.isvip = 1;
          obj.data.vipinfo.type = 2;
          obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00";
          obj.data.vipinfo.growth = {
            score: 99999,
            level: 9
          };
        }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


    // 处理 '/client/user/user_info' 响应
   else if ($request.url.indexOf('/client/user/user_info?invoker') !== -1 || $request.url.indexOf('/client/user/user_info?cxid') !== -1) {
       if (obj.data) {
        obj.data.vip_end_time_pc = 4102358400000; // 2099-12-31 的时间戳
        obj.data.vip_end_date = "2099-12-31";
        obj.data.mpp_svip_end_date = "2099-12-31";
        obj.data.bigscreen_vip_end_date = "2099-12-31";
        obj.data.contract_full_screen_vip_end_date = "2099-12-31";
        obj.data.contract_pc_mobile_vip_end_date = "2099-12-31";
        obj.data.universal_pc_mobile_vip_end_date = "2099-12-31";
        obj.data.universal_full_screen_vip_end_date = "2099-12-31";
        obj.data.vip_end_time_svip = "2099-12-31 00:00:00";
        obj.data.vip_end_time_fs = "2099-12-31 00:00:00";
        obj.data.vip_name = "SVIP";
        obj.data.first_recharge_time = "2022-12-31 00:00:00";
        obj.data.music_vip_end_time = "2099-12-31 00:00:00";
        obj.data.music_vip = 1;
        obj.data.bigscreen_vip_available = 1;
        obj.data.contract_full_screen_vip_flag = 1;
        obj.data.contract_pc_mobile_flag = 1;
        obj.data.is_mpp_svip = 1;
        obj.data.vip_end_days = 9999;
        obj.data.vip_id = "mpp_svip";       
        obj.data.growth = {
          score: 99999,
          level: 9,
          next_level_gap: 1,
          daily_incr_score: 0,
          upgrade_progress: "0.000",
          percentile: "0.01%"
        };
      }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
  }

    // 处理 '/GetUserInfo' 响应
    else if ($request.url.includes('/GetUserInfo')) {
        if (obj.data) {
            obj.data.isVip = 1; // 设置为 VIP
            obj.data.vipExpiretime = 4102358400000; // 设置过期时间为 2099-12-31
            obj.data.vipinfo.growth.score = 99999; // 设置积分
            obj.data.vipinfo.growth.level = 9; // 设置等级
        }
        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


   else if ($request.url.includes('https://oiiccdn.yydsii.com/api/v1/client/subscribe')) {
        // 修改响应为成功
        obj.message = "success"; // 修改 message 字段为成功
        obj.code = 200; // 添加 code 字段为成功的 HTTP 状态码
        
        // 生成修改后的 JSONP 响应体
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    }


    else if ($request.url.indexOf('/store/v4/products')) {
    if (obj.data && obj.data.products) {
        obj.data.products.forEach(product => {
            product.original_price = 0;  // 原价
            product.price = 0;          // 实际价格
            product.show_price = 0;     // 显示价格
        });
    }
    let newBody = JSON.stringify(obj);
    $done({body: `${jsonpFunction}(${newBody})`});
}

    // 处理 '/client/order/orderCreate' 响应
    else if ($request.url.includes("https://as.mgtv.com/client/order/orderCreate")) {
        if (obj.data) {
            obj.status = "200"; // 修改状态码为成功

        // 如果是空对象，修改 obj.data 为指定的新对象
        obj.data = {
            "pay_info": {
                "pay_type": "result",
                "settle_price": 6,
                "pay_amount": 6,
                "pay_msg": "6",
                "pay_channel": "coin",
                "charge_point": "com.hunantv.imgotv.iap.dandian6.ph001",
                "pay_order_id": "2408221504653776719617",
                "return_url": "https://club.mgtv.com/act/pay_return_page_2019.html?isHideNavBar=1&isFullScreen=1&boid=20240822150444747935839400127&appVersion=8.2.0&ticket=4515D4552A9E3699AE03CCBC14D2F089&productId=107735&activity_id=system&invoker=mobile-ios",
                "channel_code": "1F3X7JPT014M"
                      }
                  };

        let newBody = JSON.stringify(obj);
        $done({body: `${jsonpFunction}(${newBody})`});
    }
} else {
    // 如果没有匹配到 JSONP 格式，则直接返回原始响应
    $done({ body: body });
}