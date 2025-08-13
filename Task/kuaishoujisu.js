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


const COOKIE_KEYS = ["ksjs_cookie_1", "ksjs_cookie_2"];
const ENABLE_KEYS = ["ksjs_enabled_1", "ksjs_enabled_2"];

let totalGold = 0;
let totalCash = 0;

async function main() {
    for (let i = 0; i < COOKIE_KEYS.length; i++) {
        let cookie = $persistentStore.read(COOKIE_KEYS[i]);
        let enabled = $persistentStore.read(ENABLE_KEYS[i]);

        if (!cookie || enabled !== "true") {
            console.log(`第 ${i + 1} 个账号未启用或 cookie 缺失，跳过`);
            continue;
        }

        console.log(`\n=== 开始处理第 ${i + 1} 个账号 ===`);

        await signIn(cookie);
        await openBox(cookie);
        await exchangeSteps(cookie);
        await getCash(cookie);
    }

    $notify("快手任务汇总", "", `总金币：${totalGold}\n总现金：${totalCash}元`);
}

// 签到
async function signIn(cookie) {
    console.log("❤ 开始签到 ❤");
    let sig = "1b0b4c7c5896f2b1d7472e444342544b54a7d200e7a3c959ee6e5454525251506f4f";
    let url = `https://nebula.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?__NS_sig3=${sig}&sigCatVer=1`;

    let headers = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": cookie
    };

    try {
        let resp = await $httpClient.get({ url, headers });
        let data = JSON.parse(resp.body);

        if (data.result == 1) {
            let award = data.data.reportRewardResult?.awardToast?.title || "签到成功";
            console.log(`签到成功: ${award}`);
        } else {
            console.log(`签到失败: ${data.error_msg}`);
        }
    } catch (e) {
        console.log(`签到异常: ${e}`);
    }
}

// 开宝箱
async function openBox(cookie) {
    console.log("💎 开始领取宝箱 💎");
    let sig = "b8a8efdfef4d7b1274e497e7e0e11fff8a39fcda6a006afa0371f7f7f1f1f2f3ccec";
    let url = `https://nebula.kuaishou.com/rest/wd/encourage/unionTask/treasureBox/report?__NS_sig3=${sig}&sigCatVer=1`;

    let headers = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": cookie,
        "Content-Type": "application/json"
    };

    try {
        let resp = await $httpClient.post({ url, headers, body: "{}" });
        let data = JSON.parse(resp.body);

        if (data.result == 1) {
            let gold = data.data.title.rewardCount;
            console.log(`宝箱获得金币：${gold}`);
            totalGold += gold;
        } else {
            console.log(`宝箱领取失败: ${data.error_msg}`);
        }
    } catch (e) {
        console.log(`宝箱异常: ${e}`);
    }
}

// 步数兑换金币
async function exchangeSteps(cookie) {
    console.log("🏃 开始步数兑换 🏃");
    let sig = "HUDR_sFnX-HFuAE5VsdPNKlLOPr4ntwVLcugxjxZz8_z61EHYFY07AGiHwMelb_ny_pMHxR_0BjgEKKQba1Uc3eSWmMYZtd0w8l4XDj-3MCjD__Ta_XvZSJ4TCB8KqqVKMgRgdptyHjC4q5WxhjlivWeuIEH73Q5s2-4u88UkwHrtgNYFpaoTLyzpjhJN-kWm8EpIT1cd-4gSarv9lyc5NYynpqIeL1p8oDC_aNVs06EqrteEDO9WQN6bPOljEgPJOUyOx2TUE6Zol22dloUXNTFoJdgLPRKfw_RHi0rq1S59Nig74-a-EOa9v636jauSe37plaPbVfAlQYO9ZR3FHGMRsQPwfpaekre0Ra5-k8MxO_S1KZimvzg8hzW00xtV2ElWK4bOQ_Jr8MgnbnxspIGrdAT7goeqm_Gr_PeS3rmTNMpgPIhHO1YIzTyVqRydZeTwh5ckgKW0moc1WndwyJqoqIh222uMxhDr_q2L_eyoTgyZuswrq7MqaDmbuEH0je0NPMrtCfeKHFlC$HE_4b541fe2ab824ca5f9900144007cc023e901070200376400000015d87fe69450a5f990019b563eda7b563e0a00";
    let url = `https://encourage.kuaishou.com/rest/wd/encourage/unionTask/walking/detail?__NS_sig4=${sig}&sigCatVer=1`;

    let headers = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": cookie,
        "Content-Type": "application/json"
    };

    try {
        let data = {
            "reportCount": 56060,
            "authorized": true,
            "stepDataStatus": 1,
            "updateStepInfo": true
        };

        let resp = await $httpClient.post({ url, headers, body: JSON.stringify(data) });
        let respData = JSON.parse(resp.body);

        if (respData.result == 1) {
            let rewardText = respData.data.button?.text || "步数兑换成功";
            console.log(rewardText);
            // 假设获得金币数量存在 walkingInfo.rewardAmount
            let walkingInfo = respData.data.walkingInfo || [];
            let gained = walkingInfo.reduce((sum, item) => sum + (item.rewarded ? 0 : item.rewardCount || 0), 0);
            console.log(`步数兑换金币：${gained}`);
            totalGold += gained;
        } else {
            console.log(`步数兑换失败: ${respData.error_msg}`);
        }
    } catch (e) {
        console.log(`步数兑换异常: ${e}`);
    }
}

// 获取现金
async function getCash(cookie) {
    console.log("💰 获取现金 💰");
    let url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo";
    let headers = {
        "User-Agent": "Mozilla/5.0",
        "Cookie": cookie
    };

    try {
        let resp = await $httpClient.get({ url, headers });
        let data = JSON.parse(resp.body);

        let money = data.data?.allCash || 0;
        console.log(`当前现金：${money}`);
        totalCash += money;
    } catch (e) {
        console.log(`获取现金异常: ${e}`);
    }
}

main().finally(() => $done());
