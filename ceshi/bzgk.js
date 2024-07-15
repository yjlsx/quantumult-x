 /**
 * @fileoverview Quantumult X 脚本
 *
 [rewrite_local]
 ^http://api\.yaotia\.cn/user/v1/(login|getUserInfo) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/upgrade/index url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/order/wbuy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/infoMaster\?goods_id=52 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 *
 [mitm]
 hostname = api.yaotia.cn
 */

// 获取请求的 URL
const url = $request.url;

// 根据请求的 URL 区分处理逻辑
if (url.includes("/user/v1/login") || url.includes("/user/v1/getUserInfo")) {
    handleUserInfo();
} else if (url.includes("/api/v1/upgrade/index")) {
    handleUpgradeInfo();
} else if (url.includes("/api/v1/order/wbuy")) {
    handleOrderWbuy();
} else if (url.includes("/api/v2/goods/infoMaster?goods_id=52")) {
    handleGoodsInfo();
}

function handleUserInfo() {
    const body = $response.body;
    const obj = JSON.parse(body);

    // 修改 is_vip 字段为 1，表示用户是永久 VIP
    obj.data.is_vip = 1;
    obj.data.vip_txt = "永久VIP";
    obj.data.vip_end_time = 4102415999; // 2099年12月31日 23:59:59 的时间戳

    // 修改 bz_money 字段为很大的值
    obj.data.bz_money = 999999999;

    $done({ body: JSON.stringify(obj) });
}

function handleUpgradeInfo() {
    const body = $response.body;
    const obj = JSON.parse(body);

    // 修改 VIP 相关字段
    obj.data.user.vip = 3;
    obj.data.user.vip_end_time = "2099-12-31";
    obj.data.user.desc = "永久VIP，尽情享受所有功能！";

    // 修改 VIP 权益列表
    obj.data.info.power.forEach(item => {
        item.vip = true;
    });

    // 修改 VIP 权益 URL
    obj.data.rights_url = "http://fed.midasjoy.com/Public/act/2021buzhi/vipequity/index.html?v=1";

    $done({ body: JSON.stringify(obj) });
}

function handleOrderWbuy() {
    const body = $response.body;
    const obj = JSON.parse(body);

    // 修改 finish 字段为 1，表示订单已完成
    obj.data.finish = 1;

    $done({ body: JSON.stringify(obj) });
}

function handleGoodsInfo() {
    const body = $response.body;
    const obj = JSON.parse(body);

    // 修改已购买状态
    obj.data.is_goods_bought = 1;

    // 修改 need_buy 为 0，表示无需购买
    obj.data.need_buy = 0;

    $done({ body: JSON.stringify(obj) });
}
