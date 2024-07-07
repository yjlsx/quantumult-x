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
^https:\/\/api\.zhugeculture\.com\/api\/member\/master$ url script-response-body quantumultx_rewrite.js

[Mitm]
hostname = api.zhugeculture.com
****************************/
// Quantumult X Rewrite Script

const body = $response.body;
try {
    const jsonBody = JSON.parse(body);

    // 修改响应体中的数据，这里假设要修改的字段为 vip_status
    jsonBody.data.vip_status = "1"; // 设置为 VIP 状态
    jsonBody.data.is_master = "1";  
    jsonBody.data.accredit_total = 1;
    jsonBody.data.accredit_list = ["eu6zGN8LCt/ov7BLRQRe+karwn+0vJkOZ7YJUmjEPhVSaYyyHwb9wiTha7ZDhFUf0MEZDIQQpZ/fgWPvJXjvR1t+lrRkQUtuTQ5f8VyBAMlQo87377bvu2gnc8uXE36m4Twgtet3vc8oBpKjUtQ3Q12zaP6gcGIwynyfw3QWm763nQYKET6egb8Le9994CiKqMLw4EcSVtlgdDUEkpIhf15US2JTzQqQ6U7m70jkvF8PNBY5FGwkki4yJHtoXqMdYsujCC+k1IhIhitwdQVbUCYa/b48bnFfLGOxeZM2ctaxGEjv4DOR/B4Fkthq1kFTitmavOv3wpZ7ALw4O00Mrg=="];  
    jsonBody.data.vip_expiration_time = "2099-12-01";
    // 修改 meta 中的 sign 和 key 字段
   // jsonBody.meta.sign = "new_sign_value"; // 修改 sign 的值
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
    keyObj.vip_expiration_time = "2099-12-01"; // 设置 VIP 过期时间为 2023-12-31
    keyObj.vip_status = "1";
    keyObj.createtime = 1695088494;
    keyObj.accredit_total = 1;
    keyObj.accredit_list = jsonBody.data.accredit_list;
    
   jsonBody.meta.key = JSON.stringify(keyObj);

    $done({ body: JSON.stringify(jsonBody) });
} catch (error) {
    console.log("Error parsing JSON:", error.message);
    $done({});
}

    

 






      "days" : 9999,
      "id" : 3,
      "date_type" : "svip",
      "title" : "专业版",
      "oldprice" : "68.00",
      "marketprice" : "28.00",
      "vip_expiration_time" : "2099-12-01",
      "status" : "ok",
      "createtime" : 1695088494
    }
  ]
console.log('解锁成功!!!')
$done({body: JSON.stringify(body)})