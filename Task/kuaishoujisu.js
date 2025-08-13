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
const $ = new API();
const NOTIFY_TITLE = "快手极速版签到";
const COOKIE_KEYS = ["ksjs_cookie_1", "ksjs_cookie_2"];
const ENABLE_KEYS = ["ksjs_enabled_1", "ksjs_enabled_2"];

if (typeof $request !== 'undefined') {
  handleCookieCapture().finally(() => $.done());
} else {
  main().finally(() => $.done());
}

async function main() {
  console.log("====== 开始执行快手签到任务 ======");

  for (let i = 0; i < 2; i++) {
    if (!isAccountEnabled(i)) {
      console.log(`账号${i + 1} 未启用，跳过执行`);
      continue;
    }

    const cookie = $.read(COOKIE_KEYS[i]);
    if (!cookie) {
      $.notify(NOTIFY_TITLE, `账号${i + 1} Cookie未配置`, "");
      continue;
    }

    try {
      console.log(`\n===== 开始处理账号${i + 1} =====`);
      await processAccount(cookie, i + 1);
      await $.wait(2000);
    } catch (e) {
      handleError(e, i + 1);
    }
  }
}

async function processAccount(cookie, accountNum) {
  console.log("获取用户信息...");
  const initialInfo = await getAccountInfo(cookie);
  console.log(`用户昵称: ${initialInfo.nickname}`);

  console.log("执行签到任务...");
  const checkinRes = await checkIn(cookie);
  console.log(`签到结果: ${checkinRes}`);

  console.log("尝试开启宝箱...");
  const boxRes = await openTreasureBox(cookie);
  console.log(boxRes.success
    ? `宝箱奖励: ${boxRes.reward}金币`
    : `宝箱开启失败: ${boxRes.message}`);

  console.log("获取最新账户数据...");
  const latestInfo = await getAccountInfo(cookie);
  console.log(`当前金币: ${latestInfo.coin}`);
  console.log(`可提现金额: ${latestInfo.cash}元`);

  const msg = [
    `签到状态: ${checkinRes}`,
    boxRes.success ? `宝箱奖励: ${boxRes.reward}金币` : `宝箱失败: ${boxRes.message}`,
    `当前金币: ${latestInfo.coin}`,
    `可提现金额: ${latestInfo.cash}元`
  ].join("\n");

  $.notify(`${NOTIFY_TITLE} - 账号${accountNum}`, initialInfo.nickname, msg);
}

async function handleCookieCapture() {
  if (!$request.url.includes("/rest/n/nebula/activity/earn")) return;

  const cookie = $request.headers?.Cookie || $request.headers?.cookie;
  if (!cookie) {
    console.log("未找到Cookie信息");
    return;
  }

  console.log("捕获到原始Cookie:", cookie);

  try {
    const accountInfo = await getAccountInfo(cookie);
    const accountNum = getAvailableAccountSlot();

    if (accountNum) {
      $.write(cookie, COOKIE_KEYS[accountNum - 1]);
      console.log(`成功保存账号${accountNum} Cookie`);
      $.notify(NOTIFY_TITLE, `✅ 账号${accountNum} Cookie保存成功`, accountInfo.nickname);
    } else {
      console.log("账号槽位已满，请先禁用旧账号");
      $.notify(NOTIFY_TITLE, "❌ Cookie保存失败", "账号槽位已满");
    }
  } catch (e) {
    console.log("捕获 Cookie 返回内容可能非 JSON，捕获失败");
    $.notify(NOTIFY_TITLE, "❌ Cookie捕获失败", e.message);
  }
}

/*********************
* 工具函数 *
*********************/
async function getAccountInfo(cookie) {
  const { body } = await $.get({
    url: "https://nebula.kuaishou.com/rest/wd/encourage/account/withdraw/info",
    headers: { Cookie: cookie }
  });

  let data;
  try {
    data = JSON.parse(body);
  } catch {
    console.log("返回内容非 JSON:", body);
    throw new Error("JSON解析失败，Cookie可能无效");
  }

  if (data.result !== 1) throw new Error("账户信息获取失败");

  return {
    uid: data.data?.account?.uid,
    nickname: data.data?.nickname || "未知用户",
    coin: data.data?.account?.coinAmountDisplay || "0",
    cash: data.data?.account?.cashAmountDisplay || "0.00"
  };
}

async function checkIn(cookie) {
  const { body } = await $.get({
    url: "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/signIn/report",
    headers: { Cookie: cookie }
  });

  let res;
  try {
    res = JSON.parse(body);
  } catch {
    console.log("签到返回非 JSON:", body);
    throw new Error("JSON解析失败，Cookie可能无效");
  }

  if (res.result === 1) return "✅ 签到成功";
  if (res.result === 102006) return "⏳ 已签到";
  throw new Error(res.error_msg || "未知错误");
}

async function openTreasureBox(cookie) {
  const url = `https://nebula.kuaishou.com/rest/wd/encourage/unionTask/treasureBox/info`;

  const { body } = await $.get({
    url,
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/13.7.10.3947 ISLP/0 StatusHT/47 KDT/PHONE iosSCH/0 TitleHT/44 NetType/WIFI ISDM/0 ICFO/0 locale/zh-Hans CT/0'
    }
  });

  let res;
  try {
    res = JSON.parse(body);
  } catch {
    console.log("宝箱返回非 JSON:", body);
    return { success: false, message: "宝箱返回解析失败" };
  }

  if (res.result === 1) {
    return {
      success: true,
      reward: res.data?.rewardCount || '未知',
      message: '宝箱开启成功'
    };
  }
  return { success: false, message: res.error_msg || '宝箱开启失败' };
}

function getAvailableAccountSlot() {
  for (let i = 0; i < 2; i++) {
    if (!$.read(COOKIE_KEYS[i])) return i + 1;
  }
  return null;
}

function isAccountEnabled(index) {
  return $.read(ENABLE_KEYS[index]) === 'true';
}

function handleError(e, accountNum) {
  console.log(`账号${accountNum} 处理失败: ${e.message}`);
  if (e.message.includes("身份验证")) {
    $.notify(NOTIFY_TITLE, `⚠️ 账号${accountNum} Cookie失效`, "请重新获取Cookie");
    $.write('', COOKIE_KEYS[accountNum - 1]);
  } else {
    $.notify(NOTIFY_TITLE, `❌ 账号${accountNum} 执行错误`, e.message);
  }
}

/*********************
* Quantumult X API适配器 *
*********************/
function API() {
  return {
    read: key => $prefs.valueForKey(key),
    write: (val, key) => $prefs.setValueForKey(val, key),
    notify: (title, subtitle, message) => $notify(title, subtitle, message),
    get: opts => $task.fetch(opts),
    post: opts => $task.fetch({ method: 'POST', ...opts }),
    wait: ms => new Promise(resolve => setTimeout(resolve, ms)),
    done: () => $done()
  };
}
