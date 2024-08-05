/**************************************
*
[rewrite local]
^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js
^https:\/\/103\.39\.222\.113:3308\/api\/my\/use_card url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js

*
[mitm]
hostname = 103.39.222.113
*************************************/

    let body = $response.body;
    let obj = JSON.parse(body);
 
if ($request.url.indexOf("https://103.39.222.113:3308/api/my/profile") !== -1) {   
    // 修改响应数据
    if (obj.data) {
        obj.data.is_vip = 1; // 设置为 VIP
        obj.data.vip_points = 9999; // 积分
        obj.data.vip_type = 1; // VIP 类型
        obj.data.view_times = "9999"; // 查看次数
        obj.data.balance = "9999.00"; // 余额
        obj.data.day_views = 999; // 每日查看次数
        obj.data.vip_days = 9999; // VIP天数
    }
}

if ($request.url.indexOf('/api\/my\/use_card') !== -1) {   
    // 修改响应数据
    if (obj.msg) {
        obj.code = 200; 
        obj.once = 30; 
        obj.msg = "充值成功"; 
    } 
}   
    // 生成修改后的 JSON 响应体
    $done({ body: JSON.stringify(obj) });

