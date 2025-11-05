/**
* 51Job 签到
* 依赖：user-token 抓取
*
* 持久化键：
* - 51job_user_token : 存储 user-token 字符串
*
* [rewrite_local]
* # 抓取 user-token
* ^https:\/\/cupid\.51job\.com\/open\/user-task\/user\/task\/active url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/51job_signin.js
*
* [task_local]
* 0 1 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/51job_signin.js, tag=51Job签到, enabled=true
*
* [mitm]
* hostname = cupid.51job.com, we.51job.com
*/



/* ========== 配置项（可按需修改） ========== */
// 保存 key（$prefs）
const KEY_TOKEN = "51job_user_token";
const KEY_WORKING_SIGN = "51job_working_sign";      // 成功时保存的 sign
const KEY_WORKING_TIMESTAMP = "51job_working_ts";   // 成功时保存的 timestamp

// 静态字段（从抓包内容填入）
const API_KEY = "51job";
const PARTNER = "b3cb7e0289d7ce624549498cae53b174";
const ACCOUNT_ID = "169799378";
const UUID = "e45d42cf7fa9a4c84246c8e4bc6714ef";
const APP_VERSION = "15.19.0";

// 请求体（如需更改请同步修改）
const DEFAULT_BODY_OBJ = {
 version: APP_VERSION,
 actionType: "daily_check_in",
 step2Add: 1
};

/* ========== 环境封装（兼容 QX） ========== */
const $ = new Env("51Job 签到");

if (typeof $request !== "undefined") {
 // 捕获阶段：尝试从请求头中抽取 user-token 并保存
 (async () => {
   try {
     const hdrs = ObjectKeys2LowerCase($request.headers || {});
     const userToken = hdrs["user-token"] || hdrs["user-token".toLowerCase()] || "";
     if (userToken && userToken.length > 8) {
       const old = $.getdata(KEY_TOKEN) || "";
       if (old !== userToken) {
         $.setdata(userToken, KEY_TOKEN);
         $.log("【抓取】保存新的 user-token：" + userToken);
         $.msg($.name + " — 抓取成功", "", "已保存 user-token");
       } else {
         $.log("【抓取】user-token 未变化");
       }
     } else {
       $.log("【抓取】未在请求头中发现 user-token");
     }
   } catch (e) {
     $.logErr("【抓取】异常：", e);
   } finally {
     $done({});
   }
 })();
} else {
 // 定时/手动运行签到流程
 (async () => {
   await main();
   $.done();
 })();
}

