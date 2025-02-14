/**
 [rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kugou2.js


*
[mitm]
hostname = gateway.kugou.com, vip.kugou.com, gatewayretry.kugou.com, sentry.kugou.com, vipdress.kugou.com, welfare.kugou.com
 */

// 匹配包含VIP信息的JSON脚本块
const html = $response.body;
const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;

if (html) {
  try {
    // 提取原始JSON
    const match = html.match(regex);
    let jsonData = JSON.parse(match[1]);
    
    // 修改VIP核心字段
    const modifyFields = (obj) => {
      if (obj.get_vip_info_v3?.data) {
        // 基础权限
        obj.get_vip_info_v3.data.is_vip = 1;
        obj.get_vip_info_v3.data.vip_type = 4;  // 豪华VIP
        obj.get_vip_info_v3.data.svip_level = 9; // 最高等级
        
        // 时间修改
        const set2099 = (field) => obj.get_vip_info_v3.data[field] = "2099-12-31 23:59:59";
        ['vip_end_time', 'm_end_time', 'su_vip_end_time', 'annual_fee_end_time'].forEach(set2099);
        
        // 功能全开
        //obj.get_vip_info_v3.data.autoVipType = 1;
        obj.get_vip_info_v3.data.hifiAutoChargeType = 1;
        obj.get_vip_info_v3.data.promotion_tag = 1;
      }
      
      if (obj.props?.pageProps?.vipInfo) {
        // 状态同步
        obj.props.pageProps.vipInfo.is_vip = 1;
        obj.props.pageProps.vipInfo.vip_type = 4;
        obj.props.pageProps.vipInfo.svip_level = 9;
      }
    };

    // 递归修改嵌套结构
    const deepModify = (data) => {
      if (typeof data === 'object' && data !== null) {
        modifyFields(data);
        Object.values(data).forEach(deepModify);
      }
    };
    deepModify(jsonData);

    // 构造新HTML
    const newJson = JSON.stringify(jsonData).replace(/</g, '\\u003c');
    const newHtml = html.replace(regex, `<script id="__NEXT_DATA__" type="application/json">${newJson}</script>`);
    
    $done({ body: newHtml });
  } catch (e) {
    console.log(`VIP修改失败: ${e}`);
    $done({});
  }
} else {
  $done({});
}
