/**
 * App : 快手极速版
 * By @yjlsx
 * 脚本功能：签到领取金币.
 * 使用方法：需要配合boxjs使用.
 * Date: 2025.08.13
 * 此脚本仅个人使用，请勿用于非法途径！
 
*⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
*/



/*********************
 * 核心逻辑函数 *
 *********************/


const isNode = typeof $request === "undefined";
const logPrefix = "💎快手极速版自动任务💎";

// 多账号用数组存储
let cookies = JSON.parse($persistentStore.read("KS_COOKIE") || "[]");

// -------------------- 抓取 Cookie --------------------
if ($request && $request.url.includes("nebula.kuaishou.com")) {
    let cookie = $request.headers["Cookie"] || $request.headers["cookie"];
    if (cookie) {
        if (!cookies.includes(cookie)) {
            cookies.push(cookie);
            $persistentStore.write(JSON.stringify(cookies), "KS_COOKIE");
            console.log(`${logPrefix} 保存新的 Cookie 成功！`);
        } else {
            console.log(`${logPrefix} Cookie 已存在`);
        }
    }
    $done({});
}

// -------------------- 主任务 --------------------
async function main() {
    if (cookies.length === 0) {
        console.log(`${logPrefix} 没有可用 Cookie，请先抓取 Cookie`);
        return;
    }

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        console.log(`\n========== 开始账号 ${i+1} ==========`);

        await getBaoXiang(cookie);
        await getFanBu(cookie);
        await getWalk(cookie);
        await getQianDao(cookie);
        await getMoney(cookie);
    }
}

// -------------------- 开宝箱 --------------------
async function getBaoXiang(cookie) {
    console.log(`${logPrefix} 开始领取宝箱`);
    let url = "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/treasureBox/report?__NS_sig3=你的_sig3&sigCatVer=1";
    let resp = await fetchPost(url, cookie);
    if (resp && resp.result === 1) {
        let count = resp.data.title.rewardCount;
        console.log(`${logPrefix} 宝箱金币: ${count}`);
    } else {
        console.log(resp?.error_msg || "宝箱领取失败");
    }
}

// -------------------- 饭补 --------------------
async function getFanBu(cookie) {
    console.log(`${logPrefix} 开始领取饭补`);
    let url = "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/dish/report?__NS_sig4=你的_sig4&sigCatVer=1";
    let resp = await fetchPost(url, cookie);
    if (resp && resp.result === 1) {
        console.log(`${logPrefix} 饭补: ${resp.data.title} 共计 ${resp.data.amount}`);
    } else {
        console.log(resp?.error_msg || "饭补领取失败");
    }
}

// -------------------- 步数兑换 --------------------
async function getWalk(cookie) {
    console.log(`${logPrefix} 开始步数兑换`);
    let url = "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/walking/detail?__NS_sig4=你的_sig4&sigCatVer=1";
    let data = {"reportCount":56060,"authorized":true,"stepDataStatus":1,"updateStepInfo":true};
    let resp = await fetchPost(url, cookie, data);
    if (resp && resp.result === 1) {
        console.log(`${logPrefix} 步数兑换信息：${JSON.stringify(resp.data.button)}`);
    } else {
        console.log(resp?.error_msg || "步数兑换失败");
    }
}

// -------------------- 签到 --------------------
async function getQianDao(cookie) {
    console.log(`${logPrefix} 开始签到`);
    let url = "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?__NS_sig3=你的_sig3&sigCatVer=1";
    let resp = await fetchGet(url, cookie);
    if (resp && resp.result === 1) {
        console.log(`${logPrefix} 签到成功: ${JSON.stringify(resp.data)}`);
    } else {
        console.log(resp?.error_msg || "签到失败");
    }
}

// -------------------- 查询现金 --------------------
async function getMoney(cookie) {
    console.log(`${logPrefix} 查询现金余额`);
    let url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo";
    let resp = await fetchGet(url, cookie);
    if (resp && resp.data) {
        console.log(`${logPrefix} 当前现金: ${resp.data.allCash}`);
    } else {
        console.log(resp?.error_msg || "查询失败");
    }
}

// -------------------- 封装 GET / POST --------------------
function fetchGet(url, cookie) {
    return new Promise(resolve => {
        $task.fetch({
            url: url,
            method: "GET",
            headers: {
                "Cookie": cookie,
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
            }
        }).then(resp => {
            resolve(JSON.parse(resp.body));
        }).catch(e => {
            console.log(`${logPrefix} 请求异常: ${e}`);
            resolve(null);
        });
    });
}

function fetchPost(url, cookie, body={}) {
    return new Promise(resolve => {
        $task.fetch({
            url: url,
            method: "POST",
            headers: {
                "Cookie": cookie,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
            },
            body: JSON.stringify(body)
        }).then(resp => {
            resolve(JSON.parse(resp.body));
        }).catch(e => {
            console.log(`${logPrefix} 请求异常: ${e}`);
            resolve(null);
        });
    });
}

// -------------------- 执行 --------------------
if (!isNode) {
    main().then(()=>{console.log(`${logPrefix} 全部任务完成`)});
}
