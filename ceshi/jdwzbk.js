/**
*
[rewrite_local]
^http://richapi.yestiku.com/api/identity/getInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/identity/listData url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/home/getData$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/pay/getPayInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/questionset/listData url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/questionset/getInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
*
[mitm]
hostname = richapi.yestiku.com
*/

let body = $response.body;
let obj = JSON.parse(body);
let url = $request.url;

if (url.includes('/questionset/getInfo')) {
    // 修改 key 和会员类型名称
    if (obj && obj.data) {
        obj.data.key = 'i7';
        obj.data.usability = " ";
        obj.data.has = 1;
        obj.data.expire_time = "2099-12-31";
        obj.data.buy_number = obj.total_number; // 设置为已购买状态
    }
}

// 根据请求的 URL 不同执行不同的修改
if (url.includes('identity/getInfo') || url.includes('identity/listData') || url.includes('pay/getPayInfo')) {
    if (obj && obj.data) {
        // 修改价格为0
        if (obj.data.pay_list) {
            obj.data.pay_list.pay = 0;
        }
        if (obj.data.products && Array.isArray(obj.data.products)) {
            obj.data.products.forEach(product => {
                product.price = 0;
            });
        }
    }
}

if (url.includes('home/getData')) {
    // 在这里对响应体进行修改或处理
    if (obj && obj.data && obj.data.qs) {
        for (let item of obj.data.qs) {
            if (item.key === 'sj4') {
                item.buy_number = 3312; // 设置为已购买状态
            }
        }
    }
}

if (url.includes('/identity/getInfo')) {
    obj.data.expire_time = "2099-12-31";
}

if (url.includes('/questionset/listData')) {
    // 统一修改 buy_number
    if (obj && obj.data && Array.isArray(obj.data)) {
        obj.data.forEach(item => {
            if (item.key === 'sj4') {
                item.buy_number = [3312, 6231];
            }
        });
    }
}

$done({ body: JSON.stringify(obj) });
