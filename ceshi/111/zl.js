/**************************************
*
[rewrite local]
^https:\/\/m\.zhaopin\.com\/bapi\/products?at=708489ecbd144af191c03d3564899158 url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zl.js

*
[mitm]
hostname = m.zhaopin.com
*************************************/
// @name        免费购买产品并设置折扣金额
// @description 将指定响应体修改为免费购买，折扣金额等于产品实际价格
// @version     1.0.0

// 定义完全匹配的 URL
const targetUrl = "https://m.zhaopin.com/bapi/helper/status?at=708489ecbd144af191c03d3564899158&rt=5bdd79f2247f421ebe40e4ce74c784e5&platform=7&channel=&utmsource=&_v=0.35168324";

// 处理响应体的函数
function modifyResponse(response) {
  // 检查 URL 是否匹配
  if ($request.url === targetUrl) {
    // 检查 response 对象是否存在，并且包含 body 属性
    if (response && response.body) {
      // 尝试从响应体中解析 JSON
      let responseBody;
      try {
        // 解析响应体为 JSON 对象
        responseBody = JSON.parse(response.body);

        // 检查 data 字段是否存在
        if (responseBody.data) {
          // 遍历每个产品并修改折扣金额
          responseBody.data.forEach(product => {
            // 检查 productActionDTOList 是否存在
            if (product.productActionDTOList) {
              product.productActionDTOList.forEach(action => {
                // 将折扣金额设置为实际价格
                action.discountAmount = product.productRealPrice;
                action.discountRatio = "1"; // 表示100%折扣
              });
            }
          });
        }

        // 将修改后的 JSON 对象转换为字符串
        response.body = JSON.stringify(responseBody);
      } catch (e) {
        console.error('解析响应体时出错:', e);
      }

      // 返回修改后的响应体
      $done({ body: response.body });
    } else {
      // 如果 response 对象不存在或 body 属性不存在，直接返回原响应
      $done({});
    }
  } else {
    // 如果 URL 不匹配，直接返回原响应
    $done({});
  }
}

// 执行响应处理
modifyResponse($response);
