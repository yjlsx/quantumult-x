/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */

// 匹配包含VIP信息的JSON脚本块
// Quantumult X 重写脚本：修改 VIP 和 SVIP 信息（含日志显示）
// Quantumult X 重写脚本：修改 VIP 和 SVIP 信息（含日志显示）
let body = $response.body;
let logStr = "";
try {
  let obj = JSON.parse(body);
  logStr += "响应体解析成功\n";
  
  if (obj.data && obj.data["{initState}"]) {
    let initState = JSON.parse(obj.data["{initState}"]);
    logStr += "找到 {initState} 节点\n";
    
    // 定义修改 VIP / SVIP 信息的函数
    function modifyVip(vip, path) {
      if (vip) {
        logStr += "修改路径：" + path + "\n";
        vip.is_vip = 1;
        vip.isExpiredMember = 0;
        vip.vip_type = 4;
        vip.svip_level = 9;
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
    
    // 修改 funsionData 中的 VIP 信息
    if (initState.funsionData && initState.funsionData.data &&
        initState.funsionData.data.data &&
        initState.funsionData.data.data.get_vip_info_v3 &&
        initState.funsionData.data.data.get_vip_info_v3.data) {
      modifyVip(initState.funsionData.data.data.get_vip_info_v3.data, "funsionData.data.data.get_vip_info_v3.data");
    } else {
      logStr += "funsionData 中未找到 VIP 信息\n";
    }
    
    // 修改顶层 vipInfo 数据
    if (initState.vipInfo) {
      modifyVip(initState.vipInfo, "vipInfo");
    } else {
      logStr += "未找到顶层 vipInfo 数据\n";
    }
    
    // 修改 initialState.dataVip 数据
    if (initState.initialState && initState.initialState.dataVip && initState.initialState.dataVip.data) {
      modifyVip(initState.initialState.dataVip.data, "initialState.dataVip.data");
    } else {
      logStr += "initialState.dataVip 中未找到 VIP 信息\n";
    }
    
    obj.data["{initState}"] = JSON.stringify(initState);
    logStr += "修改后的 {initState} 已更新\n";
    
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