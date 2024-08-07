/**************************************
*
[rewrite local]
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/daily_tasks url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
*
[mitm]
hostname = app-v1.ecoliving168.com
*************************************/

// @local
// 规则：重写 https://app-v1.ecoliving168.com/api/v1/user/integral_details 和 https://app-v1.ecoliving168.com/api/v1/user/daily_tasks 响应

if ($request.url.indexOf('/api/v1/user/integral_details') !== -1) {
    // 获取响应体
    let body = $response.body;
    
    // 解析 JSON 数据
    let obj = JSON.parse(body);
    
    // 修改响应数据
    if (obj.data) {
        obj.data.total = 99999; // 修改总积分为 99999
    }
    
    // 生成修改后的 JSON 响应体
    $done({ body: JSON.stringify(obj) });
} else if ($request.url.indexOf('/api/v1/user/daily_tasks') !== -1) {
    // 获取响应体
    let body = $response.body;
    
    // 解析 JSON 数据
    let obj = JSON.parse(body);
    
    // 修改响应数据
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(task => {
            if (task.reward !== undefined) {
                task.reward = 1000; // 将每个任务的奖励修改为 1000
                task.is_success = true; 
            }
        });
    }
    
    // 生成修改后的 JSON 响应体
    $done({ body: JSON.stringify(obj) });
} else {
    // 如果 URL 不匹配，直接返回原响应
    $done({});
}
