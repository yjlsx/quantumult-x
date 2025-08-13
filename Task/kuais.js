/*
更新时间: 2021-02-21 10:15
赞赏:快手邀请码`774010415`,农妇山泉 -> 有点咸，万分感谢;
本脚本仅适用于快手双版本签到，仅支持正式版获取多Cookie，建议使用正式版获取Cookie，点击视频页悬浮红包，或者进入设置，点击"积分兑好礼"即可;
本脚本仅在签到成功时通知;
兼容Nodejs,把获取的Cookie填入KS_TOKEN，多账号用"&"分开
*/

const $ = new Env('快手视频');
let cookieArr = [];
let ks_tokens = $.getdata('cookie_ks');
const notify = $.isNode() ? require('./sendNotify') : '';
const nebulaCash = $.getdata('cash_nebulaks') || "10";
const cashType = $.getdata('tpcash_nebula') || "ALIPAY";

let isGetCookie = typeof $request !== 'undefined';
if (isGetCookie) {
    GetCookie();
    $.done();
} else {
    if (!$.isNode() && ks_tokens.indexOf('&') == -1) {
        cookieArr.push(ks_tokens)
    } else {
        if ($.isNode()) {
            if (process.env.KS_TOKEN && process.env.KS_TOKEN.indexOf('&') > -1) {
                ks_tokens = process.env.KS_TOKEN.split('&')
            } else {
                ks_tokens = [process.env.KS_TOKEN]
            };
        } else if (!$.isNode() && ks_tokens.indexOf('&') > -1) {
            ks_tokens = ks_tokens.split('&')
        }
        Object.keys(ks_tokens).forEach((item) => {
            if (ks_tokens[item]) cookieArr.push(ks_tokens[item])
        })
    }
}

