/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */

// 匹配包含VIP信息的JSON脚本块
let body = $response.body;
let logStr = "";
try {
  let obj = JSON.parse(body);
  logStr += "响应体解析成功\n";

  if (obj.data && obj.data["{initState}"]) {
    let initState = JSON.parse(obj.data["{initState}"]);
    logStr += "找到 {initState} 节点\n";
    logStr += "initState 内容： " + JSON.stringify(initState) + "\n";

    function modifyVip(vip, path) {
      if (vip) {
        logStr += "修改路径：" + path + "\n";
        vip.is_vip = 1;
        vip.isExpiredMember = 0;
        vip.vip_type = 4;
        vip.svip_level = 9;

        const timeFields = ["m_end_time", "vip_end_time", "su_vip_end_time", "svip_y_endtime", "su_vip_y_endtime"];
        timeFields.forEach(field => {
          if (vip[field]) {
            vip[field] = "2099-12-31 23:59:59";
            logStr += `  修改 ${field} 为 2099\n`;
          }
        });

        vip.svip99 = 1;
        vip.svip_first_autotype76 = 1;
        vip.svip_first_autotype78 = 1;
        vip.svip_first_autotype79 = 1;
        vip.super_vip_upgrade_month = 12;
        vip.svip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        vip.su_vip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        logStr += "  SVIP字段更新完成\n";
      } else {
        logStr += `路径 ${path} 数据为空\n`;
      }
    }

    // 检查 funsionData 中的 VIP 信息
    if (initState.props?.pageProps?.state?.funsionData?.data?.data?.get_vip_info_v3?.data) {
      modifyVip(initState.props.pageProps.state.funsionData.data.data.get_vip_info_v3.data, 
                "props.pageProps.state.funsionData.data.data.get_vip_info_v3.data");
    } else {
      logStr += "未找到 funsionData 中的 VIP 信息\n";
    }

    // 检查 vipInfo 的正确路径
    if (initState.props?.pageProps?.state?.vipInfo) {
      modifyVip(initState.props.pageProps.state.vipInfo, "props.pageProps.state.vipInfo");
    } else {
      logStr += "未找到顶层 vipInfo\n";
    }

    // 检查 initialState.dataVip 的正确路径
    if (initState.initialState?.dataVip?.data) {
      modifyVip(initState.initialState.dataVip.data, "initialState.dataVip.data");
    } else {
      logStr += "未找到 initialState.dataVip\n";
    }

    // 更新响应体
    obj.data["{initState}"] = JSON.stringify(initState);
    logStr += "{initState} 已更新\n";
    
    $notify("VIP修改成功", "", logStr);
    console.log(logStr);
    $done({ body: JSON.stringify(obj) });
  } else {
    logStr += "响应体中未找到 {initState} 节点\n";
    $notify("脚本通知", "无目标节点", logStr);
    $done({ body });
  }
} catch (e) {
  logStr += "脚本执行异常：" + e.message;
  $notify("脚本错误", e.name, e.message);
  $done({ body });
}