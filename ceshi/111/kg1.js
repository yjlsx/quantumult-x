/*
[rewrite_local]
^https://gateway\.kugou\.com/vipcenter/ios url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

[mitm]
hostname = gateway.kugou.com
*/


// 请求拦截脚本，去除请求头中的 token
const modifiedHeaders = $request.headers;
delete modifiedHeaders['token'];  // 移除 token 头

// 返回处理后的请求
$done({ headers: modifiedHeaders });
