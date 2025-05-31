/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil1.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/details url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil1.js


**
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/



if (typeof $response !== 'undefined') {
  try {
    const url = $request.url;
    let obj = JSON.parse($response.body);

    if (obj.code === 200 && obj.data) {
      const target = obj.data;

      if (url.includes("/order/creation") || url.includes("/order/details")) {
        // 修改 realPrice
        if (target.realPrice !== undefined) {
          console.log(`[${url.includes('/creation') ? '创建' : '详情'}] 原 realPrice: ${target.realPrice}`);
          target.realPrice = "0";
          console.log("✅ realPrice 已改为 0");
        }

        // 修改 salaryIncreaseCoinCutoff
        console.log(`原 salaryIncreaseCoinCutoff: ${target.salaryIncreaseCoinCutoff}`);
        target.salaryIncreaseCoinCutoff = "68";
        console.log("✅ salaryIncreaseCoinCutoff 已改为 68");
      }
    }

    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("响应解析失败: " + e);
    $done({ body: $response.body });
  }
}


