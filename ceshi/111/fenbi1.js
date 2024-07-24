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
body = body.replace(/"free": false/g, '"free": true');
body = body.replace(/"paid": false/g, '"paid": true');
body = body.replace(/"svipMemberType": 0/g, '"svipMemberType": 1');
body = body.replace(/"payPrice"\s*:\s*\d+/g, '"payPrice": 0');
body = body.replace(/"price"\s*:\s*\d+/g, '"price": 0');

$done({body: body});