/* ========== 主流程 ========== */
async function main() {
 $.log(`\n============== ${$.name} 开始执行 ==============`);
 const userToken = $.getdata(KEY_TOKEN);
 if (!userToken) {
   $.msg($.name, "❌ 凭证缺失", "未找到 user-token，请先通过抓包获取（rewrite 捕获）后再运行。");
   $.log("【主流程】❌ 凭证缺失，脚本结束");
   return;
 }
 $.log("【主流程】找到 user-token（长度）：" + userToken.length);
 
 // 准备 body
 const bodyObj = DEFAULT_BODY_OBJ;
 const bodyStr = JSON.stringify(bodyObj);

 // 首先尝试之前保存的 working sign（如果有）并实时更新 timestamp
 const savedSign = $.getdata(KEY_WORKING_SIGN) || "";
 const savedTs = $.getdata(KEY_WORKING_TIMESTAMP) || "";

 const candidates = buildSignCandidates(userToken, bodyStr, savedTs);
 $.log("【主流程】生成签名候选数量：" + candidates.length);

 for (let i = 0; i < candidates.length; i++) {
   const candidate = candidates[i];
   $.log(`\n【尝试】#${i+1} -> 拼接方式: ${candidate.tag}`);
   const ts = candidate.timestamp;
   const sign = candidate.sign;
   const headers = buildHeaders(userToken, ts, sign);
   const url = `https://cupid.51job.com/open/user-task/user/task/active?version=${APP_VERSION}&api_key=${API_KEY}&timestamp=${ts}`;
   $.log("【尝试】URL: " + url);
   $.log("【尝试】sign: " + sign);
   const res = await httpRequest({ url, method: "POST", headers, body: bodyStr });

   if (!res || typeof res !== "object") {
     $.log("【尝试】网络或解析错误，继续下一个候选");
     continue;
   }

   $.log(`【尝试】响应: status=${res.status}, message=${res.message || JSON.stringify(res)}`);

   if (res.status === "1" || res.status === 1) {
     // 成功
     $.log("【结果】✅ 签到成功！");
     // 保存有效 sign/timestamp
     $.setdata(sign, KEY_WORKING_SIGN);
     $.setdata(String(ts), KEY_WORKING_TIMESTAMP);
     let rewardInfo = "";
     try {
       const doneList = res.resultbody?.concurrentActionDoneTaskList || [];
       const checkIn = doneList.find(t => t.actionType === "daily_check_in");
       if (checkIn && checkIn.taskReward) {
         rewardInfo = `${checkIn.taskReward.name} x ${checkIn.taskReward.number || 1}`;
       }
     } catch (e) {}
     const msg = `签到成功！${rewardInfo ? "\n奖励: " + rewardInfo : ""}`;
     $.msg($.name, "签到成功", msg);
     return;
   } else {
     // 判断是否签名相关错误
     const msg = (res.message || "").toString();
     if (msg.includes("签名") || msg.includes("鉴权") || msg.includes("sign")) {
       $.log("【结果】签名校验失败，继续尝试其它候选...");
       continue;
     } else if (res.status === "0" || res.status === 110010 || msg.includes("已签到") || msg.includes("任务已完成")) {
       $.log("【结果】已签到或任务已完成：" + (res.message || ""));
       $.msg($.name, "已签到/无操作", res.message || "已签到或无奖励");
       return;
     } else {
       $.log("【结果】其他错误：" + (res.message || JSON.stringify(res)));
       // 根据需要可以 break 或 continue；这里继续尝试
       continue;
     }
   }
 }

 // 如果所有候选都失败
 $.log("【结果】❌ 所有签名候选均失败，请提供更多抓包样本以改进算法。");
 $.msg($.name, "签到失败", "尝试多种签名策略均失败，请抓取成功请求样本（timestamp + sign）供分析。");
}

