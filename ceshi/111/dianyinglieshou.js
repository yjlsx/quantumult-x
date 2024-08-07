/**************************************
*
[rewrite local]
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/integral_details url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/user\/daily_tasks url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/movie_addr\/unlock url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/movie_addr\/parse_url url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/integral_goods\/items url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js
^https:\/\/app-v1\.ecoliving168\.com\/api\/v1\/integral_goods\/items\/\d+\/order url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dianyinglieshou.js

*
[mitm]
hostname = app-v1.ecoliving168.com
*************************************/

// @local
// 规则：重写 https://app-v1.ecoliving168.com/api/v1/user/integral_details, /api/v1/user/daily_tasks, /api/v1/movie_addr/unlock, 和 /api/v1/movie_addr/parse_url 响应

// 获取响应体
let body = $response.body;

// 解析 JSON 数据
let obj = JSON.parse(body);

if ($request.url.indexOf('/api/v1/user/integral_details') !== -1) {
    // 修改积分详情响应数据
    if (obj.data) {
        obj.data.total = 9999; // 修改总积分为 9999
    }
} else if ($request.url.indexOf('/api/v1/integral_goods/items/') !== -1 && !$request.url.endsWith('/order')) {
    // 修改积分商品价格
    if (obj.data) {
        obj.data.current_price = 1; 
        obj.data.original_price = 1; 
    }
} else if ($request.url.indexOf('/api/v1/integral_goods/items/') !== -1 && $request.url.endsWith('/order')) {
    // 修改兑换响应数据
    if (obj.errorCode) {
        obj.errorCode = 0; 
        obj.msg = "兑换成功"; 
    }
} else if ($request.url.indexOf('/api/v1/user/daily_tasks') !== -1) {
    // 修改每日任务响应数据
    if (obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(task => {
            if (task.is_success !== true) {
                task.reward = 100; // 将每个任务的奖励修改为 100
                task.is_success = false; 
            }
        });
    }
} else if ($request.url.indexOf('/api/v1/movie_addr/unlock') !== -1) {
    // 修改电影解锁响应数据
    if (obj.data) {
        obj.data.total_unlock = 1; 
        obj.data.used_points = 0; 
        obj.data.surplus_points = 9999; 
    }
} else if ($request.url.indexOf('/api/v1/movie_addr/parse_url') !== -1) {
    // 修改电影解析 URL 响应数据
    if (obj.data) {
        obj.data.is_unlocked = true; 
        obj.data.is_playable = true; 
        obj.data.can_unlock = true; 
        obj.data.is_free = true; 
        obj.data.points_required = 0; 
        obj.data.current_points = 9999; 
        if (obj.data.certificate) {
            obj.data.certificate.used_points = 0; 
        }
        if (obj.data.player_tips && obj.data.player_tips.action) {
            obj.data.player_tips.action.lable = "2099-12-31 03:22"; 
        }
    }
} 

// 生成修改后的 JSON 响应体
$done({ body: JSON.stringify(obj) });
