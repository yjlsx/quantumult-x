// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/www\.fanyigou\.com\/users\/userInfoNew\/app\/getNewIndexInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/users\/userInfoNew\/app\/getBaseUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/payment\/vipTypeSpecial\/getIosList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/sdoc\/web\/getMyTranslate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/payment\/iosPay\/afterBuyTimeChick url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/qxscore\/trans\/getComputeInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js
^https:\/\/www\.fanyigou\.com\/sdoc\/web\/checkReTransForBilingual url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fanyigou.js

[mitm]
hostname = www.fanyigou.com
*/
let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

// 根据不同的 URL 修改响应体内容
if (url.includes('users/userInfoNew/app/getNewIndexInfo')) {
    obj.data.vipScore = 999999;
    obj.data.transalteNum = 9999;
    obj.data.orserEarnScore = 9999;
    obj.data.memberAuthority.exclusiveCustomerService = 1;
    obj.data.memberAuthority.fastTransPower = 1;
    obj.data.memberAuthority.termCount = 1000;
    obj.data.memberAuthority.rubbishTime = 20;
    obj.data.memberAuthority.transAllLanguage = 1;
    obj.data.memberAuthority.corpusCount = 1000;
    obj.data.memberAuthority.pdfCount = -1;
    obj.data.memberAuthority.freeRecover = 1;
    obj.data.memberAuthority.drawWorldCount =  -1;
    obj.data.transRead = 1;
    obj.data.userScoreDetail.tempNotContainVipScore = 9999;
    obj.data.userScoreDetail.latelyTempScore = 9999;
    obj.data.userScoreDetail.latelyDays = 35;
    obj.data.userScoreDetail.vipPage = 999999;
    obj.data.userScoreDetail.vipPageTime = 999999;
    obj.data.userScoreDetail.permanentScore = 99999;
    obj.data.userScoreDetail.vipScore = 99999;
    obj.data.userScoreDetail.preMonthExprie = 99;
    obj.data.userScoreDetail.score = 99999;
    obj.data.memberCoin = 999999;
    obj.data.memberType.expireTime = "2099-12-31";
    obj.data.memberType.memberType = "vip";
    obj.data.expireDays = 99999999;
    obj.data.commonWeal = "1";
    obj.data.mothExprie = 99999;
    obj.data.userVoApp.type = 1;
    obj.data.userVoApp.ticket = "vip";
} 
if (url.includes('/userInfoNew/app/getBaseUserInfo')) {
   obj.data.memberStatus.memberType = "vip";
  obj.data.memberStatus.memberUpgradeBoxStatus = 1;
}
if (url.includes('/userInfoNew/app/getBaseUserInfo')) {
   obj.data.forEach(item => {
     item.vipMoney = "0";
     item.isVip = 1;
     item.newUserMoney = "0";
     item.money = "0";
     item.isNewUser = 1;
  });
}

if (url.includes('/sdoc/web/getMyTranslate')) {
   obj.data.total = 99999;
}
if (url.includes('/payment/iosPay/afterBuyTimeChick')) {
   obj.code = 0;
   obj.ok = true;
   obj.msg = "请求成功";
}
if (url.includes('/qxscore/trans/getComputeInfo')) {
   obj.data.computeScoreVo.freePageCount = 99999;
   obj.data.computeScoreVo.isEnough = 1;
   obj.data.computeScoreVo.payStatus = 1;
   obj.data.computeScoreVo.payCount = 0;
   obj.data.computePageVo.freePageCount =999999;
   obj.data.computePageVo.isEnough = 1;
   obj.data.computePageVo.payStatus = 1;
   obj.data.computePageVo.payCount = 0;
   obj.data.scoreAccountInfoVo.isVipUser = 1;
   obj.data.scoreAccountInfoVo.score = 99999;
   obj.data.scoreAccountInfoVo.specailPage = 999999;
   obj.data.scoreAccountInfoVo.page = 9999;
}

if (url.includes('/sdoc/web/checkReTransForBilingual')) {
    obj.code = 0;
    obj.data.canReTrans = 999999;
    obj.msg = "已付费";
    obj.ok = true;
} 

body = JSON.stringify(obj);
$done({body});

