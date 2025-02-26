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
    // 解析嵌套数据
    let data = JSON.parse(obj.data);
    let logdata = JSON.parse(data.logdata);
    // 修改交易状态
    Object.keys(logdata).forEach(userId => {
        logdata[userId].log_content = {
            ...logdata[userId].log_content,
            transaction_state: 1,
            transaction_state_desc: "Success",
            transaction_date: new Date().getTime().toString(), // 更新时间戳
            transaction_id: `TID${Math.random().toString(36).substr(2, 15)}` // 生成有效交易ID
        };     });      // 重组数据结构（保持原始JSON格式）
    data.logdata = JSON.stringify(logdata, null, 0) // 避免添加空格
       .replace(/\//g, '\\/'); // 保持斜杠转义    
    obj.data = JSON.stringify(data, null, 0)
        .replace(/\//g, '\\/');
    // 生成新签名（核心修正）
    const md5 = (str) => CryptoJS.MD5(str).toString();
    obj.sign = md5(obj.data); // 对data字段直接MD5
    $done({ body: JSON.stringify(obj, null, 0) });
} catch (e) {
    console.log(`错误: ${e.stack}`);
    $done();
}
