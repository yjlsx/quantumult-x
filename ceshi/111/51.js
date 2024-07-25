// Quantumult X rewrite script
/*
[rewrite]
^https:\/\/cupid\.51jobapp\.com\/open\/my-page\/v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js
^https:\/\/cupid\.51jobapp\.com\/open\/vip\/competitiveness url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js
^https:\/\/cupid\.51jobapp\.com\/open\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js
*
[mitm]
hostname = cupid.51jobapp.com
*/
let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

// 根据不同的 URL 修改响应体内容
if (url.includes('/open/my-page/v2')) {
  if (obj.resultbody ) {
     obj.resultbody.vipInfo.isVip = true;
     obj.resultbody.showManagementPage = 2;
  }
} else if (url.includes('/open/vip/competitiveness')) {
  if (obj.resultbody) {
    obj.resultbody.hasCompetitivenessService = true;
    obj.resultbody.remainCompetitivenessCount = true;
    obj.resultbody.isVip = true;
  }
}else if (url.includes('/open/vip/info')) {
  if (obj.resultbody) {
    obj.resultbody.isVip = true;
  }
}



body = JSON.stringify(obj);
$done({body});
