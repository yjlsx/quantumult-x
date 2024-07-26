[rewrite_local]
# 统一处理脚本
^https://m\.zhaopin\.com/bapi/products?at=1a31460223c04d00b888142d700fad43&rt=0f9afb358f85429ba54f4de4e041612a&platform=7&channel=&utmsource=&_v=0.97495892 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/wap\/gray\/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/template\/user-vip-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/raise\/coin\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/ask\.zhaopin\.com\/plat-zqa-server\/user\/0\.1\.0\/whoIAm url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/business\/vip\/v3 url script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilianvip.js

*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com

*/
const url = $request.url;
let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 根据 URL 判断执行不同的处理逻辑
    if (url.includes("/bapi/products?at=1a31460223c04d00b888142d700fad43&rt=0f9afb358f85429ba54f4de4e041612a&platform=7&channel=&utmsource=&_v=0.97495892")) {
        if (obj && obj.code) {
    // 遍历每个产品，修改serviceType为1
    obj.data.forEach(product => {
        product.serviceType = 1;
        product.productRealPrice = 0;
           });
        } 
    } else if (url.includes("/bapi/wap/gray/config")) {
        // 修改需要重写的字段值
        if (obj.data) {
            obj.data.Cold_resumetop_thirdpartypayment = 0;
            obj.data.zq_test_98yuan = 0;
            obj.data.capp_vip_paid_popup_effect = 1;
            obj.data.zq_resume_optimization_returnbutton = 1;
            obj.data.capp_vip_trial_one_day = 1;
            obj.data.ResumeCreateButtonNextFlow = 1;
            obj.data.Resumeoptimization_pre = 1;
            obj.data.Resume_Purpose_Analysis_M = 1;
            obj.data.Resume_Top_Order = 0;
            obj.data.zq_confirm_order = 1;
            obj.data.VIP_WeeklyCard = 1;
            obj.data.capp_5021_popover_redirect_delivery = 1;
            obj.data.zq_taskcenter_banner = 1;
            obj.data.ExpResumeTopAndUpgrade = 1;
            obj.data.capp_vip_register_popup_15day = 1;
        }
    } else if (url.includes("/bapi/template/user-vip-status")) {
        if (obj.data) {
            obj.data.showText = "免费使用所有模板";
            obj.data.vipStatus = 1;
        }
    }else if (url.includes("bapi/raise/coin/info")) {
        if (obj.data) {
// 修改字段值
    obj.data.allBalance = 99999;  // 你可以根据需要修改这个值
    obj.data.buyBalance = 99900;   // 你可以根据需要修改这个值
    obj.data.giveBalance = 99;

        }
    }else if (url.includes("/plat-zqa-server/user/0.1.0/whoIAm")) {
        if (obj.data.user) {
    obj.data.user.userCredits = 99999;  
    obj.data.user.vipStatus = 1;
        }
    }

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.error("解析 JSON 失败:", e);
    $done({ body: body });
}
