
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

// Quantumult X 重写规则
// [rewrite_local]
// https:\/\/50843\.activity\-42\.m\.duiba\.com\.cn\/signactivity\/getSignInfo url script-request-header 1905qd.js

// [task_local]
// 5 0 * * * 1905.js, tag=1905电影网签到


// 1905电影网自动签到脚本 (Quantumult X兼容版)
// 更新时间：2024年1月15日
// 保留原始通知样式版

// ================== 配置区 ==================
const checkinURL = 'https://50843.activity-42.m.duiba.com.cn/sign/component/signResult?orderNum=355306933&_=';
const creditURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getCredits?_=';
const cookieKey = '1905_cookie';
const cookieUpdateURL = 'https://50843.activity-42.m.duiba.com.cn/ctool/getProjectUserInfo';
const maxRetries = 1;

// ================== 通知样式保持原始版本 ==================
function showNotification(success, points, credits, error) {
  const title = success ? "🎬 1905签到成功" : "🎬 1905签到失败";
  const subtitle = success ? `获得积分：+${points}` : `原因：${error}`;
  const content = `当前积分：${credits}`;

  if (typeof $notification !== 'undefined') {
    $notification.post(title, subtitle, content);
  } else if (typeof $notify !== 'undefined') {
    $notify(title, subtitle, content);
  }
}

// ================== 日志增强但保持通知不变 ==================
async function checkIn(retryCount = 0) {
  console.log(`➡️ 开始执行签到（第${retryCount + 1}次尝试）`);
  
  try {
    // Cookie处理流程
    const cookie = await handleCookie();
    if (!cookie) return;

    // 执行签到
    const signData = await doSign(cookie);
    
    // 重试逻辑
    if (needRetry(signData) && retryCount < maxRetries) {
      console.log(`↩️ 触发重试：${signData.error}`);
      await sleep(1500);
      return checkIn(retryCount + 1);
    }

    // 获取积分
    const credits = await getCredits(cookie);

    // 保持原始通知格式
    showNotification(
      signData.success,
      signData.points || 0,
      credits,
      signData.error || '未知错误'
    );

  } catch (error) {
    console.log(`❗ 异常：${error.message}`);
    if (retryCount < maxRetries) {
      await sleep(1500);
      return checkIn(retryCount + 1);
    }
    showNotification(false, 0, 0, error.message);
  } finally {
    $done();
  }
}

// ================== 其他功能保持不变 ==================
// [原handleCookie、doSign、getCredits等函数保持不变]
// [Cookie自动捕获功能保持不变]
// [日志系统保持增强状态]

/*
Quantumult X 配置示例：
1. 定时任务配置：
[task_local]
0 9 * * * https://example.com/1905checkin.js, tag=1905签到, enabled=true

2. Cookie捕获规则：
[rewrite_local]
^https:\/\/50843\.activity-42\.m\.duiba\.com\.cn\/ctool\/getProjectUserInfo url script-response-body https://example.com/1905checkin.js

修改说明：
1. 完全保留原始通知样式：
   - 标题格式："🎬 1905签到成功/失败"
   - 副标题显示积分或错误原因
   - 内容仅显示当前积分

2. 日志系统仍然包含：
   - 执行步骤追踪
   - 错误详情记录
   - 重试状态监控

3. 移除了所有测试通知相关代码
4. 确保环境信息不出现在最终通知中
*/

// ================== 工具函数 ==================
function baseHeaders(cookie) {
  return {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 M1905/6.6.12.1249 (Open 0.1) From 1905 App',
    'Referer': 'https://50843.activity-42.m.duiba.com.cn/sign/component/page?signOperatingId=285254648573582&from=login&spm=50843.1.1.1',
    'X-Requested-With': 'XMLHttpRequest'
  };
}

function parseJSON(json, keyPaths) {
  try {
    const data = JSON.parse(json);
    const result = {};
    for (const [key, paths] of Object.entries(keyPaths)) {
      result[key] = paths.reduce((val, path) => val || getPath(data, path), null);
    }
    return result;
  } catch (e) {
    console.log('❌ JSON解析失败:', e.message);
    return {};
  }
}

function getPath(obj, path) {
  return path.split('.').reduce((o, p) => o?.[p], obj);
}

function isCookieInvalid(body) {
  return body.includes('NEED_LOGIN') || body.includes('未登录');
}

function updateCookie(response, oldCookie) {
  const newCookies = response.headers['Set-Cookie'] || [];
  return newCookies
    .map(c => c.split(';')[0])
    .reduce((acc, cur) => {
      const [key, val] = cur.split('=');
      return key ? acc.replace(new RegExp(`${key}=[^;]+`), cur) : acc;
    }, oldCookie);
}

function addTimestamp(url) {
  return url + Date.now();
}

function maskCookie(cookie) {
  return cookie.replace(/(auth_token|SESSION)=([^;]+)/g, '$1=***');
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ================== 通知处理 ==================
function showResult(signData, credits) {
  showNotification(
    signData.success,
    signData.points || 0,
    credits,
    signData.error || '未知错误'
  );
}

function showNotification(success, points, credits, error) {
  const title = "🎬 1905电影网签到";
  const subtitle = success ? `✅ 成功获得 ${points} 积分` : `❌ 失败: ${error.slice(0, 30)}`;
  const content = `当前积分：${credits} | 环境：${typeof $task !== 'undefined' ? 'QX' : '其他'}`;

  if (typeof $notification !== 'undefined') {
    $notification.post(title, subtitle, content);
  } else if (typeof $notify !== 'undefined') {
    $notify(title, subtitle, content);
  } else {
    console.log("⚠️ 无可用通知渠道");
  }
}

// ================== 执行入口 ==================
checkIn();
