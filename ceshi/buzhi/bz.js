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
    let conditionOne = false;
    let conditionTwo = false;
    let conditionThree = false;
    
    // 检查第一个响应体的条件
    if (obj.result && Array.isArray(obj.result)) {
        conditionOne = true;
        obj.status = 200;
        obj.result.forEach(item => {
            if (item.is_vip !== undefined) {
                item.is_vip = 1;
                item.need_card = 0;
                item.video_auth = 1;
                item.can_correct = 1; 
                item.sl_card_num = 99999;
            }
            if (item.question_list) {
                item.question_list.forEach(question => {
                    question.video_auth = 1;  // 设置视频权限
                    question.can_correct = 1; // 设置可以批改
                });
            }
            if (item.role !== undefined) {
                item.role = 1;
            }
            if (item.bzb !== undefined) {
                item.bzb = 999999;
            }
            if (item.user_info) {
                item.user_info.button_name = "永久会员";
                item.user_info.role = 1;
                item.user_info.vip_desc = "2099-12-31 到期";
            }
        });
    }
    
    // 检查第二个响应体的条件
    if (obj.result && obj.result.errormsg) {
        conditionTwo = true;
        obj.status = 200;
        obj.result.errormsg = "购买成功";
    }
    
    // 检查第三个响应体的条件
    if (obj.result && obj.result[0] && obj.result[0].goods) {
        conditionThree = true;
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
    
    // 处理满足多个条件的情况
    if (conditionOne && conditionTwo && conditionThree) {
        // 处理同时满足所有条件的逻辑
        console.log("同时满足所有条件");
    } else if (conditionOne && conditionTwo) {
        // 处理同时满足第一个和第二个条件的逻辑
        console.log("满足条件一和条件二");
    } else if (conditionOne && conditionThree) {
        // 处理同时满足第一个和第三个条件的逻辑
        console.log("满足条件一和条件三");
    } else if (conditionTwo && conditionThree) {
        // 处理同时满足第二个和第三个条件的逻辑
        console.log("满足条件二和条件三");
    } else if (conditionOne) {
        // 处理只满足第一个条件的逻辑
        console.log("仅满足条件一");
    } else if (conditionTwo) {
        // 处理只满足第二个条件的逻辑
        console.log("仅满足条件二");
    } else if (conditionThree) {
        // 处理只满足第三个条件的逻辑
        console.log("仅满足条件三");
    }
}



$done({ body: JSON.stringify(obj) });