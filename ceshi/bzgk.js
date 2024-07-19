/**
 * App : 步知公考
 * By @yjlsx
 * 脚本功能：永久VIP
 * 使用方法：进软件获取ID。
 * Date: 2024.07.19
 * 此脚本仅个人使用，请勿用于非法途径！
 
*⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
 [rewrite_local]
 ^http://api\.yaotia\.cn/user/v1/(login|getUserInfo) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/upgrade/index url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/order/(wbuy|confirm) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/infoMaster url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/userCourse/sxy url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/combo\?tag_id=0 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/userCourse/recent url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v2/goods/findByTeacher url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/fm/authInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/order/seaList url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^https://api\.yaotia\.com/ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/live/home url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
 ^http://api\.yaotia\.cn/api/v1/live/historyLive url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/bzgk.js
^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=52 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/fbly.js
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
    obj.data.list.push(
        {
        "yta_goods_type": 5,
        "yta_goods_id": 52,
        "subject": "大咖课",
        "course_type": 4,
        "course_cover": "https://img.yaotia.com/2023/10-13/1697161787037.png?size=188X224",
        "course_name": "行测三板斧·风暴羚羊",
        "course_id": 76
    }
   );
}

// 老师课程状态接口
if (url.includes('/api/v2/goods/findByTeacher')) {
    obj.data.group.forEach(group => {
        group.items.forEach(item => {
            item.is_buy = 1;
        });
    });
}


// fm畅听
if (url.includes('/api/v1/fm/authInfo')) {
// 设置 not_vip_audio 字段，使非VIP用户可以免费畅听
    obj.data.not_vip_audio = `http://m.ask.buzhi.com/ask/fmShare/${obj.data.fm_info.id}`;
    obj.data.not_vip_text = "无限畅听";
 // 表示已经订阅
    obj.data.fm_info.is_auth = 1;
}

//修改订单详情
if (url.includes('/api/v1/order/seaList')) {
  obj.data.list.push(
                     {
    "buy_left_min" : 0,
    "amount" : "1840",
    "goods_num" : 1,
    "btns" : [],
    "order_title" : "行测三板斧·风暴羚羊",
    "order_id" : 847210,
    "user_id" : 707802,
    "teachers" : "风暴羚羊",
    "order_time" : "2024-05-06 21:55:16",
    "order_no" : "E6859090283692d",
    "status_name" : "已购买",
    "goods" : [
      {
        "sku_id" : 102,
        "desp" : "课程有效期截至：2099-12-31",
        "checked" : 1,
        "id" : 102,
        "ori_price" : 1840,
        "price" : 1840,
        "avatar" : "https://img.yaotia.com/2021/09-10/1631235362167.png?size=120X120",
        "name" : "行测三板斧·风暴羚羊",
        "goods_id" : 52
      }
    ],
    "status" : 1
  });
}

//加入课程
if (url.includes('api.yaotia.com') && obj.result && obj.result[0].goods) {
  obj.result[0].goods.push({
    "course_type": 5,
    "list": [
      {
        "mark_name": "",
        "relation_id": "76",
        "short_desc": "会员课程",
        "teachers": [
          {
            "avatar": null,
            "teacher_name": null,
            "teacher_id": 2
          }
        ],
        "brand": {},
        "real_price": 1840,
        "tags": [],
        "desc": "永久会员",
        "title": "行测三板斧·风暴羚羊",
        "induce_text": "",
        "right_bottom_text": "",
        "price": "",
        "is_my_course": 1,
        "btns": [
          {
            "style": "hollow",
            "txt": "立即学习",
            "action": "to_pack"
          }
        ],
        "goods_id": 52,
        "goods_type": "5",
        "left_bottom_link": 0,
        "is_open": 1
      }
    ]
  });
}

if (url.includes('/api/v1/live/home')) {
    obj.data.is_bz_vip = true;
}
if (url.includes('/api/v1/live/historyLive')) {
    obj.data.vip = 1;
    obj.data.list.forEach(item => {
        item.is_auth = true;
      });
}

$done({ body: JSON.stringify(obj) });
