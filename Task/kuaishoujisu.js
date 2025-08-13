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
 * 常量与环境封装 *
 *********************/
const $ = new Env();
const NOTIFY_TITLE = "快手极速版签到";

const COOKIE_KEYS = ["ksjs_cookie_1", "ksjs_cookie_2"];
const ENABLE_KEYS = ["ksjs_enabled_1", "ksjs_enabled_2"];

const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/13.7.10.3947 ISLP/0 StatusHT/47 KDT/PHONE iosSCH/0 TitleHT/44 NetType/WIFI ISDM/0 ICFO/0 locale/zh-Hans CT/0 Yoda/3.3.8 ISLB/0 CoIS/2 ISLM/0 WebViewType/WK BHT/102 AZPREFIX/az1";

const BASE = "https://nebula.kuaishou.com";
const API_PATH = {
  info: "/rest/n/nebula/activity/earn/overview/basicInfo?source=timer",
  sign: "/rest/wd/encourage/unionTask/signIn/report",
  boxInfo: "/rest/wd/encourage/unionTask/treasureBox/info",
  boxOpen: "/rest/wd/encourage/unionTask/treasureBox/open",
};

/*********************
 * 入口 *
 *********************/
if (typeof $request !== "undefined") {
  handleCookieCapture().finally(() => $.done());
} else {
  main().finally(() => $.done());
}

/*********************
 * 主流程 *
 *********************/
