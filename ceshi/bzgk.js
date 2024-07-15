 /**
 * @fileoverview Quantumult X 脚本
 *
 [rewrite_local]
 ^http://api\.yaotia\.cn/user/v1/(login|getUserInfo) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/upgrade/index url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/order/(wbuy|confirm) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/infoMaster\?goods_id=52 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/userCourse/sxy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
*
 [mitm]
 hostname = api.yaotia.cn
 */


// 用户信息接口脚本 yaotia.js
const userBody = $response.body;
const userObj = JSON.parse(userBody);

// 修改 is_vip 字段为 1，表示用户是永久 VIP
userObj.data.is_vip = 1;
userObj.data.vip_txt = "永久VIP";
userObj.data.vip_end_time = 4102415999; // 2099年12月31日 23:59:59 的时间戳

// 修改 bz_money 字段为很大的值
userObj.data.bz_money = 999999999;

$done({ body: JSON.stringify(userObj) });

// 升级信息接口脚本 yaotia_upgrade.js
const upgradeBody = $response.body;
const upgradeObj = JSON.parse(upgradeBody);

// 修改 VIP 相关字段
upgradeObj.data.user.vip = 3;
upgradeObj.data.user.vip_end_time = "2099-12-31";
upgradeObj.data.user.desc = "永久VIP，尽情享受所有功能！";

// 修改 VIP 权益列表
upgradeObj.data.info.power.forEach(item => {
    item.vip = true;
});

// 修改 VIP 权益 URL
upgradeObj.data.rights_url = "http://fed.midasjoy.com/Public/act/2021buzhi/vipequity/index.html?v=1";

$done({ body: JSON.stringify(upgradeObj) });

// 商品信息接口脚本 yaotia_goods.js
const goodsBody = $response.body;
const goodsObj = JSON.parse(goodsBody);

// 修改商品信息为已购买状态
goodsObj.data.is_goods_bought = 1;
goodsObj.data.need_buy = 0;
goodsObj.data.price = "0";
goodsObj.data.ori_price = "0";
$done({ body: JSON.stringify(goodsObj) });

// 用户课程接口脚本 yaotia_courses.js
const coursesBody = $response.body;
const coursesObj = JSON.parse(coursesBody);

// 新增课程信息到列表中
const newCourse = {
    "id": 52,
    "expire_tip": "",
    "course_type": 96,
    "is_expire": 0,
    "cover": "https://img.yaotia.com/2023/10-13/1697161787037.png?size=188X224",
    "name": "行测三板斧-风暴羚羊",
    "desc": "课程有效期截至:2099-12-22"
};

coursesObj.data.list.push(newCourse);

$done({ body: JSON.stringify(coursesObj) });

// 订单接口脚本 yaotia_order.js
const orderBody = $response.body;
const orderObj = JSON.parse(orderBody);

// 修改订单完成状态为已完成（用于 wbuy 接口）
if (orderObj.data && orderObj.data.finish !== undefined) {
    orderObj.data.finish = 1;
}

// 修改订单确认信息为不用花钱（用于 confirm 接口）
if (orderObj.data && orderObj.data.not_need_money !== undefined) {
    orderObj.data.not_need_money = 1;
    orderObj.data.total_amount = "0.00";
    orderObj.data.bz_money = "999999999";
    orderObj.data.goods_list.forEach(goods => {
        goods.price = "0.00";
        goods.ori_price = "0.00";
    });
    // 确保不显示支付失败信息
    if (orderObj.data.failure_info) {
        orderObj.data.failure_info = null;
    }
    // 修改 original_price 字段
    orderObj.data.original_price = "0.00";
    // 修改 gifts_list 字段为空数组
    if (orderObj.data.gifts_list) {
        orderObj.data.gifts_list = [];
    }
}

$done({ body: JSON.stringify(orderObj) });
