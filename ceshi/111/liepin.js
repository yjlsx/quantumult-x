/*
[rewrite_local]
# 统一处理脚本
^https://api-ac\.liepin\.com/api-batch/parallel url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.cresume.list-user-gray-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.usercx.user.base-prop url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-wanda\.liepin\.com/api/com.liepin.cbp.baizhong.op.v2-show-4app url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.wenqu.list-user-gray-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-c\.liepin\.com/api/com.liepin.usercx.pc.user.base-property url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-c\.liepin\.com/api/com.liepin.cbusi.goldcard.get-activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-c\.liepin\.com/api/com.liepin.cbusi.sale.get-goldcard-dict-h5 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.cresume.register.app.need-improve-info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-c\.liepin\.com/api/com.liepin.cbusi.cashier.pay-sign  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js



*
[mitm]
hostname = api-ac.liepin.com, api-wanda.liepin.com, api-c.liepin.com
*/


(function() {
    // 获取原始响应体和请求地址
    const url = $request.url;
    let body = $response.body;

    try {
        let obj = JSON.parse(body);

        // 处理批量请求的响应体
        if (url.includes("https://api-ac.liepin.com/api-batch/parallel")) {
            if (obj.data) {
                for (const key in obj.data) {
                    if (obj.data[key] && obj.data[key].data) {
                        if (key === "/api/com.liepin.usercx.user.base-prop") {
                            obj.data[key].data.goldCardUser = false; // 设置为金卡用户
                            obj.data[key].data.identityKind = 1; // 设置为身份已认证
                        }
                    }
                }
            }
        }

        // 处理功能
        if (url.includes("/api/com.liepin.cresume.list-user-gray-status")) {
            obj = {
                "flag": 1,
                "data": {
                    "RESUME_DIAGNOSIS": true,
                    "AI_RESUME_PARSE": true
                }
            };
        }

        if (url.includes("/api/com.liepin.usercx.user.base-prop")) {
            if (obj.data) {
                // 修改用户状态为金卡用户，并标记为已认证
                obj.data.goldCardUser = true;
                obj.data.identityKind = 1; // 已认证
            }
        }

        // 去广告
        if (url.includes("/api/com.liepin.cbp.baizhong.op.v2-show-4app")) {
            if (obj.data) {
                obj.data.adList = []; // 关闭广告，通过将 adList 置为空数组
            }
        }

        if (url.includes("/api/com.liepin.wenqu.list-user-gray-status")) {
            // 开启 AI 功能
            if (obj.data) {
                obj.data["C_AI_LILY"] = true;
            }
        }

        if (url.includes("/api/com.liepin.usercx.pc.user.base-property")) {
            if (obj.data) {
                obj.data.goldCardUser = false;
            }
        }

        if (url.includes("api/com.liepin.cbusi.goldcard.get-activity")) {
            if (obj.data) {
                obj.data.startTime = "2024-07-28";
                obj.data.endTime = "2099-12-31";
            }
        }

        if (url.includes("api/com.liepin.cbusi.sale.get-goldcard-dict-h5")) {
            // 遍历所有的 goldcardItemForms 并将价格字段设置为 0
            if (obj.data && obj.data.goldcardItemForms) {
                obj.data.goldcardItemForms.forEach(item => {
                    item.price = 0;
                    item.originalPrice = 0;
                    item.priceText = "0.0元";
                    item.originalPriceText = "0.0元";
                });
            }
        }

        if (url.includes("/api/com.liepin.cresume.register.app.need-improve-info")) {
            if (obj.data) {
                obj.data.idCardCertStatus = 1;
                obj.data.parseStatus = 1;
                obj.data.needUserCard = true;
                obj.data.showLable = true;
                
            }
        }

        if (url.includes("/liepin.cbusi.cashier.pay-sign")) {
            if (obj.data) {
                  // 修改实际支付金额和订单金额为 0
                 obj.data.actualPayAmountCNY = '0.00';
                 obj.data.orderMoney = 0;

            }
        }


        // 返回修改后的响应体
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果解析失败，则返回原始响应体
        $done({ body: body });
    }
})();
