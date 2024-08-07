/**************************************
*
[rewrite local]
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/daily_tasks url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/movie_addr\/unlock url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/movie_addr\/parse_url url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js

*
[mitm]
hostname = app-v1.ecoliving168.com
*************************************/

// @local
// 规则：重写 https://app-v1.ecoliving168.com/api/v1/user/integral_details 和 https://app-v1.ecoliving168.com/api/v1/user/daily_tasks 响应

    // 获取响应体
    let body = $response.body;
    
    // 解析 JSON 数据
    let obj = JSON.parse(body);

if ($request.url.indexOf('/api/v1/user/integral_details') !== -1) {
    // 修改响应数据
    if (obj.data) {
        obj.data.total = 9999; // 修改总积分为 9999
    }
} 
    
    // 修改响应数据
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(task => {
            if (task.reward !== undefined) {
                task.reward = 100; // 将每个任务的奖励修改为 100
                task.is_success = true; 
            }
        });
    }
}   

if ($request.url.indexOf('/api/v1/movie_addr/unlock') !== -1) {
    // 修改响应数据
    if (obj.data) {
        obj.data.total_unlock = 1; 
        obj.data.used_points = 0; 
        obj.data.surplus_points = 9999; 
    }
} 
    
if ($request.url.indexOf('/api/v1/movie_addr/parse_url') !== -1) {
    // 修改响应数据
    if (obj.data) {
        obj.data.is_unlocked = true; 
        obj.data.is_playable = true; 
        obj.data.can_unlock = true; 
        obj.data.is_free = true; 
        obj.data.points_required = 0; 
        obj.data.current_points = 9999; 
        obj.data.certificate.used_points = 0; 
        obj.data.player_tips.action.lable = "2099-12-31 03:22"; 
    }
} 
    
    // 生成修改后的 JSON 响应体
    $done({ body: JSON.stringify(obj) });

