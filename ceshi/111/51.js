/*
[rewrite]
^https:\/\/appapi\.51jobapp\.com\/api\/3\/util.*$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js
//^https:\/\/appapi\.51jobapp\.com\/api\/3\/util.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js

*
[mitm]
hostname = cupid.51jobapp.com, cupid.51job.com, appapi.51jobapp.com

*/


try {
    let body = $request.body;
    let obj = JSON.parse(body);
    
    // 解析嵌套的JSON结构
    let data = JSON.parse(obj.data);
    let logdata = JSON.parse(data.logdata);
    
    // 修改交易状态和相关信息
    Object.keys(logdata).forEach(userId => {
        logdata[userId].log_content = {
            ...logdata[userId].log_content,
            transaction_state: 1, // 成功状态
            transaction_state_desc: "Success",
            transaction_date: `${Date.now()}`, // 当前时间戳
            transaction_id: `TID${Math.random().toString(36).substr(2, 15).toUpperCase()}` // 生成有效ID
        };
    });
    
    // 精确重建data字段的原始格式（包含多层转义）
    data.logdata = JSON.stringify(logdata)
        .replace(/"/g, '\\"') // 转为服务器期望的转义格式
        .replace(/\//g, '\\/'); 
    obj.data = JSON.stringify(data)
        .replace(/"/g, '\\"'); 
    
    // 重新计算签名（需确认服务器签名算法）
    const md5 = (str) => CryptoJS.MD5(str).toString();
    obj.sign = md5(obj.data); // 假设签名仅基于data字段
    
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log(`错误: ${e}`);
    $done();
}
