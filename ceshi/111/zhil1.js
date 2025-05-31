/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/

if (typeof $response !== 'undefined') {
  try {
    console.log("✅ 响应处理开始");
    let obj = JSON.parse($response.body);

    if (obj.code === 200 && obj.data) {
      console.log("原始 realPrice: " + obj.data.realPrice);
      obj.data.realPrice = "0";
      console.log("realPrice 已改为 0");
    }

    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("响应体处理失败: " + e);
    $done({ body: $response.body });
  }
}
