
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
// ================== 配置区 ==================
const CONFIG = {
    DOMAIN: '50843.activity-42.m.duiba.com.cn',
    COOKIE_KEY: '1905_enterprise_cookie',
    CHECKIN_URL: 'https://50843.activity-42.m.duiba.com.cn/sign/component/doSign?_=',
    CREDIT_URL: 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=',
    REQUIRED_KEYS: ['_ac', 'tokenId', 'wdata3', 'wdata4'],
    MAX_RETRIES: 3,
    SECURITY: {
        MIN_LENGTH: 160,
        TOKEN_PATTERN: /^[a-f0-9]{32}$/,
        WDATA_PATTERN: /^[A-Za-z0-9+/=]+$/
    }
};

// ================== 主逻辑开关 ==================
typeof $request !== 'undefined' ? handleRequest() : performCheckIn();

// ================== 请求处理模块 ==================
function handleRequest() {
    try {
        if (!validateRequest()) return;
        
        const cookieData = extractCookie();
        if (!cookieData) return;
        
        if (processCookie(cookieData)) {
            notifyCaptureSuccess(cookieData);
        }
    } catch (e) {
        console.log(`‼️ 主流程异常: ${e.stack}`);
        notifyError('请求处理失败', e.message);
    } finally {
        $done();
    }
}

// ================== 签到执行模块 ==================
async function performCheckIn(retryCount = 0) {
    try {
        const cookie = await getValidatedCookie();
        const signResult = await executeSign(cookie);
        const creditData = await fetchCredit(cookie);
        
        notifySignResult(signResult, creditData);
    } catch (e) {
        console.log(`‼️ 签到异常: ${e.message}`);
        if (shouldRetry(retryCount, e)) {
            await sleep(2000);
            return performCheckIn(retryCount + 1);
        }
        notifyError('签到失败', e.message);
    } finally {
        $done();
    }
}

// ================== 核心功能函数 ==================
function validateRequest() {
    if (!$request.url.includes(CONFIG.DOMAIN)) {
        console.log('🚫 非目标域名请求');
        return false;
    }
    
    if ($request.method !== 'POST') {
        console.log('🚫 非POST方法请求');
        return false;
    }
    
    return true;
}

function extractCookie() {
    const rawCookie = $request.headers?.Cookie || $request.headers?.cookie;
    if (!rawCookie) {
        notifyError('Cookie缺失', '请求头未找到Cookie字段');
        return null;
    }
    
    const parsed = parseCookie(rawCookie);
    if (!validateCookieStructure(parsed)) {
        notifyError('Cookie无效', '缺少必要字段或格式错误');
        return null;
    }
    
    return {
        raw: rawCookie,
        parsed: parsed,
        source: $request.url
    };
}

function parseCookie(cookieStr) {
    return cookieStr.split('; ').reduce((acc, pair) => {
        const [key, value] = pair.split('=');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
    }, {});
}

function validateCookieStructure(cookie) {
    // 字段存在性检查
    const hasAllKeys = CONFIG.REQUIRED_KEYS.every(k => cookie[k]);
    if (!hasAllKeys) return false;
    
    // 安全特征验证
    return CONFIG.SECURITY.TOKEN_PATTERN.test(cookie.tokenId) &&
           CONFIG.SECURITY.WDATA_PATTERN.test(cookie.wdata3) &&
           cookie.raw.length >= CONFIG.SECURITY.MIN_LENGTH;
}

function processCookie(cookieData) {
    const existing = $prefs.valueForKey(CONFIG.COOKIE_KEY);
    if (existing === cookieData.raw) {
        console.log('🔄 Cookie未变更');
        return false;
    }
    
    $prefs.setValueForKey(cookieData.raw, CONFIG.COOKIE_KEY);
    console.log('✅ Cookie更新成功');
    return true;
}

