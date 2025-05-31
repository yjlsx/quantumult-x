/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-response-body  https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/


/*
 * @supported 4310B28D64CC
 * 智联招聘创建订单：请求字段规范化 + 响应价格伪装显示为 0 元
 */

// 请求体处理（修改 remark 字段）
if (typeof $request !== 'undefined') {
  let body = $request.body;

  try {
    let parsed = JSON.parse(body);

    if (parsed.remark && typeof parsed.remark === 'string') {
      let remarkArray = JSON.parse(parsed.remark);

      for (let item of remarkArray) {
        // 替换 referrerEntry
        if (item.contentType === "referrerEntry") {
          console.log(`原 referrerEntry: ${item.content}`);
          item.content = "VipV4.0_VIPCard";
        }

        // 替换 pageUrl 中的 referrerEntry 参数
        if (item.contentType === "pageUrl" && item.content.includes("referrerEntry=Me5.0_VipUser")) {
          console.log(`原 pageUrl: ${item.content}`);
          item.content = item.content.replace("referrerEntry=Me5.0_VipUser", "referrerEntry=VipV4.0_VIPCard");
        }

        // 将 useCoinAmount 设置为 0（避免失败）
        if (item.contentType === "useCoinAmount") {
          console.log(`原 useCoinAmount: ${item.content}`);
          item.content = 0;
        }
      }

      parsed.remark = JSON.stringify(remarkArray);
      body = JSON.stringify(parsed);
    }

    $done({ body });

  } catch (e) {
    console.log("请求体处理失败: " + e);
    $done({});
  }
}

// 响应体处理（将价格显示改为 0 元）
if (typeof $response !== 'undefined') {
  try {
    let obj = JSON.parse($response.body);

    if (obj.code === 200 && obj.data) {
      console.log("订单原始价格: " + obj.data.realPrice);

      // 修改实际支付价格
      obj.data.realPrice = "0";

      if (obj.data.orderDetailProductDTO) {
        obj.data.orderDetailProductDTO.productRealPrice = "0";
      }

      console.log("已将价格伪装为 0 元");
      $done({ body: JSON.stringify(obj) });
    } else {
      $done({});
    }

  } catch (e) {
    console.log("响应体处理失败: " + e);
    $done({});
  }
}
