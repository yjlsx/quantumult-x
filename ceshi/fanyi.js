// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyi.js

[mitm]
hostname = docer.wps.cn, docer-api.wps.cn
*/
let body = $response.body;
let obj = JSON.parse(body);

// Check if the response is from the coupon API
if (obj.data && obj.data.total !== undefined) {
  obj.data.total = 899999;
} 
// Check if the response is from the coupon pay API
else if (obj.result && obj.msg) {
  obj.result = "ok";
  obj.msg = "使用优惠券成功";
}

body = JSON.stringify(obj);
$done({body});
