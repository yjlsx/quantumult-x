


/**
 * App : 快手
 * By @yjlsx
 * 脚本功能：签到领取金币.
 * 使用方法：添加相关规则到quantumult x，进入首页的金币主页，提示获取cookie成功，把rewrite和hostname关闭，以免每次运行都会获取cookie.
 * Date: 2025.02.09
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

/**
 * 快手整合脚本
 * 功能特性：
 * 1. 自动捕获Cookie与签到一体化
 * 2. 过期Cookie检测与提醒
 * 3. 多账号独立管理
 * 4. 精准通知控制
 * 5. 日志记录与调试
 */

/*********************
 * 核心逻辑函数 *
 *********************/
const $ = API("kuaishou");
const ACCOUNT_LIST_KEY = "KUAISHOU_ACCOUNTS";
const DEBUG_MODE = true; // 设为 false 关闭日志

/*********************
* 核心工具函数 *
*********************/
function debugLog(...args) {
 if (DEBUG_MODE) console.log(`[快手脚本][${new Date().toLocaleTimeString()}]`, ...args);
}

/*********************
* 主要处理逻辑 *
*********************/
async function handleCookieCapture() {
  if (!$request.url.includes("/rest/wd/encourage/task/list")) {
    $.notify("快手Cookie", " 捕获失败", "非目标请求");
    return;
  }

  const cookie = $request.headers?.Cookie || $request.headers?.cookie;
  if (!cookie) {
    $.notify("快手Cookie", " 捕获失败", "请求头缺少Cookie");
    return;
  }

  try {
    const accountInfo = await getAccountInfo(cookie);
    if (!accountInfo) {
      $.notify("快手Cookie", " 捕获失败", "账号信息获取失败");
      return;
    }

    if (!accountInfo.uid) {
      $.notify("快手Cookie", " 捕获失败", "UID解析失败");
      return;
    }

    let accounts = JSON.parse($.getval(CACHE_KEY) || '[]');
    accounts = accounts.filter(a => a.uid !== accountInfo.uid);
    
    accounts.push({
      uid: accountInfo.uid,
      cookie: cookie,
      nickname: accountInfo.nickname,
      timestamp: Date.now()
    });

    $.setval(CACHE_KEY, JSON.stringify(accounts));
    $.notify("快手Cookie", " 捕获成功", `${accountInfo.nickname} (UID:${accountInfo.uid})`);
  } catch (e) {
    $.notify("快手Cookie", " 捕获失败", e.message);
  }
}


async function executeCheckins() {
 try {
   debugLog("开始执行签到流程");
   
   const accounts = JSON.parse($.getval(ACCOUNT_LIST_KEY) || '[]');
   if (accounts.length === 0) {
     debugLog("未找到有效账号");
     return $.notify("快手签到", "❌ 未找到账号", "请先获取快手Cookie");
   }

   debugLog("发现有效账号数:", accounts.length);

   for (const uid of accounts) {
     try {
       debugLog("开始处理账号 UID:", uid);
       const cookieKey = `KUAISHOU_${uid}_COOKIE`;
       const cookie = $.getval(cookieKey);

       if (!cookie) {
         debugLog("Cookie缺失，键名:", cookieKey);
         $.notify("快手签到", "❌ Cookie丢失", `UID: ${uid} 请重新获取`);
         continue;
       }

       // 账号信息获取
       const currentInfo = await getAccountInfo(cookie);
       if (!currentInfo) {
         debugLog("账号信息获取失败");
         continue;
       }

       // 签到流程
       debugLog("开始签到操作");
       const checkinResult = await performCheckin(cookie);
       debugLog("签到结果:", checkinResult);

       // 宝箱流程
       debugLog("开始宝箱操作");
       const boxResult = await openTreasureBox(cookie);
       debugLog("宝箱结果:", boxResult);

       // 通知消息
       const msg = [
         `签到状态: ${checkinResult}`,
         boxResult.success ? `🎁 宝箱奖励: ${boxResult.reward}金币` : `❌ 宝箱失败: ${boxResult.message}`,
         `💰 当前金币: ${currentInfo.coin}`,
         `💵 可提现金额: ${currentInfo.cash}元`
       ].join("\n");
       
       $.notify(`快手签到 - ${currentInfo.nickname}`, "", msg);
     } catch (e) {
       debugLog("账号处理异常:", e);
       if (e.message.includes("身份验证")) {
         let updatedAccounts = accounts.filter(id => id !== uid);
         $.setval(JSON.stringify(updatedAccounts), ACCOUNT_LIST_KEY);
         debugLog("已移除失效账号 UID:", uid);
         $.notify("快手Cookie", "⚠️ 登录过期", `${uid} 已移除`);
       } else {
         $.notify("快手签到", `❌ UID:${uid}`, e.message);
       }
     }
     await delay(2000);
   }
 } catch (e) {
   debugLog("全局处理异常:", e);
   $.notify("快手签到", "❌ 全局错误", e.message);
 }
}

