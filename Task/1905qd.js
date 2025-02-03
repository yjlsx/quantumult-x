
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

// ================== 配置区 ==================
const checkinURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/doSign?_=';
const creditURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_='
const cookieKey = '1905_cookie';
const maxRetries = 2;

if (typeof $request !== 'undefined') {
    handleRequest();
} else {
    checkIn();
}

/**
 * ✅ 监听请求并提取 Cookie
 */
function handleRequest() {
    try {
        const requestCookie = $request.headers["Cookie"] || $request.headers["cookie"];
        if (!requestCookie) {
            console.log("❌ 请求头中未找到 Cookie");
            return $done();
        }

        // 存储 Cookie
        $prefs.setValueForKey(requestCookie, cookieKey);
        console.log("✅ 从请求中提取 Cookie 并存储成功！");
        console.log("🍪 新 Cookie:", maskCookie(requestCookie));

        // 🔔 弹窗通知
        if (typeof $notification !== 'undefined') {
            $notification.post("🎬 1905 Cookie 获取成功", "请勿手动清理，自动签到将使用此 Cookie", "🍪 Cookie 已成功存储");
        } else {
            console.log("🔔 由于环境限制，无法弹出通知，但 Cookie 已存储！");
        }

    } catch (e) {
        console.log(`❌ 处理请求 Cookie 失败: ${e.message}`);
    }
    $done();
}

/**
 * ✅ 执行签到流程
 */
async function checkIn(retryCount = 0) {
    console.log(`➡️ 开始第 ${retryCount + 1} 次签到尝试`);

    try {
        const cookie = await getValidCookie();

        const signRes = await $task.fetch({
            url: checkinURL + Date.now(),
            method: "POST",
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
                'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1'
            },
            body: 'signOperatingId=285254648573582&token=oip6bv'
        });

        const signData = parseSignResult(signRes.body);
        if (!signData.success && retryCount < maxRetries) {
            console.log(`🔄 触发重试：${signData.error}`);
            await sleep(2000);
            return checkIn(retryCount + 1);
        }

        const credits = await getCurrentCredits(cookie);
        showResult(signData.success, signData.points, credits, signData.error);

    } catch (error) {
        console.log(`❗ 异常：${error.message}`);
        if (retryCount < maxRetries) {
            await sleep(2000);
            return checkIn(retryCount + 1);
        }
        showResult(false, 0, 0, error.message);
    } finally {
        $done();
    }
}

/**
 * 🔄 获取有效 Cookie
 */
async function getValidCookie() {
    let cookie = $prefs.valueForKey(cookieKey);
    if (!cookie) throw new Error('请先访问签到页面获取 Cookie');

    const checkRes = await $task.fetch({
        url: checkinURL + Date.now(),
        method: "POST",
        headers: { 'Cookie': cookie }
    });

    if (checkRes.status !== 200 || checkRes.body.includes('NEED_LOGIN')) {
        throw new Error('Cookie 已过期，请重新获取');
    }
    return cookie;
}

/**
 * 📊 解析签到结果
 */
function parseSignResult(body) {
    try {
        const data = JSON.parse(body);
        return {
            success: data.code === 'success',
            points: data.data?.points || 0,
            error: data.msg || data.message || '未知错误'
        };
    } catch (e) {
        return { success: false, error: '响应解析失败' };
    }
}

/**
 * 🎯 查询当前积分
 */
async function getCurrentCredits(cookie) {
    const res = await $task.fetch({
        url: creditURL + Date.now(),
        method: "GET",
        headers: { 'Cookie': cookie }
    });
    try {
        return JSON.parse(res.body).data?.totalCredits || 0;
    } catch {
        return 0;
    }
}

/**
 * 🔔 发送通知
 */
function showResult(success, points, credits, error) {
    const title = success ? "🎬 1905 签到成功" : "🎬 1905 签到失败";
    const subtitle = success ? `获得积分：+${points}` : `原因：${error?.slice(0, 30)}`;
    const content = `当前积分：${credits}`;

    if (typeof $notification !== 'undefined') {
        $notification.post(title, subtitle, content);
    } else {
        console.log(`通知内容：${title} - ${subtitle} - ${content}`);
    }
}

/**
 * 🔍 Cookie 打码（防止日志泄露）
 */
function maskCookie(cookie) {
    return cookie.replace(/(auth_token|SESSION)=([^;]+)/g, '$1=***');
}

/**
 * ⏳ 休眠
 */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}


// ================== 配置说明 ==================
/*
Quantumult X 配置方法：

1. 添加重写规则（用于捕获Cookie）：
[rewrite_local]
https://50843.activity-42.m.duiba.com.cn/sign/component/doSign url script-request-header https://your_server.com/1905qd.js

2. 添加定时任务：
[task_local]
0 9 * * * https://example.com/1905checkin.js, tag=1905电影网签到

使用流程：
1. 首次使用时访问签到页面触发Cookie捕获
2. 脚本会自动保存有效Cookie
3. 每日自动执行签到
4. 失败自动重试2次

注意事项：
• 必须访问实际的签到页面才能捕获有效Cookie
• 如果收到"Cookie已过期"提示，需要重新访问签到页面
*/
