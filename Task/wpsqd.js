/**
*  自动签到 + 抽奖（含抓包保存 token/cookie）
* 用途：
*  - 抓包时（$request 存在）：从请求头抓取 token 和 Cookie，保存到持久化变量
*  - 定时任务时：读取持久化的 token/cookie，执行 查询用户 -> 签到 -> 抽奖 -> 查询积分 -> 推送
*
* 持久化键：
*  - wps_cookie          : 存储 { "cookie": "xxx" } 的 JSON 字符串
*  - wps_signin_token    : 存储最新的 token 字符串
*
* 适配：Quantumult X / Surge / Loon（Env 封装里用到了 $prefs / $task.fetch / $notify / $done）


[rewrite_local]
# 获取 WPS Cookie
^https:\/\/(vip|account)(userinfo|\.wps\.cn\/p\/auth\/check)$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wps.js

[task_local]
# WPS 签到，每天自动运行
1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js, tag= WPS_PC签到, enabled=true

**/



const $ = new Env("WPS 签到与抓包");

const ckKey = "wps_cookie";
const tokenKey = "wps_signin_token";

/* 抓包时执行：保存 token/cookie */
if (typeof $request !== "undefined") {
 (async () => {
   try {
     const headers = $request.headers || {};
     // 抓 token：优先 token 字段，再尝试 Authorization（大小写都支持）
     const token =
       headers["token"] ||
       headers["Token"] ||
       headers["authorization"] ||
       headers["Authorization"] ||
       "";

     const cookie = headers["Cookie"] || headers["cookie"] || "";

     let changed = false;

     if (cookie && cookie.length > 0) {
       const ckObj = { cookie: cookie };
       const old = $.getdata(ckKey);
       const newVal = $.toStr(ckObj);
       if (old !== newVal) {
         $.setdata(newVal, ckKey);
         $.log("🎉 已保存/更新 wps_cookie");
         changed = true;
       } else {
         $.log("wps_cookie 未变化");
       }
     } else {
       $.log("未在请求头中发现 Cookie");
     }

     if (token && token.length > 0) {
       const oldt = $.getdata(tokenKey) || "";
       if (oldt !== token) {
         $.setdata(token, tokenKey);
         $.log("🎉 已保存/更新 wps_signin_token:", token);
         changed = true;
       } else {
         $.log("wps_signin_token 未变化");
       }
     } else {
       $.log("未在请求头中发现 token（尝试 Authorization）");
     }

     if (changed) {
       $notify($.name + " — 抓取成功", "", "已保存 token/cookie（如有）");
     } else {
       // 仍通知：以便知道脚本被触发但无更新
       console.log("脚本触发，但无数据更新");
     }
   } catch (e) {
     $.logErr("抓包处理异常:", e);
   } finally {
     $done({});
   }
 })();
} else {
 /* 定时任务/手动运行时执行主流程 */
 (async () => {
   try {
     // 读取 cookie（JSON 字符串）和 token
     let ckval = $.toObj($.getdata(ckKey), null);
     if (!ckval || !ckval.cookie) {
       $.msg($.name, "❌ 配置缺失", "未找到 wps_cookie，请先抓取 Cookie（使用抓包触发本脚本）");
       return;
     }
     $.cookie = ckval.cookie;

     // 这里实时读取 token（以便抓包时刚保存的 token 立即生效）
     let wps_token = $.getdata(tokenKey) || "";

     await main(wps_token);
   } catch (e) {
     $.logErr(e);
   } finally {
     $.done();
   }
 })();
}

