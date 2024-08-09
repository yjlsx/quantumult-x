/*
[rewrite local]
^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baoyu.js

*
[mitm]
hostname = 103.39.222.113:3308
*/

// @name        重写接口响应体
// @description 将响应体修改为指定的 JSON 数据，并将 time 字段设置为当前时间
// @version     1.0.0

// 定义 URL 匹配模式
const urlPattern = /^https:\/\/103\.39\.222\.113:3308\/api\/my\/profile$/;

// 处理响应体的函数
function modifyResponse(response) {
  // 检查 response 对象是否存在，并且包含 body 属性
  if (response && response.body) {
    // 确保请求的 URL 匹配指定的模式
    if ($request.url.match(urlPattern)) {
      // 获取当前时间戳
      const currentTime = Math.floor(Date.now() / 1000);
      
      // 设置新的响应体
      const newResponseBody = {
        "code" : 200,
        "once" : null,
        "data" : {
          "cash_service_min" : 5,
          "operatepwd" : "",
          "isrealname" : 0,
          "id" : 3499211,
          "interest_yestoday" : 0,
          "vip_points" : 999,
          "vip_days" : 999,
          "is_vip" : 1,
          "first_deposit" : 0,
          "parent_contact" : {
            "qq" : "3665286581",
            "service_url" : "",
            "telegram" : "@a777777888888",
            "potato" : "@a18800"
          },
          "nickname" : "迷人的橘子",
          "contact" : null,
          "yuebao" : "999.00",
          "real_mobile" : "",
          "bind_info" : "",
          "is_exchange_code" : 1,
          "download_times" : 0,
          "spread" : "0.00",
          "extra_views" : 10,
          "sex" : 0,
          "email" : null,
          "fz_balance" : "999.00",
          "is_optpwd" : 0,
          "group_link" : "https://pt.im/joinchat/iVYwow1E7VpCwpk38j8K3A",
          "view_times" : "99",
          "card_num" : [],
          "name" : "12632978",
          "used_views" : 0,
          "ok_month_card" : 1,
          "account_type" : 1,
          "city" : "火星",
          "month_card_num" : 1,
          "mobile" : "",
          "unread_num" : 0,
          "service_rate" : "5%",
          "province" : "",
          "interest" : 0,
          "cash_service_max" : 50,
          "invite_num" : 0,
          "country_code" : 86,
          "vip_time" : null,
          "reduce_status" : 0,
          "card_gnum" : {
            "3" : 0,
            "6" : 0,
            "2" : 0,
            "5" : 0
          },
          "day_views" : 99,
          "head_img" : "6",
          "is_bind" : 0,
          "balance" : "999.00",
          "title" : 0,
          "brief" : "这个人很懒，什么都没有留下",
          "rate" : "7.31",
          "pid" : 433484,
          "vip_type" : 0
        },
        "msg" : "success",
        "time" : currentTime
      };

      // 将修改后的 JSON 对象转换为字符串
      response.body = JSON.stringify(newResponseBody);
    }

    // 返回修改后的响应体
    $done({ body: response.body });
  } else {
    // 如果 response 对象不存在或 body 属性不存在，直接返回原响应
    $done({});
  }
}

// 执行响应处理
modifyResponse($response);
