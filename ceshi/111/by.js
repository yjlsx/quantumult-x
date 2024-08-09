/*
[rewrite local]
^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/my\/use_card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/recharge\/buy_vip url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/recharge\/goods url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/my\/child_card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/my\/takeout_card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
*
[mitm]
hostname = 103.39.222.113:3308
*/

// @name        修改响应体
// @description 根据 URL 修改不同 API 的响应体
// @version     1.0.0

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
      if ($request.url.indexOf('/api/my/profile') !== -1) {
        // 修改响应数据
        if (obj.data) {
          obj.data.is_vip = 1; // 设置为 VIP
          obj.data.vip_points = 9999; // 积分
          obj.data.is_exchange_code = 1; 
          obj.data.vip_type = 0; // VIP 类型
          obj.data.yuebao = "9999.00"; // 积分
          obj.data.view_times = "9999"; // 查看次数
          obj.data.balance = "9999.00"; // 余额
          obj.data.fz_balance = "9999.00"; 
          obj.data.spread = "9999.00"; 
          obj.data.day_views = 999; // 每日查看次数
          obj.data.used_views = 1;
          obj.data.ok_month_card = 1;
          obj.data.vip_days = 9999; // VIP天数
          obj.data.vip_time = 4102375989; 
          obj.data.card_gnum["3"] = 99;
          obj.data.card_gnum["5"] = 99;
          obj.data.card_gnum["6"] = 99;
        }
      }

      if ($request.url.indexOf('/api/my/use_card') !== -1) {
        // 修改响应数据
        if (obj.msg) {
          obj.code = 200;  
          obj.once = 30;  
          obj.msg = "充值成功";  
        }
      }

      if ($request.url.indexOf('/api/recharge/buy_vip') !== -1) {
        // 修改响应数据
        if (obj.msg) {
          obj.code = 200;   
          obj.msg = "充值成功";  
        }
      }

      if ($request.url.indexOf('/api/my/child_card') !== -1) {
        // 修改响应数据
        if (obj.msg) {
          obj.code = 200;   
          obj.msg = "兑换成功";  
        }
      }

      if ($request.url.indexOf('/api/my/takeout_card') !== -1) {
        // 修改响应数据
        if (obj.msg) {
          obj.code = 200;   
          obj.msg = "兑换成功";  
        }
      }

if ($request.url.indexOf('https://103.39.222.113:3308/api/recharge/goods') !== -1) {
    if (obj.data && Array.isArray(obj.data)) {
        // 遍历每个商品并将价格设置为 0
        obj.data.forEach(item => {
            item.price = "0.00";
        });
    }
  }
      // 生成修改后的 JSON 响应体
      $done({ body: JSON.stringify(obj) });

    } catch (e) {
      console.error('解析响应体时出错:', e);
      $done({});
    }
  } else {
    // 如果 body 属性不存在，返回原响应
    $done({});
  }
}

console.log("Request URL:", $request.url);
console.log("Original Response Body:", $response.body);

// 执行响应处理
modifyResponse($response);

