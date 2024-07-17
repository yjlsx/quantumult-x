[rewrite_local]
^http://richapi.yestiku.com/api/identity/getInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/identity/listData url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
^http://richapi.yestiku.com/api/pay/getPayInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
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
        obj.data.expire_time = "2099-12-31";
    }
}

if (url.includes('identity/listData') || url.includes('pay/getPayInfo')) {
    if (obj && obj.data) {
            obj.data.expire_time = "2099-12-31";
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



