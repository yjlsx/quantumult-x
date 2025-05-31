/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil1.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/details url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil1.js


**
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/
/*
 * @supported 4310B28D64CC
 * 智联招聘订单响应统一伪装：修改 realPrice 为 0（适用于 creation 和 details 接口）
 */

if (typeof $response !== 'undefined') {
  try {
    let obj = JSON.parse($response.body);
    const url = $request.url;

    if (obj.code === 200 && obj.data) {
      if (url.includes("/order/creation") || url.includes("/order/details")) {
        if (obj.data.realPrice !== undefined) {
          console.log(`[${url.includes('/creation') ? '创建' : '详情'}] 原 realPrice: ${obj.data.realPrice}`);
          obj.data.realPrice = "0";
          console.log("realPrice 已改为 0");
        } else {
          console.log("realPrice 字段不存在，未修改");
        }
      } else {
        console.log("非订单接口响应，未处理");
      }
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    console.log("响应体解析失败: " + e);
    $done({ body: $response.body });
  }
}
