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
^https:\/\/(?:account\.wps\.cn\/p\/auth\/check|personal-bus\.wps\.cn\/sign_in\/v1\/sign_in) url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js


[task_local]
# WPS 签到，每天自动运行
1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js, tag= WPS_PC签到, enabled=true


[mitm]
hostname = account.wps.cn, personal-bus.wps.cn, personal-act.wps.cn, zt.wps.cn

*/



const $ = new Env("WPS 签到与抓包");

const ckKey = "wps_cookie";
const tokenKey = "wps_signin_token";

/* 抓包时执行：保存 token/cookie */
if (typeof $request !== "undefined") {
 (async () => {
   try {
     const headers = $request.headers || {};
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
       console.log("脚本触发，但无数据更新");
     }
   } catch (e) {
     $.logErr("抓包处理异常:", e);
   } finally {
     $done({});
   }
 })();
} else {
 (async () => {
   try {
     let ckval = $.toObj($.getdata(ckKey), null);
     if (!ckval || !ckval.cookie) {
       $.msg($.name, "❌ 配置缺失", "未找到 wps_cookie，请先抓取 Cookie（使用抓包触发本脚本）");
       return;
     }
     $.cookie = ckval.cookie;
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
 const userRes = await getUsername();
 if (userRes.result !== "ok") {
   $.msg($.name, "⚠️ 登录失败", wps_msg(userRes.msg || JSON.stringify(userRes)));
   return;
 }
 const nickname = userRes.nickname || userRes.data?.nickname || "未知";
 $.log(`👤 用户: ${nickname}`);

 const integralBefore = await getPoint();
 $.log(`💰 签到前积分: ${integralBefore}`);

 /* -------------------- 1. 签到流程 -------------------- */
 const signResult = await signIn(wps_token);

 /* -------------------- 2. 抽奖流程 -------------------- */
 const latestToken = $.getdata(tokenKey) || wps_token || "";
 const lottery = await lotteryTask(latestToken);

 const integralAfter = await getPoint();
 const integralChange =
   integralAfter !== "获取失败" && integralBefore !== "获取失败"
     ? integralAfter - integralBefore
     : "无法计算";

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
   "User-Agent": "Mozilla/5.0 ... WpsOfficeApp/12.1.0.18276 (per,windows)",
   Cookie: $.cookie,
 };
 return await httpRequest({ url, headers, method: "POST" });
}

/* -------------------- 1. 签到函数 -------------------- */
async function signIn(wps_token) {
 const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
 const currentToken = $.getdata(tokenKey) || wps_token || "";
 const headers = {
   "Content-Type": "application/json",
   "User-Agent": "Mozilla/5.0 ... Mobile/15E148 Safari/604.1",
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

 try {
   if (res.result === "ok") {
     // ✅ 抓 token 并保存
     const returnedToken = res.data?.token || res.token || "";
     if (returnedToken && returnedToken.length > 0) {
       $.setdata(returnedToken, tokenKey);
       $.log("🎉 signIn 响应体中含 token，已保存:", returnedToken);
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

/* -------------------- 2. 抽奖函数 -------------------- */
async function lotteryTask(wps_token) {
 const url = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
 const headers = {
   "Content-Type": "application/json",
   "User-Agent": "Mozilla/5.0 ... Mobile/15E148 Safari/604.1",
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
   const errMsg = res?.msg || res?.message || JSON.stringify(res) || "抽奖返回未知";
   return { success: false, msg: errMsg };
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
         if (!text) return resolve({});
         const obj = JSON.parse(text);
         resolve(obj);
       } catch (e) {
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



/* -------------------- Env 环境封装（与 QX 兼容） -------------------- */
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