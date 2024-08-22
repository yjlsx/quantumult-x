/**************************************
*
[rewrite local]
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/coin.js

*
[mitm]
hostname = as.mgtv.com
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
    let obj;
    try {
        obj = JSON.parse(jsonpBody);
    } catch (e) {
        $done({ body: body });
        return;
    }

    // 处理特定的 URL
    if ($request.url.indexOf('/client/order/orderCreate') !== -1) {
        // 修改响应体
        obj.status = "200";
        obj.msg = " ";
       if (obj.data && obj.data.pay_info) {
        //obj.data.pay_info.pay_type = "result"; // 支付类型改为成功
        obj.data.pay_info.settle_price = 0;      // 结算价格改为0
        obj.data.pay_info.pay_amount = 0;       // 支付金额改为0
        //obj.data.pay_info.channel_code = "FREE";  

               }


        // 生成修改后的 JSONP 响应体
        let newBody = JSON.stringify(obj);
        $done({ body: `${jsonpFunction}(${newBody})` });
    } else {
        // 对其他 URL 不做修改，直接返回原始响应
        $done({ body: body });
    }
} else {
    // 如果没有匹配到 JSONP 格式，则直接返回原始响应
    $done({ body: body });
}

 