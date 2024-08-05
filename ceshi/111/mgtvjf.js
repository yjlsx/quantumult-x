/**************************************
*
[rewrite local]
# 处理第一个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
# 处理第二个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
#^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js

*
[mitm]
hostname = as.mgtv.com, vipact3.api.mgtv.com, oiiccdn.yydsii.com
*************************************/

// 监听指定地址的响应
if ($request.url.indexOf("https://as.mgtv.com/client/order/order_status") !== -1) {
    let body = $response.body;
    let obj = JSON.parse(body);

    // 将 settle_price 设置为与 pay_amount 相同的值
    if (obj.data && obj.data.order_pay_info && obj.data.order_pay_info.pay_info) {
        obj.data.order_pay_info.pay_info.settle_price = obj.data.order_pay_info.pay_info.pay_amount;
    }

    // 使用正则表达式提取 JSONP 回调函数标识符
    let jsonpMatch = body.match(/^jsonp_\d+_\d+\(/);
    if (jsonpMatch) {
        let jsonpCallback = jsonpMatch[0]; // 获取 JSONP 回调函数标识符
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpCallback}${newBody})` });
    } else {
        $done({ body: body }); // 如果没有匹配到 JSONP 回调，原样返回
    }
}

// 处理 '/client/user/user_vip_coin' 响应
if ($request.url.indexOf('/client/user/user_vip_coin') !== -1) {
  let body = $response.body;
  let obj = JSON.parse(body);
  
  if (obj.data) {
    obj.data.points = 9999;
    obj.data.point = 9998;
    obj.data.stat = 9997;
  }
  
  $done({body: JSON.stringify(obj)});
}

// 处理 '/api/v1/act/assets/idxnum' 响应
if ($request.url.indexOf('/api/v1/act/assets/idxnum') !== -1) {
  let body = $response.body;
  let obj = JSON.parse(body);
  
  if (obj.data) {
    obj.data.idx.vcoin = 9999;
    obj.data.idx.redeem = 99990;
    obj.data.idx.admission = 91;  // 门票
    obj.data.idx.award = 75; // 其他卡券
    obj.data.idx.union_vip = 10;
  }
  
  $done({body: JSON.stringify(obj)});
}

// 处理 '/client/user/user_info' 响应
if ($request.url.indexOf('/client/user/user_info') !== -1) {
  let body = $response.body;
  let obj = JSON.parse(body);
  
  if (obj.data) {
    // 更新所有结束日期字段
    obj.data.vip_end_time_pc = "2099-09-09";
    obj.data.mpp_svip_end_date = "2099-09-09";
    obj.data.bigscreen_vip_end_date = "2099-09-09";
    obj.data.vip_end_date = "2099-09-09";
    obj.data.contract_full_screen_vip_end_date = "2099-09-09";
    obj.data.universal_pc_mobile_vip_end_date = "2099-09-09";
    obj.data.music_vip_end_time = "2099-09-09";
    obj.data.vip_end_time_svip = "2099-09-09";
    obj.data.contract_pc_mobile_vip_end_date = "2099-09-09";
    obj.data.universal_full_screen_vip_end_date = "2099-09-09";
    obj.data.vip_end_time_fs = "2099-09-09";

    // 更新VIP相关字段
    obj.data.is_mpp_svip = 1;
    obj.data.music_vip = 1;
    obj.data.vip_id = 1;
    obj.data.vip_name = "svip";

    // 更新成长数据
    if (obj.data.growth) {
      obj.data.growth.level = 9;
      obj.data.growth.score = 99999;
    }

    // 更新剩余天数
    obj.data.vip_end_days = 99999;
  }
  
  $done({body: JSON.stringify(obj)});
}

// 处理 '/GetUserInfo' 响应
if ($request.url.indexOf('/GetUserInfo') !== -1) {
  let body = $response.body;
  let obj = JSON.parse(body);
  
  if (obj.data) {
    obj.data.isVip = 1; // 设置为 VIP
    obj.data.vipExpiretime = 4102444800; // 设置过期时间为 2099-12-31
    obj.data.vipinfo.growth.score = 99999; // 设置积分
    obj.data.vipinfo.growth.level = 9; // 设置等级
  }
  
  $done({body: JSON.stringify(obj)});
}
