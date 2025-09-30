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
const tokenKey = "wps_signin_token";

// 从持久化存储中读取 token 和 cookie (ckval 包含完整的 Cookie 字符串)
let ckval = $.toObj($.getdata(ckKey), null);
let wps_token = $.getdata(tokenKey);

// 主程序
!(async () => {
  if (typeof $request !== "undefined") {
    // 触发抓包时，执行抓取逻辑
    await getRequiredHeaders();
    return;
  }

  // 检查关键变量：只需检查 Cookie 和 Token
  if (!ckval || !wps_token) {
    $.msg(
      $.name,
      "❌ 配置不全",
      "请先通过抓包获取Cookie和token并存储"
    );
    return;
  }

  // 设置全局 Cookie
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

  // 2. 签到前查询积分
  const integralBefore = await getPoint();
  $.log(`💰 签到前积分: ${integralBefore}`);

  // 3. 签到
  const signResult = await signIn();

  // 4. 签到后查询积分
  const integralAfter = await getPoint();
  const integralChange =
    integralAfter !== "获取失败" && integralBefore !== "获取失败"
      ? integralAfter - integralBefore
      : "无法计算";

  // 5. 推送通知
  let statusMsg = "";
  if (signResult.isSuccess) {
    statusMsg = `✅ 签到成功: ${signResult.rewardText}`;
  } else if (signResult.isSigned) {
    statusMsg = "⚠️ 今日已签到";
  } else {
    statusMsg = `❌ 签到失败: ${signResult.msg}`;
  }

  $.msg(
    $.name,
    statusMsg,
    `👤 用户: ${nickname}\n` +
      `💰 签到前积分: ${integralBefore}\n` +
      `📈 签到后积分: ${integralAfter}\n` +
      `✨ 积分变动: ${
        integralChange > 0 ? "+" : ""
      }${integralChange}`
  );
}

/* -------------------- API 请求函数 -------------------- */

/* 获取用户信息 */
async function getUsername() {
  const url = "https://account.wps.cn/p/auth/check";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 WpsOfficeApp/12.1.0.18276 (per,windows)",
    Cookie: $.cookie,
  };
  return await httpRequest({ url, headers, method: "POST" });
}

/* 签到 */
async function signIn() {
  const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    Cookie: $.cookie,
    token: wps_token, // 使用存储的 token
  };
  const body = JSON.stringify({
    encrypt: true,
    // 【关键点】：直接使用硬编码的固定 extra 值
    extra: "shfDZxB63hOSzgWr7cJtfMmPPa70rhxzLYFRXqkN40ROxRP/RC+Y/7hpVL4VDdOt", 
    pay_origin: "ios_ucs_rwzx sign",
    channel: "",
  });

  const res = await httpRequest({ url, headers, body, method: "POST" });

  if (res.result === "ok") {
    const rewards = res.data?.rewards || [];
    let rewardText =
      rewards.length > 0
        ? rewards.map((r) => `${r.reward_name} x${r.num || 1}`).join(", ")
        : "未知奖励";
    return { isSuccess: true, rewardText, isSigned: false, msg: "" };
  } else if (res.msg === "has sign") {
    return {
      isSuccess: false,
      rewardText: "",
      isSigned: true,
      msg: res.msg,
    };
  } else {
    return {
      isSuccess: false,
      rewardText: "",
      isSigned: false,
      msg: res.msg || "未知错误",
    };
  }
}

/* 查询积分 (已接入真实 API) */
async function getPoint() {
  const url = `https://personal-act.wps.cn/vip_day/v1/user/integral/info`;
  const headers = {
    Accept: `application/json, text/plain, */*`,
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    Cookie: $.cookie,
  };

  const res = await httpRequest({ url, headers, method: "GET" });

  if (res.result === "ok" && typeof res.data?.integral === "number") {
    return res.data.integral;
  }
  return "获取失败";
}

/* -------------------- 抓取函数 -------------------- */

async function getRequiredHeaders() {
  if (!$request || !$request.url.includes("/sign_in/v1/sign_in")) {
    return;
  }
  
  const headers = $request.headers || {};
  let changed = false;

  // 1. 抓取完整的 Cookie 头部
  const currentCookie = headers.Cookie || headers.cookie;
  if (currentCookie) {
    const newCkVal = { cookie: currentCookie };
    const storedCk = $.getdata(ckKey);
    if (storedCk !== $.toStr(newCkVal)) {
      $.setdata($.toStr(newCkVal), ckKey);
      $.log("🎉 Cookie 抓取成功并更新");
      changed = true;
    }
  }

  // 2. 抓取 token (可能位于 Header中)
  const currentToken = headers.Token || headers.token;
  if (currentToken) {
    if ($.getdata(tokenKey) !== currentToken) {
      $.setdata(currentToken, tokenKey);
      $.log("🎉 Token 抓取成功并更新");
      changed = true;
    }
  }

  if (changed) {
    $.msg(
      $.name,
      "✅ Cookie/Token 已更新",
      "请关闭 MitM 或 Rewrite，运行定时任务"
    );
  }
}

/* -------------------- 工具函数 -------------------- */

function wps_msg(msg) {
  const messages = {
    userNotLogin: "请重新获取Cookie",
    "has sign": "今天已经签过了",
  };
  return messages[msg] || msg;
}

/* 用 $task.fetch 发请求 */
async function httpRequest(options) {
  return new Promise((resolve) => {
    const request = {
      url: options.url,
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || null,
    };

    $task.fetch(request).then(
      (resp) => {
        try {
          resolve(JSON.parse(resp.body));
        } catch {
          resolve({});
        }
      },
      (err) => {
        $.logErr(err);
        resolve({});
      }
    );
  });
}

/* 环境封装 (Env) */
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
    // Quantumult X 定时任务使用 $prefs.valueForKey() 读取
    getdata(t) {
      return $prefs.valueForKey(t);
    }
    // Quantumult X/Surge 使用 $prefs.setValueForKey() 写入
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