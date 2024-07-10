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
^https:\/\/api\.zhugeculture\.com\/api\/member\/master url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js
^https:\/\/api\.zhugeculture\.com\/api\/order\/products url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js
^https:\/\/api\.zhugeculture\.com\/api\/sync\/addSync url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js
^https:\/\/business\.msstatic\.com\/advertiser\/material\/PV3Prfy3kzI9arXTduo-960x540\.jpg url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js

[mitm]
hostname = api.zhugeculture.com,bussiness.mastatic.com

****************************/
// Quantumult X Rewrite Script

const url1 = /^https:\/\/api\.zhugeculture\.com\/api\/member\/master/;
const url2 = /^https:\/\/api\.zhugeculture\.com\/api\/order\/products/;
const url3 = /^https:\/\/api\.zhugeculture\.com\/api\/sync\/addSync/;
const url4 = /^https:\/\/business\.msstatic\.com\/advertiser\/material\/PV3Prfy3kzI9arXTduo-960x540\.jpg/;

const url = $request.url;
let body = $response.body;

try {
    let jsonBody = JSON.parse(body);

    if (url1.test(url)) {
        jsonBody.data.vip_status = "ok";
        jsonBody.data.is_master = "1";
        jsonBody.data.accredit_total = 5;
        jsonBody.data.parking_total = 0;
        jsonBody.data.accredit_list = [
            {
                "product_id": "com.zhuge.spider.professional",
                "date_type": "svip",
                "title": "专业版",
                "vip_expiration_time": "2099-12-01",
                "status": "ok",
                "rights": [
                    {
                        "title": "抓包",
                        "content": "抓取 HTTP/HTTPS流量"
                    },
                    {
                        "title": "重写",
                        "content": "实时修改HTTP/HTTPS的请求和响应"
                    },
                    {
                        "title": "数据共享",
                        "content": "多账户之间数据共享"
                    },
                    {
                        "title": "脚本",
                        "content": "支持自定义JavaScript语法进行接口的拓展编写"
                    },
                    {
                        "title": "重放",
                        "content": "支持接口依赖&断言的自定义HTTP(S)网络请求"
                    }
                ],
                "days": 9999,
                "id": 3,
                "oldprice": "68.00",
                "marketprice": "28.00",
                "createtime": 1695088494
            }
        ];
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
        keyObj.is_master = "1";
        keyObj.user_rights = jsonBody.data.user_rights;
        keyObj.vip_expiration_time = "2099-12-01";
        keyObj.vip_status = "ok";
        keyObj.createtime = 1695088494;
        keyObj.parking_total = 0;
        keyObj.accredit_total = 5;
        keyObj.accredit_list = jsonBody.data.accredit_list;

        jsonBody.meta.key = JSON.stringify(keyObj);
    } else if (url2.test(url)) {
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
    } else if (url3.test(url)) {
        jsonBody.msg = "操作成功";
        jsonBody.code = 0;
    } else if (url4.test(url)) {
        const responseBody = {
            "request_date_ms": 1720394305190,
            "request_date": "2024-07-07T23:18:25Z",
            "subscriber": {
                "last_seen": "2024-06-21T04:44:30Z",
                "first_seen": "2024-06-21T04:44:30Z",
                "original_application_version": null,
                "other_purchases": {
                    "com.zhuge.spider.professional": {
                        "purchase_date": "2024-06-21T04:44:44Z"
                    }
                },
                "management_url": null,
                "subscriptions": {},
                "entitlements": {
                    "unlock all": {
                        "expires_date": null,
                        "purchase_date": "2024-06-21T04:44:44Z",
                        "product_identifier": "com.zhuge.spider.professional",
                        "grace_period_expires_date": null
                    }
                },
                "original_purchase_date": "2024-06-21T04:44:14Z",
                "original_app_user_id": "$RCAnonymousID:0400000000000000000000000000000",
                "non_subscriptions": {
                    "com.zhuge.spider.professional": [
                        {
                            "rights": [
                                {
                                    "title": "抓包",
                                    "content": "抓取 HTTP/HTTPS流量"
                                },
                                {
                                    "title": "重写",
                                    "content": "实时修改HTTP/HTTPS的请求和响应"
                                },
                                {
                                    "title": "数据共享",
                                    "content": "多账户之间数据共享"
                                },
                                {
                                    "title": "脚本",
                                    "content": "支持自定义JavaScript语法进行接口的拓展编写"
                                },
                                {
                                    "title": "重放",
                                    "content": "支持接口依赖&断言的自定义HTTP(S)网络请求"
                                }
                            ],
                            "days": 9999,
                            "id": 33370,
                            "date_type": "svip",
                            "title": "专业版",
                            "oldprice": "68.00",
                            "marketprice": "28.00",
                            "vip_expiration_time": "2099-12-01",
                            "status": "ok",
                            "createtime": 1695088494,
                            "is_sandbox": false,
                            "purchase_date": "2024-06-21T04:44:44Z",
                            "original_purchase_date": "2024-06-21T04:44:44Z",
                            "store": "app_store",
                            "store_transaction_id": "280000000000000"
                        }
                    ]
                }
            }
        };

        body = JSON.stringify(responseBody);
    }

    $done({ body: JSON.stringify(jsonBody) });
} catch (error) {
    console.log("Error parsing JSON:", error.message);
    $done({ body });
}