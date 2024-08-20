/*
[rewrite local]
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/fufei.js


*
[mitm]
hostname = messpro.hnwzinfo.com
*/


// 获取响应体
let body = $response.body;
let obj = JSON.parse(body);

// 根据 URL 进行不同的处理
if ($request.url.indexOf('/api/heartbeat/v1') !== -1) {
  if (obj.data) {
     obj.data.bPlan.c.uvip = 1;
   }
 }



// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});