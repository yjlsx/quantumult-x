/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */
const timestamp = Math.floor(Date.now() / 1000);
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('gateway.kugou.com/vipcenter/ios')) {
    if (obj.data && obj.data["{initState}"]) {
       let initState = JSON.parse(obj.data["{initState}"]);

    // 确认有 get_vip_info_v3 数据
    if (initState.props && initState.props.pageProps && initState.props.pageProps.state &&
        initState.props.pageProps.state.funsionData && initState.props.pageProps.state.funsionData.data &&
        initState.props.pageProps.state.funsionData.data.get_vip_info_v3) {
        
        let vipInfo = initState.props.pageProps.state.funsionData.data.get_vip_info_v3.data;
        
        // 修改 VIP 状态
        vipInfo.is_vip = 1;  // 设置为 VIP
        vipInfo.isExpiredMember = 0;  // 不是过期会员
        vipInfo.vip_type = 4;  // 设置 VIP 类型
        vipInfo.vip_begin_time = "2024-07-28 00:06:08";  // 开始时间不变
        vipInfo.vip_end_time = "2099-12-31 23:59:59";  // 修改 VIP 结束时间
        vipInfo.svip_level = 8;  // 假设 SVIP 等级设为最高
        vipInfo.svip_first_autotype79 = 1;  // 确保相关标识为有效
    }

    // 更新原始数据
    obj.data["{initState}"] = JSON.stringify(initState);
    }
}

$done({ body: JSON.stringify(obj) });
