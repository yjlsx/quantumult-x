


/**
 * App : 快手
 * By @yjlsx
 * 脚本功能：签到领取金币.
 * 使用方法：添加相关规则到quantumult x，进入首页的金币主页，提示获取cookie成功，把rewrite和hostname关闭，以免每次运行都会获取cookie.
 * Date: 2024.07.05
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
 * 快手多账号签到脚本
 * 功能特性：
 * 1. 显示实时金币和现金余额
 * 2. 自动识别多账号Cookie
 * 3. 相同账号使用最新Cookie
 * 4. 获取Cookie冷却时间控制
 */

const $ = API("kuaishou");
const CACHE_KEY = "ks_accounts_v3";
const COOLDOWN = 60 * 1000; // 1分钟冷却时间

!(async () => {
  try {
    if (typeof $request !== "undefined") {
      await handleCookieCapture();
    } else {
      await executeCheckins();
    }
  } catch (e) {
    $.notify("脚本错误", "", e.message);
  } finally {
    $.done();
  }
})();

/******************
 * 核心功能实现 *
 ******************/

async function handleCookieCapture() {
  const cookie = $request.headers?.Cookie || $request.headers?.cookie;
  if (!cookie) return;

  // 获取账户信息用于校验
  const accountInfo = await getAccountInfo(cookie);
  if (!accountInfo) return;

  // 读取历史记录
  let accounts = $.getval(CACHE_KEY) || [];
  
  // 检查冷却时间
  const lastRecord = accounts.find(a => a.uid === accountInfo.uid);
  if (lastRecord && Date.now() - lastRecord.timestamp < COOLDOWN) {
    $.notify("⚠️ 操作过快", `账号 ${accountInfo.nickname}`, "请等待1分钟后再获取");
    return;
  }

  // 更新存储
  accounts = accounts.filter(a => a.uid !== accountInfo.uid);
  accounts.push({
    ...accountInfo,
    timestamp: Date.now()
  });

  $.setval(accounts, CACHE_KEY);
  $.notify("✅ 账号更新", accountInfo.nickname, `金币: ${accountInfo.coin} 现金: ${accountInfo.cash}元`);
}

async function executeCheckins() {
  const accounts = $.getval(CACHE_KEY) || [];
  if (accounts.length === 0) return $.notify("❌ 无可用账号", "", "请先获取Cookie");

  // 按时间倒序排列
  accounts.sort((a, b) => b.timestamp - a.timestamp);

  for (const acc of accounts) {
    try {
      const result = await performCheckin(acc.cookie);
      const accountInfo = await getAccountInfo(acc.cookie);
      
      const message = `${result}\n💰 当前金币: ${accountInfo.coin}\n💵 当前现金: ${accountInfo.cash}元`;
      $.notify(`签到成功 - ${accountInfo.nickname}`, "", message);
      
      await delay(2000);
    } catch (e) {
      $.notify(`❌ 签到失败 - ${acc.nickname}`, "", e.message);
    }
  }
}

/*********************
 * 工具函数集 *
 *********************/

async function getAccountInfo(cookie) {
  try {
    const { body } = await $.get({
      url: "https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/info",
      headers: { Cookie: cookie }
    });
    const data = JSON.parse(body);
    
    return {
      uid: data.data?.account?.uid,
      nickname: data.data?.nickname || "未知用户",
      coin: data.data?.account?.coinAmountDisplay || "0",
      cash: data.data?.account?.cashAmountDisplay || "0.00"
    };
  } catch (e) {
    $.log("账户信息获取失败:", e);
    return null;
  }
}

async function performCheckin(cookie) {
  const { body } = await $.get({
    url: "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/signIn/report",
    headers: { Cookie: cookie }
  });

  const res = JSON.parse(body);
  if (res.result === 1) return "✅ 签到成功";
  if (res.result === 102006) return "⏳ 今日已签到";
  throw new Error(res.error_msg || "未知错误");
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*********************
 * Quantumult X API 适配器 *
 *********************/
function API(name) {
  return {
    getval: key => $prefs.valueForKey(key),
    setval: (val, key) => $prefs.setValueForKey(val, key),
    notify: (title, subtitle, message) => $notify(title, subtitle, message),
    get: opts => $task.fetch(opts),
    log: console.log,
    done: () => $done()
  };
}