/*
[rewrite_local]
# 统一处理脚本

^https:\/\/as\.mgtv\.com\/client\/store\/v4\/products\?api_version=\d+\.\d+&apple_prom=[^&]+&fe_version=[^&]+&invoker= url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/mg.js



*
[mitm]
hostname = as.mgtv.com
*/

let body = $response.body;

// 找到包含 JSONP 回调函数名的起始位置和结束位置
let jsonStartIndex = body.indexOf('(') + 1;
let jsonEndIndex = body.lastIndexOf(')');
let callbackName = body.substring(0, jsonStartIndex - 1);

// 将 JSON 字符串解析为对象
let jsonString = body.substring(jsonStartIndex, jsonEndIndex);
let obj = JSON.parse(jsonString);

// 遍历 products 列表，将价格相关的字段设置为 0
obj.data.products.forEach(product => {
    product.price = 0;
    product.first_renew_price = 0;
    product.standard_price = 0;
    product.standard_price_cent = 0;
    product.original_price = 0;
    if (product.channels) {
        product.channels.forEach(channel => {
            channel.discount = 0;
        });
    }
});

// 将修改后的对象重新转换为字符串，并恢复为 JSONP 格式
let modifiedBody = callbackName + '(' + JSON.stringify(obj) + ')';

// 返回修改后的响应体
$done({body: modifiedBody});
