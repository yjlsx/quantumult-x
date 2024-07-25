/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite]
^https:\/\/cupid\.51jobapp\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
*
[mitm]
hostname = cupid.51jobapp.com
*/
var body = $response.body;
// 替换 isVip 字段的值为 true
body = body.replace(/("isVip" : )false/g, '$1true');
body = body.replace(/("showManagementPage" : )false/g, '$1true');
body = body.replace(/"isfree" : 0/g, '"isfree" : 1');
body = body.replace(/"price" : \d+/g, '"price" : 0');
body = body.replace(/"rice" : \d+/g, '"price" : 0');
$done({body: body});

