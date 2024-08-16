/**************************************
*
[rewrite local]
^https:\/\/app\.aochuangwangluo\.com\/crimaster\/api\/v2\/user\/profile url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/crimaster\/api\/v2\/friend\/userCenter url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/center\/exp\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/center\/area\/rank url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/crimaster\/api\/v2\/article\/center\/getCenterUser url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/center\/bag\/all url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/center\/bag\/diamond url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/center\/bag\/virtual\/details url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js
^https:\/\/app\.aochuangwangluo\.com\/bombshell-pro\/v2\/mall\/vip\/recharge\/expireTimeAndRechargelist url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/crimaster.js



*
[mitm]
hostname = app.aochuangwangluo.com
*************************************/

// @yjlsx
// 规则：重写
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/crimaster\/api\/v2\/user\/profile') !== -1) {
    if (obj && obj.data) {
     obj.data.level1Medal.descript = "LV.17 至尊神探 Ⅲ";
     obj.data.vipExpires = 4102358400;
     obj.data.vipLevel = 7;
     }
} 

if ($request.url.indexOf('/crimaster/api/v2/friend/userCenter') !== -1) {
    if (obj && obj.data) {
     obj.data.vipLevel = 7;
     obj.data.ranking = 1;
     obj.data.point = "999999";
     obj.data.level = "LV 11";
     obj.data.grade = "LV 11";
     obj.data.coin = "999999";
     }
} 

if ($request.url.indexOf('/bombshell-pro/v2/center/exp/info') !== -1) {
    if (obj && obj.data) {
     obj.data.level = 17;
     obj.data.name = "至尊神探Ⅲ";
     }
} 


if ($request.url.indexOf('/bombshell-pro/v2/center/area/rank') !== -1) {
    if (obj && obj.data) {
     obj.data.allRank = "1th";
     obj.data.provinceAllRank = "1th";
     obj.data.provinceMonthRank = "1th";
     obj.data.allPoint = 999999;
     }
} 

if ($request.url.indexOf('/crimaster/api/v2/article/center/getCenterUser') !== -1) {
     if (obj.data && obj.data.medias) {
  obj.data.medias.forEach(item => {
      item.name = "LV.17 至尊神探 Ⅲ";
      });
     }
}

if ($request.url.indexOf('/bombshell-pro/v2/center/bag/all') !== -1) {
     if (obj.data) {
     obj.data.diamond = 99999;
     obj.data.vcoin = 999999;
    }
}

if ($request.url.indexOf('/bombshell-pro/v2/center/bag/diamond') !== -1) {
     obj.data = 999999;
}

if ($request.url.indexOf('/bombshell-pro/v2/center/bag/virtual/details') !== -1) {
     if (obj.data) {
     obj.data.expiredTime = 4102358400;
     obj.data.vipLevel = 17;
     obj.data.days = 99999;
     obj.data.num = 10;
    }
}

if ($request.url.indexOf('/bombshell-pro/v2/mall/vip/recharge/expireTimeAndRechargelist') !== -1) {
     if (obj.data) {
     obj.data.vipLevel = 17;
     obj.data.vipExpires = 4102358400;
    }
}

if ($request.url.indexOf('/bombshell-pro/v2/center/bag/virtual/buy') !== -1) {
     if (obj.data) {
     obj.code = 200;
     obj.msg = "兑换成功";
    }
}



// 生成修改后的 JSON 响应体
$done({ body: JSON.stringify(obj) });

