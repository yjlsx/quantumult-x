/*
[rewrite]
^http:\/\/at\.kwedxef\.pro\/api\/v1\/sms\/user\/information url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^http:\/\/at\.kwedxef\.pro\/api\/v1\/sms\/rent\/store url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js


*
[mitm]
hostname = at.kwedxef.pro, appapi.51jobapp.com

*/


(function() {
  const url = $request.url;
  let body = $response.body;

  if (url.includes("/api/v1/sms/user/information")) {
    try {
      const obj = JSON.parse(body);
      if (obj && obj.data && typeof obj.data.coin !== 'undefined') {
        obj.data.coin = 999999; // <-- 如需其他数值，改这里
      }
      body = JSON.stringify(obj);
    } catch (e) {
      // JSON 解析失败，保持原响应不变
    }
  } else if (url.includes("/api/v1/sms/rent/store")) {
    body = JSON.stringify({
      status: 1,
      data: "successs",
      code: 200
    });
  }

  $done({ body });
})();