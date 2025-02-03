
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
const cookieKey = '1905_cookie';
const maxRetries = 2;

if (typeof $response !== 'undefined') {
    handleResponse();
} else {
    checkIn();
}

function handleResponse() {
    try {
        const setCookie = $response.headers['Set-Cookie'];
        if (!setCookie) {
            console.log("❌ 响应头未找到 Set-Cookie");
            return $done();
        }

        const currentCookie = $prefs.valueForKey(cookieKey) || '';
        const cookieDict = {};

        currentCookie.split('; ').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) cookieDict[key.trim()] = value;
        });

        const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie];
        newCookies.forEach(cookie => {
            const [keyValue] = cookie.split(';');
            const [key, value] = keyValue.split('=');
            if (key && value) cookieDict[key.trim()] = value;
        });

        const mergedCookie = Object.entries(cookieDict)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ');

        $prefs.setValueForKey(mergedCookie, cookieKey);
        console.log("✅ Cookie 更新成功！");
        console.log("旧 Cookie:", maskCookie(currentCookie));
        console.log("新 Cookie:", maskCookie(mergedCookie));
    } catch (e) {
        console.log(`❌ Cookie 处理失败: ${e.message}`);
    }
    $done();
}

async function checkIn(retryCount = 0) {
    console.log(`➡️ 开始第 ${retryCount + 1} 次签到尝试`);

    try {
        await fetchAndUpdateCookie();
        const cookie = await getValidCookie();

        const signRes = await $httpClient.post({
            url: checkinURL + Date.now(),
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
                'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1',
                'X-Requested-With': 'XMLHttpRequest'
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

async function fetchAndUpdateCookie() {
    console.log("🔄 尝试从签到接口获取 Cookie...");
    try {
        await $httpClient.post({
            url: checkinURL + Date.now(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
                'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1'
            },
            body: 'signOperatingId=285254648573582&token=oip6bv'
        });
        console.log("✅ Cookie 获取请求已发送");
    } catch (e) {
        console.log(`❌ 获取 Cookie 失败: ${e.message}`);
    }
}

async function getValidCookie() {
    let cookie = $prefs.valueForKey(cookieKey);
    if (!cookie) throw new Error('请先访问签到页面获取 Cookie');

    const checkRes = await $httpClient.post({
        url: checkinURL + Date.now(),
        headers: { 'Cookie': cookie }
    });

    if (checkRes.status !== 200 || checkRes.body.includes('NEED_LOGIN')) {
        throw new Error('Cookie 已过期，请重新获取');
    }
    return cookie;
}

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

async function getCurrentCredits(cookie) {
    const res = await $httpClient.get({
        url: 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=' + Date.now(),
        headers: { 'Cookie': cookie }
    });
    try {
        return JSON.parse(res.body).data?.totalCredits || 0;
    } catch {
        return 0;
    }
}

function showResult(success, points, credits, error) {
    const title = success ? "🎬 1905 签到成功" : "🎬 1905 签到失败";
    const subtitle = success ? `获得积分：+${points}` : `原因：${error?.slice(0,30)}`;
    const content = `当前积分：${credits}`;

    typeof $notification !== 'undefined' 
        ? $notification.post(title, subtitle, content)
        : console.log(`通知内容：${title} - ${subtitle} - ${content}`);
}

function maskCookie(cookie) {
    return cookie.replace(/(auth_token|SESSION)=([^;]+)/g, '$1=***');
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

// ================== 配置说明 ==================
/*
Quantumult X 配置方法：

1. 添加重写规则（用于捕获Cookie）：
[rewrite_local]
^https:\/\/50843\.activity-42\.m\.duiba\.com\.cn\/sign\/component\/signResult url script-response-body https://example.com/1905checkin.js

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
