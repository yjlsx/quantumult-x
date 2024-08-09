/**************************************
*
[rewrite local]
^https:\/\/api\.aliyundrive\.com\/business\/v1\/activity\/thirdParty\/release\/check$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/ali.js

*
[mitm]
hostname = api.aliyundrive.com
*************************************/

// @name        修改 VIP 状态响应
// @description 将响应体中的 VIP 状态和过期时间重写为 VIP，时间为 2099-12-31
// @version     1.0.0

// 定义 URL 匹配模式
const urlPattern = /^https:\/\/api\.aliyundrive\.com\/business\/v1\/activity\/thirdParty\/release\/check$/;

// 处理响应体的函数
function modifyResponse(response) {
  // 检查 response 对象是否存在，并且包含 body 属性
  if (response && response.body) {
    // 尝试从响应体中解析 JSON
    let responseBody;
    try {
      // 解析响应体为 JSON 对象
      responseBody = JSON.parse(response.body);

      // 修改 VIP 状态和过期时间
      responseBody.vip = true;
      responseBody.vipExpire = 4102444800; // UNIX 时间戳对应 2099-12-31
      responseBody.svipDays = 9999;
      responseBody.svipExperience = false;
      responseBody.experience = false;

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
}

// 执行响应处理
if ($request.url.match(urlPattern)) {
  modifyResponse($response);
} else {
  $done({});
}