// ---------------------- 主执行 ----------------------
!(async () => {
    if (!cookieArr[0]) {
        $.msg($.name, '【提示】🉐登录快手pp获取cookie', "", { "open-url": "https://live.kuaishou.com/fission/offkwai/index?..." });
        return;
    }

    let timeZone = new Date().getTimezoneOffset() / 60;
    let timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
    let bjTime = new Date(timestamp).toLocaleString('zh', { hour12: false, timeZoneName: 'long' });
    console.log(`\n=== 脚本执行 ${bjTime} ===\n`);
    console.log(`=== 共 ${cookieArr.length} 个账号 ===`);

    for (let i = 0; i < cookieArr.length; i++) {
        if (!cookieArr[i]) continue;
        cookieVal = cookieArr[i];
        $.index = i + 1;
        console.log(`\n------------------------\n开始【快手视频账号${$.index}】\n`);

        try {
            await nebulaInfo();
            await nebulaPopup();
            await formalCenter();
            await formalSign();
            if (offici_code !== 100119) await formalinfo();
        } catch (e) {
            $.log("❌ 账号" + $.index + "执行异常: " + e);
            continue;
        }

        $.desc = `【正式版】:\n  ` + offic_info + "\n  " + offic_sign + '\n';
        $.desc += `【极速版】:\n  ` + speed_rewards + "\n  " + speed_info;

        if (offici_code == 1) {
            $.msg($.name + " 昵称:" + nickname, "", $.desc);
            if ($.isNode() && notify) await notify.sendNotify($.name + " " + nickname, $.desc);
        } else {
            $.log("~~~~~~~~~~~~~~~~~\n 昵称:" + nickname + "\n" + $.desc);
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());

// ---------------------- 核心函数 ----------------------

function formalHost(api, body) {
    return {
        url: 'https://activity.m.kuaishou.com/rest/wd/taskCenter/' + api,
        headers: {
            'Host': 'activity.m.kuaishou.com',
            'Cookie': cookieVal,
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Kwai/9.0.50.4936'
        },
        body: body
    };
}

function nebulaHost(api, body) {
    return {
        url: 'https://nebula.kuaishou.com/rest/n/nebula/' + api,
        headers: {
            'Host': 'nebula.kuaishou.com',
            'Cookie': cookieVal,
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1'
        },
        body: body
    };
}

// 正式版签到
async function formalSign() {
    return new Promise((resolve) => {
        $.post(formalHost('task/signIn', '{"bizId":29}'), (error, resp, data) => {
            try {
                let res = JSON.parse(data);
                offici_code = res.result;
                if (offici_code == 1) offic_sign = `签到结果: ✅ +${res.reward.rewardCount} 积分`;
                else offic_sign = `签到结果: ${res.error_msg}`;
            } catch (e) { $.log("formalSign 异常: " + e); }
            resolve();
        });
    });
}

// 正式版任务领取/宝箱
async function formalCenter() {
    return new Promise((resolve) => {
        $.post(formalHost('lowActive/module/list', '{"bizId":29,"configId":1}'), async (err, resp, data) => {
            try {
                let central = JSON.parse(data);
                if (central.result == 1) {
                    for (let module of central.modules) {
                        for (let task of module.tasks) {
                            if (task.status == 2 && module.moduleId == "1176") await getReward();
                            if (module.moduleId == "1749" && task.status == 4) await openbox(task.token, task.eventId);
                        }
                    }
                }
            } catch (e) { $.log("formalCenter 异常: " + e); }
            resolve();
        });
    });
}

// 正式版任务领奖
async function getReward() {
    return new Promise((resolve) => {
        $.post(formalHost('task/appStartup/reward', '{"bizId":29}'), (err, resp, data) => {
            try {
                let res = JSON.parse(data);
                if (res.rewardSuccess) $.log("获得积分: " + res.reward.rewardCount);
            } catch (e) { $.log("getReward 异常: " + e); }
            resolve();
        });
    });
}

// 正式版宝箱领取
async function openbox(token, eventId) {
    return new Promise((resolve) => {
        $.post(formalHost('task/report', `{"bizId":29,"taskToken":"${token}","eventId":"${eventId}","eventValue":1}`), (err, resp, data) => {
            try {
                let res = JSON.parse(data);
                if (res.result == 1) $.log(`宝箱领取成功: ${res.reward.rewardCount}`);
            } catch (e) { $.log("openbox 异常: " + e); }
            resolve();
        });
    });
}

// 正式版信息查询
async function formalinfo() {
    return new Promise((resolve) => {
        $.get({
            url: 'https://zt.gifshow.com/rest/zt/encourage/account/summary/withKscoinTrial?kpn=KUAISHOU&subBiz=lowActiveUserTaskEncourage',
            headers: { Cookie: cookieVal, 'Content-Type': 'application/json;charset=utf-8' }
        }, (err, resp, data) => {
            try {
                let _info = JSON.parse(data);
                if (_info.result == 1) offic_info = `积分: ${_info.data.accounts[0].displayBalance} 积分 现金: ${_info.data.accounts[1].displayBalance} 元`;
            } catch (e) { $.log("formalinfo 异常: " + e); }
            resolve();
        });
    });
}

// 极速版签到/信息
async function nebulaInfo() {
    return new Promise((resolve) => {
        $.get(nebulaHost('activity/earn/overview', null), (err, resp, data) => {
            try {
                let result = JSON.parse(data);
                if (result.result == 1) {
                    nebulacash = result.data.allCash;
                    nickname = result.data.userData.nickname;
                    speed_rewards = `积分: ${result.data.totalCoin} 积分 现金: ${nebulacash} 元`;
                }
            } catch (e) { $.log("nebulaInfo 异常: " + e); }
            resolve();
        });
    });
}

async function nebulaPopup() {
    return new Promise((resolve) => {
        $.get(nebulaHost('sign/query', null), (err, resp, data) => {
            try {
                let result = JSON.parse(data);
                if (result.result == '1') speed_info = `${result.data.nebulaSignInPopup.subTitle}, ${result.data.nebulaSignInPopup.title}`;
            } catch (e) { $.log("nebulaPopup 异常: " + e); }
            resolve();
        });
    });
}

// 极速版提现
async function nebulaWithdraw() {
    return new Promise((resolve) => {
        $.post(nebulaHost('outside/withdraw/apply', `{"channel":"${cashType}","amount":${nebulacash}}`), (err, resp, data) => {
            try {
                let result = JSON.parse(data);
                if (result.result == 1) $.log("极速版提现成功");
                else $.log("极速版提现失败: " + result.error_msg);
            } catch (e) { $.log("nebulaWithdraw 异常: " + e); }
            resolve();
        });
    });
}

// ---------------------- 获取Cookie ----------------------
function GetCookie() {
    let UA = $request.headers['User-Agent'];
    if ($request && $request.method != `OPTIONS`) {
        const cookieVal = $request.headers['Cookie'];
        if (cookieVal) {
            $.setdata(cookieVal, 'cookie_ks');
            $.msg($.name, `获取Cookie成功🎉`, ``);
        }
    }
}

// ---------------------- Env 工具 ----------------------
function Env(name, opts) {
    class Http {
        constructor(env) { this.env = env; }
        send(t, method = "GET") {
            t = typeof t === "string" ? { url: t } : t;
            let func = method === "POST" ? this.post : this.get;
            return new Promise((resolve, reject) => { func.call(this, t, (err, resp, body) => err ? reject(err) : resolve(body)) });
        }
        get(t, cb) { this.env.isNode() ? require("got")(t).then(res => cb(null, res, res.body)).catch(cb) : $task.fetch(t).then(res => cb(null, res, res.body), cb); }
        post(t, cb) { this.env.isNode() ? require("got").post(t.url, { json: JSON.parse(t.body), headers: t.headers }).then(res => cb(null, res, res.body)).catch(cb) : $task.fetch({ ...t, method: "POST" }).then(res => cb(null, res, res.body), cb); }
    }
    return new class { constructor() { this.name = name; this.http = new Http(this) } }();
}
