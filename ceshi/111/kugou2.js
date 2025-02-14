/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */

// 匹配包含VIP信息的JSON脚本块
// Quantumult X 重写脚本：修改 VIP 和 SVIP 信息（含更详细的调试日志）
let body = $response.body;
let logStr = "";
try {
  let obj = JSON.parse(body);  // 解析响应体
  logStr += "响应体解析成功\n";

  if (obj.data && obj.data["{initState}"]) {
    let initState = JSON.parse(obj.data["{initState}"]);
    logStr += "找到 {initState} 节点\n";
    
    // 输出完整的 initState 内容到日志，帮助定位数据结构
    logStr += "initState 内容： " + JSON.stringify(initState).slice(0, 300) + "...\n";
    
    // 修改 VIP / SVIP 信息的函数
    function modifyVip(vip, path) {
      if (vip) {
        logStr += "修改路径：" + path + "\n";
        vip.is_vip = 1;               // 设置为 VIP
        vip.isExpiredMember = 0;      // 设置为未过期
        vip.vip_type = 4;             // 普通 VIP
        vip.svip_level = 9;           // 设置 SVIP 等级为最高

        // 修改时间字段为 2099 年
        if (vip.m_end_time) {
          vip.m_end_time = "2099-12-31 23:59:59";
          logStr += "  修改 m_end_time 为 2099-12-31 23:59:59\n";
        }
        if (vip.vip_end_time) {
          vip.vip_end_time = "2099-12-31 23:59:59";
          logStr += "  修改 vip_end_time 为 2099-12-31 23:59:59\n";
        }
        if (vip.su_vip_end_time !== undefined) {
          vip.su_vip_end_time = "2099-12-31 23:59:59";
          logStr += "  修改 su_vip_end_time 为 2099-12-31 23:59:59\n";
        }
        if (vip.svip_y_endtime) {
          vip.svip_y_endtime = "2099-12-31 23:59:59";
          logStr += "  修改 svip_y_endtime 为 2099-12-31 23:59:59\n";
        }
        if (vip.su_vip_y_endtime) {
          vip.su_vip_y_endtime = "2099-12-31 23:59:59";
          logStr += "  修改 su_vip_y_endtime 为 2099-12-31 23:59:59\n";
        }

        // 启用 SVIP 权限
        vip.svip99 = 1;
        vip.svip_first_autotype76 = 1;
        vip.svip_first_autotype78 = 1;
        vip.svip_first_autotype79 = 1;
        vip.super_vip_upgrade_month = 12;
        vip.svip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        vip.su_vip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        logStr += "  修改 SVIP 相关字段完成\n";
      } else {
        logStr += "路径 " + path + " 的数据为空\n";
      }
    }
    
    // 检查 funsionData 中的 VIP 信息
    if (initState.funsionData && initState.funsionData.data &&
        initState.funsionData.data.data &&
        initState.funsionData.data.data.get_vip_info_v3 &&
        initState.funsionData.data.data.get_vip_info_v3.data) {
      modifyVip(initState.funsionData.data.data.get_vip_info_v3.data, "funsionData.data.data.get_vip_info_v3.data");
    } else {
      logStr += "funsionData 中未找到 VIP 信息\n";
    }
    
    // 检查顶层 vipInfo 数据
    if (initState.vipInfo) {
      modifyVip(initState.vipInfo, "vipInfo");
    } else {
      logStr += "未找到顶层 vipInfo 数据\n";
    }
    
    // 检查 initialState 内 dataVip 数据
    if (initState.initialState && initState.initialState.dataVip && initState.initialState.dataVip.data) {
      modifyVip(initState.initialState.dataVip.data, "initialState.dataVip.data");
    } else {
      logStr += "initialState.dataVip 中未找到 VIP 信息\n";
    }
    
    // 更新响应体
    obj.data["{initState}"] = JSON.stringify(initState);
    logStr += "修改后的 {initState} 已更新\n";
    
    // 输出日志到通知和控制台
    $notify("重写脚本执行成功", "", logStr);
    console.log(logStr);
    $done({ body: JSON.stringify(obj) });
  } else {
    logStr += "响应体中未找到 {initState} 节点，直接返回原始响应\n";
    $notify("重写脚本", "未匹配到 {initState}", logStr);
    console.log(logStr);
    $done({ body });
  }
} catch (e) {
  logStr += "脚本执行异常：" + e.name + " - " + e.message;
  $notify("重写脚本错误", e.name, e.message);
  console.log(logStr);
  $done({ body });
}
