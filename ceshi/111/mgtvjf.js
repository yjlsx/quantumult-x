/**************************************
*
[rewrite local]
# 处理第一个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
# 处理第二个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
#^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js

*
[mitm]
hostname = as.mgtv.com, vipact3.api.mgtv.com
*************************************/

// 解析 JSONP 响应
let body = $response.body;
let obj = JSON.parse(body.replace(/^jsonp_\d+_\d+\(/, '').replace(/\)$/, ''));

// 处理第一个 URL 响应
if ($request.url.indexOf('/client/user/user_vip_coin') !== -1) {
  if (obj.data) {
    obj.data.points = 9999;
    obj.data.point = 9998;
    obj.data.stat = 9997;
  }
}

// 处理第二个 URL 响应
if ($request.url.indexOf('/api/v1/act/assets/idxnum') !== -1) {
  if (obj.data) {
    obj.data.idx.vcoin = 9999;
    obj.data.idx.redeem = 99990;
    obj.data.idx.admission = 91;  // 门票
    obj.data.idx.award = 75; // 其他卡券
    obj.data.idx.union_vip = 10;
  }
}

// 处理第三个 URL 响应
if ($request.url.indexOf('/client/user/user_info') !== -1) {
  if (obj.data) {
    // 更新所有结束日期字段
    obj.data.vip_end_time_pc = "2099-12-31";
    obj.data.mpp_svip_end_date = "2099-12-31";
    obj.data.bigscreen_vip_end_date = "2099-12-31";
    obj.data.vip_end_date = "2099-12-31";
    obj.data.contract_full_screen_vip_end_date = "2099-12-31";
    obj.data.universal_pc_mobile_vip_end_date = "2099-12-31";
    obj.data.music_vip_end_time = "2099-12-31";
    obj.data.vip_end_time_svip = "2099-12-31";
    obj.data.contract_pc_mobile_vip_end_date = "2099-12-31";
    obj.data.universal_full_screen_vip_end_date = "2099-12-31";
    obj.data.vip_end_time_fs = "2099-12-31";

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
}

// 处理 GetUserInfo 响应
if ($request.url.indexOf('/GetUserInfo') !== -1) {
  if (obj.data) {
    obj.data.isVip = 1; // 设置为 VIP
    obj.data.vipExpiretime = 4102444800; // 设置过期时间为 2099-12-31
    obj.data.vipinfo.growth.score = 99999; // 设置积分
    obj.data.vipinfo.growth.level = 9; // 设置等级
  }
}
if ($request.url.indexOf('/api/v1/client/subscribe') !== -1) {
  // 更新响应体
  obj.message = "token is ok";
}


// 处理 JSONP 响应
$done({body: `jsonp_1722828953958_57659(${JSON.stringify(obj)})`});
