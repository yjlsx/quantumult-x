// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/account\.wps\.cn\/api\/v3\/islogin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/softbus-device\.wps\.cn\/api\/v1\/device\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js

[mitm]
hostname = docer.wps.cn, docer-api.wps.cn, tiance.wps.cn,softbus-device.wps.cn, pay.wps.cn
*/
let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

// 根据不同的 URL 修改响应体内容
if (url.includes('/v3.php/api/ios/mobile/v1/coupon')) {
  if (obj.data && obj.data.total !== undefined) {
    obj.data.total = 999999;
  }
} else if (url.includes('/dce/exec/api/market/activity')) {
  if (obj.result && obj.msg) {
    obj.result = "ok";
    obj.code = 0;
    obj.msg = "成功";
  }
} else if (url.includes('/pay_config/v1/config/member')) {
  if (obj.data && obj.data.type) {
    obj.data.type.forEach(item => {
      if (item.id === 400008 && item.payunit === "页") {
        item.enable_coupon = [10, 20, 30, 50, 75, 100, 150, 1000];
      }
    });
  }
} else if (url.includes('/api/v3/islogin')) { // 替换为实际的路径
  if (obj.companyid !== undefined) {
    obj.is_company_account = false;
  }
} else if (url.includes('/api/pay/notify/couponpay')) {
  if (obj.result && obj.msg) {
    obj.result = "ok";
    obj.msg = "使用优惠券成功";
  }
} else if (url.includes('/api/v1/device/list')) {
  // 修改 transfer_helper 为 1 和 dsc_version 为 1
  if (obj.data && obj.data.devices) {
    obj.data.devices.forEach(device => {
      if (device.additional_info && device.additional_info.allow_notifies) {
        device.additional_info.allow_notifies.transfer_helper = 1;
        device.additional_info.dsc_version = 1; // 这里的值需要根据实际需求填充
      }
      if (device.x_report) {
        device.x_report.is_mark_chan = 1;
      }
    });
  }
}

body = JSON.stringify(obj);
$done({body});
