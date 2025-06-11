 
/*

[rewrite_local]
^https:\/\/appdc4kxorh6372\.xet\.citv\.cn\/xe\.course\.business\.avoidlogin\.sale\.before\.column\.items\.get\/1\.0\.0 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/xiaoe.js

[mitm]
hostname = appdc4kxorh6372.xet.citv.cn

QuantumultX Response Rewrite Script
作用：解锁课程 can_view 字段
*/

let body = $response.body;
let obj = JSON.parse(body);

if (obj?.data?.list) {
  obj.data.list.forEach(item => {
    item.can_view = 1;           // 允许查看
    item.is_try = 1;             // 允许试看
  // item.part_try_length = 9999; // 试看时长改为9999（任意大）
  });
}

$done({body: JSON.stringify(obj)});