/* ========== 构造签名候选 (尝试多种拼接方式与 salt) ========== */
function buildSignCandidates(userToken, bodyStr, savedTs) {
 const nowTs = Math.floor(Date.now() / 1000);
 const tsList = [];
 // 优先使用保存的 ts（如果存在）
 if (savedTs && savedTs.length > 8) tsList.push(Number(savedTs));
 // 然后使用当前时间前后几秒/分钟的 ts，扩大命中概率
 for (let delta of [0, -1, 1, -5, 5, -30, 30, -60, 60]) {
   tsList.push(nowTs + delta);
 }
 // 去重
 const uniqTs = Array.from(new Set(tsList)).slice(0, 12);

 // 常见 salt 值（可扩展）
 const SALTS = [
   "", "51job", "openapi_51job", "open_51job", "salt", "51job_salt", "partner", PARTNER
 ];

 // 常见拼接模板（猜测）
 // 模板为一个数组，数组项按顺序拼接，然后做 sha256(hex)
 const templates = [
   { tag: "api_key|timestamp|user-token|salt", order: ["api_key","timestamp","user-token","salt"] },
   { tag: "api_key|timestamp|body|salt", order: ["api_key","timestamp","body","salt"] },
   { tag: "timestamp|user-token|salt", order: ["timestamp","user-token","salt"] },
   { tag: "user-token|timestamp|salt", order: ["user-token","timestamp","salt"] },
   { tag: "api_key|user-token|timestamp|salt", order: ["api_key","user-token","timestamp","salt"] },
   { tag: "api_key|timestamp|partner|user-token|salt", order: ["api_key","timestamp","partner","user-token","salt"] },
   { tag: "timestamp|body|salt", order: ["timestamp","body","salt"] },
   { tag: "timestamp|body|partner|salt", order: ["timestamp","body","partner","salt"] }
 ];

 const candidates = [];
 for (const ts of uniqTs) {
   for (const t of templates) {
     for (const salt of SALTS) {
       const pieces = t.order.map(k => {
         if (k === "api_key") return API_KEY;
         if (k === "timestamp") return String(ts);
         if (k === "user-token") return userToken;
         if (k === "partner") return PARTNER;
         if (k === "account-id") return ACCOUNT_ID;
         if (k === "uuid") return UUID;
         if (k === "body") return bodyStr;
         if (k === "salt") return salt;
         return "";
       });
       const raw = pieces.join("");
       const sign = sha256(raw);
       candidates.push({ timestamp: ts, sign: sign, tag: `${t.tag}|salt=${salt}` });
     }
   }
 }

 // 将之前保存的 sign 优先放在前面（如果存在）
 const savedSign = $.getdata(KEY_WORKING_SIGN) || "";
 const ordered = [];
 if (savedSign) {
   // 再用当前 ts 与保存的 sign 一起尝试（以防只需更新 timestamp）
   ordered.push({ timestamp: Math.floor(Date.now() / 1000), sign: savedSign, tag: "savedSign" });
 }
 // concat candidates（去重 sign）
 const seen = new Set();
 for (const c of ordered.concat(candidates)) {
   if (!seen.has(c.sign)) {
     seen.add(c.sign);
     ordered.push(c);
   }
 }
 return ordered;
}

/* ========== 构造请求头 ========== */
function buildHeaders(userToken, timestamp, sign) {
 const headers = {
   "Accept-Encoding": "gzip, deflate, br",
   "Host": "cupid.51job.com",
   "user-token": userToken,
   "Origin": "https://we.51job.com",
   "property": encodeURIComponent(JSON.stringify({
     partner: PARTNER,
     webId: 2,
     fromdomain: "51job_app_iphone",
     frompageUrl: "https://we.51job.com/",
     pageUrl: "https://we.51job.com/op/task",
     identityType: "职场人",
     userType: "",
     isLogin: "是",
     accountid: ACCOUNT_ID
   })),
   "Connection": "keep-alive",
   "uuid": UUID,
   "From-Domain": "51job_app_iphone",
   "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 statusBarHeight:47.0 navBarHeight:91.0 width:390.0 height:844.0 51jobapp/${APP_VERSION}`,
   "Content-Type": "application/json",
   "Referer": "https://we.51job.com/",
   "partner": PARTNER,
   "Accept-Language": "zh-CN,zh-Hans;q=0.9",
   "Accept": "application/json, text/plain, */*",
   "account-id": ACCOUNT_ID,
   "timestamp": String(timestamp),
   "sign": sign
 };
 return headers;
}

/* ========== HTTP 请求封装（使用 $task.fetch） ========== */
async function httpRequest(options) {
 return new Promise((resolve) => {
   const req = {
     url: options.url,
     method: (options.method || "GET").toUpperCase(),
     headers: options.headers || {},
     body: options.body || null
   };
   $task.fetch(req).then(
     resp => {
       try {
         const text = resp.body || "";
         if (!text) return resolve({});
         const obj = JSON.parse(text);
         resolve(obj);
       } catch (e) {
         $.logErr("httpRequest parse error:", e);
         resolve({});
       }
     },
     err => {
       $.logErr("httpRequest fetch error:", err);
       resolve({});
     }
   );
 });
}

