/**************************
 *  * @Author: yjlsx
 * @LastMod: 2024-09-02

********************************
********************************

[mitm]
hostname = errlog.umeng.com, api.gongkaoleida.com

[rewrite_local]
https:\/\/api\.gongkaoleida\.com\/api url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/gkld.js
https:\/\/errlog\.umeng\.com\/api\/crashsdk\/logcollect url reject
//https:\/\/api\.gongkaoleida\.com\/api\/v.+\/my\/index url reject
https:\/\/api\.gongkaoleida\.com\/api\/v.+\/sets\/getAllTips url reject
https:\/\/api\.gongkaoleida\.com\/api\/v.+\/ad\/info url reject
 ***************/

let status = isJSON($response.body);
let requestUrl = $request.url;
var obj = status
  ? JSON.parse(
      removeExtraSpaces($response.body)
        .replace(/\"isAuth\":false/g, '"isAuth":true')
        .replace(/\"isValid\":\w+/g, '"isValid":1')
        .replace(/\"isValid\":\"0\"/g, '"isValid":1')
        .replace(/\"isAuth\":\w+/g, '"isAuth":1')
        .replace(/\"isAuth\":\"0\"/g, '"isAuth":1')
        .replace(/\"isVip\":\w+/g, '"isVip":1')
        .replace(/\"isVip\":\"0\"/g, '"isVip":1')
        .replace(/\"vipGrade\":\w+/g, '"vipGrade":2')
        .replace(/\"vipGrade\":\"0\"/g, '"vipGrade":2')
        .replace(/\"vipExpire\":\w+/g, '"vipExpire":4102358400')
        .replace(/\"vipExpire\":\"0\"/g, '"vipExpire":4102358400')
        .replace(/\"jobBianzhiOpt\":0/g, '"jobBianzhiOpt":1')
        .replace(/\"status\":\w+/g, '"status":1')
    )
  : $response.body;
if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/user\/getInfo?/.test(requestUrl)
) {
  obj.data.userInfo.nickname = obj.data.userInfo.nickname;
  obj.data.userInfo.vipGrade = 2;
  obj.data.userInfo.vipExpire = 4102358400;  
  obj.data.userInfo.isVip = 1;
  obj.data.userInfo.homePageStatus = 1;
  obj.data.userInfo.recommendStatus = 1;
  obj.data.userInfo.vipGradeList = [
    {
      vipExpire: 4102358400,
      vipGradeName: "黄金VIP",
      vipGrade: 1,
      remainDays: 99999,
      isVip: 1,
    },
    {
      vipExpire: 4102358400,
      vipGradeName: "星钻VIP",
      vipGrade: 2,
      remainDays: 99999,
      isVip: 1,
    },
  ];
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/sets\/getFilterResult?/.test(
    requestUrl
  )
) {
  obj.data.jobStaff.vipGrade = 2;
  obj.data.articleStaff.vipGrade = 2;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/home\/v5\/index?/.test(
    requestUrl
  )
) {
  obj.data.needAuth = [ ];

} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/getOrderSelect?/.test(
    requestUrl
  )
) {
  obj.data.content = content" : [
      {
        "cid" : 0,
        "text" : "推荐",
        "vipAuthKey" : ""
      },
      {
        "cid" : 2,
        "text" : "最新",
        "vipAuthKey" : ""
      },
      {
        "cid" : 1,
        "text" : "匹配度",
        "vipAuthKey" : ""
      },
      {
        "cid" : 4,
        "text" : "有编制优先",
        "vipAuthKey" : " "
      },
      {
        "cid" : 5,
        "text" : "热度低优先",
        "vipAuthKey" : " "
      },
      {
        "cid" : 7,
        "text" : "距离近优先",
        "vipAuthKey" : " "
      },
      {
        "cid" : 3,
        "text" : "招录人数多优先",
        "vipAuthKey" : ""
      }
    ];

} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/exam\/getExamList?/.test(
    requestUrl
  )
) {
  obj.data.isValid = 1;
  obj.data.result.status = 200;
  obj.data.vipAuthList.articleBianzhiSort = 1;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/exam\/jobSearchList?/.test(
    requestUrl
  )
) {
  obj.data.isValid = 1;
  obj.data.result.status = 200;
  obj.data.vipAuthList.jobBianzhiOpt = 1;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/my\/vipCardInfo?/.test(
    requestUrl
  )
) {
  obj.data.btnScheme = "gkld://gongkaoleida/vipMemberCenter?param1=1&param2=167";
  obj.data.greetingMsg = "尊贵的星钻VIP用户，您好~";
  obj.data.bottomType = 2;
  obj.data.vipGrade = 2;
  obj.data.btnText = "立即查看";
  obj.data.bottomList = [
        {
        "iconUrl" : "https://static.gongkaoleida.com/2023/media/images/20230627161040COMKfO.png",
        "text" : "报名数据预测",
        "id" : 5
         },
        {
        "iconUrl" : "https://static.gongkaoleida.com/2023/media/images/20230627161052MgUEOa.png",
        "text" : "有编制高级筛选",
        "id" : 4
        }
    ];
}  else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v5\/my\/index?/.test(
    requestUrl
  )
) {
  obj.data.greetingMsgUp = "尊贵的雷达VIP用户，您好~";

} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/exam\/jobDetail?/.test(
    requestUrl
  )
) {
  obj.data.vipAuthList = {
    historyCompetitionData: 1,
    jobEnrollForecast: 1,
    historyInterviewScoreInfo: 1,
  };
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/subscribe\/jobHot?/.test(
    requestUrl
  )
) {
  obj.data.isVip = 1;
  obj.data.hasUnlock = true;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v5_2_6\/jobHistory\/getJobHistory?/.test(
    requestUrl
  )
) {
  obj.data.vipInfo.vipExpireDate = 4102358400;
  obj.data.vipInfo.vipExpire = 4102358400;
  obj.data.vipInfo.isVip = 1;
  obj.data.vipInfo.vipGrade = 2;
  obj.data.isAuth = true;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/simulated\/selection\/(tagInfoList|jobList)?/.test(
    requestUrl
  )
) {
  obj.message = "success";
  obj.code = 1;
}  else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/simulated\/selection\/head?/.test(
    requestUrl
  )
) {
  obj.data.vipFlag = 1;
  obj.data.resumeFlag = 1;
  obj.code = 1;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/user\/vip\/prepare?/.test(
    requestUrl
  )
) {
  if (obj.data) {
    obj.data.couponPrice = "0";
    obj.data.orderPrice = 0;
    obj.data.diffPrice = "0";
    obj.data.discountPrice = "0";

    if (obj.data.couponInfo) {
        obj.data.couponInfo.amount = "0";
        obj.data.couponInfo.conditionMoney = "0";
           }
      }

  obj.data.couponInfo.endTime = "4102358400";
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/user\/vip\/product?/.test(
    requestUrl
  )
) {
    if (obj.data && obj.data.productList) {
    let productList = obj.data.productList;
    
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i].list;

        for (let j = 0; j < product.length; j++) {
            product[j].price = "0";
            product[j].discountPrice = "0";
            product[j].unitPrice = 0;
            product[j].unitPriceDesc = "￥0/天";
             }
       }
   }
        delete obj.data.backPopType;
    if (obj.data.isNewCoupon === undefined) {
        obj.data.isNewCoupon = 1;
         }
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/user\/vip\/order?/.test(
    requestUrl
  )
) {
  obj.message = "success";
  obj.code = 1;
} else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/mall\/app_v2\/user\/balance?/.test(
    requestUrl
  )
) {
  obj.data.buzhiBalance = 99999;
}
  


$done({ body: status ? JSON.stringify(obj) : obj });

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function removeExtraSpaces(jsonString) {
  var jsonObj = JSON.parse(jsonString);
  return JSON.stringify(jsonObj, function (key, value) {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
}