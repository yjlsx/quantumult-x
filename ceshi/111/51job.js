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
console.log("Original Response Body: ", body);

// 替换 isVip 字段的值为 true
body = body.replace(/("isVip" : )false/g, '$1true');
body = body.replace(/("showManagementPage" : )false/g, '$1true');
body = body.replace(/"isfree" : 0/g, '"isfree" : 1');
body = body.replace(/"price" : \d+/g, '"price" : 0');
body = body.replace(/"rice" : \d+/g, '"price" : 0');
body = body.replace(/("ihasCompetitivenessService" : )false/g, '$1true');
body = body.replace(/("remainCompetitivenessCount" : )false/g, '$1true');
body = body.replace(/"maxViewedCount" : 0/g, '"maxViewedCount" : 9999');
body = body.replace(/"maxRefreshCount" : 0/g, '"maxRefreshCount" : 9999');
body = body.replace(/"maxResumeCount" : 0/g, '"maxResumeCount" : 9999');
body = body.replace(/"showManagementyRecruit" : 1/g, '"showManagementyRecruit" : 0');
// 在 vipInfoVO 中添加 effectiveDate 字段并设置值
body = body.replace(/("vipInfoVO" : \{)/, '$1"effectiveDate" : "2099-12-31T23:59:59Z", ');

console.log("Modified Response Body: ", body);

$done({body: body});

