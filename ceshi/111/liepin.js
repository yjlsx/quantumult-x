/*
[rewrite_local]
# 统一处理脚本
^https://api-ac\.liepin\.com/api-batch/parallel url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.cresume.list-user-gray-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/com.liepin.usercx.user.base-prop url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-wanda\.liepin\.com/api/com.liepin.cbp.baizhong.op.v2-show-4app url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js

*
[mitm]
hostname = api-ac.liepin.com, api-wanda.liepin.com
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
                            obj.data[key].data.goldCardUser = true; // 设置为金卡用户
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

//去广告
if (url.includes("/api/com.liepin.cbp.baizhong.op.v2-show-4app")) {
            if (obj.data) {
                obj.data.adList = []; // 关闭广告，通过将 adList 置为空数组
            }
        }



        // 返回修改后的响应体
        $done({ body: JSON.stringify(obj) });
    } 
})();



