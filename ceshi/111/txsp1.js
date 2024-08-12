/*
[Rewrite]
^https://i.video.qq.com/ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/txsp1.js

[MITM]
hostname = i.video.qq.com

*/

// 处理请求响应
let body = $response.body;

// 使用正则表达式找到并替换 endDate 字段的值
body = body.replace(/("endtime":\s*")[^"]*(")/g, '$12099-12-31 23:59:59$2');
body = body.replace(/("annualendtime":\s*")[^"]*(")/g, '$12099-12-31 23:59:59$2');
body = body.replace(/("annualvip":\s*")[^"]*(")/g, '$11$2');
body = body.replace(/("icon_url":\s*")[^"]*(")/g, '$1https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0$2');
body = body.replace(/("level":\s*")[^"]*(")/g, '$17$2');
body = body.replace(/("SupplementaryEndtime":\s*")[^"]*(")/g, '$12099-12-31 23:59:59$2');
body = body.replace(/("SupplementaryVip":\s*")[^"]*(")/g, '$11$2');
body = body.replace(/("vip":\s*")[^"]*(")/g, '$11$2');
body = body.replace(/("score":\s*")[^"]*(")/g, '$199999$2');
body = body.replace(/("SubSvip":\s*")[^"]*(")/g, '$11$2');
body = body.replace(/("SubSvipEndtime":\s*")[^"]*(")/g, '$12099-12-31 23:59:59$2');


body = body.replace(/("vipType":\s*")[^"]*(")/g, '$1svip$2');

// 设置修改后的响应体
$response.body = body;
$done($response);

