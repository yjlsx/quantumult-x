/**
 * @fileoverview Quantumult X 脚本
 *
 [rewrite_local]
 ^http://api\.yaotia\.cn/user/v1/(login|getUserInfo) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/upgrade/index url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/order/(wbuy|confirm) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/infoMaster url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/userCourse/sxy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/combo\?tag_id=0 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/userCourse/recent url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/findByTeacher url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/course/sprintInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
*
 [mitm]
 hostname = api.yaotia.cn
 */


// 用户信息接口脚本 yaotia.js
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/user/v1/login') || url.includes('/user/v1/getUserInfo')) {
    // 用户信息接口
    obj.data.is_vip = 1;
    obj.data.vip_txt = "永久VIP";
    obj.data.vip_end_time = 4102415999; // 2099年12月31日 23:59:59 的时间戳
    obj.data.bz_money = 999999999;
}


if (url.includes('/api/v1/upgrade/index')) {
    // 升级信息接口
    obj.data.user.vip = 3;
    obj.data.user.vip_end_time = "2099-12-31";
    obj.data.user.desc = "永久VIP，尽情享受所有功能！";
    obj.data.info.power.forEach(item => {
        item.vip = true;
    });
    obj.data.rights_url = "http://fed.midasjoy.com/Public/act/2021buzhi/vipequity/index.html?v=1";
}

if (url.includes('/api/v2/goods/infoMaster')) {
    // 商品信息接口
    obj.data.is_goods_bought = 1;
    obj.data.need_buy = 0;
    obj.data.price = "0";
    obj.data.ori_price = "0";
    obj.data.is_goods_bought = "1";
}

if (url.includes('/api/v2/userCourse/sxy')) {
    // 用户课程接口
const newCourse = {
    "id": 76,
    "expire_tip": "",
    "course_type": 4,
    "is_expire": 0,
    "cover": "https://img.yaotia.com/2023/10-13/1697161787037.png?size=188X224",
    "name": "行测三板斧-风暴羚羊",
    "desc": "课程有效期截至:2099-12-22"
};
    obj.data.list.push(newCourse);
}

if (url.includes('/api/v1/order/wbuy')) {
    // 订单完成接口
    if (obj.data && obj.data.finish !== undefined) {
        obj.data.finish = 1;
    }
}

if (url.includes('/api/v1/order/confirm')) {
    // 订单确认接口
    obj.data.not_need_money = 1;
    obj.data.total_amount = "0.00";
    obj.data.bz_money = "999999999";
    obj.data.goods_list.forEach(goods => {
        goods.price = "0.00";
        goods.ori_price = "0.00";
    });
    if (obj.data.failure_info) {
        obj.data.failure_info = null;
    }
    obj.data.original_price = "0.00";
    obj.data.gifts_list = [];
}

// 套餐购买状态接口
if (url.includes('/api/v2/goods/combo')) {
    obj.data.list.forEach(item => {
        item.is_buy = 1;
    });
}

// 添加大咖课
if (url.includes('/api/v2/userCourse/recent')) {
    obj.data.tabs.push({
        "tab_name": "大咖课",
        "course_type": 4
    });
    obj.data.list.push({
        "yta_goods_type": 5,
        "yta_goods_id": 52,
        "subject": "大咖课",
        "course_type": 4,
        "course_cover": "https://img.yaotia.com/2023/10-13/1697161787037.png?size=188X224",
        "course_name": "行测三板斧-风暴羚羊",
        "course_id": 76
    });
}

// 老师课程状态接口
if (url.includes('/api/v2/goods/findByTeacher')) {
    obj.data.group.forEach(group => {
        group.items.forEach(item => {
            item.is_buy = 1;
        });
    });
}

// 课程冲刺信息接口
if (url.includes('/api/v1/course/sprintInfo')) {
    obj.code = 0;
    obj.message = "成功";
}

$done({ body: JSON.stringify(obj) });
