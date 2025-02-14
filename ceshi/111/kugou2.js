/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */

// 匹配包含VIP信息的JSON脚本块
// Quantumult X 重写脚本示例
// Quantumult X 重写脚本：修改普通 VIP 和 SVIP 信息
let obj = JSON.parse($response.body);

// 解析 initState，JSON 可能被嵌套在 data["{initState}"] 里
if (obj.data && obj.data["{initState}"]) {
  let initState = JSON.parse(obj.data["{initState}"]);

  // 统一修改 VIP & SVIP 信息
  function modifyVip(vip) {
    if (vip) {
      vip.is_vip = 1; // 标记为 VIP
      vip.isExpiredMember = 0; // 会员未过期
      vip.vip_type = 4; // 设为普通 VIP
      vip.svip_level = 9; // 设定 SVIP 等级（最高级别）

      // 设置 VIP 和 SVIP 结束时间为 2099 年
      if (vip.m_end_time) vip.m_end_time = "2099-12-31 23:59:59";
      if (vip.vip_end_time) vip.vip_end_time = "2099-12-31 23:59:59";
      if (vip.su_vip_end_time !== undefined) vip.su_vip_end_time = "2099-12-31 23:59:59";
      if (vip.svip_y_endtime) vip.svip_y_endtime = "2099-12-31 23:59:59";
      if (vip.su_vip_y_endtime) vip.su_vip_y_endtime = "2099-12-31 23:59:59";

      // 启用所有 SVIP 相关权限
      vip.svip99 = 1; // SVIP 专属标识
      vip.svip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
      vip.su_vip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
    }
  }

  // 修改 funsionData 里的 VIP 信息
  if (initState.funsionData && initState.funsionData.data &&
      initState.funsionData.data.data &&
      initState.funsionData.data.data.get_vip_info_v3 &&
      initState.funsionData.data.data.get_vip_info_v3.data) {
    modifyVip(initState.funsionData.data.data.get_vip_info_v3.data);
  }

  // 修改顶层 vipInfo 数据
  if (initState.vipInfo) {
    modifyVip(initState.vipInfo);
  }

  // 修改 initialState.dataVip 数据
  if (initState.initialState && initState.initialState.dataVip &&
      initState.initialState.dataVip.data) {
    modifyVip(initState.initialState.dataVip.data);
  }

  // 重新序列化数据
  obj.data["{initState}"] = JSON.stringify(initState);
}

$done({ body: JSON.stringify(obj) });
