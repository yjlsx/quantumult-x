/*
 * WPS 福利中心 QX 任务和抓包整合脚本 (wps_task_and_catch.js)
 * * 模式 A (重写): 捕获签到/抽奖请求参数，并保存到 QX 存储。
 * 模式 B (定时任务): 读取存储参数，执行每日签到和抽奖。
[rewrite_local]
# ⚠️ 注意：运行成功获取参数后，请禁用此规则！
^https:\/\/personal-act\.wps\.cn\/activity-rubik\/activity\/component_action url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsfl.js

[mitm]
hostname = personal-act.wps.cn, *.wps.cn

[task_local]
# 每天定时运行签到和抽奖任务 (例如：早上 8 点 30 分)
30 8 * * * wps_https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsfl.js, tag=WPS签到抽奖 (自动)


 */

const BASE_URL = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
const NOTIFY_TITLE = '🏆 WPS 福利中心任务';

// --- 固定的活动 ID，直接引用初始请求中的不变值 ---
const ACTIVITY_NUMBER = 'HD2025031721339450'; 
const PAGE_NUMBER = 'YM2025041115554241';
const SERIES_ID = 'EyDfq2n_8w7o42JDEzUWXKcIWc3pJaZx'; 
const LOTTERY_SESSION_ID = 3001; 

// --- 工具函数 ---

function getTodayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- 模式 A: 抓包逻辑 (用于重写) ---

function wpsCatch() {
    const method = $request.method;
    const body = $request.body;
    
    if (method !== 'POST') {
        $done({});
        return;
    }
    
    const headers = $request.headers;
    // 确保从 Headers 中获取 Cookie
    const cookie = headers['Cookie'] || headers['cookie'];
    
    if (!cookie || cookie.length < 50) {
        $notify('WPS 抓包失败', '未捕获到有效的 Cookie', '请检查 MitM 和重写是否开启。');
        $done({});
        return;
    }

    try {
        const jsonBody = JSON.parse(body);
        const action = jsonBody.component_action;
        
        // 统一保存最新 Cookie
        $prefs.setValueForKey(cookie, 'WPS_COOKIE');

        if (action === 'fragment_collect.sign_in') {
            
            // 抓取并保存签到组件 ID
            $prefs.setValueForKey(jsonBody.component_uniq_number.component_number, 'WPS_SIGN_COMPONENT_NUMBER');
            $prefs.setValueForKey(jsonBody.component_uniq_number.component_node_id, 'WPS_SIGN_COMPONENT_NODE_ID');
            // 虽然是固定ID，但为了确认它们在请求中出现，也可以保存一次，但这里我们直接使用上面的常量

            $notify('WPS 签到参数捕获成功 ✅', 'Cookie 和签到ID已保存', '请手动执行一次抽奖请求，并禁用此重写规则！');
            console.log('WPS 签到参数捕获成功并保存。');

        } else if (action === 'lottery_v2.exec') {
            
            // 抓取并保存抽奖组件 ID
            $prefs.setValueForKey(jsonBody.component_uniq_number.component_number, 'WPS_LOTTERY_COMPONENT_NUMBER');
            $prefs.setValueForKey(jsonBody.component_uniq_number.component_node_id, 'WPS_LOTTERY_COMPONENT_NODE_ID');
            // 抓取并保存抽奖 session_id (虽然是固定值，但以防万一)
            $prefs.setValueForKey(jsonBody.lottery_v2.session_id.toString(), 'WPS_LOTTERY_SESSION_ID');
            
            $notify('WPS 抽奖参数捕获成功 🎉', '抽奖 ID 已保存', '现在可以禁用抓包重写，运行定时任务了。');
            console.log('WPS 抽奖参数捕获成功并保存。');
        }
        
    } catch (e) {
        $notify('WPS 参数捕获失败', '解析 Body 时出错或参数缺失', e.message);
        console.log('WPS Body 解析失败:', e);
    }

    $done({});
}

// --- 模式 B: 任务执行逻辑 (用于定时任务) ---

