/**************************************
*
[rewrite local]
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/daily_tasks url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
*
[mitm]
hostname = app-v1.ecoliving168.com
*************************************/

// @name        修改积分和任务响应
// @description 将响应体中的 "total" 字段值重写为 99999，并将每日任务的 "reward" 字段值重写为 1000
// @version     1.0.0

// 定义 URL 匹配模式
const integralDetailsUrlPattern = /^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details$/;
const dailyTasksUrlPattern = /^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/daily_tasks$/;

// 处理积分详情响应体的函数
function modifyIntegralDetailsResponse(response) {
  if (response && response.body) {
    let responseBody;
    try {
      responseBody = JSON.parse(response.body);

      // 修改 total 字段的值
      if (responseBody.data) {
        responseBody.data.total = 99999;
      }

      response.body = JSON.stringify(responseBody);
    } catch (e) {
      console.error('解析积分详情响应体时出错:', e);
    }

    // 返回修改后的响应体
    $done({ body: response.body });
  } else {
    // 如果 response 对象不存在或 body 属性不存在，直接返回原响应
    $done({});
  }
}

// 处理每日任务响应体的函数
function modifyDailyTasksResponse(response) {
  if (response && response.body) {
    let responseBody;
    try {
      responseBody = JSON.parse(response.body);

      // 修改每日任务中的 reward 字段的值
      if (responseBody.data && Array.isArray(responseBody.data)) {
        responseBody.data.forEach(task => {
          if (task.reward !== undefined) {
            task.reward = 1000;
          }
        });
      }

      response.body = JSON.stringify(responseBody);
    } catch (e) {
      console.error('解析每日任务响应体时出错:', e);
    }

    // 返回修改后的响应体
    $done({ body: response.body });
  } else {
    // 如果 response 对象不存在或 body 属性不存在，直接返回原响应
    $done({});
  }
}

// 根据 URL 匹配模式决定调用哪个函数
if (integralDetailsUrlPattern.test($request.url)) {
  modifyIntegralDetailsResponse($response);
} else if (dailyTasksUrlPattern.test($request.url)) {
  modifyDailyTasksResponse($response);
} else {
  // 如果 URL 不匹配任何模式，返回原响应
  $done({});
}
