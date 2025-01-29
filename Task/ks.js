


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
*/

const $ = API("快手签到", true);
const ERR = MYERR();

!(async () => {
  $.log("脚本开始运行");
  try {
    if (typeof $request != "undefined") {
      $.log("正在获取Cookie");
      getCookie();
    } else {
      // 多账号处理
      let accounts = [];
      let index = 1;
      while (true) {
        let cookie = $.getval(`kuaishou_cookies${index}`);
        if (!cookie) break;
        accounts.push({ cookie, index });
        index++;
      }
      
      if (accounts.length === 0) {
        $.log("未找到Cookie");
        $.notify("快手签到", "", "❌ 请先获取Cookie");
        return;
      }

      for (const account of accounts) {
        try {
          $.cookie = account.cookie;
          $.log(`正在处理账号 ${account.index}`);
          await checkin(account.index);
        } catch (err) {
          $.log(`账号 ${account.index} 处理失败: ${err}`);
        }
        await $.wait(2000); // 每个账号间隔2秒
      }
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

function checkin(accountIndex) {
  const url = `https://encourage.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?__NS_sig3=f7e7a0901f7588d73babc2a8afaea9ccfb84a14f9ac525b52611b8b8bebebdbc83a3&sigCatVer=1`;
  const method = `GET`;
  const headers = {
    // 保持原有headers不变
  };

  const myRequest = { url, method, headers, body: `` };

  return new Promise((resolve, reject) => {
    $task.fetch(myRequest).then(response => {
      const data = JSON.parse(response.body);
      let subtitle = "";
      let content = "";

      if (data.result === 102006 || data.result === 1) {
        subtitle = "签到成功";
        getWalletInfo().then(walletInfo => {
          const title = `快手签到 - ${walletInfo.nickname}`;
          content += `💰 金币: ${walletInfo.coinAmountDisplay}\n💵 现金: ${walletInfo.cashAmountDisplay}元`;
          $.notify(title, subtitle, content);
          resolve();
        }).catch(error => {
          const title = `快手签到 - 账号${accountIndex}`;
          $.notify(title, "❌ 获取钱包信息失败", error.message);
          reject(error);
        });
      } else {
        const title = `快手签到 - 账号${accountIndex}`;
        content = `错误信息: ${data.error_msg || "未知错误"}`;
        $.notify(title, "❌ 签到失败", content);
        resolve();
      }
    }).catch(error => {
      const title = `快手签到 - 账号${accountIndex}`;
      $.notify(title, "❌ 请求失败", error.error || error);
      reject(error);
    });
  });
}

function getWalletInfo() {
  const url = `https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/info?source=normal&__NS_sig3=2a3a7d4d6c6cf1d6e276107572731a53e634457ae3c4fc68c25f6565636360615e7e&sigCatVer=1`;
  const method = `GET`;
  const headers = {
    // 保持原有headers不变
  };

  const myRequest = { url, method, headers, body: `` };

  return new Promise((resolve, reject) => {
    $task.fetch(myRequest).then(response => {
      const data = JSON.parse(response.body);
      if (data.result === 1) {
        resolve({
          coinAmountDisplay: data.data.account.coinAmountDisplay,
          cashAmountDisplay: data.data.account.cashAmountDisplay,
          nickname: data.data.nickname || "未知用户"
        });
      } else {
        reject(new ERR.ParseError("获取钱包信息失败"));
      }
    }).catch(error => reject(error));
  });
}

function getCookie() {
  if ($request && $request.method === "GET" && $request.url.match(/rest\/wd\/encourage\/home/)) {
    let index = 1;
    while ($.getval(`kuaishou_cookies${index}`)) index++;
    
    const cookie = $request.headers["Cookie"];
    $.setval(cookie, `kuaishou_cookies${index}`);
    $.notify("快手签到", "", `✅ 账号${index} Cookie获取成功`);
  }
}

// 保持原有的API和MYERR函数不变

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
