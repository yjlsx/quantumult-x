


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
const COOLDOWN = 60 * 1000; // 1分钟冷却时间

// Quantumult X重写入口
if (typeof $request !== "undefined") {
  handleCookieCapture().finally($.done);
} else {
  executeCheckins().finally($.done);
}

/******************
 * 核心功能实现 *
 ******************/

async function handleCookieCapture() {
  // 验证请求URL
  if (!$request.url.includes("/rest/wd/encourage/task/list")) return;
  
  const cookie = $request.headers?.Cookie || $request.headers?.cookie;
  if (!cookie) return;

  try {
    // 获取账户信息
    const accountInfo = await getAccountInfo(cookie);
    if (!accountInfo) return;

    // 读取存储数据
    let accounts = $.getval(CACHE_KEY) || [];
    
    // 冷却检查
    const existing = accounts.find(a => a.uid === accountInfo.uid);
    if (existing && (Date.now() - existing.timestamp < COOLDOWN)) {
      $.log("⚠️ 操作过快，请1分钟后重试");
      return $.notify("快手Cookie", "⚠️ 操作过快", "请1分钟后重试");
    }

    // 更新存储
    accounts = accounts.filter(a => a.uid !== accountInfo.uid);
    accounts.push({
      uid: accountInfo.uid,
      cookie: cookie,
      nickname: accountInfo.nickname,
      timestamp: Date.now()
    });

    $.setval(accounts, CACHE_KEY);
    $.log("✅ Cookie捕获成功: " + accountInfo.nickname);
    $.notify("快手Cookie", "✅ 捕获成功", accountInfo.nickname);
  } catch (e) {
    $.log("❌ Cookie捕获失败: " + e.message);
    $.notify("快手Cookie", "❌ 捕获失败", e.message);
  }
}

async function executeCheckins() {
  const accounts = $.getval(CACHE_KEY) || [];
  if (accounts.length === 0) {
    $.log("❌ 未找到任何账号信息，请先获取快手Cookie");
    return $.notify("快手签到", "❌ 未找到账号", "请先获取快手Cookie");
  }

  for (const acc of accounts) {
    try {
      // 检查Cookie是否存在
      if (!acc.cookie) {
        $.log("❌ Cookie不存在: " + acc.nickname);
        $.notify("快手签到", "❌ Cookie不存在", `${acc.nickname} 请先获取快手Cookie`);
        continue;
      }

      // 获取最新账户信息
      const currentInfo = await getAccountInfo(acc.cookie);
      
      // 执行签到
      const result = await performCheckin(acc.cookie);
      
      // 构建通知消息
      const msg = [
        `签到状态: ${result}`,
        `💰 金币: ${currentInfo.coin}`,
        `💵 现金: ${currentInfo.cash}元`
      ].join("\n");
      
      $.log(`✅ 签到成功: ${currentInfo.nickname} - ${result}`);
      $.notify(`快手签到 - ${currentInfo.nickname}`, "", msg);
    } catch (e) {
      if (e.message.includes("身份验证")) {
        // 移除过期Cookie
        let accounts = $.getval(CACHE_KEY).filter(a => a.uid !== acc.uid);
        $.setval(accounts, CACHE_KEY);
        $.log("⚠️ 登录过期: " + acc.nickname);
        $.notify("快手Cookie", "⚠️ 登录过期", `${acc.nickname} 请重新获取`);
      } else {
        $.log(`❌ 签到失败: ${acc.nickname} - ${e.message}`);
        $.notify("快手签到", `❌ ${acc.nickname}`, e.message);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

/*********************
 * 工具函数集 *
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

/*********************
 * Quantumult X适配器 *
 *********************/
function API() {
  return {
    getval: key => $prefs.valueForKey(key),
    setval: (val, key) => $prefs.setValueForKey(val, key),
    notify: (title, subtitle, message) => $notify(title, subtitle, message),
    get: opts => $task.fetch(opts),
    done: () => $done(),
    log: message => console.log(message) // 添加日志输出
  };
}