/* -------------------- 主流程 -------------------- */
async function main(wps_token) {
 // 1. 获取用户信息，确认登录
 const userRes = await getUsername();
 if (userRes.result !== "ok") {
   $.msg($.name, ⚠️ 登录失败", wps_msg(userRes.msg || JSON.stringify(userRes)));
   return;
 }
 const nickname = userRes.nickname || userRes.data?.nickname || "未知";
 $.log(`👤 用户: ${nickname}`);

 // 2. 签到前积分
 const integralBefore = await getPoint();
 $.log(`💰 签到前积分: ${integralBefore}`);

 // 3. 签到（signIn 内会尝试保存 token）
 const signResult = await signIn(wps_token);

 // 4. 抽奖任务（使用签到后最新 token，若签到保存了新 token，会在 signIn 内更新本地）
 const latestToken = $.getdata(tokenKey) || wps_token || "";
 const lottery = await lotteryTask(latestToken);

 // 5. 签到后积分
 const integralAfter = await getPoint();
 const integralChange =
   integralAfter !== "获取失败" && integralBefore !== "获取失败"
     ? integralAfter - integralBefore
     : "无法计算";

 // 6. 推送结果
 let statusMsg = "";
 if (signResult.isSuccess) {
   statusMsg = `✅ 签到成功: ${signResult.rewardText}`;
 } else if (signResult.isSigned) {
   statusMsg = "⚠️ 今日已签到";
 } else {
   statusMsg = `❌ 签到失败: ${signResult.msg}`;
 }

 const lotteryMsg = lottery.success ? `🎉 抽奖: ${lottery.msg}` : `⚠️ 抽奖: ${lottery.msg || "未完成"}`;

 $.msg(
   $.name,
   statusMsg,
   `👤 用户: ${nickname}\n` +
     `💰 签到前积分: ${integralBefore}\n` +
     `📈 签到后积分: ${integralAfter}\n` +
     `✨ 积分变动: ${integralChange > 0 ? "+" : ""}${integralChange}\n` +
     `${lotteryMsg}`
 );
}

/* -------------------- API 函数 -------------------- */

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

async function signIn(wps_token) {
 const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
 // 每次调用实时读取本地 token（防止抓包后 token 已更新）
 const currentToken = $.getdata(tokenKey) || wps_token || "";
 const headers = {
   "Content-Type": "application/json",
   "User-Agent":
     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
   Cookie: $.cookie,
   token: currentToken,
 };
 const body = JSON.stringify({
   encrypt: true,
   extra: "shfDZxB63hOSzgWr7cJtfMmPPa70rhxzLYFRXqkN40ROxRP/RC+Y/7hpVL4VDdOt",
   pay_origin: "ios_ucs_rwzx sign",
   channel: "",
 });

 const res = await httpRequest({ url, headers, body, method: "POST" });

 // 如果 sign_in 请求是通过抓包得到的 token 发出（即 token 在请求头），服务器可能会返回 ok 或 has sign
 try {
   if (res.result === "ok") {
     // 如果响应体里也返回 token（有些版本会），则保存
     const returnedToken = res.data?.token || res.token || "";
     if (returnedToken && returnedToken.length > 0) {
       $.setdata(returnedToken, tokenKey);
       $.log("🎉 signIn 响应中含 token，已保存:", returnedToken);
     }
     const rewards = res.data?.rewards || [];
     let rewardText =
       rewards.length > 0
         ? rewards.map((r) => `${r.reward_name} x${r.num || 1}`).join(", ")
         : "未知奖励";
     return { isSuccess: true, rewardText, isSigned: false, msg: "" };
   } else if (res.msg === "has sign" || res.result === "has sign") {
     return { isSuccess: false, rewardText: "", isSigned: true, msg: "今天已签到" };
   } else {
     return { isSuccess: false, rewardText: "", isSigned: false, msg: res.msg || JSON.stringify(res) };
   }
 } catch (e) {
   return { isSuccess: false, rewardText: "", isSigned: false, msg: "解析 signIn 返回时出错" };
 }
}

async function getPoint() {
 const url = `https://personal-act.wps.cn/vip_day/v1/user/integral/info`;
 const headers = {
   Accept: `application/json, text/plain, */*`,
   "User-Agent":
     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
   Cookie: $.cookie,
 };

 const res = await httpRequest({ url, headers, method: "GET" });
 if (res && res.result === "ok" && typeof res.data?.integral === "number") {
   return res.data.integral;
 }
 return "获取失败";
}

async function lotteryTask(wps_token) {
 const url = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
 const headers = {
   "Content-Type": "application/json",
   "User-Agent":
     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
   Cookie: $.cookie,
   token: wps_token || "",
 };
 const body = JSON.stringify({
   component_uniq_number: {
     activity_number: "HD2025031821201822",
     page_number: "YM2025041116446466",
     component_number: "ZJ2025040709458367",
     component_node_id: "FN1744160180RthG",
     filter_params: { cs_from: "", position: "ad_pad_rwzx_qd" },
   },
   component_type: 35,
   component_action: "task_center.reward",
   task_center: { task_id: 20 },
 });

 const res = await httpRequest({ url, headers, body, method: "POST" });
 if (res && res.result === "ok" && res.data?.task_center?.success) {
   return { success: true, msg: res.data?.task_center?.reason || "抽奖任务完成" };
 } else {
   // 若服务器返回 0x00018，res 可能为空或包含 error
   const errMsg = res?.msg || res?.message || JSON.stringify(res) || "抽奖返回未知";
   return { success: false, msg: errMsg };
 }
}

/* -------------------- 通用工具 -------------------- */

function wps_msg(msg) {
 const messages = {
   userNotLogin: "请重新获取Cookie",
   "has sign": "今天已经签过了",
 };
 return messages[msg] || msg;
}

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
         const text = resp.body || "";
         // 有些接口会返回空 body 或非 json
         if (!text) return resolve({});
         const obj = JSON.parse(text);
         resolve(obj);
       } catch (e) {
         // 解析失败时记录原始 body，便于排错
         $.logErr("httpRequest parse error:", e, "body:", resp.body);
         resolve({});
       }
     },
     (err) => {
       $.logErr("httpRequest fetch error:", err);
       resolve({});
     }
   );
 });
}

/* -------------------- 环境封装（Env） -------------------- */
function Env(t, e) {
 class s {
   constructor(t) {
     this.name = t;
     this.startTime = new Date().getTime();
     Object.assign(this, e);
   }
   toStr(t) {
     try {
       return JSON.stringify(t);
     } catch {
       return String(t);
     }
   }
   toObj(t, e = null) {
     try {
       return JSON.parse(t);
     } catch {
       return e;
     }
   }
   // QX 使用 $prefs.valueForKey / setValueForKey
   getdata(t) {
     try {
       return $prefs.valueForKey(t);
     } catch {
       return null;
     }
   }
   setdata(t, e) {
     try {
       return $prefs.setValueForKey(t, e);
     } catch (err) {
       this.logErr("setdata error", err);
     }
   }
   msg(t = this.name, e = "", s = "", i) {
     $notify(t, e, s, i);
   }
   log(...t) {
     console.log(t.join(" "));
   }
   logErr(...t) {
     console.log(...t);
   }
   done(t = {}) {
     const e = (new Date().getTime() - this.startTime) / 1e3;
     this.log(`🔔 ${this.name}, 结束! ⏱ ${e} 秒`);
     $done(t);
   }
 }
 return new s(t, e);
}