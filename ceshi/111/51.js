/*
[rewrite]
^https:\/\/appapi\.51jobapp\.com\/api\/3\/util.*$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/qcwy.js


*
[mitm]
hostname = cupid.51jobapp.com, cupid.51job.com, appapi.51jobapp.com

*/

try {
    // 获取请求体
    let body = $request.body;

    // 解析 JSON 数据
    let obj = JSON.parse(body);
    
    // 解析嵌套的 data 字段
    let data = JSON.parse(obj.data);
    
    // 解析 logdata 字段
    let logdata = JSON.parse(data.logdata);
    
    // 获取动态用户ID（第一个键）
    let userIds = Object.keys(logdata);
    
    // 遍历所有用户并修改交易状态
    userIds.forEach(userId => {
        if (logdata[userId].log_content) {
            // 修改交易状态为成功 (通常0或1表示成功)
            logdata[userId].log_content.transaction_state = 1;
            logdata[userId].log_content.transaction_state_desc = "Success";
        }
    });

    // 重新序列化 logdata 和 data
    data.logdata = JSON.stringify(logdata);
    obj.data = JSON.stringify(data);
    
    // 更新请求体（如果需要，签名也可以更新）
    // obj.sign = "new_sign_if_needed"; 
    
    // 返回修改后的请求体
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log("脚本错误: " + e.message);
    $done();
}
