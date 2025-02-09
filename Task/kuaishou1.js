


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

const $ = API("kuaishou");
const CACHE_KEY = "ks_cookie_v4";
const COOLDOWN = 0;

if (typeof $request !== "undefined") {
  handleCookieCapture().finally($.done);
} else {
  executeCheckins().finally($.done);
}

/*********************
 * 核心逻辑函数 *
 *********************/
const $ = API("kuaishou");
const ACCOUNT_LIST_KEY = "KUAISHOU_ACCOUNTS";

if (typeof $request !== "undefined") {
  handleCookieCapture().finally($.done);
} else {
  executeCheckins().finally($.done);
}

async function handleCookieCapture() {
  if (!$request.url.includes("/rest/wd/encourage/task/list")) return;

  const cookie = $request.headers?.Cookie || $request.headers?.cookie;
  if (!cookie) return;

  try {
    const accountInfo = await getAccountInfo(cookie);
    if (!accountInfo) return;

    // 存储 Cookie
    const cookieKey = `KUAISHOU_${accountInfo.uid}_COOKIE`;
    $.setval(cookie, cookieKey);

    // 更新账号列表
    let accounts = JSON.parse($.getval(ACCOUNT_LIST_KEY) || '[]');
    if (!accounts.includes(accountInfo.uid)) {
      accounts.push(accountInfo.uid);
      $.setval(JSON.stringify(accounts), ACCOUNT_LIST_KEY);
    }

    $.notify("快手Cookie", " 捕获成功", `${accountInfo.nickname} (UID:${accountInfo.uid})`);
  } catch (e) {
    $.notify("快手Cookie", " 捕获失败", e.message);
  }
}

async function executeCheckins() {
  const accounts = JSON.parse($.getval(ACCOUNT_LIST_KEY) || '[]');
  if (accounts.length === 0) return $.notify("快手签到", " 未找到账号", "请先获取快手Cookie");

  for (const uid of accounts) {
    const cookieKey = `KUAISHOU_${uid}_COOKIE`;
    const cookie = $.getval(cookieKey);

    if (!cookie) {
      $.notify("快手签到", " Cookie丢失", `UID: ${uid} 请重新获取`);
      continue;
    }

    try {
      const currentInfo = await getAccountInfo(cookie);
      const checkinResult = await performCheckin(cookie);
      const boxResult = await openTreasureBox(cookie);

      const msg = [
        `签到状态: ${checkinResult}`,
        boxResult.success ? ` 宝箱奖励: ${boxResult.reward}金币` : ` 宝箱失败: ${boxResult.message}`,
        ` 当前金币: ${currentInfo.coin}`,
        ` 可提现金额: ${currentInfo.cash}元`
      ].join("\n");

      $.notify(`快手签到 - ${currentInfo.nickname}`, "", msg);
    } catch (e) {
      if (e.message.includes("身份验证")) {
        // 移除失效账号
        let updatedAccounts = accounts.filter(id => id !== uid);
        $.setval(JSON.stringify(updatedAccounts), ACCOUNT_LIST_KEY);
        $.notify("快手Cookie", " 登录过期", `${uid} 已移除`);
      } else {
        $.notify("快手签到", ` UID:${uid}`, e.message);
      }
    }
    await delay(2000);
  }
}


// 其他辅助函数保持不变

/*********************
 * 辅助函数优化 *
 *********************/

async function getAccountInfo(cookie) {
  const { body } = await $.get({
    url: "https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/info",
    headers: { Cookie: cookie }
  });
  
  const data = JSON.parse(body);
  if (data.result !== 1) throw new Error("账户信息获取失败");
  
  return {
    uid: data.data?.account?.uid,
    nickname: data.data?.nickname || "未知用户",
    coin: data.data?.account?.coinAmountDisplay || "0",
    cash: data.data?.account?.cashAmountDisplay || "0.00"
  };
}

async function performCheckin(cookie) {
  const { body } = await $.get({
    url: "https://encourage.kuaishou.com/rest/wd/encourage/unionTask/signIn/report",
    headers: { Cookie: cookie }
  });

  const res = JSON.parse(body);
  if (res.result === 1) return "✅ 成功";
  if (res.result === 102006) return "⏳ 已签到";
  if (res.error_code === 401) throw new Error("身份验证失败");
  throw new Error(res.error_msg || "未知错误");
}

function handleAccountError(e, acc) {
  if (e.message.includes("身份验证")) {
    const accounts = JSON.parse($.getval(CACHE_KEY)).filter(a => a.uid !== acc.uid);
    $.setval(CACHE_KEY, JSON.stringify(accounts));
    $.notify("快手Cookie", "⚠️ 登录过期", `${acc.nickname} 请重新获取`);
  } else {
    $.notify("快手签到", `❌ ${acc.nickname}`, e.message);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    done: () => $done(),
    log: message => console.log(message)
  };
}