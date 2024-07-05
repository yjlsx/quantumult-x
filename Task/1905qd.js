
/**
 * App:1905电影网
 * By @yjlsx
 * 脚本功能：签到！
 * Date: 2024.07.05
 
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
      https:\/\/50843\.activity\-42\.m\.duiba\.com\.cn\/signactivity\/getSignInfo url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/1905qd.js
[mitm] 
      hostname = 50843.activity-42.m.duiba.com.cn
 [task_local]
     1 0 * * * 1905qd.js, tag=1905电影网签到, img-url=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/IconSet/Color/1905logo.jpg, enabled=true
 */

const $ = new API("1905签到", true);
const ERR = MYERR();
$.cookie = $.getval("duiba_cookies");

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
      $.notify("1905电影网签到", "", "❌ 请先获取Cookie");
    }
  } catch (err) {
    $.log("捕获到错误");
    if (err instanceof ERR.ParseError) {
      $.notify("1905电影网签到", "❌ 解析数据出现错误", err.message);
    } else {
      $.notify(
        "1905电影网签到",
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
  const url = `http://50843.activity-42.m.duiba.com.cn/signactivity/doSign?id=251034638333476&signActType=7&_=1720023053642`;
  const headers = {
    Cookie: $.cookie,
    Accept: `application/json, text/plain, */*`,
    Connection: `keep-alive`,
    Referer: `http://50843.activity-42.m.duiba.com.cn/sign/fornew/index?id=251034638333476&from=login&spm=50843.1.1.1`,
    "Accept-Encoding": `gzip, deflate`,
    Host: `50843.activity-42.m.duiba.com.cn`,
    "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.5.34.1097 (Open 0.1) From 1905 App`,
    "Accept-Language": `zh-CN,zh-Hans;q=0.9`,
  };

  const myRequest = {
    url: url,
    headers: headers,
  };

  return new Promise((resolve, reject) => {
    $task.fetch(myRequest).then(response => {
      $.log(`签到请求响应: ${JSON.stringify(response)}`);
      if (response.statusCode === 200) {
        const parsedData = JSON.parse(response.body); // 解析响应体

        if (parsedData.success === "true") {
          const acmDay = parsedData.signInfoVO.acmDay;
          if (acmDay > 1) {
            const message = `已连续签到 ${acmDay} 天.`;
            $.notify("1905电影网", "今日签到成功", message);
          } else {
            $.notify("1905电影网", "签到失败", "连续签到中断");
          }
        } else {
          $.notify("1905电影网", "今日已签到", "请明日再来.");
        }
        resolve();
      } else {
        $.error(`签到请求失败: ${JSON.stringify(response)}`);
        reject(new ERR.ParseError("数据解析错误，请检查日志"));
      }
    }).catch(error => {
      $.log(`请求错误: ${JSON.stringify(error)}`);
      reject(new ERR.ParseError("签到请求失败，请检查日志"));
    });
  });
}

function getCookie() {
  if (
    $request &&
    $request.method === "POST" &&
    $request.url.match(/signactivity\/getSignInfo/)
  ) {
    const cookie = $request.headers["Cookie"];
    $.log(`获取到的Cookie: ${cookie}`);
    $.setval(cookie, "duiba_cookies");
    $.notify("1905电影网签到", "", "获取Cookie成功🎉");
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
