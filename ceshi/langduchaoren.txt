/*
[rewrite_local]
# PhotoTalk 强制已被邀请，并改 databaseid
^https:\/\/phototalk\.ivsapi\.com\/api\/user\/info url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/langduchaoren.js

*
[mitm]
hostname = phototalk.ivsapi.com

*/


/**
 * @supported BCFF6F0E-422A-495A-890E-0C63B9BC9F9A
 */

let obj = JSON.parse($response.body);             
obj.beinvited = 1;                               
obj.user.databaseid = "us2";                     
$done({ body: obj });  
