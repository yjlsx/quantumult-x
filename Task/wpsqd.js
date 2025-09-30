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
const extraKey = "wps_signin_extra"; // 变量保留，但不再是执行任务的强制依赖

// 从持久化存储中读取值
// ckval 格式: { cookie: "wps_sid=xxx; uid=yyy; ..." }
let ckval = $.toObj($.getdata(ckKey), null);
let wps_extra = $.getdata(extraKey); // 仍然读取，但不再强制检查

// --- 主程序入口 ---
!(async () => {
    if (typeof $request !== "undefined") {
        // 如果是重写模式，执行抓取逻辑
        await captureData();
        return;
    }

    // 如果是任务模式，检查依赖 (只需要 Cookie)
    if (!ckval || !ckval.cookie) {
        $.msg($.name, "❌ 请先获取Cookie", "打开WPS App/PC版触发脚本获取");
        return;
    }

    /*
    // 移除对 wps_extra 的依赖检查，因为签到 body 现在是硬编码的。
    if (!wps_extra) {
        $.msg($.name, "❌ 缺少配置", `请尝试手动签到一次以获取并存储 ${extraKey}`);
        return;
    }
    */

    $.cookie = ckval.cookie;
    await main();
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());

/* 核心任务逻辑 */
async function main() {
    // 1. 用户信息校验
    const { result, msg, nickname } = await getUsername();
    if (result !== "ok") {
        // 如果登录失败，清除 cookie，强制重新抓取
        $.setdata('', ckKey); 
        $.msg($.name, "⚠️ 登录失败/Cookie失效", wps_msg(msg));
        return;
    }
    // 2. 签到
    await signIn(nickname);
}

/* 签到 */
async function signIn(nickname) {
    // 签到前查询积分 (可选)
    // const pointBefore = await getIntegral(); 
    
    const url = "https://personal-bus.wps.cn/sign_in/v1/sign_in";
    const headers = {
        "Content-Type": "application/json",
        // 使用抓包提供的 User-Agent
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1",
        "Origin": "https://personal-act.wps.cn",
        "Referer": "https://personal-act.wps.cn/",
        "Cookie": $.cookie,
    };
    
    // *** 根据用户要求，使用硬编码的请求体。请注意 extra 值可能失效。 ***
    const body = `{"encrypt":true,"extra":"shfDZxB63hOSzgWr7cJtfMmPPa70rhxzLYFRXqkN40ROxRP/RC+Y/7hpVL4VDdOt","pay_origin":"ios_ucs_rwzx sign","channel":""}`;


    const res = await httpRequest({ url, headers, body, method: "POST" });
    const point = await getIntegral(); // 签到后查询积分

    let title = `${$.name} | ${nickname}`;
    if (res.result === "ok" || res.code === 1000000) {
        const rewards = res.data?.rewards || [];
        let rewardText =
            rewards.length > 0
                ? rewards.map((r) => `${r.reward_name} x${r.num || 1}`).join(", ")
                : "无";

        $.msg(title, "✅ 签到成功", `奖励：${rewardText}\n当前总积分：${point}`);
    } else if (res.msg === "has sign") {
        $.msg(title, "⚠️ 已签到", `今日无需重复签到\n当前总积分：${point}`);
    } else {
        $.msg(title, "❌ 签到失败", res.msg || `未知错误 (Code: ${res.code || 'N/A'})`);
    }
}

/* 步骤 1：获取用户信息 */
async function getUsername() {
    const url = "https://account.wps.cn/p/auth/check";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        // 保持与签到请求一致的 User-Agent
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1", 
        "Cookie": $.cookie,
    };
    return await httpRequest({ url, headers, method: "POST" });
}

/* **步骤 2：查询积分 (使用新的 API)** */
async function getIntegral() {
    const url = "https://personal-act.wps.cn/vip_day/v1/user/integral/info";
    // 使用签到请求的 User-Agent 和 Cookie 即可
    const headers = { 
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1",
        "Cookie": $.cookie,
    };
    const res = await httpRequest({ url, headers });
    // 根据响应体 {"data": {"integral": 44, ...}, "result": "ok"} 提取积分
    return res?.data?.integral || "未知";
}

/* --- 数据抓取逻辑 --- */
async function captureData() {
    const url = $request.url;

    // 1. 抓取 Cookie (通过 script-request-header 规则, 拦截任意包含重要Cookie的请求)
    if (url.includes("wps.cn") && $request.headers?.Cookie) {
        const fullCookie = $request.headers.Cookie;
        // 过滤出关键的 cookie 键值对进行存储，避免存储过期或无关信息
        const essentialCookie = getCookieString(fullCookie); 
        
        if (essentialCookie.includes("wps_sid")) {
            const ckVal = { cookie: essentialCookie };
            const currentStoredCk = $.getdata(ckKey);
            
            if (currentStoredCk !== $.toStr(ckVal)) {
                $.setdata($.toStr(ckVal), ckKey);
                $.msg($.name, "🎉 获取Cookie成功", "wps_sid/关键Cookie已存储/更新");
            } else {
                console.log("Cookie未更新，跳过存储");
            }
        }
    }

    // 2. 抓取 extra 值 (通过 script-request-body 规则, 拦截签到请求)
    if (url.includes("personal-bus.wps.cn/sign_in/v1/sign_in")) {
        try {
            const bodyObj = JSON.parse($request.body);
            const extra = bodyObj.extra;
            
            if (extra) {
                const currentExtra = $.getdata(extraKey);
                if (currentExtra !== extra) {
                    $.setdata(extra, extraKey);
                    $.msg($.name, "🎉 获取Extra成功 (仅供参考/备用)", "wps_signin_extra已存储/更新");
                } else {
                    console.log("Extra未更新，跳过存储");
                }
            } else {
                $.log(`[Extra Capture] 请求体中未找到 extra 字段`);
            }
        } catch (e) {
            $.logErr(`Extra抓取 Body解析失败: ${e.message}`);
        }
    }
}

/* --- 工具函数 --- */

// 仅获取关键 Cookie 组成的字符串，以防整串太长
function getCookieString(cookie) {
    // 这些是经验证对 WPS 登录态重要的 Cookie 键
    const keys = ["wps_sid", "uid", "_ku", "csrf", "tfstk", "kso_sid", "cv", "exp", "nexp", "coa_id", "cid"]; 
    
    // 将 Cookie 字符串分割成键值对
    const parts = cookie.split("; ").filter(item => {
        const key = item.split("=")[0];
        return keys.includes(key);
    });
    return parts.join("; ");
}

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
                    $.log(`[${options.url}] JSON解析失败，返回原始响应。`);
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

/* 环境封装 - 适配 Quantumult X */
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
            return $persistentStore.read(t) || $prefs.valueForKey(t); // 兼容QX和JSBox
        }
        setdata(t, e) {
            return $persistentStore.write(t, e) || $prefs.setValueForKey(t, e); // 兼容QX和JSBox
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
