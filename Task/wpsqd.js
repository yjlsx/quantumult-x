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

// 从持久化存储中读取 token 和 cookie
let ckval = $.toObj($.getdata(ckKey), null);
let wps_token = $.getdata(tokenKey);

// 主程序
!(async () => {
 if (typeof $request !== "undefined") {
   // 抓包时触发
   await getRequiredHeaders();
   return;
 }

 if (!ckval) {
   $.msg($.name, "❌ 配置不全", "请先通过抓取获取Cookie");
   return;
 }
 $.cookie = ckval.cookie;

 await main();
})()
 .catch((e) => $.logErr(e))
 .finally(() => $.done());

/* -------------------- 主逻辑 -------------------- */
async function main() {
 // 用户信息
 const { result, msg, nickname } = await getUsername();
 if (result !== "ok") {
   $.msg($.name, "⚠️ 登录失败", wps_msg(msg));
   return;
 }
 $.log(`👤 用户: ${nickname}`);

 // 签到前积分
 const integralBefore = await getPoint();
 $.log(`💰 签到前积分: ${integralBefore}`);

 // 签到
 const signResult = await signIn();

 // 抽奖任务
 const lottery = await lotteryTask();

 // 签到后积分
 const integralAfter = await getPoint();
 const integralChange =
   integralAfter !== "获取失败" && integralBefore !== "获取失败"
     ? integralAfter - integralBefore
     : "无法计算";

 // 推送通知
 let statusMsg = "";
 if (signResult.isSuccess) {
   statusMsg = `✅ 签到成功: ${signResult.rewardText}`;
 } else if (signResult.isSigned) {
   statusMsg = "⚠️ 今日已签到";
 } else {
   statusMsg = `❌ 签到失败: ${signResult.msg}`;
 }

 const lotteryMsg = lottery.success
   ? lottery.msg
   : `⚠️ ${lottery.msg || "抽奖未完成"}`;

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

/* -------------------- API 请求函数 -------------------- */

// 用户信息
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

// 签到
async function signIn() {
 const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
 const headers = {
   "Content-Type": "application/json",
   "User-Agent":
     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
   Cookie: $.cookie,
   token: wps_token || "", // 使用旧token，如果有
 };
 const body = JSON.stringify({
   encrypt: true,
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

   // ⬇️ 自动抓取并保存 token
   if (res.data?.token) {
     $.setdata(res.data.token, tokenKey);
     wps_token = res.data.token;
     $.log("🎉 已更新 token");
   }

   return { isSuccess: true, rewardText, isSigned: false, msg: "" };
 } else if (res.msg === "has sign") {
   return { isSuccess: false, rewardText: "", isSigned: true, msg: res.msg };
 } else {
   return { isSuccess: false, rewardText: "", isSigned: false, msg: res.msg };
 }
}

// 查询积分
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

// 抽奖任务
async function lotteryTask() {
 const url = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
 const headers = {
   "Content-Type": "application/json",
   "User-Agent":
     "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
   Cookie: $.cookie,
   token: wps_token || "", // 使用签到获取的 token
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
 if (res.result === "ok" && res.data?.task_center?.success) {
   return { success: true, msg: "🎉 抽奖任务完成" };
 } else {
   return { success: false, msg: res.msg || "抽奖失败" };
 }
}

/* -------------------- 抓取函数 -------------------- */
async function getRequiredHeaders() {
 const headers = $request.headers || {};
 let changed = false;

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

 if (changed) {
   $.msg($.name, "✅ Cookie 已更新", "后续会自动获取 token，无需手动配置");
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

/* -------------------- 环境封装 -------------------- */
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