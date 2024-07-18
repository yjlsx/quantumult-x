[rewrite_local]
# 统一处理脚本
^https://m\.zhaopin\.com/bapi/products url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https://m\.zhaopin\.com/bapi/wap/gray/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js


*
[mitm]
hostname = proxyweb.yiwenjy.com

*/
const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 根据 URL 判断执行不同的处理逻辑
if (url.includes("/bapi/products") ) {
      if (obj && obj.productName === "30天单月卡") {
    // 第一个产品的设置
    if (obj.productActionDTOList && obj.productActionDTOList.length > 0) {
        obj.productActionDTOList.forEach(action => {
            action.discountAmount = "275.2";
            action.discountRatio = "1";
            action.productRealPrice = "0";
        });
      }
    } else if (obj && obj.productName === "60天双月卡") {
    // 第二个产品的设置
    if (obj.productActionDTOList && obj.productActionDTOList.length > 1) {
        obj.productActionDTOList[1].discountAmount = "550.4";
        obj.productActionDTOList[1].discountRatio = "1";
        obj.productActionDTOList[1].productRealPrice = "0";
    }
  }
}

if (url.includes("/bapi/wap/gray/config") {
    // 修改需要重写的字段值
    obj.data.old_resumetop_thirdpartypayment = 0;
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


$done({ body: JSON.stringify(obj) });