async function main() {
  console.log("====== 开始执行快手签到任务 ======");

  for (let i = 0; i < COOKIE_KEYS.length; i++) {
    if (!isAccountEnabled(i)) {
      console.log(`账号${i + 1} 未启用，跳过执行`);
      continue;
    }

    let cookie = $.read(COOKIE_KEYS[i]);
    if (!cookie) {
      $.notify(NOTIFY_TITLE, `账号${i + 1} Cookie未配置`, "");
      continue;
    }

    // 兼容之前可能被 encodeURIComponent 保存过的 Cookie
    if (/%[0-9A-Fa-f]{2}/.test(cookie)) {
      try { cookie = decodeURIComponent(cookie); } catch (e) {}
    }
    cookie = String(cookie).trim();

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

 console.log("尝试获取宝箱信息...");
 const boxRes = await openTreasureBox(cookie);
 if (boxRes.success) {
  console.log(`宝箱奖励: ${boxRes.reward}金币`);
 } else {
  console.log(`宝箱暂不可领取: ${boxRes.message}`);
}

  console.log("获取最新账户数据...");
  const latestInfo = await getAccountInfo(cookie);
  console.log(`当前金币: ${latestInfo.coin}`);
  console.log(`可提现金额: ${latestInfo.cash}元`);

  const msg = [
    `签到状态: ${checkinRes}`,
    boxRes.success ? `宝箱奖励: ${boxRes.reward}金币` : `宝箱失败: ${boxRes.message}`,
    `当前金币: ${latestInfo.coin}`,
    `可提现金额: ${latestInfo.cash}元`,
  ].join("\n");

  $.notify(`${NOTIFY_TITLE} - 账号${accountNum}`, initialInfo.nickname, msg);
}

/*********************
 * Cookie 捕获 *
 *********************/
function getAvailableAccountSlot() {
  for (let i = 0; i < COOKIE_KEYS.length; i++) {
    if (!$.read(COOKIE_KEYS[i])) return i + 1;
  }
  return null;
}

async function handleCookieCapture() {
  var headers = $request && $request.headers;
  var cookie = headers && (headers.Cookie || headers.cookie);
  if (!cookie) {
    console.log("未找到Cookie信息");
    return;
  }
  cookie = String(cookie).trim();

  let accountNum = getAvailableAccountSlot();
  if (!accountNum) accountNum = 1;

  $.write(cookie, COOKIE_KEYS[accountNum - 1]);
  console.log(`成功保存账号${accountNum} Cookie: ${cookie}`);
  $.notify(NOTIFY_TITLE, `✅ 账号${accountNum} Cookie保存成功`, "可在 BoxJS 中查看或修改");
}

/*********************
 * 业务接口 *
 *********************/
function ksHeaders(cookie) {
  return {
    Host: "nebula.kuaishou.com",
    Connection: "keep-alive",
    Accept: "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "User-Agent": UA,
    Referer: "https://nebula.kuaishou.com/",
    Cookie: cookie,
  };
}

async function getAccountInfo(cookie) {
  const { statusCode, body } = await $.get({
    url: BASE + API_PATH.info,
    headers: ksHeaders(cookie),
  });

  const data = safeJSON(body, "账户信息");
  ensureJSONOrThrow(statusCode, body, "账户信息");

  if (!data || data.result !== 1) {
    throw new Error((data && data.error_msg) || "账户信息获取失败");
  }

  return {
    uid: data.data?.userData?.uid || "",
    nickname: data.data?.userData?.nickname || "未知用户",
    coin: data.data?.totalCoin != null ? String(data.data.totalCoin) : "0",
    cash: data.data?.totalCash != null ? String(data.data.totalCash) : "0.00",
  };
}

async function checkIn(cookie) {
  const { statusCode, body } = await $.get({
    url: BASE + API_PATH.sign,
    headers: ksHeaders(cookie),
  });

  const res = safeJSON(body, "签到");
  ensureJSONOrThrow(statusCode, body, "签到");

  if (res && res.result === 1) return "✅ 签到成功";
  if (res && res.result === 102006) return "⏳ 已签到";
  throw new Error((res && res.error_msg) || "未知错误");
}


async function openTreasureBox(cookie) {
  const { statusCode, body } = await $.get({
    url: "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/treasureBox/report",
    headers: ksHeaders(cookie),
  });

  const res = safeJSON(body, "宝箱");
  ensureJSONOrThrow(statusCode, body, "宝箱");

  if (!res || res.result !== 1) {
    return { success: false, message: "宝箱信息获取失败" };
  }

  const data = res.data;

  // 已领取奖励
  if (data.type === 1 && data.title && data.title.rewardCount) {
    return {
      success: true,
      reward: data.title.rewardCount,
      message: "宝箱奖励已到账",
    };
  }

  // 下一个可领取宝箱
  if (data.progressBar && data.progressBar.nodes && data.progressBar.nodes.length) {
    const nextBox = data.progressBar.nodes.find(n => n.nextOpen || n.remainSeconds > 0);
    if (nextBox) {
      return {
        success: false,
        message: `下一个宝箱还需 ${nextBox.remainSeconds} 秒，可奖励 ${nextBox.rewardCount} ${nextBox.rewardUnit}`,
      };
    }
  }

  return { success: false, message: "暂无可领取宝箱" };
}


/*********************
 * 工具与容错 *
 *********************/
function isAccountEnabled(index) {
  return $.read(ENABLE_KEYS[index]) === "true";
}

function handleError(e, accountNum) {
  const msg = (e && e.message) || String(e);
  console.log(`账号${accountNum} 处理失败: ${msg}`);
  if (/登录|auth|鉴权|验证|未登录|身份|403|302/i.test(msg)) {
    $.notify(NOTIFY_TITLE, `⚠️ 账号${accountNum} Cookie失效`, "请重新获取Cookie");
    $.write("", COOKIE_KEYS[accountNum - 1]);
  } else {
    $.notify(NOTIFY_TITLE, `❌ 账号${accountNum} 执行错误`, msg);
  }
}

// 安全 JSON 解析：失败时输出前 300 字定位是 HTML/跳转还是 JSON
function safeJSON(text, tag) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.log(`【${tag}】返回非 JSON，前300字：\n${String(text).slice(0, 300)}\n`);
    return null;
  }
}

// 如果不是 2xx 或 body 不是 JSON，则抛错（触发上面的错误处理）
function ensureJSONOrThrow(status, body, tag) {
  if (!(status >= 200 && status < 300)) {
    throw new Error(`HTTP ${status}（${tag}）`);
  }
  if (typeof body !== "string" || !/^{|\[/.test(String(body).trim())) {
    throw new Error(`${tag}返回不是 JSON，可能未带上 App UA 或 Cookie 失效`);
  }
}

/*********************
 * Quantumult X API 适配器 *
 *********************/
function Env() {
  return {
    read: (key) => $prefs.valueForKey(key),
    write: (val, key) => $prefs.setValueForKey(val, key),
    notify: (title, subtitle, message) => $notify(title, subtitle, message),
    get: (opts) => $task.fetch({ method: "GET", ...opts }),
    post: (opts) => $task.fetch({ method: "POST", ...opts }),
    wait: (ms) => new Promise((r) => setTimeout(r, ms)),
    done: () => $done(),
  };
}
