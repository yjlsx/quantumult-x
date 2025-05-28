/*
[rewrite_local]
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url\?album url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg2.js

[mitm]
hostname = m.kugou.com
*/

let body = $response.body;
const url = $request.url;

try {
    let obj = JSON.parse(body);
    
    console.log("原始响应体:", JSON.stringify(obj));
    
    // 修改关键字段
    if ('fail_process' in obj) obj.fail_process = 0;
    if ('error' in obj) obj.error = "";
    if ('pay_type' in obj) obj.pay_type = 0;
    
    // 确保状态码正确
    if ('errcode' in obj && obj.errcode !== 0) obj.errcode = 0;
    if ('status' in obj && obj.status !== 1) obj.status = 1;
    
    // 修改特权字段
    const privileges = [
        'privilege', '128privilege', '320privilege', 
        'sqprivilege', 'highprivilege'
    ];
    
    privileges.forEach(priv => {
        if (priv in obj) {
            obj[priv] = 10;
        }
    });
    
    // 确保URL字段存在且有效
    if (!obj.url || obj.url === "") {
        if (obj.backup_url && obj.backup_url.length > 0) {
            obj.url = obj.backup_url[0];
        }
    }
    
    console.log("修改后响应体:", JSON.stringify(obj));
    
    body = JSON.stringify(obj);
} catch (e) {
    console.log("JSON解析/修改失败: " + e);
}

$done({ body });