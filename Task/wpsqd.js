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


const $ = new Env("WPS 签到");

const ckKey = "wps_cookie";
const tokenKey = "wps_signin_token";

/* ---------------- 捕获逻辑（request / response / 定时运行） ---------------- */
if (typeof $request !== "undefined") {
 // request 阶段：优先从请求头 / url / body 中提取 token 和 cookie
 (async () => {
   try {
     const head = ObjectKeys2LowerCase($request.headers || {});
     let token =
       head["token"] ||
       head["authorization"] ||
       head["x-token"] ||
       head["x-auth-token"] ||
       head["access-token"] ||
       head["access_token"] ||
       "";
     const cookie = head["cookie"] || "";

     // 从 URL query 中尝试提取
     if (!token && $request.url) {
       try {
         const q = ($request.url.split("?")[1] || "").split("#")[0] || "";
         if (q) {
           const params = Object.fromEntries(
             q.split("&").map((p) => {
               const idx = p.indexOf("=");
               return idx === -1
                 ? [decodeURIComponent(p), ""]
                 : [decodeURIComponent(p.slice(0, idx)), decodeURIComponent(p.slice(idx + 1))];
             })
           );
           token = token || params["token"] || params["access_token"] || params["auth"] || "";
           if (token) $.log("从 URL query 中获取到 token");
         }
       } catch (e) {
         $.log("解析 url query 失败", e);
       }
     }

     // 从请求体中尝试提取（JSON / form / 原始文本）
     if (!token && $request.body) {
       try {
         const ct = head["content-type"] || "";
         const body = $request.body || "";
         if (ct.includes("application/json")) {
           const obj = JSON.parse(body);
           token = token || obj?.token || obj?.access_token || obj?.auth || obj?.authorization || "";
           if (token) $.log("从 JSON body 中获取到 token");
         } else if (ct.includes("application/x-www-form-urlencoded")) {
           const params = Object.fromEntries(
             body.split("&").map((p) => {
               const idx = p.indexOf("=");
               return idx === -1
                 ? [decodeURIComponent(p), ""]
                 : [decodeURIComponent(p.slice(0, idx)), decodeURIComponent(p.slice(idx + 1))];
             })
           );
           token = token || params["token"] || params["access_token"] || params["auth"] || "";
           if (token) $.log("从 form body 中获取到 token");
         } else {
           const m = body.match(/(?:token|access_token|auth|authorization)["'=:\s]{0,3}([A-Za-z0-9\-_.=+/]{10,})/i);
           if (m) {
             token = token || m[1];
             $.log("从 body 原始文本中正则提取到 token");
           }
         }
       } catch (e) {
         $.log("解析 request body 时出错:", e);
       }
     }

     let changed = false;

     // 保存 cookie（原样保存为 {"cookie":"..."}）
     if (cookie && cookie.length > 0) {
       const ckObj = { cookie: cookie };
       const old = $.getdata(ckKey) || "";
       const newVal = $.toStr(ckObj);
       if (old !== newVal) {
         $.setdata(newVal, ckKey);
         $.log("🎉 已保存/更新 wps_cookie (来自 request)");
         changed = true;
       } else {
         $.log("wps_cookie (request) 未变化");
       }
     } else {
       $.log("request 阶段未发现 Cookie");
     }

     // 保存 token（字符串）
     if (token && token.length > 0) {
       const oldt = $.getdata(tokenKey) || "";
       if (oldt !== token) {
         $.setdata(token, tokenKey);
         $.log("🎉 已保存/更新 wps_signin_token (来自 request):", token);
         changed = true;
       } else {
         $.log("wps_signin_token (request) 未变化");
       }
     } else {
       $.log("request 阶段未发现 token（header/url/body 均无）");
     }

     if (changed) {
       $notify($.name + " — 抓取成功", "", "已保存 token/cookie（request）");
     } else {
       $.log("脚本触发（request），但无数据更新");
     }
   } catch (e) {
     $.logErr("抓包(request)处理异常:", e);
   } finally {
     $done({});
   }
 })();
} else if (typeof $response !== "undefined") {
 // response 阶段：尝试从响应头 set-cookie 或 响应体 JSON 中提 token 或 cookie
 (async () => {
   try {
     const respHead = ObjectKeys2LowerCase($response.headers || {});
     const bodyText = $response.body || "";
     let changed = false;

     // 1) 响应头 set-cookie
     const setCookie = respHead["set-cookie"] || respHead["set_cookie"] || "";
     if (setCookie && setCookie.length > 0) {
       const sc = Array.isArray(setCookie) ? setCookie.join("; ") : String(setCookie);
       const wps_sid = getCookieValue(sc, "wps_sid");
       if (wps_sid) {
         const ckObj = { cookie: "wps_sid=" + wps_sid };
         const old = $.getdata(ckKey) || "";
         const newVal = $.toStr(ckObj);
         if (old !== newVal) {
           $.setdata(newVal, ckKey);
           $.log("🎉 已保存/更新 wps_cookie (来自 response.set-cookie)");
           changed = true;
         } else {
           $.log("wps_cookie (response set-cookie) 未变化");
         }
       } else {
         const ckObj = { cookie: sc };
         const old = $.getdata(ckKey) || "";
         const newVal = $.toStr(ckObj);
         if (old !== newVal) {
           $.setdata(newVal, ckKey);
           $.log("🎉 已保存/更新 wps_cookie (来自 response.set-cookie entire)");
           changed = true;
         } else {
           $.log("wps_cookie (response set-cookie entire) 未变化");
         }
       }
     } else {
       $.log("response 阶段未发现 set-cookie");
     }

     // 2) 响应体（JSON）中提 token
     if (bodyText && bodyText.length > 0) {
       try {
         const obj = JSON.parse(bodyText);
         const maybeToken =
           obj?.token ||
           obj?.data?.token ||
           obj?.data?.access_token ||
           obj?.access_token ||
           obj?.data?.sign ||
           "";
         if (maybeToken && maybeToken.length > 0) {
           const oldt = $.getdata(tokenKey) || "";
           if (oldt !== maybeToken) {
             $.setdata(maybeToken, tokenKey);
             $.log("🎉 已保存/更新 wps_signin_token (来自 response.body):", maybeToken);
             changed = true;
           } else {
             $.log("wps_signin_token (response body) 未变化");
           }
         } else {
           $.log("response body 未发现 token 字段");
         }
       } catch (e) {
         $.log("response body 不是标准 JSON，跳过 JSON token 抓取");
       }
     } else {
       $.log("response body 为空");
     }

     if (changed) {
       $notify($.name + " — 抓取成功", "", "已保存 token/cookie（response）");
     } else {
       $.log("脚本触发（response），但无数据更新");
     }
   } catch (e) {
     $.logErr("抓包(response)处理异常:", e);
   } finally {
     $done({});
   }
 })();
} else {
 // 定时/手动运行主流程
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

 /* 1. 签到 */
 const signResult = await signIn(wps_token);

 /* 2. 抽奖 */
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
   "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) WpsOfficeApp/12.1.0.18276",
   Cookie: $.cookie,
 };
 return await httpRequest({ url, headers, method: "POST" });
}

async function signIn(wps_token) {
 const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
 const currentToken = $.getdata(tokenKey) || wps_token || "";
 const headers = {
   "Content-Type": "application/json",
   "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
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
     const returnedToken = res.data?.token || res.token || "";
     if (returnedToken && returnedToken.length > 0) {
       $.setdata(returnedToken, tokenKey);
       $.log("🎉 signIn 响应体中含 token，已保存:", returnedToken);
     }
     const rewards = res.data?.rewards || [];
     let rewardText =
       rewards.length > 0
         ? rewards.map((r) => `${r.reward_name || r.source_name || r.type} x${r.num || r.count || 1}`).join(", ")
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

async function lotteryTask(wps_token) {
 const url = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
 const headers = {
   "Content-Type": "application/json",
   "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
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

async function getPoint() {
 const url = "https://personal-act.wps.cn/vip_day/v1/user/integral/info";
 const headers = {
   Accept: "application/json, text/plain, */*",
   Cookie: $.cookie,
   "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
   Referer: "https://personal-act.wps.cn/vip-spa/2025/user-integral-rewards/list?active_tab=integral",
 };
 const res = await httpRequest({ url, headers, method: "GET" });
 try {
   if (res && (res.result === "ok" || res.result === "ok") && res.data && typeof res.data.integral !== "undefined") {
     return Number(res.data.integral) || 0;
   } else if (res && typeof res.data?.integral !== "undefined") {
     return Number(res.data.integral) || 0;
   } else {
     return "获取失败";
   }
 } catch (e) {
   return "获取失败";
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
     method: (options.method || "GET").toUpperCase(),
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

/* headers key 小写化工具 */
function ObjectKeys2LowerCase(obj) {
 if (!obj || typeof obj !== "object") return {};
 const ret = {};
 Object.keys(obj).forEach((k) => {
   ret[k.toLowerCase()] = obj[k];
 });
 return ret;
}

/* 从 cookie 字符串中取值 */
function getCookieValue(cookie, key) {
 if (!cookie) return null;
 try {
   const parts = cookie
     .split(/;|\r?\n/)
     .map((p) => p.trim())
     .filter(Boolean);
   for (let item of parts) {
     const idx = item.indexOf("=");
     if (idx > -1) {
       const k = item.slice(0, idx).trim();
       const v = item.slice(idx + 1).trim();
       if (k === key) return v;
     }
   }
 } catch (e) {
   return null;
 }
 return null;
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