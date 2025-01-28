
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

// Quantumult X 重写规则
// [rewrite_local]
// https:\/\/50843\.activity\-42\.m\.duiba\.com\.cn\/signactivity\/getSignInfo url script-request-header 1905qd.js

// [task_local]
// 5 0 * * * 1905.js, tag=1905电影网签到

// 1905电影网自动签到脚本 (完整版)
// 功能：动态更新Cookie + 签到 + 积分查询 + 通知提示
const checkinURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/signResult?orderNum=355306933&_=' + Date.now();
const indexURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/index?signOperatingId=285254648573582&preview=false&_=' + Date.now();
const creditURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=' + Date.now();
const cookieKey = '1905_cookie';

async function checkIn() {
  // 步骤1: 读取并更新Cookie
  let cookie = $persistentStore.read(cookieKey) || '';
  const refreshRes = await $task.fetch({
    url: indexURL,
    method: 'GET',
    headers: baseHeaders(cookie)
  });
  cookie = updateCookie(refreshRes, cookie);

  // 步骤2: 执行签到
  const signRes = await $task.fetch({
    url: checkinURL,
    method: 'GET',
    headers: baseHeaders(cookie)
  });
  const { signSuccess, signPoints, errorMsg } = parseSignResult(signRes);

  // 步骤3: 查询积分
  const creditRes = await $task.fetch({
    url: creditURL,
    method: 'POST',
    headers: { ...baseHeaders(cookie), 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  const totalCredits = parseCreditResult(creditRes);

  // 步骤4: 弹窗提示
  showNotification(signSuccess, signPoints, totalCredits, errorMsg);
  $done();
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

function updateCookie(response, oldCookie) {
  let newCookie = oldCookie;
  if (response?.headers?.['Set-Cookie']) {
    const cookies = response.headers['Set-Cookie']
      .map(c => c.split(';')[0])
      .join('; ');
    newCookie = mergeCookies(oldCookie, cookies);
    $persistentStore.write(newCookie, cookieKey);
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
  if (!response || response.statusCode !== 200) return { signSuccess: false, errorMsg: '网络请求失败' };
  
  try {
    const data = JSON.parse(response.body);
    return {
      signSuccess: data.success,
      signPoints: data.data?.signResult || 0,
      errorMsg: data.data?.errorMsg || data.desc || '未知错误'
    };
  } catch (e) {
    return { signSuccess: false, errorMsg: '响应解析失败' };
  }
}

function parseCreditResult(response) {
  if (!response || response.statusCode !== 200) return '查询失败';
  
  try {
    const data = JSON.parse(response.body);
    return data.data?.totalCredits || data.data?.credits || '字段不匹配';
  } catch (e) {
    return '数据异常';
  }
}

function showNotification(success, points, credits, error) {
  const title = "1905电影网签到";
  let subtitle = success ? 
    `✅ 签到成功 | +${points}积分` : 
    `❌ 签到失败 | ${error}`;
  
  // 添加随机Emoji增加辨识度
  const emojis = success ? ['🎉', '🎁', '💰'] : ['⚠️', '🚨', '❓'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  subtitle = `${randomEmoji} ${subtitle}`;

  $notify(title, subtitle, `当前总积分: ${credits}`, {
    'media-url': 'https://example.com/icon.png' // 替换为实际图标URL
  });
}

/******************** 执行配置 ********************/
// 每日08:00执行 (可修改时间)


// 调试时取消注释👇
// checkIn();