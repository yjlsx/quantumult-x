// Quantumult X rewrite script

[rewrite_local]
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ceshi.js

[mitm]
hostname = docer.wps.cn


let body = $response.body;
let obj = JSON.parse(body);

obj.data.total = 999999;

body = JSON.stringify(obj);
$done({body});
