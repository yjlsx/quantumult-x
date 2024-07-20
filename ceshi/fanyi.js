// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js 
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/account\.wps\.cn\/api\/v3\/islogin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js

[mitm]
hostname = docer.wps.cn, docer-api.wps.cn, tiance.wps.cn
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
    obj.msg = "使用优惠券成功";
  }
} else if (url.includes('/pay_config/v1/config/member')) {
  if (obj.data && obj.data.type) {
    obj.data.type.forEach(item => {
      if (item.id === 400008 && item.payunit === "页") {
        item.enable_coupon = 999999;
      }
    });
  }
} else if (url.includes('/api/v3/islogin')) { // 替换为实际的路径
  if (obj.companyid !== undefined) {
    obj.is_company_account = true;
    obj.companyid = 999999;
    obj.current_companyid = 999999;
  }
}else if (url.includes('/api/pay/notify/couponpay')) {
  obj.msg = "success";
}



body = JSON.stringify(obj);
$done({body});



