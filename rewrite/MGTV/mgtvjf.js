/**************************************
*
[rewrite local]
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
#^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/coin.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js


[mitm]
hostname = as.mgtv.com, vipact3.api.mgtv.com, oiiccdn.yydsii.com, messpro.hnwzinfo.com
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

    // 调试信息
    console.log('Request URL:', $request.url);
    console.log('Parsed Object:', obj);

    // 处理 '/client/order/order_status' 响应
    if ($request.url.includes("https://as.mgtv.com/client/order/order_status")) {
        if (obj.data && obj.data.order_pay_info && obj.data.order_pay_info.pay_info) {
            obj.data.order_pay_info.pay_info.settle_price = obj.data.order_pay_info.pay_info.pay_amount;
        }
        if (obj.data && obj.data.order_pay_info) {
            obj.data.order_pay_info.expired = 0; // 设置为未过期
        }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({ body: `${jsonpFunction}(${newBody})` });
    } 

    else if ($request.url.includes('/client/user/user_vip_coin')) {
         if (obj.data) {
            obj.data.points = 99999;
            obj.data.freze = 99998;
            obj.data.stat = 99997;
         }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


    else if ($request.url.includes('/api/heartbeat/v1')) {
        if (obj.code) {
            obj.code = 200;
        }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


    // 处理 '/client/user/user_info' 响应
    else if ($request.url.includes('/client/user/user_info')) {
        if (obj.data) {
            obj.data.vip_end_time_pc = "2099-09-09 00:00:00";
            obj.data.mpp_svip_end_date = "2099-09-09";
            obj.data.bigscreen_vip_end_date = "2099-09-09";
            obj.data.vip_end_date = "2099-09-09";
            obj.data.contract_full_screen_vip_end_date = "2099-09-09";
            obj.data.universal_pc_mobile_vip_end_date = "2099-09-09";
            obj.data.music_vip_end_time = "2099-09-09 00:00:00";
            obj.data.vip_end_time_svip = "2099-09-09 00:00:00";
            obj.data.contract_pc_mobile_vip_end_date = "2099-09-09";
            obj.data.universal_full_screen_vip_end_date = "2099-09-09";
            obj.data.vip_end_time_fs = "2099-09-09 00:00:00";
            obj.data.is_mpp_svip = 1;
            obj.data.music_vip = 1;
            obj.data.vip_id = "mpp_svip";
            obj.data.vip_name = "SVIP";
            if (obj.data.growth) {
                obj.data.growth.level = 9;
                obj.data.growth.score = 99999;
            }
            obj.data.vip_end_days = 99999;
        }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({body: `${jsonpFunction}(${newBody})`});
    }

    // 处理 '/GetUserInfo' 响应
    else if ($request.url.includes('/GetUserInfo')) {
        if (obj.data) {
            obj.data.isVip = 1; // 设置为 VIP
            obj.data.vipExpiretime = 4102444800; // 设置过期时间为 2099-12-31
            obj.data.vipinfo.growth.score = 99999; // 设置积分
            obj.data.vipinfo.growth.level = 9; // 设置等级
        }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({body: `${jsonpFunction}(${newBody})`});
    }


   else if ($request.url.includes('https://oiiccdn.yydsii.com/api/v1/client/subscribe')) {
        // 修改响应为成功
        obj.message = "success"; // 修改 message 字段为成功
        obj.code = 200; // 添加 code 字段为成功的 HTTP 状态码
        
        // 生成修改后的 JSONP 响应体
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    }


    // 处理 '/client/order/orderCreate' 响应
    else if ($request.url.includes("https://as.mgtv.com/client/order/orderCreate")) {
        if (obj.data) {
            obj.status = "200"; // 修改状态码为成功
            obj.msg = ""; // 清除错误消息
            obj.data = {}; // 确保数据字段为空对象
        }
        let newBody = JSON.stringify(obj);
        console.log('Modified Object:', newBody);
        $done({body: `${jsonpFunction}(${newBody})`});
    }
} else {
    // 如果没有匹配到 JSONP 格式，则直接返回原始响应
    $done({ body: body });
}
