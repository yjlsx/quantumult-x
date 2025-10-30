/**
* WPS 自动签到 + 抽奖 (2025/10/30 修复版)
* 用途：
* - 抓包时（$request 存在）：从请求头抓取 token 和 Cookie，保存到持久化变量
* - 定时任务时：读取持久化的 token/cookie，执行 签到 -> 2次抽奖 -> 查询积分 -> 推送
*
* *** 警告：SIGNIN_EXTRA 和抽奖 ID 仍然是硬编码，请定期检查其有效性！ ***
*
* 持久化键：
* - wps_cookie          : 存储 { "cookie": "xxx" } 的 JSON 字符串
* - wps_signin_token    : 存储最新的 token 字符串
*
* 适配：Quantumult X / Surge / Loon（Env 封装里用到了 $prefs / $task.fetch / $notify / $done）
*
* [rewrite_local]
* ^https:\/\/(?:account\.wps\.cn\/p\/auth\/check|personal-bus\.wps\.cn\/sign_in\/v1\/sign_in) url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js
*
* [task_local]
* # WPS 签到，每天自动运行
* 1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js, tag= WPS_PC签到, enabled=true
*
* [mitm]
* hostname = account.wps.cn, personal-bus.wps.cn, personal-act.wps.cn, zt.wps.cn
*/


const $ = new Env("WPS 签到");

const ckKey = "wps_cookie";
const tokenKey = "wps_signin_token";

// 签到请求中的动态参数 (!!! 硬编码，请定期检查 !!!)
// 根据最新抓包数据更新
const SIGNIN_EXTRA = "ypwQd1pj2JElLipQ8YNHV8gbvWj2satfWFdXnsc5eZ7a3+qr9wTfz7EG0QbX6knk"; 

// 抽奖请求中的活动参数 (!!! 硬编码，请定期检查 !!!)
// 根据最新抓包数据更新
const LOTTERY_BODY_BASE = {
  component_uniq_number: {
    activity_number: "HD2025031821201822",
    page_number: "YM2025041116446466",
    component_number: "ZJ2024083022081230", // 最新抓包值
    component_node_id: "FN1744160189gBtt", // 最新抓包值
  },
  component_type: 2, // 最新抓包值 (lottery)
  component_action: "lottery.exec", // 最新抓包值
  lottery: {
    pay_source: "",
    integral_source: "",
    position: "onsale_2025_sign_cj",
    source: "",
    ids: "1080,1081,1082,1083,1158,1200,1085,1084",
    sign: ""
  },
};
const LOTTERY_TIMES = 2; // 默认签到奖励 2 次抽奖机会


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
         // 提取 wps_sid
         const ckObj = { cookie: "wps_sid=" + wps_sid };
         const old = $.getdata(ckKey) || "";
         const newVal = $.toStr(ckObj);
         if (old !== newVal) {
           $.setdata(newVal, ckKey);
           $.log("🎉 已保存/更新 wps_cookie (来自 response.set-cookie - wps_sid)");
           changed = true;
         } else {
           $.log("wps_cookie (response set-cookie - wps_sid) 未变化");
         }
       } else {
         // 尝试保存整个 set-cookie
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
  let finalMessage = "";

  const userRes = await getUsername();
  if (userRes.result !== "ok") {
    $.msg($.name, "⚠️ 登录失败", wps_msg(userRes.msg || JSON.stringify(userRes)));
    return;
  }
  const nickname = userRes.nickname || userRes.data?.nickname || "未知";
  $.log(`👤 用户: ${nickname}`);
  finalMessage += `👤 用户: ${nickname}\n`;

  const integralBefore = await getPoint();
  $.log(`💰 签到前积分: ${integralBefore}`);
  finalMessage += `💰 签到前积分: ${integralBefore}\n`;

  /* 1. 签到 */
  const signResult = await signIn(wps_token);
  let statusMsg = "";
  if (signResult.isSuccess) {
    statusMsg = `✅ 签到成功: ${signResult.rewardText}`;
  } else if (signResult.isSigned) {
    statusMsg = "⚠️ 今日已签到";
  } else {
    statusMsg = `❌ 签到失败: ${signResult.msg}`;
  }
  finalMessage += statusMsg + "\n";
  $.log(statusMsg);
  
  /* 2. 抽奖（即使签到失败，也继续执行） */
  const latestToken = $.getdata(tokenKey) || wps_token || "";
  let lotteryMsg = "🎉 抽奖结果: ";

  for (let i = 1; i <= LOTTERY_TIMES; i++) {
      $.log(`🔄 正在执行第 ${i} 次抽奖...`);
      const lottery = await lotteryTask(latestToken);

      if (lottery.success) {
          lotteryMsg += `第${i}次: ${lottery.msg} | `;
      } else {
          lotteryMsg += `第${i}次: ${lottery.msg || "失败"} | `;
          // 第一次抽奖失败后，可能后续也无法进行，但为了完整性，继续尝试。
      }
      // 避免请求过快，等待 1 秒
      await new Promise(r => setTimeout(r, 1000));
  }
  lotteryMsg = lotteryMsg.replace(/ \| $/, ''); // 去掉末尾的 " | "

  /* 3. 查询积分（即使签到和抽奖失败，也继续查询） */
  const integralAfter = await getPoint();
  const integralChange =
    integralAfter !== "获取失败" && integralBefore !== "获取失败" && typeof integralBefore === 'number' && typeof integralAfter === 'number'
      ? integralAfter - integralBefore
      : "无法计算";

  finalMessage += `📈 签到后积分: ${integralAfter}\n`;
  finalMessage += `✨ 积分变动: ${integralChange > 0 ? "+" : ""}${integralChange}\n`;
  finalMessage += lotteryMsg;
  
  $.log(`💰 签到后积分: ${integralAfter}`);
  $.log(`✨ 积分变动: ${integralChange}`);
  $.log(lotteryMsg);


  $.msg(
    $.name,
    statusMsg,
    finalMessage
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
 // *** 签到 body 已更新为最新抓包值，extra 仍然是硬编码 ***
 const body = JSON.stringify({
   encrypt: true,
   extra: SIGNIN_EXTRA,
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
   } else if (res.msg === "has sign" || res.result === "has sign" || res.code === 10001) { // 增加 code 10001 处理
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
 
 // *** 抽奖 body 已更新为最新抓包值 ***
 const body = JSON.stringify(LOTTERY_BODY_BASE);

 const res = await httpRequest({ url, headers, body, method: "POST" });

 // *** 抽奖成功逻辑已更新 ***
 if (res && res.result === "ok" && res.data?.lottery?.name) {
   const rewardName = res.data.lottery.name;
   return { success: true, msg: `抽中 ${rewardName}` };
 } else if (res && res.msg && (res.msg.includes("次数不足") || res.msg.includes("已抽完"))) {
   return { success: false, msg: "抽奖次数已用完" };
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
   // 根据你的抓包响应结构调整
   if (res && res.data && typeof res.data.integral !== "undefined") {
     return Number(res.data.integral) || 0;
   } else {
     return "获取失败";
   }
 } catch (e) {
   $.logErr("获取积分时出错:", e);
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