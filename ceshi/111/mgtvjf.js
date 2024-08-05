/**************************************
*
[rewrite local]
# 处理第一个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
# 处理第二个 URL 响应
^https:\/\/as\.mgtv\.com\/client\/user\/user_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
#^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/mgtvjf.js


*
[mitm]
hostname = as.mgtv.com, vipact3.api.mgtv.com, oiiccdn.yydsii.com
*************************************/


// 获取响应体
let body = $response.body;

// 提取 JSONP 函数名和内容
let jsonpMatch = body.match(/^jsonp_\d+_\d+\(/);
let jsonpEndMatch = body.match(/\)\s*$/);

if (jsonpMatch && jsonpEndMatch) {
    let jsonpFunction = jsonpMatch[0].replace(/[\(\s]/g, ''); // 提取 JSONP 函数名
    let jsonpBody = body.substring(jsonpMatch[0].length, body.length - jsonpEndMatch[0].length); // 提取 JSON 数据

    // 解析 JSON 数据
    let obj = JSON.parse(jsonpBody);

    // 处理 '/client/order/order_status' 响应
    if ($request.url.indexOf("https://as.mgtv.com/client/order/order_status") !== -1) {
        // 修改 settle_price 为 pay_amount 的值
        if (obj.data && obj.data.order_pay_info && obj.data.order_pay_info.pay_info) {
            obj.data.order_pay_info.pay_info.settle_price = obj.data.order_pay_info.pay_info.pay_amount;
        }

        // 修改过期状态
        if (obj.data && obj.data.order_pay_info) {
            obj.data.order_pay_info.expired = 0; // 设置为未过期
        }

        // 生成修改后的 JSONP 响应体
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    } 

    // 处理 '/client/user/user_vip_coin' 响应
    else if ($request.url.indexOf('/client/user/user_vip_coin') !== -1) {
        if (obj.data) {
            obj.data.points = 99999;
            obj.data.point = 99998;
            obj.data.stat = 99997;
        }
        
        $done({body: `${jsonpFunction}(${JSON.stringify(obj)})`});
    }

    // 处理 '/api/v1/act/assets/idxnum' 响应
    else if ($request.url.indexOf('/api/v1/act/assets/idxnum') !== -1) {
        if (obj.data) {
            obj.data.idx.vcoin = 99999;
            obj.data.idx.redeem = 99990;
            obj.data.idx.admission = 91;  // 门票
            obj.data.idx.award = 75; // 其他卡券
            obj.data.idx.union_vip = 10;
        }
        
        $done({body: `${jsonpFunction}(${JSON.stringify(obj)})`});
    }

    // 处理 '/client/user/user_info' 响应
    else if ($request.url.indexOf('/client/user/user_info') !== -1) {
        if (obj.data) {
            // 更新所有结束日期字段
            obj.data.vip_end_time_pc = "2099-09-09";
            obj.data.mpp_svip_end_date = "2099-09-09";
            obj.data.bigscreen_vip_end_date = "2099-09-09";
            obj.data.vip_end_date = "2099-09-09";
            obj.data.contract_full_screen_vip_end_date = "2099-09-09";
            obj.data.universal_pc_mobile_vip_end_date = "2099-09-09";
            obj.data.music_vip_end_time = "2099-09-09";
            obj.data.vip_end_time_svip = "2099-09-09";
            obj.data.contract_pc_mobile_vip_end_date = "2099-09-09";
            obj.data.universal_full_screen_vip_end_date = "2099-09-09";
            obj.data.vip_end_time_fs = "2099-09-09";

            // 更新VIP相关字段
            obj.data.is_mpp_svip = 1;
            obj.data.music_vip = 1;
            obj.data.vip_id = 1;
            obj.data.vip_name = "svip";

            // 更新成长数据
            if (obj.data.growth) {
                obj.data.growth.level = 9;
                obj.data.growth.score = 99999;
            }

            // 更新剩余天数
            obj.data.vip_end_days = 99999;
        }
        
        $done({body: `${jsonpFunction}(${JSON.stringify(obj)})`});
    }

    // 处理 '/GetUserInfo' 响应
    else if ($request.url.indexOf('/GetUserInfo') !== -1) {
        if (obj.data) {
            obj.data.isVip = 1; // 设置为 VIP
            obj.data.vipExpiretime = 4102444800; // 设置过期时间为 2099-12-31
            obj.data.vipinfo.growth.score = 99999; // 设置积分
            obj.data.vipinfo.growth.level = 9; // 设置等级
        }
        
        $done({body: `${jsonpFunction}(${JSON.stringify(obj)})`});
    }

    // 处理 '/client/order/orderCreate' 响应
    else if ($request.url.indexOf("https://as.mgtv.com/client/order/orderCreate") !== -1) {
        // 修改状态为成功
        if (obj.data) {
            obj.status = "200"; // 修改状态码为成功
            obj.msg = "购买成功"; // 清除错误消息
        }

        // 生成修改后的 JSONP 响应体
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    }
} else {
    // 如果没有匹配到 JSONP 格式，则直接返回原始响应
    $done({ body: body });
}

