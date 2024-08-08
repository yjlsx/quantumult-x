/*
[rewrite local]
^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/my\/use_card url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/recharge\/buy_vip url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js

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
          obj.data.vip_points = 999; // 积分
          //obj.data.vip_type = 1; // VIP 类型
          obj.data.view_times = "999"; // 查看次数
          obj.data.balance = "999.00"; // 余额
          obj.data.day_views = 99; // 每日查看次数
          obj.data.vip_days = 999; // VIP天数
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
          obj.once =  ;  
          obj.msg = "充值成功";  
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

// 执行响应处理
modifyResponse($response);
