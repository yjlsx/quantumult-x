
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
const checkinURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/signResult?orderNum=355306933&_=';
const creditURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=';
const cookieKey = '1905_cookie';
const maxRetries = 2; // 增加重试次数

// ================== 执行判断 ==================
if (typeof $response !== 'undefined') {
    handleResponse(); // 响应模式处理Cookie
} else {
    checkIn();        // 主动执行签到流程
}

// ================== Cookie捕获逻辑 ==================
function handleResponse() {
    try {
        const setCookie = $response.headers['Set-Cookie'];
        if (!setCookie) {
            console.log("❌ 响应头未找到Set-Cookie");
            return $done();
        }

        // 合并新旧Cookie
        const currentCookie = $prefs.valueForKey(cookieKey) || '';
        const cookieDict = {};
        
        // 解析现有Cookie
        currentCookie.split('; ').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) cookieDict[key.trim()] = value;
        });

        // 更新新Cookie（处理数组形式）
        const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie];
        newCookies.forEach(cookie => {
            const [keyValue] = cookie.split(';');
            const [key, value] = keyValue.split('=');
            if (key && value) cookieDict[key.trim()] = value;
        });

        // 生成合并后的Cookie字符串
        const mergedCookie = Object.entries(cookieDict)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ');
            
        $prefs.setValueForKey(mergedCookie, cookieKey);
        console.log("✅ 合并更新Cookie成功！");
        console.log("旧Cookie:", maskCookie(currentCookie));
        console.log("新Cookie:", maskCookie(mergedCookie));
    } catch (e) {
        console.log(`❌ Cookie处理失败: ${e.message}`);
    }
    $done();
}

// ================== 主逻辑 ==================
async function checkIn(retryCount = 0) {
    console.log(`➡️ 开始第 ${retryCount + 1} 次签到尝试`);
    
    try {
        // 获取并验证Cookie
        const cookie = await getValidCookie();
        
        // 执行签到
        const signRes = await $httpClient.get({
            url: checkinURL + Date.now(),
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
                'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        // 处理签到结果
        const signData = parseSignResult(signRes.body);
        if (!signData.success && retryCount < maxRetries) {
            console.log(`🔄 触发重试：${signData.error}`);
            await sleep(2000);
            return checkIn(retryCount + 1);
        }
        
        // 获取积分
        const credits = await getCurrentCredits(cookie);
        
        // 显示结果
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

// ================== 功能函数 ==================
async function getValidCookie() {
    let cookie = $prefs.valueForKey(cookieKey);
    if (!cookie) throw new Error('请先访问签到页面获取Cookie');
    
    // 验证Cookie有效性
    const checkRes = await $httpClient.get({
        url: checkinURL + Date.now(),
        headers: { 'Cookie': cookie }
    });
    
    if (checkRes.status !== 200 || checkRes.body.includes('NEED_LOGIN')) {
        throw new Error('Cookie已过期，请重新获取');
    }
    return cookie;
}

function parseSignResult(body) {
    try {
        const data = JSON.parse(body);
        return {
            success: data.code === 'success' || data.success,
            points: data.data?.signResult || data.data?.points || 0,
            error: data.data?.errorMsg || data.desc || data.message || '未知错误'
        };
    } catch (e) {
        return { success: false, error: '响应解析失败' };
    }
}

async function getCurrentCredits(cookie) {
    const res = await $httpClient.get({
        url: creditURL + Date.now(),
        headers: { 'Cookie': cookie }
    });
    try {
        return JSON.parse(res.body).data?.totalCredits || 0;
    } catch {
        return 0;
    }
}

// ================== 工具函数 ==================
function showResult(success, points, credits, error) {
    const title = success ? "🎬 1905签到成功" : "🎬 1905签到失败";
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