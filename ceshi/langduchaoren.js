/*
[rewrite_local]
# PhotoTalk 强制已被邀请，并改 databaseid
^https:\/\/phototalk\.ivsapi\.com\/api\/user\/info url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/langduchaoren.js

*
[mitm]
hostname = phototalk.ivsapi.com

*/


let body = $response.body;
let obj = JSON.parse(body);
           
obj.beinvited = 1;                               
obj.user.updatems = 174954261428;   
obj.user.databaseid = "us2";   
                 

body = JSON.stringify(obj);
$done({body});

