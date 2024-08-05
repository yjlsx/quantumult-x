/**************************************
*
[rewrite local]
^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/by.js

*
[mitm]
hostname = 103.39.222.113
*************************************/

if ($request.url.indexOf("https://103.39.222.113:3308/api/my/profile") !== -1) {
    // 获取响应体
    let body = $response.body;
    
    // 解析 JSON 数据
    let obj = JSON.parse(body);
    
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
    
    // 生成修改后的 JSON 响应体
    $done({ body: JSON.stringify(obj) });
}
