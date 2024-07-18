
/**
 * App : 网易云音乐
 * By @yjlsx
 * 脚本功能：PC端和APP端签到，以及云贝签到，还包括打卡刷歌（不一定有效），使用前先需要获取cookie.
 * 使用方法：添加相关规则到quantumult x，进入首页的金币主页，提示获取cookie成功，把rewrite和hostname关闭，以免每次运行都会获取cookie.
 * Date: 2024.07.19
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
 * 
 */

const $ = new Env('网易云音乐');
$.VAL_session = $.getdata('chavy_cookie_neteasemusic');
$.notifications = [];

!(async () => {
  $.log('', ` ${$.name}, 开始!`, '');
  init();
  await signweb();
  await signapp();
  await listenDaily();  // 听歌量打卡
  await checkCloudBean(); // 云贝签到
  await getInfo();
  await showmsg();
})()
.catch((e) => {
  $.log('', ` ${$.name}, 失败! 原因: ${e}!`, '');
})
.finally(() => {
  $.msg($.name, $.subt, $.desc), $.log('', ` ${$.name}, 结束!`, ''), $.done();
});

function init() {
  $.isNewCookie = /https:\/\/music.163.com\/weapi\/user\/level/.test($.VAL_session);
  $.Cookie = $.isNewCookie ? JSON.parse($.VAL_session).headers.Cookie : $.VAL_session;
}

async function signweb() {
  const url = { url: `http://music.163.com/api/point/dailyTask?type=1`, headers: {} };
  url.headers['Cookie'] = $.Cookie;
  url.headers['Host'] = 'music.163.com';
  url.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15';

  await new Promise((resolve) => {
    $.get(url, (error, response, data) => {
      try {
        $.isWebSuc = JSON.parse(data).code === -2;
        $.log(`[Web] 签到结果: ${data}`);
      } catch (e) {
        $.isWebSuc = false;
        $.log(` ${$.name}, 执行失败!`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, '');
      } finally {
        resolve();
      }
    });
  });
}

async function signapp() {
  const url = { url: `http://music.163.com/api/point/dailyTask?type=0`, headers: {} };
  url.headers['Cookie'] = $.Cookie;
  url.headers['Host'] = 'music.163.com';
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1';

  await new Promise((resolve) => {
    $.get(url, (error, response, data) => {
      try {
        $.isAppSuc = JSON.parse(data).code === 200;
        $.log(`[App] 签到结果: ${data}`);
      } catch (e) {
        $.isAppSuc = false;
        $.log(` ${$.name}, 执行失败!`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, '');
      } finally {
        resolve();
      }
    });
  });
}

async function listenDaily() {
  let begin = Math.floor(new Date().getTime() / 1000);
  let logs = [];
  for (let i = begin; i < begin + 320; i++) {
    logs.push({
      action: 'play',
      json: {
        download: 0,
        end: 'playend',
        id: i,
        sourceId: '',
        time: 300,
        type: 'song',
        wifi: 0,
        source: 'list'
      }
    });
  }

  await weapiRequest('/api/feedback/weblog', {
    cookie: $.Cookie,
    data: {
      logs: JSON.stringify(logs)
    },
    onload: (res) => {
      if (res.code == 200) {
        addNotification('今日听歌量+300首完成🎉');
      } else {
        addNotification('听歌量打卡失败。' + res);
      }
    }
  });
}

async function checkCloudBean() {
  const url = {
    url: `https://music.163.com/api/point/dailyTask?type=3`,
    headers: {
      'Cookie': $.Cookie,
      'Host': 'music.163.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15'
    }
  };

  await new Promise((resolve) => {
    $.get(url, (error, response, data) => {
      try {
        const result = JSON.parse(data);
        if (result.code === 200) {
          addNotification('云贝签到成功🎉');
        } else {
          addNotification('云贝签到失败：' + data);
        }
      } catch (e) {
        addNotification('云贝签到异常：' + e.message);
      } finally {
        resolve();
      }
    });
  });
}

function weapiRequest(url, options) {
  const requestUrl = `https://music.163.com${url}`;
  const body = {
    cookie: options.cookie,
    data: options.data
  };

  const requestOptions = {
    method: 'POST',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  return new Promise((resolve, reject) => {
    $.post(requestOptions, (error, response, data) => {
      if (error) {
        addNotification(`请求失败: ${error}`);
        reject(error);
      } else {
        const result = JSON.parse(data);
        options.onload(result);
        resolve(result);
      }
    });
  });
}

function getInfo() {
  if (!$.isNewCookie) return;
  return new Promise((resolve) => {
    $.post(JSON.parse($.VAL_session), (error, response, data) => {
      try {
        $.userInfo = JSON.parse(data);
      } catch (e) {
        $.log(` ${$.name}, 执行失败!`, ` 
error = ${error || e}`, `response = ${JSON.stringify(response)}`, '');
      } finally {
        resolve();
      }
    });
  });
}

function addNotification(message) {
  $.log(message);
  $.notifications.push(message);
}

function showmsg() {
  return new Promise((resolve) => {
    $.subt = $.isWebSuc ? 'PC: 成功🎉' : 'PC: 失败';
    $.subt += $.isAppSuc ? ', APP: 成功🎉' : ', APP: 失败';
    if ($.isNewCookie && $.userInfo) {
      $.desc = `等级: ${$.userInfo.data.level}, 听歌: ${$.userInfo.data.nowPlayCount} => ${$.userInfo.data.nextPlayCount} 升级 (首)`;
      $.desc = $.userInfo.data.level === 10 ? `等级: ${$.userInfo.data.level}, 你的等级已爆表!` : $.desc;
    }
    $.desc += '\n' + $.notifications.join('\n'); // 将云贝签到的信息加入推送内容
    resolve();
  });
}

// prettier-ignore
function Env(t) {
  this.name = t;
  this.logs = [];
  this.isSurge = (() => "undefined" != typeof $httpClient);
  this.isQuanX = (() => "undefined" != typeof $task);
  this.log = ((...t) => {
    this.logs = [...this.logs, ...t];
    t ? console.log(t.join("\n")) : console.log(this.logs.join("\n"));
  });
  this.msg = ((t = this.name, s = "", i = "") => {
    this.isSurge() && $notification.post(t, s, i);
    this.isQuanX() && $notify(t, s, i);
    const e = ["", "==============系统通知=============="];
    t && e.push(t);
    s && e.push(s);
    i && e.push(i);
    console.log(e.join("\n"));
  });
  this.getdata = (t => this.isSurge() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : void 0);
  this.setdata = ((t, s) => this.isSurge() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : void 0);
  this.get = ((t, s) => this.send(t, "GET", s));
  this.wait = ((t, s = t) => i => setTimeout(() => i(), Math.floor(Math.random() * (s - t + 1) + t)));
  this.post = ((t, s) => this.send(t, "POST", s));
  this.send = ((t, s, i) => {
    if (this.isSurge()) {
      const e = "POST" == s ? $httpClient.post : $httpClient.get;
      e(t, (t, s, e) => {
        s && (s.body = e, s.statusCode = s.status);
        i(t, s, e);
      });
    }
    this.isQuanX() && (t.method = s, $task.fetch(t).then(t => {
      t.status = t.statusCode;
      i(null, t, t.body);
    }, t => i(t.error, t, t)));
  });
  this.done = ((t = {}) => $done(t));
}