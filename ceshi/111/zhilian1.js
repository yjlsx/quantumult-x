/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/coupon\/user\/own\?at= url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/details url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js
^https:\/\/dispatch-api-online\.vemarsdev\.com\/mars\/license\/check url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js
^https:\/\/ask\.zhaopin\.com\/plat-zqa-server\/zhiQCoin  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilian1.js




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
            "discountAmount": 90000,
            "isAppointProduct": 1,
            "isValid": 1,
            "pictureUrl": "https://storage-public.zhaopin.cn/zhiq/1723535988157799788/icon_%E7%AE%80%E5%8E%86%E4%BC%98%E5%8C%96%403x.png?w=96&h=96&r=3",
            "name": "简历优化优惠券",
            "isCountLimit": 0, //限制次数
            "showName": "加速求职专属券",
            "couponStatus": 1,
            "useLimitTime": 259200000,
            "userReceiveLimitCount": 99, //领取限制原-1
            "couponType": 2,
            "shareCode": "dd1938af24204b61b14443930be7e148",
            "jumpUrl": null,
            "surplusCount": 7074,
            "useConditionAmount": 0, //使用条件
            "userReceiveCouponCode": "df32394141784fce89718b451552b337",
            "useLimitEndTime": 1759161600000,
            "desc": "满0元可用",
            "expireTime": 4102354444101,
            "marketingText": null,
            "couponProductInfoDataList": null,
            "userReceiveStatus": 1
        };     
        obj.data.list.push(newItem);
    obj.data.list.forEach(item => {
        item.userReceiveLimitCount = 99;
        item.discountAmount = 90000;
        item.useConditionAmount = 0;
        item.expireTime = 4102354444101;
        item.desc = "满0元可用";
    });
    }
} 


if (url.includes('https://m.zhaopin.com/bapi/order/creation')) {
        obj.code = 200;
}

if (url.includes('https://m.zhaopin.com/bapi/order/details')) {
        obj.code = 200;
        obj.data.orderStatus = "PAY_SUCCESS"; 
        obj.data.orderStatusDesc = "已付款"; 
        obj.data.expireTime = 4102354444101;
        obj.data.payTime = obj.data.currentTime;
        obj.data.realPrice = "0";
        obj.data.couponCutoff = "0";
        //obj.data.detailsCutoffTotal = obj.data.originPriceTotal;
        obj.data.salaryIncreaseCoinCutoff = obj.data.orderDetailProductDTO.productRealPrice;
        obj.data.showProxyDeliveryEntrance = true;
        obj.data.showProductPrivilegeEntrance = true;
}

if (url.includes('https://m.zhaopin.com/bapi/order/list')) {
     if (obj && obj.data && obj.data.orderListDTOList) {
  obj.data.orderListDTOList.forEach(order => {
    order.realPrice = "0";
         });
     }
}

if (url.includes('https://dispatch-api-online.vemarsdev.com/mars/license/check')) {
    obj.error = 0;
}


if (url.includes('https://ask.zhaopin.com/plat-zqa-server/zhiQCoin')) {
    obj.data.balance = 99999;
}



body = JSON.stringify(obj);
$done({body});
