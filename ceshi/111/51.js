/*
[rewrite]
^https:\/\/appapi\.51jobapp\.com\/api\/3\/util  url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js

*
[mitm]
hostname = cupid.51jobapp.com, cupid.51job.com, appapi.51jobapp.com


try {
    let body = $request.body;
    let obj = JSON.parse(body);
    // 解析嵌套的data字段
    let data = JSON.parse(obj.data);
    // 解析logdata字段
    let logdata = JSON.parse(data.logdata);
     // 获取动态用户ID（第一个键）
    let userId = Object.keys(logdata);
    // 修改交易状态为成功 (通常0或1表示成功)
    logdata[userId].log_content.transaction_state = 0;
    logdata[userId].log_content.transaction_state_desc = "Success";
       // 重新序列化logdata和data
    data.logdata = JSON.stringify(logdata);
    obj.data = JSON.stringify(data);
    // 更新请求体（保留原签名或根据需要修改）
    // obj.sign = "new_sign_if_needed"; 
    $done({ body: JSON.stringify(obj) });
 catch (e) {
    console.log("脚本错误: " + e.message);
    $done();
}
