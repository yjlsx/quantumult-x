/* 
[rewrite_local]
^http:\/\/mapps.m1905.cn\/index\/adlist url  reject-200
^http:\/\/mapps.m1905.cn\/.?urlparam.+$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/1905.js
^http:\/\/image12.m1905.cn\/mapps\/uploadfile\/2023\/0224\/2023022410191138779\.png url  reject-200

[mitm]
hostname = mapps.m1905.cn,image12.m1905.cn
/*
/*规则完全免费，仅供学习交流，商业用途
*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
const res = '/user/get';

if (url.indexOf(vip) != -1) {    
obj.res.result = 1;    
body = JSON.stringify(obj);
}
$done({body});
