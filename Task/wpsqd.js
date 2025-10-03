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

// keys
const ckKey = "wps_cookie";
const tokenKey = "wps_signin_token";

/* ------------------ 抓包（request） ------------------ */
if (typeof $request !== "undefined") {
 (async () => {
   try {
     console.log("🔍 [wps_qd] script-request-header triggered for:", $request.url);
     const headers = $request.headers || {};
     console.log("🔍 [wps_qd] request.headers:", JSON.stringify(headers));

     // 常见 token 字段名
     const possibleKeys = [
       "token", "Token",
       "authorization", "Authorization",
       "x-token", "X-Token",
       "x-authorization", "X-Authorization",
       "access-token", "Access-Token",
       "access_token", "accessToken"
     ];

     let token = "";
     for (let k of possibleKeys) {
       if (headers[k]) {
         token = headers[k];
         break;
       }
     }

     if (token && typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
       token = token.split(" ")[1];
     }

     const cookie = headers["Cookie"] || headers["cookie"] || "";

     let changed = false;

     // 保存 cookie（以 JSON 字符串形式）
     if (cookie && cookie.length > 0) {
       const ckObj = { cookie: cookie };
       const old = $.getdata(ckKey);
       const newVal = $.toStr(ckObj);
       if (old !== newVal) {
         $.setdata(newVal, ckKey);
         console.log("🎉 [wps_qd] 已保存/更新 wps_cookie");
         changed = true;
       } else {
         console.log("ℹ️ [wps_qd] wps_cookie 未变化");
       }
     } else {
       console.log("ℹ️ [wps_qd] 未在请求头中发现 Cookie");
     }

     // 保存 token
     if (token && token.length > 0) {
       const oldt = $.getdata(tokenKey) || "";
       if (oldt !== token) {
         $.setdata(token, tokenKey);
         console.log("🎉 [wps_qd] 已保存/更新 wps_signin_token (from request.header):", token);
         changed = true;
         $notify($.name + " — 抓取成功", "从 request.header 保存 token", "");
       } else {
         console.log("ℹ️ [wps_qd] wps_signin_token 未变化（request.header）");
       }
     } else {
       console.log("ℹ️ [wps_qd] 未在请求头中发现 token（request）");
     }

     if (!changed) {
       console.log("🔔 [wps_qd] script-request-header 被触发，但无数据更新");
     }
   } catch (e) {
     $.logErr("❌ [wps_qd] request 抓包处理异常:", e);
   } finally {
     $done({});
   }
 })();
 return;
}

/* ------------------ 抓包（response） ------------------ */
if (typeof $response !== "undefined") {
 (async () => {
   try {
     console.log("🔍 [wps_qd] script-response-body triggered for:", $request.url);

     // 1) 检查响应头
     const respHeaders = $response.headers || {};
     console.log("🔍 [wps_qd] response.headers:", JSON.stringify(respHeaders));
     const headerKeys = ["token","Token","authorization","Authorization","x-token","X-Token","access-token","Access-Token"];
     let tokenFromHeader = "";
     for (let k of headerKeys) {
       if (respHeaders[k]) {
         tokenFromHeader = respHeaders[k];
         break;
       }
     }
     if (tokenFromHeader && tokenFromHeader.toLowerCase && tokenFromHeader.toLowerCase().startsWith("bearer ")) {
       tokenFromHeader = tokenFromHeader.split(" ")[1];
     }
     if (tokenFromHeader) {
       const oldt = $.getdata(tokenKey) || "";
       if (oldt !== tokenFromHeader) {
         $.setdata(tokenFromHeader, tokenKey);
         console.log("🎉 [wps_qd] 已从 response.header 保存 token:", tokenFromHeader);
         $notify($.name + " — 抓取成功", "从 response.header 保存 token", "");
       } else {
         console.log("ℹ️ [wps_qd] response.header token 未变化");
       }
     } else {
       console.log("ℹ️ [wps_qd] response header 中未发现 token");
     }

     // 2) 检查响应体（尝试解析 JSON）
     let body = $response.body || "";
     let json = null;
     try {
       json = JSON.parse(body);
     } catch (e) {
       // 不是 JSON，则忽略解析
       console.log("ℹ️ [wps_qd] response body 不是有效 JSON，跳过 body 解析");
     }

     if (json) {
       // 组合可能的位置，常见字段名
       const candidates = [
         json.token,
         json.access_token,
         (json.data && json.data.token),
         (json.data && json.data.access_token),
         (json.result && json.result.token),
         (json.data && json.data.user && json.data.user.token),
         (json.data && json.data.user && json.data.user.access_token)
       ];
       for (let c of candidates) {
         if (c) {
           const tokenFromBody = String(c);
           const oldt = $.getdata(tokenKey) || "";
           if (oldt !== tokenFromBody) {
             $.setdata(tokenFromBody, tokenKey);
             console.log("🎉 [wps_qd] 已从 response.body 保存 token:", tokenFromBody);
             $notify($.name + " — 抓取成功", "从 response.body 保存 token", "");
           } else {
             console.log("ℹ️ [wps_qd] response.body token 未变化");
           }
           break;
         }
       }

       // 如果响应里有 Set-Cookie 风格的字段也尝试保存（有时接口在 body 返回 cookie 字符串）
       if (json.cookie || json.set_cookie || json.setCookie) {
         const bodyCookie = json.cookie || json.set_cookie || json.setCookie;
         if (typeof bodyCookie === "string" && bodyCookie.length > 0) {
           const ckObj = { cookie: bodyCookie };
           const old = $.getdata(ckKey);
           const newVal = $.toStr(ckObj);
           if (old !== newVal) {
             $.setdata(newVal, ckKey);
             console.log("🎉 [wps_qd] 已从 response.body 保存 cookie");
             $notify($.name + " — 抓取成功", "从 response.body 保存 cookie", "");
           }
         }
       }
     }

   } catch (e) {
     $.logErr("❌ [wps_qd] response 抓包处理异常:", e);
   } finally {
     // 必须返回原始或修改后的 $response 对象
     $done($response);
   }
 })();
 return;
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