/* ========== 工具函数 ========== */
function ObjectKeys2LowerCase(obj) {
 if (!obj || typeof obj !== "object") return {};
 const ret = {};
 Object.keys(obj).forEach(k => {
   ret[k.toLowerCase()] = obj[k];
 });
 return ret;
}

/* ========== Env (QX 兼容封装) ========== */
function Env(t, e) {
 class s {
   constructor(t) {
     this.name = t;
     this.startTime = new Date().getTime();
   }
   toStr(t) {
     try { return JSON.stringify(t); } catch { return String(t); }
   }
   toObj(t, e = null) {
     try { return JSON.parse(t); } catch { return e; }
   }
   getdata(t) {
     try { return $prefs.valueForKey(t); } catch {
       try { return $prefs.read(t); } catch { return null; }
     }
   }
   setdata(t, e) {
     try { return $prefs.setValueForKey(t, e); } catch (err) {
       try { return $prefs.write(e, t); } catch (err2) { this.logErr("setdata error", err, err2); }
     }
   }
   msg(t = this.name, e = "", s = "") { $notify(t, e, s); }
   log(...t) { console.log(t.join(" ")); }
   logErr(...t) { console.log(...t); }
   done(t = {}) {
     const e = (new Date().getTime() - this.startTime) / 1e3;
     this.log(`🔔 ${this.name}, 结束! ⏱ ${e} 秒`);
     $done(t);
   }
 }
 return new s(t, e);
}

/* ========== SHA-256 实现（简化版，来自 js-sha256） ========== */
/* 小巧独立实现以保证在 QX 环境可以直接使用 */
function sha256(ascii) {
 function rightRotate(value, amount) {
   return (value>>>amount) | (value<<(32 - amount));
 }
 var mathPow = Math.pow;
 var maxWord = mathPow(2, 32);
 var lengthProperty = 'length'
 var i, j; // Used as a counter across the whole file
 var result = ''

 var words = [];
 var asciiBitLength = ascii[lengthProperty]*8;

 /* caching results is optional - remove for smaller code */
 var hash = sha256.h = sha256.h || [];
 var k = sha256.k = sha256.k || [];
 var primeCounter = k[lengthProperty];

 var isComposite = {};
 for (var candidate = 2; primeCounter < 64; candidate++) {
   if (!isComposite[candidate]) {
     for (i = 0; i < 313; i += candidate) {
       isComposite[i] = candidate;
     }
     hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
     k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
   }
 }

 ascii += '\x80' // Append Ƈ' bit (plus zero padding)
 while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
 for (i = 0; i < ascii[lengthProperty]; i++) {
   j = ascii.charCodeAt(i);
   if (j>>8) return; // ASCII check: only accept characters in range 0-255
   words[i>>2] |= j << ((3 - i)%4)*8;
 }
 words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
 words[words[lengthProperty]] = (asciiBitLength)

 for (j = 0; j < words[lengthProperty];) {
   var w = words.slice(j, j += 16);
   var oldHash = hash.slice(0);

   for (i = 0; i < 64; i++) {
     var w15 = w[i - 15], w2 = w[i - 2];

     var a = hash[0], e = hash[4];
     var temp1 = hash[7]
       + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
       + ((e & hash[5]) ^ ((~e) & hash[6]))
       + k[i]
       + (w[i] = (i < 16) ? w[i] : (
           w[i - 16]
           + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3))
           + w[i - 7]
           + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10))
         )|0
       );
     var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
       + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

     hash = [(temp1 + temp2)|0].concat(hash);
     hash[4] = (hash[4] + temp1)|0;
     hash.pop();
   }

   for (i = 0; i < 8; i++) {
     hash[i] = (hash[i] + oldHash[i])|0;
   }
 }

 for (i = 0; i < 8; i++) {
   for (j = 3; j + 1; j--) {
     var b = (hash[i] >> (j * 8)) & 255;
     result += ((b < 16) ? 0 : '') + b.toString(16);
   }
 }
 return result;
}