/*
[rewrite]
^http:\/\/at\.kwedxef\.pro\/api\/v1\/sms\/user\/information url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js


*
[mitm]
hostname = at.kwedxef.pro, appapi.51jobapp.com

*/


(function() {
  let body = $response.body;
  let obj;
  try {
    obj = JSON.parse(body);
  } catch (e) {
    $done({ body });
    return;
  }

  if (obj && obj.data && typeof obj.data.coin !== 'undefined') {
    obj.data.coin = 999999; // <-- 这里改成你想要的数值
  }

  $done({ body: JSON.stringify(obj) });
})();