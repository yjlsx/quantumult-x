
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

// Quantumult X 重写规则
// [rewrite_local]
// https:\/\/50843\.activity\-42\.m\.duiba\.com\.cn\/signactivity\/getSignInfo url script-request-header 1905qd.js

// [task_local]
// 5 0 * * * 1905.js, tag=1905电影网签到


// 1905电影网自动签到脚本 (改进版)
// 功能：动态更新Cookie + 签到 + 积分查询 + 通知提示 + Cookie过期提醒
const checkinURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/signResult?orderNum=355306933&_=' + Date.now();
const indexURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/index?signOperatingId=285254648573582&preview=false&_=' + Date.now();
const creditURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=' + Date.now();
const cookieKey = '1905_cookie';
const cookieUpdateURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getProjectUserInfo'; // 新的 Cookie 抓取地址

async function checkIn() {
  console.log('🚀 开始签到脚本');

  try {
    // 步骤 1: 读取并检查 Cookie 是否存在
    console.log('🔍 [步骤 1] 获取 Cookie');
    let cookie = $prefs.valueForKey(cookieKey);
    if (!cookie) {
      console.log('❌ 未找到 Cookie');
      showNotification(false, 0, 0, '未找到 Cookie，请重新登录');
      $done();
      return; // 终止脚本执行
    }
    console.log(`当前 Cookie: ${cookie}`);

    // 步骤 2: 访问新的 Cookie 抓取地址以更新 Cookie
    console.log('🔄 [步骤 2] 访问新的 Cookie 抓取地址');
    const cookieUpdateRes = await $httpClient.get({ url: cookieUpdateURL, headers: baseHeaders(cookie) });
    console.log('✅ [步骤 2] Cookie 抓取请求完成');

    // 检查 Cookie 是否过期
    if (isCookieExpired(cookieUpdateRes)) {
      console.log('❌ Cookie 已过期');
      showNotification(false, 0, 0, 'Cookie 已过期，请重新登录');
      return; // 终止脚本执行
    }

    // 更新 Cookie
    cookie = updateCookie(cookieUpdateRes, cookie);
    console.log(`更新后的 Cookie: ${cookie}`);

    // 步骤 3: 执行签到
    console.log('📝 [步骤 3] 执行签到');
    const signRes = await $httpClient.get({ url: checkinURL, headers: baseHeaders(cookie) });
    console.log('✅ [步骤 3] 签到请求完成');
    const { signSuccess, signPoints, errorMsg } = parseSignResult(signRes);
    console.log(`签到结果: 成功=${signSuccess}, 积分=${signPoints}, 错误信息=${errorMsg}`);

    // 步骤 4: 查询积分
    console.log('📊 [步骤 4] 查询总积分');
    const creditRes = await $httpClient.post({ url: creditURL, headers: { ...baseHeaders(cookie), 'Content-Type': 'application/x-www-form-urlencoded' } });
    console.log('✅ [步骤 4] 查询积分请求完成');
    const totalCredits = parseCreditResult(creditRes);
    console.log(`总积分: ${totalCredits}`);

    // 步骤 5: 弹窗提示
    console.log('🔔 [步骤 5] 发送通知');
    showNotification(signSuccess, signPoints, totalCredits, errorMsg);

  } catch (error) {
    console.log('❌ 脚本运行错误:', error.message || error);
    $notification.post("1905电影网签到", "❌ 签到失败", `错误信息: ${error.message || error}`);
  } finally {
    console.log('🎉 脚本执行完成');
    $done();
  }
}

/******************** 工具函数 ********************/
function baseHeaders(cookie) {
  return {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
    'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1',
    'Host': '50843.activity-42.m.duiba.com.cn'
  };
}

function isCookieExpired(response) {
  // 检查响应状态码或内容是否表明 Cookie 过期
  if (response.status === 401 || response.status === 403) {
    return true; // 状态码表示未授权或禁止访问
  }
  try {
    const data = JSON.parse(response.body);
    if (data.code === 'COOKIE_EXPIRED' || data.message?.includes('未登录')) {
      return true; // 响应内容表明 Cookie 过期
    }
  } catch (e) {
    console.log('❌ 解析响应失败:', e.message);
  }
  return false;
}

function updateCookie(response, oldCookie) {
  console.log('📦 解析 Cookie');
  let newCookie = oldCookie || '';
  if (response?.headers?.['Set-Cookie']) {
    const cookies = response.headers['Set-Cookie']
      .map(c => c.split(';')[0])
      .join('; ');
    newCookie = mergeCookies(oldCookie, cookies);
    $prefs.setValueForKey(newCookie, cookieKey);
    console.log('✅ Cookie 更新完成');
  }
  return newCookie;
}

function mergeCookies(oldStr, newStr) {
  const map = {};
  oldStr.split('; ').forEach(pair => {
    const [k, v] = pair.split('=');
    if (k) map[k] = v;
  });
  newStr.split('; ').forEach(pair => {
    const [k, v] = pair.split('=');
    if (k) map[k] = v;
  });
  return Object.entries(map).map(([k, v]) => `${k}=${v}`).join('; ');
}

function parseSignResult(response) {
  console.log('📖 解析签到结果');
  if (!response || response.status !== 200) return { signSuccess: false, errorMsg: '网络请求失败' };

  try {
    const data = JSON.parse(response.body);
    return {
      signSuccess: !!data.success,
      signPoints: data.data?.signResult || 0,
      errorMsg: data.data?.errorMsg || data.desc || '未知错误'
    };
  } catch (e) {
    console.log('❌ 解析签到结果失败:', e.message);
    return { signSuccess: false, errorMsg: '响应解析失败' };
  }
}

function parseCreditResult(response) {
  console.log('📖 解析积分结果');
  if (!response || response.status !== 200) return '查询失败';

  try {
    const data = JSON.parse(response.body);
    return data.data?.totalCredits || data.data?.credits || '字段不匹配';
  } catch (e) {
    console.log('❌ 解析积分结果失败:', e.message);
    return '数据异常';
  }
}

function showNotification(success, points, credits, error) {
  console.log('🔔 准备发送通知');
  const title = "1905电影网签到";
  let subtitle = success ?
    `✅ 签到成功 | +${points}积分` :
    `❌ 签到失败 | ${error}`;

  const emojis = success ? ['🎉', '🎁', '💰'] : ['⚠️', '🚨', '❓'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  subtitle = `${randomEmoji} ${subtitle}`;

  $notification.post(title, subtitle, `当前总积分: ${credits}`);
}

/******************** 执行脚本 ********************/
checkIn();