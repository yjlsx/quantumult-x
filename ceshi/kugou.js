/* 
[rewrite_local]
^https:\\//gateway\.kugou\.com\/v2\/get_vip_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/kugou.js
[mitm]
hostname = gateway.kugou.com,
*/

// 双斜杠后的内容在js里是属于注释内容不会生效
var body = $response.body; // 声明一个变量body并以响应消息体赋值
var obj = JSON.parse(body); // JSON.parse()将json形式的body转变成对象处理
var user = {};
function re(reg, str) {  body = body.replace(reg, str);}
obj.status = 0;
obj.msgtype = 1;
obj.multiplatform_vip_expire_prompt_myinfo_config_0 = {\"content\":{\"content\":\"您的会员***天后到期\",\"btn_content\":\"立即续费\"},\"data\":[{\"value\":5120,\"index\":1,\"n\":1}]};

obj.multiplatform_vip_text_user_label_contentv2_15" = {\"42\":[{\"k\":100,\"v\":{\"open\":1,\"showH5Mode\":0,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\",\"jumpMode\":1,\"count\":999,\"rewardTipText\":\"已获得xxx分钟免费听歌权益\",\"strengthenCount\":1,\"strengthenMaxCount\":1}},{\"k\":117,\"v\":{\"open\":1}},{\"k\":119,\"v\":{\"showH5Mode\":0,\"jumpUrl\":\"https://h5.kugou.com/vipfreemode/v-35ffb015/index.html\",\"jumpMode\":1,\"count\":0}}]}

obj.multiplatform_vip_text_user_label_contentv2_23" = {\"1\":[{\"k\":99999,\"version\":\"0-11258\",\"v\":{\"defaultText\":\"做任务赚钱\",\"coinText\":\"您有xxx狗狗币\"}},{\"k\":99999,\"version\":\"11259-99999\",\"v\":{\"defaultText\":\"做任务免费领VIP#赚狗狗币免费领VIP#领狗狗币免费兑福利\",\"coinText\":\"您有xxx狗狗币#天天签到赚狗狗币#赚狗狗币领福利\"}}]};
    


body = JSON.stringify(obj); // 重新打包回json字符串$done(body); // 结束修改

$done(body); // 结束修改
