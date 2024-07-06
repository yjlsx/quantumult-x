
/**
 * Quantumult X 脚本，用于捕获辽友会签到页面的 Cookie
 * 
 * 步骤：
 * 1. 打开 Quantumult X，点击编辑配置文件。
 * 2. 将该脚本内容复制到对应的 [rewrite_local] 部分。
 * 3. 确保在 Quantumult X 的配置文件中添加了相应的 [mitm] 规则。
 * 4. 打开辽友会签到页面，触发获取 Cookie 的操作。
 * 
[rewrite_local]
# 辽友会签到获取 Cookie
^https://lyh\.lncmcc\.com/huodong-portal/lnlyh/familysignin/getIndexVue url script-request-header lyh_cookie.js

[mitm]
hostname = lyh.lncmcc.com
 */

// 获取和存储 Cookie
if ($request && $request.headers && $request.headers.Cookie) {
  const cookieKey = "lyh_signin_cookie";
  const newCookie = $request.headers.Cookie;
  $prefs.setValueForKey(newCookie, cookieKey);
  $notify("辽友会", "Cookie 获取成功", "");
  $done();
}

// 获取和存储 Cookie
if ($request && $request.headers && $request.headers.Cookie) {
  const cookieKey = "lyh_signin_cookie";
  const newCookie = $request.headers.Cookie;
  $prefs.setValueForKey(newCookie, cookieKey);
  $notify("辽友会", "Cookie 获取成功", "");
  $done();
}

// 获取存储的 Cookie
const cookieKey = "lyh_signin_cookie";
const cookie = $prefs.valueForKey(cookieKey);

// 检查是否存在 Cookie
if (!cookie) {
  // 不存在 Cookie，发送通知提醒用户获取 Cookie
  $notify("辽友会", "", "未找到 Cookie，请先获取 Cookie 后再尝试签到");
  $done();
} else {
  // 存在 Cookie，进行签到
  const url = `https://lyh.lncmcc.com/huodong-portal/lnlyh/familysignin/signin`;
  const method = `POST`;
  const headers = {
    'Sec-Fetch-Dest': `empty`,
    'Connection': `keep-alive`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Content-Type': `application/x-www-form-urlencoded`,
    'Sec-Fetch-Site': `same-origin`,
    'Origin': `https://lyh.lncmcc.com`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003137) NetType/WIFI Language/zh_CN miniProgram/wx7b8d2f8c69ac139e`,
    'Sec-Fetch-Mode': `cors`,
    'Cookie': cookie, // 使用存储的 Cookie
    'Host': `lyh.lncmcc.com`,
    'Referer': `https://lyh.lncmcc.com/lyhVue/index.html`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    'Accept': `application/json, text/plain, */*`
  };
  const body = `actNo=sign01&shopId=&prizeLogId=66884df735c983e675f79d57&prizeId=8ac49c698a65e90b018ad2ccc4f20006&thirdPrizeId=8ac49c70885580ef0188560158ff0761&familyId=&type=1&wechatParams=AsPVTE1iK8XHNhHCQwfEdAvX_LveQKlc5jmB0-Izqy7xWA94WmAvNxQLTr9GhjPWKOMYnk2-JF1nW5i3bjS9Iz_we9LHEcjBdGqaLqRiMBVuxdBabjXMkgVsPm09PbzhGsLuZa1EcHw_PcjXLAckStiz5EXlYQ3ztnMgUaw8HlGW9vRRs90xcLXe1vwJ-lkiWwnmibdxVfOn3jDQWrDJnJH2Ziv0XKzRANw8svfByxwxP31gmDPczsxnDrzWYNzlQdz7huDjcXs4vYkUH3fHkisg_kKReN8c-GNegUubnHVVxeDLpsV6xgzPb2itU_DHzRCKJz615gCHmhLKohxEXfgri0MViDI26ZVUY15y1YMdFukzWEiXkQH7mcKT9ZJMPI6iOb0D1Sk`;

  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
  };

  // 发送请求并处理响应
  $task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    if (response.statusCode === 200) {
      $notify("辽友会", "签到成功", "状态码：" + response.statusCode + "\n" + response.body);
    } else {
      $notify("辽友会", "签到失败", "状态码：" + response.statusCode + "\n" + response.body);
    }
    $done();
  }, reason => {
    console.log(reason.error);
    $notify("辽友会", "签到失败", "错误原因：" + reason.error);
    $done();
  });
}
