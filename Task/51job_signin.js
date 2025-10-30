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

const $ = new Env("51Job 签到");

const tokenKey = "51job_user_token";

// 签到请求中的动态签名（!!! 硬编码，可能需要更新 !!!）
const FIXED_SIGN = "b840342843266ffcb15e372b0c5ac7d8424a8865eaad3ae965274dc81e569e2e"; 
const FIXED_PROPERTY = `%7B%22partner%22%3A%22b3cb7e0289d7ce624549498cae53b174%22%2C%22webId%22%3A2%2C%22fromdomain%22%3A%2251job_app_iphone%22%2C%22frompageUrl%22%3A%22https%3A%2F%2Fwe.51job.com%2F%22%2C%22pageUrl%22%3A%22https%3A%2F%2Fwe.51job.com%2Fop%2Ftask%22%2C%22identityType%22%3A%22%E8%81%8C%E5%9C%BA%E4%BA%BA%22%2C%22userType%22%3A%22%22%2C%22isLogin%22%3A%22%E6%98%AF%22%2C%22accountid%22%3A%22169799378%22%7D`;
const FIXED_UUID = `e45d42cf7fa9a4c84246c8e4bc6714ef`;
const FIXED_ACCOUNT_ID = `169799378`;

/* ---------------- 捕获逻辑 ---------------- */
if (typeof $request !== "undefined") {
    // 自动抓取 user-token
    (async () => {
        try {
            const head = ObjectKeys2LowerCase($request.headers || {});
            const userToken = head["user-token"] || "";

            if (userToken && userToken.length > 10) {
                const oldToken = $.getdata(tokenKey) || "";
                if (oldToken !== userToken) {
                    $.setdata(userToken, tokenKey);
                    $.log("【抓取】成功获取新 user-token。");
                    $notify($.name + " — 抓取成功", "", "已保存 user-token，请关闭抓包并运行任务。");
                } else {
                    $.log("【抓取】user-token 未变化。");
                }
            } else {
                $.log("【抓取】请求中未发现 user-token。");
            }
        } catch (e) {
            $.logErr("【抓取】处理异常:", e);
        } finally {
            $done({});
        }
    })();
} else {
    // 定时/手动运行签到流程
    (async () => {
        await main();
    })().finally(() => {
        $.done();
    });
}

/* -------------------- 主流程 -------------------- */
async function main() {
    $.log(`\n============== ${$.name} 开始执行 ==============`);
    const userToken = $.getdata(tokenKey);
    
    if (!userToken) {
        $.msg($.name, "❌ 凭证缺失", "未找到 51job_user_token，请先通过抓包获取。");
        $.log("【主流程】❌ 凭证缺失，脚本终止。");
        return;
    }
    $.log(`【主流程】✅ 获取到 user-token。`);

    const signResult = await checkIn(userToken);
    
    // 构造最终通知消息
    let finalMessage = `[状态] ${signResult.status}\n`;
    finalMessage += `[详情] ${signResult.msg}\n`;
    
    if (signResult.success && signResult.rewardName) {
        finalMessage += `🎁 奖励: ${signResult.rewardName} x ${signResult.rewardNumber}`;
    }
    
    $.log(`\n【通知】${finalMessage}`);
    $.log(`\n============== ${$.name} 执行完毕 ==============`);

    // 推送结果通知
    $.msg($.name, signResult.status, finalMessage);
}

/* -------------------- API 函数 -------------------- */

async function checkIn(userToken) {
    // 动态生成秒级时间戳
    const timestamp = Math.floor(Date.now() / 1000); 

    // URL 构造
    const url = `https://cupid.51job.com/open/user-task/user/task/active?version=15.19.0&api_key=51job&timestamp=${timestamp}`;

    $.log(`【签到】URL: ${url}`);
    $.log(`【签到】Headers中的Sign: ${FIXED_SIGN}`);
    $.log(`【签到】Headers中的Timestamp: ${timestamp}`);
    
    const headers = {
        // 动态参数
        'timestamp': String(timestamp),
        'user-token': userToken,
        'sign': FIXED_SIGN, 
        'account-id': FIXED_ACCOUNT_ID,
        
        // 静态参数
        'Accept-Encoding': `gzip, deflate, br`,
        'Host': `cupid.51job.com`,
        'Origin': `https://we.51job.com`,
        'property': FIXED_PROPERTY,
        'uuid': FIXED_UUID,
        'From-Domain': `51job_app_iphone`,
        'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 statusBarHeight:47.0 navBarHeight:91.0 width:390.0 height:844.0 51jobapp/15.19.0`,
        'Content-Type': `application/json`,
        'Referer': `https://we.51job.com/`,
        'partner': `b3cb7e0289d7ce624549498cae53b174`,
        'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
        'Accept': `application/json, text/plain, */*`,
    };
    
    const body = JSON.stringify({
        "version": "15.19.0",
        "actionType": "daily_check_in",
        "step2Add": 1
    });
    
    $.log(`【签到】Body: ${body}`);

    const res = await httpRequest({ url, headers, body, method: "POST" });
    
    try {
        if (!res || !res.status) {
            $.log(`【签到】❌ 请求失败或响应格式错误: ${JSON.stringify(res)}`);
            return { success: false, status: "❌ 签到失败", msg: "网络请求失败或响应为空" };
        }
        
        $.log(`【签到】响应状态: ${res.status}, 消息: ${res.message}`);

        if (res.status === "1") {
            const doneList = res.resultbody?.concurrentActionDoneTaskList || [];
            const checkInReward = doneList.find(task => task.actionType === "daily_check_in");

            if (checkInReward && checkInReward.rewardSuccess) {
                const rewardName = checkInReward.taskReward?.name || "未知奖励";
                const rewardNumber = checkInReward.taskReward?.number || 1;
                const dailyCheckIn = checkInReward.name || "每日打卡";
                
                $.log(`【签到】✅ 成功领取任务奖励: ${dailyCheckIn}`);
                
                return {
                    success: true,
                    status: "✅ 签到成功",
                    msg: `${dailyCheckIn} 完成！`,
                    rewardName,
                    rewardNumber
                };
            } else {
                $.log("【签到】⚠️ 任务已完成或奖励未更新，判定为已签到。");
                return { success: true, status: "⚠️ 今日已签到", msg: "任务已完成，等待明日签到。", rewardName: "无", rewardNumber: 0 };
            }
            
        } else {
            const errMsg = res.message || JSON.stringify(res) || "未知错误";
            $.log(`【签到】❌ 失败原因: ${errMsg}`);
            
            if (errMsg.includes("签名") || errMsg.includes("sign")) {
                 return { success: false, status: "❌ 签到失败", msg: `签名/时间戳校验失败，请更新脚本中的 sign 值！` };
            }
            return { success: false, status: "❌ 签到失败", msg: errMsg };
        }
    } catch (e) {
        $.logErr("【签到】❌ 解析 51Job 签到响应时出错:", e);
        return { success: false, status: "❌ 脚本错误", msg: "解析响应体失败" };
    }
}

// ... [ Env 环境封装和通用工具函数保持不变 ] ...

/* -------------------- 通用工具 -------------------- */
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
         // $.logErr("httpRequest parse error:", e, "body:", resp.body); // 避免日志过多
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