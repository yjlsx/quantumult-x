#!name=迅雷

#!desc=迅雷会员解锁

#!icon=https://raw.githubusercontent.com/deezertidal/private/main/icons/thunder.png


https://xluser-ssl.xunlei.com/xluser.core.login/v3/getuserinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/xunlei.js

hostname = xluser-ssl.xunlei.com


var body = $response.body;
var obj = JSON.parse(body);

obj.vipList = [{
    "expireDate": "20290609",
    "isAutoDeduct": "0",
    "isVip": "1",
    "isYear": "1",
    "payId": "0",
    "payName": "---",
    "register": "0",
    "vasid": "2",
    "vasType": "5",
    "vipDayGrow": "20",
    "vipGrow": "840",
    "vipLevel": "7"
  }]

body = JSON.stringify(obj);
$done({body});