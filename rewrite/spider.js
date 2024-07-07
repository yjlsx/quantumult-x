/****************************

#!name = spider proxy
#!desc = 解锁VIP
#!date = 2024-07-08
*⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
[rewrite_local]
^https:\/\/api\.zhugeculture\.com\/api\/member\/master$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js
^https:\/\/api\.zhugeculture\.com\/api\/order\/products$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js
^https:\/\/api\.zhugeculture\.com\/api\/sync\/addSync$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js

[mitm]
hostname = api.zhugeculture.com

****************************/
// Quantumult X Rewrite Script

const url1 = '^https://api\\.zhugeculture\\.com/api/member/master';
const url2 = '^https://api\\.zhugeculture\\.com/api/order/products';
const url3 = '^https://api\\.zhugeculture\\.com/api/sync/addSync';

const body = $response.body;
const url = $request.url;

try {
    const jsonBody = JSON.parse(body);

    if (url.match(url1)) {
        // 修改 member/master 响应体
        jsonBody.data.vip_status = "ok"; // 设置为 VIP 状态
        jsonBody.data.is_master = "1";  
        jsonBody.data.accredit_total = 1;
        jsonBody.data.accredit_list = [" 688cb04816dd41c59ac73f252a7e52d9"];  
        jsonBody.data.vip_expiration_time = "2099-12-01";
        jsonBody.data.user_rights = [
            {
                "title": "抓包",
                "content": "抓取 HTTP/HTTPS 流量"
            },
            {
                "title": "重写",
                "content": "实时修改 HTTP/HTTPS 的请求和响应"
            },
            {
                "title": "数据共享",
                "content": "多账户之间数据共享"
            },
            {
                "title": "脚本",
                "content": "支持自定义 JavaScript 语法进行接口的拓展编写"
            },
            {
                "title": "重放",
                "content": "支持接口依赖&断言的自定义 HTTP(S) 网络请求"
            }
        ];
       
        const keyObj = JSON.parse(jsonBody.meta.key);
        keyObj.is_master = "1"; // 设置为 VIP 状态
        keyObj.user_rights = jsonBody.data.user_rights;
        keyObj.vip_expiration_time = "2099-12-01"; // 设置 VIP 过期时间为 2099-12-01
        keyObj.vip_status = "ok";
        keyObj.createtime = 1695088494;
        keyObj.accredit_total = 1;
        keyObj.accredit_list = jsonBody.data.accredit_list;
        
        jsonBody.meta.key = JSON.stringify(keyObj);
    } else if (url.match(url2)) {
        // 修改 order/products 响应体
        jsonBody.data.forEach(product => {
            product.days = 9999;
            product.vip_expiration_time = "2099-12-01";
            product.status = "ok";
            if (product.product_id === "com.zhuge.spider.basic") {
                product.date_type = "vip";
            } else if (product.product_id === "com.zhuge.spider.professional") {
                product.date_type = "svip";
            }
        });
    } else if (url.match(url3)) {
        // 修改 sync/addSync 响应体
        jsonBody.msg = "操作成功";
        jsonBody.code = 0;
    }

    $done({ body: JSON.stringify(jsonBody) });
} catch (error) {
    console.log("Error parsing JSON:", error.message);
    $done({});
}
