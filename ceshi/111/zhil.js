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

if (typeof $request !== 'undefined') {
  try {
    let body = $request.body;
    let parsed = JSON.parse(body);

    if (parsed.remark && typeof parsed.remark === 'string') {
      let remarkArray = JSON.parse(parsed.remark);

      for (let item of remarkArray) {
        if (item.contentType === "referrerEntry") {
          item.content = "VipV4.0_VIPCard";
        }
        if (item.contentType === "pageUrl") {
          item.content = item.content.replace("referrerEntry=Me5.0_VipUser", "referrerEntry=VipV4.0_VIPCard");
        }
        if (item.contentType === "useCoinAmount") {
          item.content = 0;
        }
      }

      parsed.remark = JSON.stringify(remarkArray);
      body = JSON.stringify(parsed);
    }

    $done({ body });

  } catch (e) {
    console.log("请求处理错误: " + e);
    $done({ body: $request.body }); // 保底兜底返回原始请求
  }
}

else if (typeof $response !== 'undefined') {
  try {
    let obj = JSON.parse($response.body);

    if (obj.code === 200 && obj.data) {
      obj.data.realPrice = "0";
      if (obj.data.orderDetailProductDTO) {
        obj.data.orderDetailProductDTO.productRealPrice = "0";
      }
    }

    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("响应处理错误: " + e);
    $done({ body: $response.body }); // 保底兜底返回原始响应
  }
}

else {
  console.log("未识别的脚本上下文");
  $done();
}
