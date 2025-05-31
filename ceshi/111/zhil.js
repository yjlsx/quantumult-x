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
 * 111
 */
if (typeof $request !== 'undefined') {
  // 请求体处理逻辑
  if ($request.body) {
    try {
      let body = $request.body;
      let parsed = JSON.parse(body);

      if (parsed.remark && typeof parsed.remark === 'string') {
        let remarkArray = JSON.parse(parsed.remark);

        for (let item of remarkArray) {
          if (item.contentType === "referrerEntry") {
            console.log(`原 referrerEntry: ${item.content}`);
            item.content = "VipV4.0_VIPCard";
          }

          if (item.contentType === "pageUrl" && item.content.includes("referrerEntry=Me5.0_VipUser")) {
            console.log(`原 pageUrl: ${item.content}`);
            item.content = item.content.replace("referrerEntry=Me5.0_VipUser", "referrerEntry=VipV4.0_VIPCard");
          }

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
      console.log("请求体处理失败（解析错误）: " + e);
      $done({ body: $request.body }); // 返回原始请求体
    }

  } else {
    console.log("请求体为空，跳过处理");
    $done({});
  }
}
else if (typeof $response !== 'undefined') {
  // 响应体处理逻辑
  try {
    let obj = JSON.parse($response.body);

    if (obj.code === 200 && obj.data) {
      console.log("订单原始价格: " + obj.data.realPrice);
      obj.data.realPrice = "0";

      if (obj.data.orderDetailProductDTO) {
        obj.data.orderDetailProductDTO.productRealPrice = "0";
      }

      console.log("已将价格伪装为 0 元");
    }

    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("响应体处理失败（解析错误）: " + e);
    $done({ body: $response.body }); // 返回原始响应体
  }
}
else {
  console.log("未知脚本上下文，未执行处理");
  $done({});
}