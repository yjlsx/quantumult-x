/*
[rewrite_local]

^https:\/\/phototalk\.ivsapi\.com\/api\/user\/info$ script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/langduchaoren.js
^https:\/\/phototalk\.ivsapi\.com\/api\/chat\/parameters\/v3\/$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/langduchaoren1.js

[mitm]
hostname = phototalk.ivsapi.com
*/

let body = $response.body;
let obj = JSON.parse(body);

obj.beinvited = 1;
obj.user.updatems = 1864954261428;  
obj.user.databaseid = "us2";

body = JSON.stringify(obj);
$done({ body });
                            
