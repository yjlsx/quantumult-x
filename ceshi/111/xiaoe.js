 
/*

[rewrite_local]
^https:\/\/appdc4kxorh6372\.xet\.citv\.cn\/xe\.course\.business\.avoidlogin\.sale\.before\.column\.items\.get\/1\.0\.0 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/xiaoe.js
^https:\/\/appdc4kxorh6372\.xet\.citv\.cn\/xe\.course\.business\.middle\.page\.data\.get\/1\.0\.0 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/xiaoe.js




[mitm]
hostname = appdc4kxorh6372.xet.citv.cn

QuantumultX Response Rewrite Script
作用：解锁课程 can_view 字段
*/

// Quantumult X 解锁脚本，支持两个接口
let url = $request.url;
let obj = JSON.parse($response.body);

// 1. 解锁 avoidlogin.sale.before.column.items.get 接口
if (
  url.includes(
    "/xe.course.business.avoidlogin.sale.before.column.items.get/1.0.0"
  )
) {
  if (obj?.data?.list) {
    obj.data.list.forEach((item) => {
      item.can_view = 1; // 允许查看
      item.is_try = 1; // 允许试看
      // item.part_try_length = 9999; // 如需试看时长无限制可解开注释
    });
  }
}

// 2. 解锁 course.business.middle.page.data.get 接口
if (
  url.includes("/xe.course.business.middle.page.data.get/1.0.0")
) {
  if (obj?.data?.list) {
    obj.data.list.forEach((item) => {
      item.is_free = 1;
      item.price = "0.00";
      item.rate_price = 0;
      item.is_member = 1; // 如需会员标识
      item.member_type = 1;
    });
  }
}

$done({ body: JSON.stringify(obj) });
