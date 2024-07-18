/**
 * @fileoverview Template to compose HTTP reqeuest.
*中国移动签到
*脚本已经失效，官方不允许非官方渠道访问！
[rewrite_local]
^https:\/\/h5pro\.lncmcc\.com\/still_stray\/double_denier\/myjiazai url script-request-header zgyd.js

[task_local]
5 0 * * * https://path-to-your-script.js, tag=中国移动签到

 */

const cmccCookiesKey = "cmcc_cookies";
const cmccRefererKey = "cmcc_referer";
const cmccCookies = $prefs.valueForKey(cmccCookiesKey);
const cmccReferer = $prefs.valueForKey(cmccRefererKey);

if ($request && $request.headers) {
  getCookie();
} else if (cmccCookies && cmccReferer) {
  checkin();
} else {
  $notify("中国移动签到", "", "❌ 请先获取Cookie和Referer");
  console.log("❌ 请先获取Cookie和Referer");
  $done();  // 确保脚本结束
}

function checkin() {
  const pc = getParameterFromReferer(cmccReferer, "pc");
  const pk = getParameterFromReferer(cmccReferer, "pk");

  if (!pc || !pk) {
    $notify("中国移动签到", "", "❌ Referer中未找到pc或pk参数");
    console.log("❌ Referer中未找到pc或pk参数");
    $done();  // 确保脚本结束
    return;
  }

  const url = `https://h5pro.lncmcc.com/still_stray/double_denier/p_signin`;
  const method = `POST`;
  const headers = {
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/wkwebview leadeon/10.1.5/CMCCIT`,
    'Accept': `application/json, text/javascript, */*; q=0.01`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`,
    'X-Requested-With': `XMLHttpRequest`,
    'Sec-Fetch-Dest': `empty`,
    'Sec-Fetch-Mode': `cors`,
    'Sec-Fetch-Site': `same-origin`,
    'Connection': `keep-alive`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Host': `h5pro.lncmcc.com`,
    'Origin': `https://h5pro.lncmcc.com`,
    'Referer': cmccReferer,
    'Cookie': cmccCookies
  };
  const body = `islogin=9fdc19955328088a363a947b7fa0052e08c331dca1fc9aa4df8fbcda21e13ecbaa86c3f48dff9cd6b94ebab8d6c2cdd0578e8dce86a50fef163a6f319c0de9dcf9a27dd97965b8d6c1520cf0583a4bcc&pc=${encodeURIComponent(pc)}&pk=${encodeURIComponent(pk)}`;

  const request = {
    url: url,
    method: method,
    headers: headers,
    body: body,
    timeout: 20000  // 设置超时时间为20秒
  };

  $task.fetch(request).then(response => {
    const data = JSON.parse(response.body);
    let title = "每日签到";
    let subtitle = "";
    let content = "";

    if (data.status === 1) {
      subtitle = "签到成功";
      content = data.msg;
    } else if (data.status === 0) {
      subtitle = "签到失败";
      content = data.msg;
    } else {
      title = "签到失败";
      subtitle = "";
      content = `错误信息: ${data.error_msg}`;
    }

    console.log(`${title}: ${subtitle} - ${content}`);
    $done();  // 确保脚本结束
  }).catch(error => {
    console.error("签到请求失败:", error);
    $done();  // 确保脚本结束
  });
}

function getCookie() {
  const cookie = $request.headers["Cookie"];
  const referer = $request.headers["Referer"];
  if (cookie && referer) {
    $prefs.setValueForKey(cookie, cmccCookiesKey);
    $prefs.setValueForKey(referer, cmccRefererKey);
    console.log("获取Cookie和Referer成功🎉");
  } else {
    $notify("中国移动签到", "", "❌ 获取Cookie或Referer失败");
    console.log("❌ 获取Cookie或Referer失败");
  }
  $done();  // 确保脚本结束
}

function getParameterFromReferer(referer, parameterName) {
  const regex = new RegExp(`${parameterName}=([^&]+)`);
  const match = referer.match(regex);
  if (match) {
    return decodeURIComponent(match[1]);
  }
  return null;
}
