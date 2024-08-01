/**

 [rewrite_local]

^https://api\.yaotia\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/bz.js
 
*
 [mitm]
 hostname = api.yaotia.cn, api.yaotia.com
 */
// 用户信息接口脚本 
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('api.yaotia.com')) {
    // 处理第一个情况：检查 obj.result 是否为数组，并且每个对象中包含价格字段
    if (obj.result && Array.isArray(obj.result)) {
        obj.result.forEach(item => {
            if (item.goods && Array.isArray(item.goods)) {
                item.goods.forEach(good => {
                    if (good.price !== undefined) {
                        good.price = "0"; // 修改当前价格为0
                    }
                    if (good.original_price !== undefined) {
                        good.original_price = "0"; // 修改原始价格为0
                    }
                });
            }
        });
    }

    // 处理第二个情况：检查 obj.result.errormsg 并修改状态和错误信息
    if (obj.result && obj.result.errormsg) {
        obj.status = 200;
        obj.result.errormsg = "购买成功";
    }

    // 处理第三个情况：检查 obj.result[0].goods 并在其中添加一个新商品
    if (obj.result && obj.result[0] && obj.result[0].goods) {
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
}




$done({ body: JSON.stringify(obj) });