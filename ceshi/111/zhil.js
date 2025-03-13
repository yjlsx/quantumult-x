/*
[rewrite_local]
# 统一处理脚本
^https://m\.zhaopin\.com/bapi/products?at=1a31460223c04d00b888142d700fad43&rt=0f9afb358f85429ba54f4de4e041612a&platform=7&channel=&utmsource=&_v=0.97495892 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/wap\/gray\/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/template\/user-vip-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/raise\/coin\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/ask\.zhaopin\.com\/plat-zqa-server\/user\/0\.1\.0\/whoIAm url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https://m\.zhaopin\.com/bapi/resume/top/order/info/v3 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https://m\.zhaopin\.com/bapi/vip/privilege/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/vip\/buy\/gray url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/
(function() {
    // 获取原始响应体
    const url = $request.url;
    let body = $response.body;

    try {
        let obj = JSON.parse(body);

        // 根据 URL 判断执行不同的处理逻辑
        if (url.includes("/bapi/products")) {
            if (obj && obj.code && obj.data) {
                // 遍历每个产品，修改字段值
                obj.data.forEach(product => {
                    product.serviceType = 1;
                    product.productRealPrice = 0;
                });
            }
        } else if (url.includes("/bapi/wap/gray/config")) {
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
        } else if (url.includes("/bapi/raise/coin/info")) {
            if (obj.data) {
                obj.data.allBalance = 99999;
                obj.data.buyBalance = 99900;
                obj.data.giveBalance = 99;
            }
        } else if (url.includes("/plat-zqa-server/user/0.1.0/whoIAm")) {
            if (obj.data && obj.data.user) {
                obj.data.user.userCredits = 99999;
                obj.data.user.vipStatus = 1;
            }
        }else if (url.includes("/bapi/resume/top/order/info/v3")) {
            if (obj.data && obj.data.serviceEndTime) {
                obj.data.serviceEndTime = 4102415999000;
                obj.data.serviceStatus = 1;
                obj.data.orderResumeTopStatus = 1;
            }
        }else if (url.includes("/bapi/vip/privilege/info")) {
            if (obj.data && obj.data.resumeRefreshSurplusDays) {
                //obj.data.resumeRefreshSurplusDays = 99999;
                //obj.data.deliveryReplySurplusCount = 99999;
                //obj.data.resumeTopSurplusDays = 99999;
            }
       } else if (url.includes("/bapi/vip/buy/gray")) {
            if (obj.data) {
                obj.data = true;
            }
       } else if (url.includes("/bapi/order/creation")) {
            obj.code = 200;
            obj.message = "支付成功";
       } 


        // 返回修改后的响应体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.error("解析 JSON 失败:", e);
        $done({ body: body });
    }
})();
