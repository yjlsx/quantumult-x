/*
[rewrite local]
^https:\/\/coupe-business-wechat\.altlab\.cn\/coupe\/api\/v1\/user\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dycs.js
^https:\/\/appcfg\.v\.qq\.com\/getconf\?cmd=data_transport&name=tp_proxy&subver url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dycs.js
^https:\/\/coupe-business-wechat\.altlab\.cn\/coupe\/api\/v1\/cdkey\/activate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/dycs.js

^https:\/\/coupe-business-wechat\.altlab\.cn\/coupe\/api\/v1\/sku\/list url reject

*
[mitm]
hostname = coupe-business-wechat.altlab.cn, appcfg.v.qq.com
*/


// 获取响应体
let body = $response.body;
let obj = JSON.parse(body);

// 根据 URL 进行不同的处理
if ($request.url.indexOf('/coupe/api/v1/user/userinfo') !== -1) {
    obj.data.own_game = 1;
    obj.data.nick_game = "李小龙";
}

if ($request.url.indexOf('cmd=data_transport&name=tp_proxy&subver') !== -1) {
    obj.code = 200;
}

if ($request.url.indexOf('/coupe/api/v1/cdkey/activate') !== -1) {
    obj.err = 0;
}

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});