/*********************
* 功能函数 (带日志) *
*********************/
async function getAccountInfo(cookie) {
  try {
    const { body } = await $.get({
      url: "https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/info",
      headers: { Cookie: cookie }
    });

    const data = JSON.parse(body);
    if (data.result !== 1) {
      throw new Error(`账户信息获取失败: ${data.error_msg || "未知错误"}`);
    }

    const account = data.data?.account;
    if (!account) {
      throw new Error("账号数据结构异常");
    }

    if (!account.uid) {
      throw new Error("UID解析失败");
    }

    return {
      uid: account.uid,
      nickname: data.data?.nickname || "未知用户",
      coin: account.coinAmountDisplay || "0",
      cash: account.cashAmountDisplay || "0.00"
    };
  } catch (e) {
    $.notify("快手账号信息", " 获取失败", e.message);
    return null;
  }
}


async function performCheckin(cookie) {
 try {
   debugLog("开始执行签到");
   const { body } = await $.get({
     url: "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/signIn/report",
     headers: { Cookie: cookie }
   });

   debugLog("签到接口响应:", body);
   const res = JSON.parse(body);

   if (res.result === 1) return "✅ 成功";
   if (res.result === 102006) return "⏳ 已签到";
   throw new Error(res.error_msg || `错误代码: ${res.result}`);
 } catch (e) {
   debugLog("签到异常:", e);
   throw e;
 }
}

async function openTreasureBox(cookie) {
 try {
   debugLog("开始开启宝箱");
   const { body } = await $.post({
     url: "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/treasureBox/report?__NS_sig3=...",
     headers: {
       'Content-Type': 'application/json',
       'Cookie': cookie,
       'User-Agent': '...'
     },
     body: '{}'
   });

   debugLog("宝箱接口响应:", body);
   const res = JSON.parse(body);

   if (res.result === 1) {
     return {
       success: true,
       reward: res.data?.title?.rewardCount || '未知',
       boxStatus: parseBoxProgress(res.data?.progressBar)
     };
   }
   return { success: false, message: res.error_msg || '宝箱开启失败' };
 } catch (e) {
   debugLog("宝箱异常:", e);
   return { success: false, message: e.message };
 }
}

/*********************
* 辅助函数 *
*********************/
function parseBoxProgress(progressBar) {
 if (!progressBar) return [];
 return progressBar.nodes.map(node => ({
   desc: node.desc,
   status: node.remainSeconds === 0 ? '可开启' : `冷却中(${Math.floor(node.remainSeconds/60)}分钟)`,
   reward: `${node.rewardCount}${node.rewardUnit}`
 }));
}

function delay(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

/*********************
* 入口判断 *
*********************/
if (typeof $request !== "undefined") {
 handleCookieCapture().finally($.done);
} else {
 executeCheckins().finally($.done);
}

/*********************
* 平台适配器 *
*********************/
function API() {
 return {
   getval: key => $prefs.valueForKey(key),
   setval: (val, key) => $prefs.setValueForKey(val, key),
   notify: (title, subtitle, message) => $notify(title, subtitle, message),
   get: opts => $task.fetch(opts),
   post: opts => $task.fetch({ method: 'POST', ...opts }),
   done: () => $done(),
   log: message => console.log(message)
 };
}