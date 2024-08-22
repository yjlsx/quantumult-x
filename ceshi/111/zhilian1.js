/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/coupon\/user\/own\?at= url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

if (url.includes('https://m.zhaopin.com/bapi/coupon/user/own?at=')) {
    if (obj.data && obj.data.list) {
        let newItem = {
            "couponExtendInfo": null,
            "expire": false,
            "useLimitStartTime": 1723651200000,
            "userUseTime": 0,
            "userUseStatus": 0,
            "vipCouponType": 1,
            "userReceiveTime": 1724295244101,
            "discountAmount": 50000,
            "isAppointProduct": 1,
            "isValid": 1,
            "pictureUrl": "https://storage-public.zhaopin.cn/zhiq/1723535988157799788/icon_%E7%AE%80%E5%8E%86%E4%BC%98%E5%8C%96%403x.png?w=96&h=96&r=3",
            "name": "简历优化优惠券",
            "isCountLimit": 0, //限制次数
            "showName": "加速求职专属券",
            "couponStatus": 1,
            "useLimitTime": 259200000,
            "userReceiveLimitCount": 2, //领取限制原-1
            "couponType": 2,
            "shareCode": "dd1938af24204b61b14443930be7e148",
            "jumpUrl": null,
            "surplusCount": 7074,
            "useConditionAmount": 3880,
            "userReceiveCouponCode": "df32394141784fce89718b451552b337",
            "useLimitEndTime": 1759161600000,
            "desc": "满388元可用",
            "expireTime": 4102354444101,
            "marketingText": null,
            "couponProductInfoDataList": null,
            "userReceiveStatus": 1
        };
        
        obj.data.list.push(newItem);
    }
} 





body = JSON.stringify(obj);
$done({body});