async function wpsTask() {
    let notify_body = '';

    // --- 从存储中读取所有动态/必要的参数 ---
    const WPS_COOKIE = $prefs.valueForKey('WPS_COOKIE');
    const SIGN_COMPONENT_NUMBER = $prefs.valueForKey('WPS_SIGN_COMPONENT_NUMBER');
    const SIGN_COMPONENT_NODE_ID = $prefs.valueForKey('WPS_SIGN_COMPONENT_NODE_ID');
    const LOTTERY_COMPONENT_NUMBER = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NUMBER'); 
    const LOTTERY_COMPONENT_NODE_ID = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NODE_ID'); 
    
    // 检查关键参数是否已存储
    if (!WPS_COOKIE || !SIGN_COMPONENT_NUMBER || !LOTTERY_COMPONENT_NUMBER) {
        $notify(NOTIFY_TITLE, '运行中止 🛑', `关键参数缺失或 Cookie 失效。请先启用重写规则，手动签到和抽奖以重新抓取参数！`);
        $done();
        return;
    }

    /** 执行请求核心函数 (在任务模式下定义) */
    async function executeRequest(component_action, body) {
        const headers = {
            'Accept-Encoding': `gzip, deflate, br`,
            'Content-Type': `application/json`,
            'Origin': `https://personal-act.wps.cn`,
            'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,
            'Cookie': WPS_COOKIE, // 从存储中读取 Cookie
            'Host': `personal-act.wps.cn`,
            'Referer': `https://personal-act.wps.cn/rubik2/portal/${ACTIVITY_NUMBER}/${PAGE_NUMBER}?cs_from=&position=pc_flzx_wpssqbanner`,
            'Accept': `application/json, text/plain, */*`
        };

        const myRequest = {
            url: BASE_URL,
            method: 'POST',
            headers: headers,
            body: body
        };

        try {
            const response = await $task.fetch(myRequest);
            if (response.statusCode === 200) {
                const resJson = JSON.parse(response.body);
                // 检查 Cookie 是否过期
                if (resJson.result === 'error' && resJson.msg.includes('user not login')) {
                    $notify(NOTIFY_TITLE, '❌ 任务失败', 'Cookie 已过期，请重新抓包更新！');
                    return null;
                }
                return resJson;
            } else {
                notify_body += `\n- ${component_action.includes('sign_in') ? '签到' : '抽奖'}：请求失败! (状态码${response.statusCode})`;
                return null;
            }
        } catch (reason) {
            notify_body += `\n- ${component_action.includes('sign_in') ? '签到' : '抽奖'}：请求异常! (${reason.error})`;
            return null;
        }
    }

    // --- 签到任务 ---
    const today = getTodayDate();
    const signBody = JSON.stringify({
        "component_uniq_number": {
            "activity_number": ACTIVITY_NUMBER,
            "page_number": PAGE_NUMBER,
            "component_number": SIGN_COMPONENT_NUMBER,
            "component_node_id": SIGN_COMPONENT_NODE_ID
        },
        "component_type": 42,
        "component_action": "fragment_collect.sign_in",
        "fragment_collect": {
            "sign_date": today, // 动态日期
            "series_id": SERIES_ID,
            "is_new_sign_series": false
        }
    });

    let signResult = false;
    const signRes = await executeRequest('fragment_collect.sign_in', signBody);

    if (signRes) {
        if (signRes.result === 'ok' && signRes.data?.fragment_collect?.success === true) {
            notify_body += '\n- ✅ **签到**：成功！';
            signResult = true;
        } else if (signRes.result === 'error' && signRes.msg.includes('signed in today')) {
            notify_body += '\n- ⚠️ **签到**：今日已重复签到。';
            signResult = true;
        } else {
            const msg = signRes.msg || '未知错误';
            notify_body += `\n- ❌ **签到**：失败！原因: ${msg}`;
        }
    }

    // --- 抽奖任务 ---
    if (signResult) {
        await sleep(1000); 

        const lotteryBody = JSON.stringify({
            "component_uniq_number": {
                "activity_number": ACTIVITY_NUMBER,
                "page_number": PAGE_NUMBER,
                "component_number": LOTTERY_COMPONENT_NUMBER,
                "component_node_id": LOTTERY_COMPONENT_NODE_ID,
                "filter_params": {
                    "cs_from": "",
                    "position": "pc_flzx_wpssqbanner"
                }
            },
            "component_type": 45,
            "component_action": "lottery_v2.exec",
            "lottery_v2": {
                "session_id": LOTTERY_SESSION_ID
            }
        });

        const lotteryRes = await executeRequest('lottery_v2.exec', lotteryBody);

        if (lotteryRes) {
            if (lotteryRes.result === 'ok' && lotteryRes.data?.lottery_v2?.success === true) {
                const rewardName = lotteryRes.data.lottery_v2.reward_name || '未知奖励';
                notify_body += `\n- 🎁 **抽奖**：成功！获得 ${rewardName}`;
            } else {
                const msg = lotteryRes.msg || '未知错误';
                notify_body += `\n- ❌ **抽奖**：失败！原因: ${msg}`;
            }
        }
    } else {
        notify_body += '\n- ⚠️ **抽奖**：未执行 (签到未成功)';
    }

    // 发送最终通知
    $notify(NOTIFY_TITLE, '任务执行完毕', notify_body.trim());
    $done();
}

// --- 脚本入口 ---
// QX 通过 $request 判断是否为重写模式
if (typeof $request !== 'undefined') {
    wpsCatch();
} else {
    // 定时任务模式
    wpsTask();
}
