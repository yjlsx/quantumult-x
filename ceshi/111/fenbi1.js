/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite]
^https:\/\/ke\.fenbi\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/fenbi1.js

*
[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com,
*/
var body = $response.body;
body = body.replace(/"svip": false/g, '"svip": true');
body = body.replace(/"行测会员"/g, '""');
body = body.replace(/"authorized": false/g, '"authorized": true');
body = body.replace(/"endTime": 0/g, '"endTime": 4102332419000');
body = body.replace(/"expireTime": 0/g, '"expireTime": 4102332419000');
body = body.replace(/"free": false/g, '"free": true');
body = body.replace(/"paid": false/g, '"paid": true');
body = body.replace(/"member": false/g, '"member": true');
body = body.replace(/"hasBeenMember": false/g, '"hasBeenMember": true');
body = body.replace(/"hasAudition": false/g, '"hasAudition": true');
body = body.replace(/"memberStatus"\s*:\s*\d+/g, '"memberStatus": 1');
body = body.replace(/"svipMemberType": 0/g, '"svipMemberType": [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]');
body = body.replace(/"payPrice"\s*:\s*\d+/g, '"payPrice": 0');
body = body.replace(/"price"\s*:\s*\d+/g, '"price": 0');
body = body.replace(/"totalOriginPayFee"\s*:\s*\d+/g, '"totalOriginPayFee": 0');
body = body.replace(/"payFee"\s*:\s*\d+/g, '"payFee": 0');
body = body.replace(/"totalFee"\s*:\s*\d+/g, '"totalFee": 0');
body = body.replace(/"code" : -18/g, '"code" : 1');
body = body.replace(/"code" : -1/g, '"code" : 1');
body = body.replace(/"msg" : "请求异常，请检查请求或者重试"/g, '"msg" : "成功"');
$done({body: body});

