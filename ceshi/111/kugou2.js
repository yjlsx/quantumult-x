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

    function modifyVip(vip, path) {
      if (vip) {
        logStr += "修改路径：" + path + "\n";
        vip.is_vip = 1;
        vip.isExpiredMember = 0;
        vip.vip_type = 4;
        vip.svip_level = 9;

        // 修改所有时间字段
        const timeFields = ["m_end_time", "vip_end_time", "su_vip_end_time", "svip_y_endtime", "su_vip_y_endtime"];
        timeFields.forEach(field => {
          if (vip[field]) {
            vip[field] = "2099-12-31 23:59:59";
            logStr += `  修改 ${field} 为 2099\n`;
          }
        });

        // 设置 SVIP 权限
        vip.svip99 = 1;
        vip.svip_first_autotype76 = 1;
        vip.svip_first_autotype78 = 1;
        vip.svip_first_autotype79 = 1;
        vip.super_vip_upgrade_month = 12;
        vip.svip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        vip.su_vip_upgrade_info = { days: 9999, activity_id: 1, next_price: 0, autotype: 1, price: 0 };
        logStr += "  SVIP 权限已更新\n";
      } else {
        logStr += `路径 ${path} 数据为空\n`;
      }
    }

    // 调试：打印 props.pageProps.state 的内容
    if (initState.props && initState.props.pageProps && initState.props.pageProps.state) {
      logStr += "props.pageProps.state 存在\n";
      console.log("props.pageProps.state:", initState.props.pageProps.state);

      // 检查 funsionData
      if (initState.props.pageProps.state.funsionData) {
        logStr += "找到 funsionData\n";
        if (initState.props.pageProps.state.funsionData.data &&
            initState.props.pageProps.state.funsionData.data.data &&
            initState.props.pageProps.state.funsionData.data.data.get_vip_info_v3 &&
            initState.props.pageProps.state.funsionData.data.data.get_vip_info_v3.data
        ) {
          modifyVip(
            initState.props.pageProps.state.funsionData.data.data.get_vip_info_v3.data,
            "props.pageProps.state.funsionData.data.data.get_vip_info_v3.data"
          );
        } else {
          logStr += "funsionData 中未找到 VIP 信息\n";
        }
      } else {
        logStr += "未找到 funsionData\n";
      }
    } else {
      logStr += "未找到 props.pageProps.state\n";
    }

    // 检查 initialState.dataVip
    if (initState.initialState && initState.initialState.dataVip && initState.initialState.dataVip.data) {
      modifyVip(initState.initialState.dataVip.data, "initialState.dataVip.data");
    } else {
      logStr += "未找到 initialState.dataVip\n";
    }

    // 更新响应体
    obj.data["{initState}"] = JSON.stringify(initState);
    logStr += "{initState} 已更新\n";
    
    $notify("VIP 修改成功", "", logStr);
    console.log(logStr);
    $done({ body: JSON.stringify(obj) });
  } else {
    logStr += "未找到 {initState} 节点\n";
    $notify("脚本通知", "无目标节点", logStr);
    $done({ body });
  }
} catch (e) {
  logStr += "脚本执行异常：" + e.message;
  $notify("脚本错误", e.name, e.message);
  $done({ body });
}

