/**************************************
[Rewrite Local]
# 处理第一个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js

# 处理第二个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
[mitm]
hostname = as.mgtv.com
*************************************/
// 处理第一个 URL 响应
if ($request.url.indexOf('/client/user/user_vip_coin') !== -1) {
  const body = $response.body;
  const obj = JSON.parse(body);

  if (obj.data) {
    obj.data.point = 99999;
    obj.data.stat = 99999;
  }

  $done({body: JSON.stringify(obj)});
}

if ($request.url.indexOf('/api/v1/act/assets/idxnum') !== -1) {
  const body = $response.body;
  const obj = JSON.parse(body);

  if (obj.data) {
    obj.data.idx.vcoin = 99999;
    obj.data.idx.union_vip = 10;
  }

  $done({body: JSON.stringify(obj)});
}

// 处理第二个 URL 响应
if ($request.url.indexOf('/client/user/user_info') !== -1) {
  const body = $response.body;
  const json = JSON.parse(body);

  if (json.data) {
    // 更新所有结束日期字段
    json.data.vip_end_time_pc = "2099-09-09";
    json.data.mpp_svip_end_date = "2099-09-09";
    json.data.bigscreen_vip_end_date = "2099-09-09";
    json.data.vip_end_date = "2099-09-09";
    json.data.contract_full_screen_vip_end_date = "2099-09-09";
    json.data.universal_pc_mobile_vip_end_date = "2099-09-09";
    json.data.music_vip_end_time = "2099-09-09";
    json.data.vip_end_time_svip = "2099-09-09";
    json.data.contract_pc_mobile_vip_end_date = "2099-09-09";
    json.data.universal_full_screen_vip_end_date = "2099-09-09";
    json.data.vip_end_time_fs = "2099-09-09";

    // 更新VIP相关字段
    json.data.is_mpp_svip = 1;
    json.data.music_vip = 1;
    json.data.vip_id = 1;
    json.data.vip_name = "svip";

    // 更新成长数据
    if (json.data.growth) {
      json.data.growth.level = 9;
      json.data.growth.score = 99999;
    }

    // 更新剩余天数
    json.data.vip_end_days = 99999;
  }

  $done({body: JSON.stringify(json)});
}