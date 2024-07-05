
/**
 * App : 快手
 * By @yjlsx
 * 脚本功能：签到领取金币.
 * 使用方法：添加相关规则到quantumult x，进入首页的金币主页，提示获取cookie成功，把rewrite和hostname关闭，以免每次运行都会获取cookie.
 * Date: 2024.07.05
 * 此脚本仅个人使用，请勿用于非法途径！
 
*⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

//Quantumult X 重写规则
 [rewrite_local]
  https:\/\/encourage\.kuaishou\.com\/rest\/wd\/encourage\/home url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/kuaishou.js
 
 [mitm] 
      hostname = encourage.kuaishou.com

  [task_local]
  1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/kuaishou.js, tag=快手签到, img-url=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/IconSet/Color/kuaishou.png, enabled=true
 * 
 */

const $ = API("快手签到", true);
const ERR = MYERR();
$.cookie = $.getval("kuaishou_cookies");

!(async () => {
  $.log("脚本开始运行");
  try {
    if (typeof $request != "undefined") {
      $.log("正在获取Cookie");
      getCookie();
    } else if ($.cookie != undefined) {
      $.log("正在进行签到操作");
      await checkin();
    } else {
      $.log("未找到Cookie");
      $.notify("快手签到", "", "❌ 请先获取Cookie");
    }
  } catch (err) {
    $.log("捕获到错误");
    if (err instanceof ERR.ParseError) {
      $.notify("快手签到", "❌ 解析数据出现错误", err.message);
    } else {
      $.notify(
        "快手签到",
        "❌ 出现错误",
        JSON.stringify(err, Object.getOwnPropertyNames(err))
      );
    }
  } finally {
    $.log("脚本运行结束");
    $.done();
  }
})();

function checkin() {
  const url = `https://encourage.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?__NS_sig3=f7e7a0901f7588d73babc2a8afaea9ccfb84a14f9ac525b52611b8b8bebebdbc83a3&sigCatVer=1`;
  const method = `GET`;
  const headers = {
    'Sec-Fetch-Dest': `empty`,
    'Connection': `keep-alive`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Content-Type': `application/x-www-form-urlencoded;charset=UTF-8`,
    'Sec-Fetch-Site': `same-origin`,
    'Cache-Control': `no-cache`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Kwai/12.5.40.8800 ISLP/0 StatusHT/47 ISDM/0 TitleHT/44 NetType/WIFI ICFO/0 locale/zh-Hans CT/0 Yoda/2.13.7 ISLB/0 CoIS/2 ISLM/0 WebViewType/WK BHT/102 AZPREFIX/az1`,
    'PGID': `FCD15D57-5F0F-4690-B66D-CD1A516F4FA7`,
    'Sec-Fetch-Mode': `cors`,
    'Cookie': $.cookie,
    'Host': `encourage.kuaishou.com`,
    'Referer': `https://encourage.kuaishou.com/kwai/task?layoutType=4&source=pendant&hyId=encourage_earning`,
    'ZYCK': `encourage_earning`,
    'Pragma': `no-cache`,
    'Accept': `*/*`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`
  };
  const body = ``;

  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
  };

  return new Promise((resolve, reject) => {
    $task.fetch(myRequest).then(response => {
      const data = JSON.parse(response.body);
      let title = "快手";
      let subtitle = "";
      let content = "";

      if (data.result === 102006) {
        subtitle = "签到成功";
        content = data.msg;
      } else if (data.result === 1) {
        subtitle = "签到失败";
        content = data.msg;
      } else {
        title = "签到失败";
        subtitle = "";
        content = `错误信息: ${data.error_msg}`;
      }

      $notify(title, subtitle, content);
      resolve();
    }).catch(error => {
      $notify("签到请求失败", "", error);
      reject(new ERR.ParseError("签到请求失败，请检查日志"));
    });
  });
}

function getCookie() {
  if (
    $request &&
    $request.method === "GET" &&
    $request.url.match(/rest\/wd\/encourage\/home/)
  ) {
    const cookie = $request.headers["Cookie"];
    $.log(`获取到的Cookie: ${cookie}`);
    $.setval(cookie, "kuaishou_cookies");
    $.notify("快手签到", "", "获取Cookie成功🎉");
  }
}

function API(name = "untitled", auto = false) {
  return new (class {
    constructor(name, auto) {
      this.name = name;
      this.auto = auto;
      this.init = () => {
        const getval = (key) => {
          $.log(`读取值: ${key}`);
          return $prefs.valueForKey(key);
        };
        const setval = (val, key) => {
          $.log(`设置值: ${key} 为 ${val}`);
          return $prefs.setValueForKey(val, key);
        };
        const get = (opts) => {
          $.log(`发送GET请求: ${JSON.stringify(opts)}`);
          return $task.fetch(opts).then(response => {
            if (response.error) {
              throw response.error;
            } else {
              return response;
            }
          });
        };
        const post = (opts) => {
          $.log(`发送POST请求: ${JSON.stringify(opts)}`);
          return $task.fetch(opts).then(response => {
            if (response.error) {
              throw response.error;
            } else {
              return response;
            }
          });
        };
        const notify = (title, subTitle, message) => {
          $.log(`发送通知: ${title}, ${subTitle}, ${message}`);
          $notify(title, subTitle, message);
        };
        const log = (message) => {
          console.log(message);
        };
        const error = (message) => {
          console.error(message);
        };
        const done = () => {
          $.log("脚本完成");
          $done();
        };
        this.getval = getval;
        this.setval = setval;
        this.get = get;
        this.post = post;
        this.notify = notify;
        this.log = log;
        this.error = error;
        this.done = done;
      };
      this.init();
    }
  })();
}

function MYERR() {
  class ParseError extends Error {
    constructor(message) {
      super(message);
      this.name = "ParseError";
    }
  }
  return { ParseError };
}
