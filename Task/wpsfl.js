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

// --- 工具函数 ---

/** 获取今天的日期，格式为 YYYY-MM-DD */
function getTodayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/** 延迟函数 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- 模式 A: 抓包逻辑 (用于重写) ---

function wpsCatch() {
    const url = $request.url;
    const method = $request.method;
    const body = $request.body;
    const headers = $request.headers;
    
    // 仅处理 POST 请求
    if (method !== 'POST') {
        $done({});
        return;
    }
    
    const cookie = headers['Cookie'] || headers['cookie'];
    if (!cookie || cookie.length < 50) {
        $notify('WPS 抓包失败', '未捕获到有效的 Cookie', '请检查 MitM 和重写是否开启。');
        $done({});
        return;
    }

    try {
        const jsonBody = JSON.parse(body);
        const action = jsonBody.component_action;
        
        // 1. 统一保存 Cookie，并尝试保存签到参数
        if (action === 'fragment_collect.sign_in') {
            const ACTIVITY_NUMBER = jsonBody.component_uniq_number.activity_number;
            const PAGE_NUMBER = jsonBody.component_uniq_number.page_number;
            const SIGN_COMPONENT_NUMBER = jsonBody.component_uniq_number.component_number;
            const SIGN_COMPONENT_NODE_ID = jsonBody.component_uniq_number.component_node_id;
            const SERIES_ID = jsonBody.fragment_collect.series_id;
            
            // 保存到 QX 存储
            $prefs.setValueForKey(cookie, 'WPS_COOKIE');
            $prefs.setValueForKey(ACTIVITY_NUMBER, 'WPS_ACTIVITY_NUMBER');
            $prefs.setValueForKey(PAGE_NUMBER, 'WPS_PAGE_NUMBER');
            $prefs.setValueForKey(SIGN_COMPONENT_NUMBER, 'WPS_SIGN_COMPONENT_NUMBER');
            $prefs.setValueForKey(SIGN_COMPONENT_NODE_ID, 'WPS_SIGN_COMPONENT_NODE_ID');
            $prefs.setValueForKey(SERIES_ID, 'WPS_SERIES_ID');

            $notify('WPS 签到参数捕获成功 ✅', 'Cookie 和签到ID已保存到本地存储', '请记得手动执行一次抽奖请求，并禁用此重写规则！');
            console.log('WPS 签到参数捕获成功并保存:', { ACTIVITY_NUMBER, SIGN_COMPONENT_NUMBER });

        } 
        
        // 2. 尝试保存抽奖参数
        else if (action === 'lottery_v2.exec') {
            const LOTTERY_COMPONENT_NUMBER = jsonBody.component_uniq_number.component_number;
            const LOTTERY_COMPONENT_NODE_ID = jsonBody.component_uniq_number.component_node_id;
            const LOTTERY_SESSION_ID = jsonBody.lottery_v2.session_id;

            $prefs.setValueForKey(LOTTERY_COMPONENT_NUMBER, 'WPS_LOTTERY_COMPONENT_NUMBER');
            $prefs.setValueForKey(LOTTERY_COMPONENT_NODE_ID, 'WPS_LOTTERY_COMPONENT_NODE_ID');
            $prefs.setValueForKey(LOTTERY_SESSION_ID.toString(), 'WPS_LOTTERY_SESSION_ID');
            
            $notify('WPS 抽奖参数捕获成功 🎉', '抽奖 ID 已保存到本地存储', '可以禁用抓包重写，并运行定时任务脚本了。');
            console.log('WPS 抽奖参数捕获成功并保存:', { LOTTERY_COMPONENT_NUMBER, LOTTERY_SESSION_ID });
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

    // --- 读取存储参数 ---
    const WPS_COOKIE = $prefs.valueForKey('WPS_COOKIE');
    const ACTIVITY_NUMBER = $prefs.valueForKey('WPS_ACTIVITY_NUMBER');
    const PAGE_NUMBER = $prefs.valueForKey('WPS_PAGE_NUMBER');
    const SIGN_COMPONENT_NUMBER = $prefs.valueForKey('WPS_SIGN_COMPONENT_NUMBER');
    const SIGN_COMPONENT_NODE_ID = $prefs.valueForKey('WPS_SIGN_COMPONENT_NODE_ID');
    const SERIES_ID = $prefs.valueForKey('WPS_SERIES_ID');

    const LOTTERY_COMPONENT_NUMBER = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NUMBER'); 
    const LOTTERY_COMPONENT_NODE_ID = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NODE_ID'); 
    const LOTTERY_SESSION_ID = $prefs.valueForKey('WPS_LOTTERY_SESSION_ID'); 
    
    // 检查关键参数是否已成功获取
    if (!WPS_COOKIE || !ACTIVITY_NUMBER || !SIGN_COMPONENT_NUMBER || !LOTTERY_COMPONENT_NUMBER) {
        $notify(NOTIFY_TITLE, '运行中止 🛑', `关键参数缺失。请先启用重写规则，手动签到和抽奖以抓取参数！`);
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
            'Cookie': WPS_COOKIE, 
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
                return JSON.parse(response.body);
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
            "sign_date": today, 
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
                "session_id": parseInt(LOTTERY_SESSION_ID)
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

// QX 会通过 $request 判断是否是重写模式
if (typeof $request !== 'undefined') {
    wpsCatch();
} else {
    // 否则是定时任务模式
    wpsTask();
}