// ================== 签到功能函数 ==================
async function getValidatedCookie() {
    const cookie = $prefs.valueForKey(CONFIG.COOKIE_KEY);
    if (!cookie) throw new Error('请先完成Cookie获取流程');
    
    // 深度有效性验证
    const checkRes = await $httpClient.post({
        url: CONFIG.CHECKIN_URL + Date.now(),
        headers: buildHeaders(cookie),
        body: 'signOperatingId=285254648573582&token=oip6bv'
    });
    
    if (checkRes.status !== 200) {
        throw new Error(`验证请求失败 (HTTP ${checkRes.status})`);
    }
    
    if (checkRes.body.includes('NEED_LOGIN')) {
        throw new Error('会话已过期');
    }
    
    return cookie;
}

async function executeSign(cookie) {
    const response = await $httpClient.post({
        url: CONFIG.CHECKIN_URL + Date.now(),
        headers: buildHeaders(cookie),
        body: 'signOperatingId=285254648573582&token=oip6bv'
    });
    
    return parseSignResponse(response);
}

function parseSignResponse(response) {
    try {
        const data = JSON.parse(response.body);
        return {
            success: data.code === 'success',
            points: data.data?.points || 0,
            message: data.msg || '无状态信息',
            statusCode: response.status
        };
    } catch (e) {
        return {
            success: false,
            points: 0,
            message: '响应解析失败',
            statusCode: 500
        };
    }
}

async function fetchCredit(cookie) {
    const res = await $httpClient.get({
        url: CONFIG.CREDIT_URL + Date.now(),
        headers: { 'Cookie': cookie }
    });
    
    try {
        return JSON.parse(res.body)?.data?.totalCredits || 0;
    } catch {
        return 0;
    }
}

// ================== 工具函数 ==================
function buildHeaders(cookie) {
    return {
        'Cookie': cookie,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
        'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1',
        'Origin': 'https://50843.activity-42.m.duiba.com.cn'
    };
}

function shouldRetry(retryCount, error) {
    const retryableErrors = ['会话已过期', '网络超时', '响应解析失败'];
    return retryCount < CONFIG.MAX_RETRIES && 
           retryableErrors.some(e => error.message.includes(e));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ================== 通知系统 ==================
function notifyCaptureSuccess(data) {
    const maskedCookie = maskSensitiveInfo(data.raw);
    const fields = CONFIG.REQUIRED_KEYS.map(k => `${k}: ${data.parsed[k] ? '✔️' : '❌'}`).join('\n');
    
    $notification.post(
        '✅ Cookie获取成功', 
        `来自: ${getShortUrl(data.source)}`,
        `有效字段:\n${fields}\n脱敏Cookie:\n${maskedCookie}`
    );
}

function notifySignResult(result, credit) {
    const title = result.success ? '🎉 签到成功' : '⚠️ 签到异常';
    const subtitle = result.success ? 
        `获得积分: +${result.points} | 当前积分: ${credit}` : 
        `错误代码: ${result.statusCode}`;
    
    $notification.post(
        title,
        subtitle,
        result.message
    );
}

function notifyError(title, message) {
    $notification.post(
        `❌ ${title}`,
        '点击查看详情',
        `错误信息: ${message.slice(0, 100)}`
    );
}

function maskSensitiveInfo(cookie) {
    return cookie
        .replace(/(tokenId=)(\w{4})\w+(\w{4})/, '$1$2***$3')
        .replace(/(wdata[34]=)([^;]+)/g, '$1***');
}

function getShortUrl(url) {
    return url.replace(/https?:\/\/(.*?)\/.*/, '$1');
}

// ================== 配套配置 ==================
/*
Quantumult X 配置建议：

[rewrite_local]
^https:\/\/50843\.activity-42\.m\.duiba\.com\.cn\/sign\/component\/doSign url script-request-header https://your_script_url.js

[task_local]
0 9 * * * https://your_script_url.js, tag=1905自动签到, enabled=true

[mitm]
hostname = 50843.activity-42.m.duiba.com.cn
*/

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
