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
    // 初始化状态
    let handled = false;
    
    // 检查第一个响应体的条件
    if (obj.result && Array.isArray(obj.result)) {
        // 对应第一个响应体的处理逻辑
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
        handled = true; // 标记为已处理
    }

    // 检查第二个响应体的条件
    if (obj.result && obj.result.errormsg) {
        if (!handled) { // 如果之前没有处理
            obj.status = 200;
            handled = true; // 标记为已处理
        }
    }

    // 检查第三个响应体的条件
    if (obj.result && obj.result[0] && obj.result[0].goods) {
        if (!handled) { // 如果之前没有处理
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
            handled = true; // 标记为已处理
        }
    }
}



$done({ body: JSON.stringify(obj) });