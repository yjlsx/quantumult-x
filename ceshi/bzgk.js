/**
 * @fileoverview Quantumult X 脚本
 *
 [rewrite_local]
 ^http://api\.yaotia\.cn/user/v1/(login|getUserInfo) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 *
 [mitm]
 hostname = api.yaotia.cn
 */

const body = $response.body;
const obj = JSON.parse(body);

// 修改 is_vip 字段为 1，表示用户是永久 VIP
obj.data.is_vip = 1;
obj.data.vip_txt = "永久VIP";
obj.data.vip_end_time = 4102415999; // 2099年12月31日 23:59:59 的时间戳

// 修改 bz_money 字段为很大的值
obj.data.bz_money = 999999999;

$done({ body: JSON.stringify(obj) });
