/*
[rewrite local]
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^http:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/user\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js

*
[mitm]
hostname = vipact3.api.mgtv.com, as.mgtv.com
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
            obj.data.idx.admission = 2;  // 门票
            obj.data.idx.award = 2; // 其他卡券
            obj.data.idx.union_vip = 10;
        }
      }

      if ($request.url.indexOf('/api/v1/app/vip/center/user/info') !== -1) {
        if (obj.data.vipinfo) {
        obj.data.vip_center_type = 1; // 修改为 VIP 中心类型
        obj.data.vip_end_time_desc = "VIP 特权有效至 2099-12-31";
        obj.data.level = 9; // 修改为 VIP 等级
        obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00"; // 2099-12-31 的时间戳
        obj.data.vipinfo.type = "2"; // 修改为 VIP 类型
        obj.data.vipinfo.growth.score = 99999; // 修改为适当的积分
        obj.data.vipinfo.growth.level = 9; // 修改为适当的 VIP 等级
        obj.data.user_type_name = "SVIP";
        obj.data.vip_icon = "https://vipcdn.mgtv.com/act/assets/badge/icon/1/1.png"; // 修改为 VIP 图标
        obj.data.vip_id = "mpp_svip"; // 修改为 VIP ID
        obj.data.vip_end_time = 4102444800; // 2099-12-31 的时间戳
        obj.data.score = 99999; // 修改为适当的积分
        obj.data.user_type = 2; // 修改为 VIP 用户类型
        }
}


 if ($request.url.indexOf('/api/v1/app/vip/center/vip/info') !== -1) {
        if (obj.data.userinfo) {
        obj.data.vip_end_time_desc = "VIP 特权有效至 2099-12-31";
        obj.data.vip_end_time = 4102444800; // 2099-12-31 的时间戳
        obj.data.userinfo.music_vip_end_time = "2099-09-09 00:00:00";
        obj.data.userinfo.universal_pc_mobile_vip_end_date = "2099-09-09";
        obj.data.userinfo.music_vip = 1;
        obj.data.userinfo.vip_end_time_pc = "2099-09-09 00:00:00";
        obj.data.userinfo.vip_name = "SVIP";
        obj.data.userinfo.vip_end_date = "2099-09-09";
        obj.data.userinfo.growth.score = 99999;
        obj.data.userinfo.growth.level = 9;
        obj.data.userinfo.is_mpp_svip = 1;
        obj.data.userinfo.vip_end_time_fs = "2099-09-09 00:00:00";
        obj.data.userinfo.vip_end_days = 9999;
        obj.data.userinfo.vip_end_time_svip = "2099-09-09 00:00:00";
        obj.data.userinfo.vip_id = "mpp_svip";
    }
 }

/*
    // 处理 '/client/user/user_vip_coin' 响应
 if ($request.url.indexOf('/client/user/user_vip_coin') !== -1) {
        if (obj.data) {
            obj.data.points = 99999;
            obj.data.point = 99998;
            obj.data.stat = 99997;
        }
 }
*/

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