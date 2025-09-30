/**



[rewrite_local]
# 获取 WPS Cookie
^https:\/\/(vip|account)(userinfo|\.wps\.cn\/p\/auth\/check)$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wps.js

[task_local]
# WPS 签到，每天自动运行
1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js, tag= WPS_PC签到, enabled=true

**/


const $ = new Env("WPS签到");

const ckKey = "wps_cookie";
let ckval = $.toObj($.getdata(ckKey), null);

// 主程序
!(async () => {
  if (typeof $request !== "undefined") {
    // 获取 Cookie
    await getCookie();
    return;
  }

  if (!ckval) {
    $.msg($.name, "❌ 请先获取Cookie", "打开WPS App触发脚本获取");
    return;
  }

  $.cookie = ckval.cookie;
  await main();
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done());

/* 核心逻辑 */
async function main() {
  // 1. 用户信息
  const { result, msg, nickname } = await getUsername();
  if (result !== "ok") {
    $.msg($.name, "⚠️ 登录失败", wps_msg(msg));
    return;
  }
  $.log(`👤 用户: ${nickname}`);

  // 2. 签到
  await signIn();
}

/* 获取用户信息 */
async function getUsername() {
  const url = "https://account.wps.cn/p/auth/check";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile Safari/604.1",
    Cookie: $.cookie,
  };
  return await httpRequest({ url, headers, method: "POST" });
}

/* 签到 */
async function signIn() {
  const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
  const headers = {
    "Content-Type": "application/json",
    Cookie: $.cookie,
  };
  const body = JSON.stringify({
    encrypt: true,
    extra:
      "shfDZxB63hOSzgWr7cJtfMmPPa70rhxzLYFRXqkN40ROxRP/RC+Y/7hpVL4VDdOt",
    pay_origin: "ios_ucs_rwzx sign",
    channel: "",
  });

  const res = await httpRequest({ url, headers, body, method: "POST" });

  // 查询积分
  const point = await getPoint();

  if (res.result === "ok") {
    // 奖励详情
    const rewards = res.data?.rewards || [];
    let rewardText =
      rewards.length > 0
        ? rewards.map((r) => `${r.reward_name} x${r.count || 1}`).join("\n")
        : "无";

    $.msg($.name, "✅ 签到成功", `奖励：\n${rewardText}\n当前积分：${point}`);
  } else if (res.msg === "has sign") {
    $.msg($.name, "⚠️ 已签到", `今日无需重复签到\n当前积分：${point}`);
  } else {
    $.msg($.name, "❌ 签到失败", res.msg || "未知错误");
  }
}

/* 查询积分 */
async function getPoint() {
  const url = "https://vip.wps.cn/points/balance";
  const headers = { Cookie: $.cookie };
  const res = await httpRequest({ url, headers });
  return res?.data?.balance || "未知";
}

/* 获取 Cookie */
async function getCookie() {
  if ($request && $request.headers?.Cookie) {
    const ck = $request.headers.Cookie;
    const wps_sid = getCookieValue(ck, "wps_sid");
    if (wps_sid) {
      const ckVal = { cookie: "wps_sid=" + wps_sid };
      $.setdata($.toStr(ckVal), ckKey);
      $.msg($.name, "🎉 获取Cookie成功", ckVal.cookie);
    } else {
      $.msg($.name, "❌ 获取Cookie失败", "未找到 wps_sid");
    }
  }
}

/* 工具函数 */
function getCookieValue(cookie, key) {
  const cookies = cookie.split("; ");
  for (let item of cookies) {
    const [k, v] = item.split("=");
    if (k === key) return v;
  }
  return null;
}

function wps_msg(msg) {
  const messages = {
    userNotLogin: "请重新获取Cookie",
    "has sign": "今天已经签过了",
  };
  return messages[msg] || msg;
}

async function httpRequest(options) {
  return new Promise((resolve) => {
    const method = options.method || "GET";
    $[method.toLowerCase()](options, (err, resp, data) => {
      if (err) {
        $.logErr(err);
        resolve({});
      } else {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({});
        }
      }
    });
  });
}

/* 环境封装 */
function Env(t, e) {
  class s {
    constructor(t) {
      this.name = t;
      this.startTime = new Date().getTime();
      Object.assign(this, e);
    }
    toStr(t) {
      return JSON.stringify(t);
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    getdata(t) {
      return $prefs.valueForKey(t);
    }
    setdata(t, e) {
      return $prefs.setValueForKey(t, e);
    }
    msg(t = this.name, e = "", s = "", i) {
      $notify(t, e, s, i);
    }
    log(...t) {
      console.log(t.join(" "));
    }
    logErr(t, e) {
      this.log(`❌ 错误:`, t, e);
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1e3;
      this.log(`🔔 ${this.name}, 结束! ⏱ ${e} 秒`), $done(t);
    }
  }
  return new s(t, e);
}


