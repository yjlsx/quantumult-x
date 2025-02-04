
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

// Quantumult X 重写规则
// [rewrite_local]
// https:\/\/50843\.activity\-42\.m\.duiba\.com\.cn\/signactivity\/getSignInfo url script-request-header 1905qd.js

// [task_local]
// 5 0 * * * 1905.js, tag=1905电影网签到


// 1905电影网自动签到脚本 (Quantumult X兼容版)
// 更新时间：2025年1月29日
// Cookie捕获地址与签到地址统一版

// ================ 配置区域 ================
const CONFIG = {
    TITLE: "1905电影网",
    COOKIE_KEY: "1905_cookie_v6",
    CHECKIN_URL: "https://50843.activity-42.m.duiba.com.cn/sign/component/doSign?_=",
    CREDIT_URL: "https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=",
    TIMEOUT: 15000,        // 单次请求超时15秒
    GLOBAL_TIMEOUT: 30000, // 全局超时30秒
    MAX_RETRIES: 3,
    RETRY_DELAYS: [2000, 5000, 10000]
};

// ================ 调试系统 ================
const DEBUG = {
    enabled: true,
    log: function(message) {
        console.log(`[ℹ️ ${Date.now()}] ${message}`);
    },
    error: function(message) {
        console.log(`[❌ ${Date.now()}] ${message}`);
    }
};

// ================ 主入口 ================
typeof $request !== 'undefined' ? handleCookie() : executeCheckIn();

// ================ Cookie处理 ================
function handleCookie() {
    try {
        const cookie = ($request.headers?.Cookie || "").trim();
        if (!cookie) {
            showNotify("Cookie获取失败", "请访问签到页面");
            return $done(); // 确保返回前调用
        }
        
        // 基础验证
        if (!/tokenId=[a-f0-9]{32}/.test(cookie)) {
            showNotify("Cookie无效", "请重新登录");
            return $done(); // 确保返回前调用
        }
        
        $prefs.setValueForKey(cookie, CONFIG.COOKIE_KEY);
        showNotify("Cookie保存成功", "有效期24小时");
    } catch (e) {
        DEBUG.error(`处理异常: ${e}`);
    } finally {
        $done(); // 最终保证执行
    }
}

// ================ 签到逻辑 ================
async function executeCheckIn() {
    let globalTimer;
    try {
        globalTimer = setTimeout(() => {
            DEBUG.log("强制终止：全局超时");
            showNotify("操作超时", "超过30秒未完成");
            $done();
        }, CONFIG.GLOBAL_TIMEOUT);

        for (let retry = 0; retry <= CONFIG.MAX_RETRIES; retry++) {
            DEBUG.log(`=== 第${retry + 1}次尝试 ===`);
            
            try {
                const cookie = await getValidCookie();
                const signResult = await executeSign(cookie);
                const credits = await getCredits(cookie);
                
                showNotify("🎉签到成功", `获得积分+${signResult.points} 当前: ${credits}`);
                clearTimeout(globalTimer);
                return $done(); // 成功时退出
            } catch (e) {
                DEBUG.error(`尝试失败: ${e.message}`);
                if (retry >= CONFIG.MAX_RETRIES) break;
                await delay(CONFIG.RETRY_DELAYS[retry]);
            }
        }
        
        showNotify("签到失败", "已尝试3次仍失败");
    } catch (e) {
        DEBUG.error(`全局异常: ${e.message}`);
    } finally {
        clearTimeout(globalTimer);
        $done(); // 确保最终执行
    }
}

// ================ 核心功能 ================
async function getValidCookie() {
    const cookie = $prefs.valueForKey(CONFIG.COOKIE_KEY);
    if (!cookie) throw new Error("请先获取Cookie");
    
    // 长度验证
    if (cookie.length < 150) {
        $prefs.remove(CONFIG.COOKIE_KEY);
        throw new Error("Cookie已损坏");
    }
    return cookie;
}

async function executeSign(cookie) {
    const res = await fetchWithTimeout(CONFIG.CHECKIN_URL, {
        method: "POST",
        headers: {
            "Cookie": cookie,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App"
        },
        body: "signOperatingId=285254648573582&token=oip6bv"
    });
    
    try {
        const data = JSON.parse(res.body);
        if (data.code !== "success") throw new Error(data.msg || "签到失败");
        return { points: data.data?.points || 0 };
    } catch {
        throw new Error("响应解析失败");
    }
}

async function getCredits(cookie) {
    const res = await fetchWithTimeout(CONFIG.CREDIT_URL, {
        headers: { "Cookie": cookie }
    });
    try {
        return JSON.parse(res.body)?.data?.totalCredits || 0;
    } catch {
        return 0;
    }
}

// ================ 网络工具 ================
async function fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        DEBUG.log(`请求超时: ${url}`);
    }, CONFIG.TIMEOUT);

    try {
        DEBUG.log(`请求发起: ${url}`);
        const start = Date.now();
        const res = await $task.fetch({
            ...options,
            url: url + Date.now(),
            signal: controller.signal
        });
        
        DEBUG.log(`请求完成 耗时:${Date.now() - start}ms 状态:${res.statusCode}`);
        return res;
    } catch (e) {
        if (e.name === 'AbortError') throw new Error(`请求超时 (${CONFIG.TIMEOUT}ms)`);
        throw new Error(`网络错误: ${e.message}`);
    } finally {
        clearTimeout(timeoutId); // 清理定时器
    }
}

// ================ 工具函数 ================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showNotify(subtitle, content) {
    try {
        if (typeof $notification !== 'undefined') {
            $notification.post(CONFIG.TITLE, subtitle, content);
        } else if (typeof $notify !== 'undefined') {
            $notify(CONFIG.TITLE, subtitle, content);
        }
        DEBUG.log(`通知已发送: ${subtitle}`);
    } catch (e) {
        DEBUG.error("通知失败: " + e.message);
    }
}

/* ================ 配置示例 ================
[rewrite_local]
^https:\/\/50843\.activity-42\.m\.duiba\.com\.cn\/sign\/component\/doSign url script-request-header 1905.js

[task_local]
0 9 * * * https://example.com/1905.js, tag=1905签到, enabled=true

[mitm]
hostname = 50843.activity-42.m.duiba.com.cn
*/