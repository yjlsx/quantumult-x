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
        .replace(/\"vipExpire\":\w+/g, '"vipExpire":4102358400000')
        .replace(/\"vipExpire\":\"0\"/g, '"vipExpire":4102358400000')
        .replace(/\"jobBianzhiOpt\":0/g, '"jobBianzhiOpt":1')
        .replace(/\"status\":\w+/g, '"status":1')
    )
  : $response.body;
if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/user\/getInfo?/.test(requestUrl)
) {
  obj.data.userInfo.nickname = obj.data.userInfo.nickname;
  obj.data.userInfo.vipGrade = 2;
  obj.data.userInfo.vipExpire = 4102358400000;
  obj.data.userInfo.isVip = 1;
  obj.data.userInfo.homePageStatus = 0;
  obj.data.userInfo.recommendStatus = 0;
  obj.data.userInfo.vipGradeList = [
    {
      vipExpire: 4102358400000,
      vipGradeName: "黄金VIP",
      vipGrade: 1,
      remainDays: 365,
      isVip: 1,
    },
    {
      vipExpire: 4102358400000,
      vipGradeName: "星钻VIP",
      vipGrade: 2,
      remainDays: 365,
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
  obj.data.btnScheme = "";
  obj.data.greetingMsg = "超级星钻会员";
  obj.data.btnText = "星钻VIP";
  obj.data.bottomList = [];
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
  obj.data.vipInfo.vipExpireDate = 4102358400000;
  obj.data.vipInfo.vipExpire = 1;
  obj.data.vipInfo.isVip = 1;
  obj.data.vipInfo.vipGrade = 2;
  obj.data.isAuth = true;
}  else if (
  /^https:\/\/api\.gongkaoleida\.com\/api\/v.+\/simulated\/selection\/(tagInfoList|jobList)?/.test(
    requestUrl
  )
) {
  obj.message = "success";
  obj.code = 1;
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