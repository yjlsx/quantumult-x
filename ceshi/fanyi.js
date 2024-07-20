// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js 

[mitm]
hostname = docer.wps.cn, docer-api.wps.cn
*/

let body = $response.body;
let obj = JSON.parse(body);

// Check if the response is from the coupon API
if (obj.data && obj.data.total !== undefined) {
  obj.data.total = 999999;
} 
// Check if the response is from the coupon pay API
else if (obj.result && obj.msg) {
  obj.result = "ok";
  obj.msg = "使用优惠券成功";
} 
// Check if the response contains the specific fields indicating the product or service detail
else if (obj.data && obj.data.type) {
  obj.data.type.forEach(item => {
    if (item.id === 400008 && item.payunit === "页") {
      // Modify the necessary fields
      item.enable_coupon = [10, 20, 30, 50, 75, 100, 150, 1000];
    }
  });
}

body = JSON.stringify(obj);
$done({body});

