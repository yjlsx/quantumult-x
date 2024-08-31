/*
[rewrite_local]
# 统一处理脚本
^https:\/\/rmonitor\.qq\.com\/v1\/591fea8c3d\/upload-json?nonce url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/tengxunhuiyi.js
^https:\/\/meeting\.tencent\.com\/wemeet-webapi\/v2\/corp\/corp\/corp-pay-tag url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/tengxunhuiyi.js
^https:\/\/meeting\.tencent\.com\/wemeet-tapi\/v2\/pay-logic\/person\/invoice\/recent-taxpayer-record url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/tengxunhuiyi.js
^https:\/\/meeting\.tencent\.com\/wemeet-webapi\/v2\/account\/profile\/change-account url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/tengxunhuiyi.js
^https:\/\/meeting\.tencent\.com\/v2\/api\/buy\/query-info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/tengxunhuiyi.js

*
[mitm]
hostname = rmonitor.qq.com, meeting.tencent.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

if (url.includes('/upload-json?nonce')) {
     obj.limit_expiration_time = 4102358400;

}

if (url.includes('/wemeet-webapi/v2/corp/corp/corp-pay-tag')) {
    obj.data.user_pay_tag.status = 1;
    obj.data.user_pay_tag.end_time = "2099-12-31";
    obj.data.user_pay_tag.is_highest_level = 1;
    obj.data.user_pay_tag.pro_level = 1;
    obj.data.user_pay_tag.tag_type = 1;
    obj.data.end_time = "2099-12-31";
    obj.data.business_end_time = "2099-12-31";
    obj.data.end_time_timestamp = 4102358400;
    obj.data.status = 1;
    obj.data.pay_type = 1;
}


if (url.includes('/wemeet-tapi/v2/pay-logic/person/invoice/recent-taxpayer-record')) {
    obj.code = 0;
}

if (url.includes('/wemeet-webapi/v2/account/profile/change-account')) {
    obj.data.is_can_change_account = true;
    obj.data.personal_account_detail.pay_tag = "1";
    obj.data.personal_account_detail.account_type = 1;
    obj.data.personal_account_detail.pay_tag_status = "1";
    obj.data.is_corp_user = true;
    obj.data.can_create_org = true;
    obj.data.org_gray_status = 1;
}


if (url.includes('/v2/api/buy/query-info')) {
    obj.adminType = 1;
    obj.isWeworkAdmin = 1;
    obj.userPayInfo.first_buy_flag = 1;
    obj.userPayInfo.expire_days = 999;
    obj.userResourceInfo.first_buy_flag = 1;
    obj.userResourceInfo.expire_days = 999;
}


body = JSON.stringify(obj);
$done({ body });
