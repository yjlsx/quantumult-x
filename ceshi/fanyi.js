// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js 
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js

[mitm]
hostname = docer.wps.cn, docer-api.wps.cn
*/

let body = $response.body;
let obj = JSON.parse(body);

// Check if the response is from the coupon API and modify 'total'
if (obj.data && obj.data.total !== undefined) {
  obj.data.total = 899999;
} 
// Check if the response is from the coupon pay API and modify 'result' and 'msg'
else if (obj.result && obj.msg) {
  obj.result = "ok";
  obj.msg = "使用优惠券成功";
} 
// Check if the response is from the product or service detail API and modify 'enable_coupon'
else if (obj.data && obj.data.type) {
  obj.data.type.forEach(item => {
    if (item.id === 400008 && item.payunit === "页") {
      // Modify the necessary fields
      item.enable_coupon = [10, 20, 30, 50, 75, 100, 150, 1000];
    }
  });
}

// Check if the response has a specific structure indicating an error message and modify 'result', 'code', and 'msg'
if (obj.result === "ok" && obj.code === 5005003 && obj.msg === "用户不属于任何人群活动") {
  obj.code = 0;
  obj.msg = "用户属于人群活动";
}

body = JSON.stringify(obj);
$done({body});
