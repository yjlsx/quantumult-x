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
[Script]
http-response https://api.zhugeculture.com/api/order/products requires-body=1, max-size=0, script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/spider.js

[Mitm]
hostname = api.zhugeculture.com
****************************/

const body = JSON.parse($response.body)
body.data = [
    {
      "product_id" : "com.zhuge.spider.basic",
      "rights" : [
        {
          "title" : "抓包",
          "content" : "抓取 HTTP/HTTPS流量"
        },
        {
          "title" : "重写",
          "content" : "实时修改HTTP/HTTPS的请求和响应"
        },
        {
          "title" : "数据共享",
          "content" : "多账户之间数据共享"
        }
      ],
      "days" : 9999,
      "id" : 2,
      "date_type" : "vip",
      "title" : "基础版",
      "oldprice" : "28.00",
      "marketprice" : "18.00",
      "vip_expiration_time" : "2099-12-01",
      "status" : "ok",
      "createtime" : 1695088494
    },
    {
      "product_id" : "com.zhuge.spider.professional",
      "rights" : [
        {
          "title" : "抓包",
          "content" : "抓取 HTTP/HTTPS流量"
        },
        {
          "title" : "重写",
          "content" : "实时修改HTTP/HTTPS的请求和响应"
        },
        {
          "title" : "数据共享",
          "content" : "多账户之间数据共享"
        },
        {
          "title" : "脚本",
          "content" : "支持自定义JavaScript语法进行接口的拓展编写"
        },
        {
          "title" : "重放",
          "content" : "支持接口依赖&断言的自定义HTTP(S)网络请求"
        }
      ],
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