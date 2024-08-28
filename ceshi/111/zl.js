/*
[rewrite_local]
# 统一处理脚本
^https:\/\/cgate\.zhaopin\.com\/mbTrade\/account\/getCommercialMode url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zl.js
^https:\/\/cgate\.zhaopin\.com\/mbTrade\/queryAsset\/queryCouponList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zl.js
^https:\/\/cgate\.zhaopin\.com\/mbTrade\/queryAsset\/queryCouponList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zl.js



*
[mitm]
hostname = cgate.zhaopin.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

if (url.includes('/mbTrade/account/getCommercialMode')) {
    obj.data = {
     "payUser" : true,
      "postPay" : true,
      "rightUser" : true
        }
}
if (url.includes('/queryAsset/queryCouponList')) {
      obj.data.page = {
        "pageIndex" : 1,
        "pageSize" : 200,
        "total" : 99999,
        "totalPage" : 99997
      };
}

if (url.includes('/listAggregateCoupon')) {
    obj.data.couponCount = 99995;
}

body = JSON.stringify(obj);
$done({body});