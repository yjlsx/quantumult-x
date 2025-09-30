/**



[rewrite_local]
# 获取 WPS Cookie
^https:\/\/(vip|account)(userinfo|\.wps\.cn\/p\/auth\/check)$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wps.js

[task_local]
# WPS 签到，每天自动运行
1 0 * * * https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsqd.js, tag= WPS_PC签到, enabled=true

**/


const $ = new QxEnv("WPS签到");

// 从持久化存储中读取变量
const wps_token = $.getdata('wps_signin_token');
const wps_cookie = $.getdata('wps_signin_cookie');
const wps_extra = $.getdata('wps_signin_extra'); 

// 通用 HTTP 请求函数
function httpRequest(options) {
    return new Promise((resolve, reject) => {
        $task.fetch(options).then(response => {
            let data = response.body;
            try {
                data = JSON.parse(response.body);
            } catch (e) {
                // 如果不是 JSON，直接返回原始数据
            }
            resolve(data);
        }, reason => {
            reject(reason);
        });
    });
}

// ------------------------------------
// 辅助函数
// ------------------------------------

// 获取用户名
async function getUsername() {
    const user_url = 'https://account.wps.cn/p/auth/check';
    const user_headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        // 使用 PC User-Agent 以匹配辅助函数中的请求习惯
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 WpsOfficeApp/12.1.0.18276 (per,windows)',
        "Origin": "https://personal-act.wps.cn",
        "Cookie": wps_cookie
    };
    
    const options = { url: user_url, body: '', headers: user_headers, method: 'POST' };

    try {
        const data = await httpRequest(options);
        if (data && data.result === 'ok' && data.nickname) {
            return data.nickname;
        } else {
            return `未知用户 (${data.msg || '获取失败'})`;
        }
    } catch (e) {
        $.log(`[${$.name}] 获取用户信息请求异常: ${e.error || e}`);
        return '用户信息请求失败';
    }
}

// 获取总积分
async function getIntegral() {
    $.log(`[${$.name}] 尝试获取总积分...`);
    const integral_url = `https://personal-act.wps.cn/vip_day/v1/user/integral/info`;
    const integral_headers = {
        'Accept' : `application/json, text/plain, */*`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Cookie' : wps_cookie, // 只需要 Cookie
        'Connection' : `keep-alive`,
        'Host' : `personal-act.wps.cn`,
        // 使用签到请求的 User-Agent
        'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,
        'Referer' : `https://personal-act.wps.cn/vip-spa/2025/user-integral-rewards/list?active_tab=integral`,
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
    };

    const options = {
        url: integral_url,
        method: 'GET',
        headers: integral_headers
    };

    try {
        const data = await httpRequest(options);
        if (data && data.result === 'ok' && data.data && typeof data.data.integral === 'number') {
            return data.data.integral;
        } else {
            $.log(`[${$.name}] 积分获取失败: ${data.msg || '数据结构错误'}`);
            return '获取失败';
        }
    } catch (e) {
        $.log(`[${$.name}] 积分请求异常: ${e.error || e}`);
        return '请求失败';
    }
}


// ------------------------------------
// 主函数
// ------------------------------------

async function checkIn() {
    if (!wps_token || !wps_cookie || !wps_extra) {
        $.notify($.name, "❌ 配置错误", "请检查 wps_signin_token/cookie/extra 变量是否已配置");
        $.done();
        return;
    }

    // 1. 获取用户名
    const nickname = await getUsername();
    $.messages.push(`👤 用户: ${nickname}`);

    // 2. 执行签到请求
    const sign_url = `https://personal-bus.wps.cn/sign_in/v1/sign_in`;
    const sign_method = `POST`;
    
    // 使用抓取到的 wps_extra 变量构造 body
    const sign_body = JSON.stringify({
        "encrypt": true,
        "extra": wps_extra,
        "pay_origin": "ios_ucs_rwzx sign",
        "channel": ""
    });

    // 构造 Headers
    const sign_headers = {
        'Sec-Fetch-Dest' : `empty`,
        'Connection' : `keep-alive`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Content-Type' : `application/json`,
        'Sec-Fetch-Site' : `same-site`,
        'Origin' : `https://personal-act.wps.cn`,
        'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,
        'token' : wps_token, 
        'Sec-Fetch-Mode' : `cors`,
        'Cookie' : wps_cookie, 
        'Referer' : `https://personal-act.wps.cn/`,
        'Host' : `personal-bus.wps.cn`,
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
        'Accept' : `application/json, text/plain, */*`
    };

    const request = { url: sign_url, method: sign_method, headers: sign_headers, body: sign_body };

    let integralBeforeSign = await getIntegral(); // 签到前先获取积分
    if (typeof integralBeforeSign === 'number') {
        $.messages.push(`💰 签到前积分: ${integralBeforeSign}`);
    } else {
        $.messages.push(`💰 签到前积分: ${integralBeforeSign}`);
    }


    $task.fetch(request).then(async response => { // 异步处理签到响应
        let data = {};
        let resultMsg = '❌ 签到失败: 响应体为空';

        try {
            data = JSON.parse(response.body);
        } catch (e) {
            resultMsg = "❌ 签到失败: 响应体解析错误";
        }
        
        if (data.code === 1000000 && data.result === "ok") {
            const reward = data.data.rewards[0];
            const rewardName = reward ? `${reward.reward_name} (${reward.num}个)` : "未知奖励";
            resultMsg = `✅ 签到成功: ${rewardName}`;
        } else if (data.result === "error" && data.msg === "has sign") {
            resultMsg = `⚠️ 签到结果: 今日已签到`;
        } else if (data.result) {
            resultMsg = `❌ 签到失败: ${data.msg || '未知错误'}`;
        }
        
        $.messages.push(resultMsg);

        // 3. 签到后再次获取积分
        let integralAfterSign = await getIntegral();
        if (typeof integralAfterSign === 'number') {
            $.messages.push(`📈 签到后积分: ${integralAfterSign}`);
            if (typeof integralBeforeSign === 'number' && integralAfterSign > integralBeforeSign) {
                $.messages.push(`✨ 积分变动: +${integralAfterSign - integralBeforeSign}`);
            }
        } else {
            $.messages.push(`📈 签到后积分: ${integralAfterSign}`);
        }

    }, reason => {
        $.messages.push(`❌ 签到失败: 网络请求错误 (${reason.error})`);
    }).finally(() => {
        // 统一推送所有消息
        $.notify($.name, $.messages[0], $.messages.slice(1).join('\n'));
        $.done();
    });
}

// 迷你 Quantumult X 环境类 (QxEnv)
function QxEnv(name) {
    return new class {
        constructor(name) {
            this.name = name;
            this.messages = [];
            this.log = (msg) => console.log(msg);
            // ***** 关键修改点：修复定时任务环境下读取持久化变量的方法 *****
            this.getdata = (key) => $prefs.valueForKey(key);
            // ************************************************************
            this.notify = (title, subtitle, body) => $notify(title, subtitle, body);
            this.done = () => $done();
        }
    }(name);
}

checkIn();