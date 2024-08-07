/**************************************
*
[rewrite local]
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js

*
[mitm]
hostname = app-v1.ecoliving168.com
*************************************/

// @name        修改积分详情响应
// @description 将响应体中的 "total" 字段值重写为 99999
// @version     1.0.0

// 定义 URL 匹配模式
const urlPattern = /^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details$/;

// 处理响应体的函数
function modifyResponse(response) {
  // 判断 URL 是否匹配
  if (urlPattern.test(response.url)) {
    let responseBody = response.body;
    let jsonResponse;

    try {
      // 解析响应体为 JSON 对象
      jsonResponse = JSON.parse(responseBody);

      // 修改 total 字段的值
      jsonResponse.data.total = 99999;

      // 将修改后的 JSON 对象转换为字符串
      responseBody = JSON.stringify(jsonResponse);
    } catch (e) {
      console.error('解析响应体时出错:', e);
    }

    // 设置修改后的响应体
    $done({ body: responseBody });
  } else {
    // 如果 URL 不匹配，直接返回原响应
    $done({ response });
  }
}

// 执行响应处理
modifyResponse($response);
