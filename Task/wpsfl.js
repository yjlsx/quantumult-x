/*
 * WPS 福利中心 QX 任务和抓包整合脚本 (wps_task_and_catch.js)
 * * 模式 A (重写): 捕获签到/抽奖请求参数，并保存到 QX 存储。
 * 模式 B (定时任务): 读取存储参数，执行每日签到和抽奖。
[rewrite_local]
# ⚠️ 注意：运行成功获取参数后，请禁用此规则！
^https:\/\/personal-act\.wps\.cn\/activity-rubik\/activity\/component_action url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsfl.js

[mitm]
hostname = personal-act.wps.cn, *.wps.cn

[task_local]
# 每天定时运行签到和抽奖任务 (例如：早上 8 点 30 分)
30 8 * * * wps_https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/wpsfl.js, tag=WPS签到抽奖 (自动)


 */


const BASE_URL = `https://personal-act.wps.cn/activity-rubik/activity/component_action`;
const NOTIFY_TITLE = '🏆 WPS 福利中心';
const ACTIVITY_NUMBER = 'HD2025031721339450';
const PAGE_NUMBER = 'YM2025041115554241';

function getTodayDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function log(msg) {
  console.log(`[WPS] ${msg}`);
}

// --- 模式 A: 抓包 ---
function wpsCatch() {
  const method = $request.method;
  const headers = $request.headers;
  const body = $request.body;
  const cookie = headers['Cookie'] || headers['cookie'];

  if (method !== 'POST' || !body || !cookie) return $done({});

  try {
    const obj = JSON.parse(body);
    const action = obj.component_action;
    $prefs.setValueForKey(cookie, 'WPS_COOKIE');
    log(`已捕获 Cookie`);

    if (action === 'fragment_collect.sign_in') {
      $prefs.setValueForKey(obj.component_uniq_number.component_number, 'WPS_SIGN_COMPONENT_NUMBER');
      $prefs.setValueForKey(obj.component_uniq_number.component_node_id, 'WPS_SIGN_COMPONENT_NODE_ID');
      $prefs.setValueForKey(obj.fragment_collect.series_id, 'WPS_SERIES_ID');
      log(`✅ 捕获签到参数成功`);
      $notify(NOTIFY_TITLE, '签到参数捕获成功 ✅', 'Cookie、component_number、series_id已保存');
    } else if (action === 'lottery_v2.exec') {
      $prefs.setValueForKey(obj.component_uniq_number.component_number, 'WPS_LOTTERY_COMPONENT_NUMBER');
      $prefs.setValueForKey(obj.component_uniq_number.component_node_id, 'WPS_LOTTERY_COMPONENT_NODE_ID');
      $prefs.setValueForKey(String(obj.lottery_v2.session_id), 'WPS_LOTTERY_SESSION_ID');
      log(`✅ 捕获抽奖参数成功`);
      $notify(NOTIFY_TITLE, '抽奖参数捕获成功 🎯', 'component_number、session_id已保存');
    }
  } catch (err) {
    log(`⚠️ 抓包解析失败: ${err}`);
    $notify(NOTIFY_TITLE, '抓包失败', err.message);
  }

  $done({});
}

// --- 模式 B: 任务 ---
async function wpsTask() {
  log('开始执行任务');
  const COOKIE = $prefs.valueForKey('WPS_COOKIE');
  const SIGN_COMPONENT = $prefs.valueForKey('WPS_SIGN_COMPONENT_NUMBER');
  const SIGN_NODE = $prefs.valueForKey('WPS_SIGN_COMPONENT_NODE_ID');
  const LOTTERY_COMPONENT = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NUMBER');
  const LOTTERY_NODE = $prefs.valueForKey('WPS_LOTTERY_COMPONENT_NODE_ID');
  let SERIES_ID = $prefs.valueForKey('WPS_SERIES_ID') || '';
  const LOTTERY_SESSION = $prefs.valueForKey('WPS_LOTTERY_SESSION_ID') || 3001;
  const today = getTodayDate();

  if (!COOKIE || !SIGN_COMPONENT || !LOTTERY_COMPONENT) {
    $notify(NOTIFY_TITLE, '🛑 参数缺失', '请重新开启抓包重写获取签到/抽奖参数');
    return $done();
  }

  async function post(action, data) {
    const req = {
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Cookie': COOKIE,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      },
      body: JSON.stringify(data)
    };
    const resp = await $task.fetch(req);
    log(`${action} 状态码: ${resp.statusCode}`);
    return JSON.parse(resp.body);
  }

  // --- 获取最新 series_id ---
  async function getSeriesId() {
    const infoBody = {
      "component_uniq_number": { "activity_number": ACTIVITY_NUMBER, "page_number": PAGE_NUMBER, "component_number": SIGN_COMPONENT, "component_node_id": SIGN_NODE },
      "component_type": 42,
      "component_action": "fragment_collect.info"
    };
    const res = await post('fragment_collect.info', infoBody);
    const newId = res?.data?.fragment_collect?.series_id;
    if (newId) {
      SERIES_ID = newId;
      $prefs.setValueForKey(newId, 'WPS_SERIES_ID');
      log(`🔄 自动更新 series_id = ${newId}`);
      return newId;
    }
    return null;
  }

  let summary = '';

  // --- 签到 ---
  log('开始签到');
  async function doSign(series) {
    const body = {
      "component_uniq_number": {
        "activity_number": ACTIVITY_NUMBER,
        "page_number": PAGE_NUMBER,
        "component_number": SIGN_COMPONENT,
        "component_node_id": SIGN_NODE
      },
      "component_type": 42,
      "component_action": "fragment_collect.sign_in",
      "fragment_collect": {
        "sign_date": today,
        "series_id": series,
        "is_new_sign_series": false
      }
    };
    return await post('fragment_collect.sign_in', body);
  }

  let signRes = await doSign(SERIES_ID);
  if (signRes?.result === 'error' && /not in series/.test(signRes.msg)) {
    log(`series_id 已失效，尝试更新`);
    const newSeries = await getSeriesId();
    if (newSeries) {
      signRes = await doSign(newSeries);
    }
  }

  if (signRes?.result === 'ok' && signRes.data?.fragment_collect?.success) {
    summary += `✅ 签到成功\n`;
  } else if (signRes?.msg?.includes('signed in today')) {
    summary += `⚠️ 今日已签到\n`;
  } else {
    summary += `❌ 签到失败: ${signRes?.msg || '未知错误'}\n`;
  }

  // --- 抽奖 ---
  await sleep(1000);
  log('开始抽奖');
  const lotteryBody = {
    "component_uniq_number": {
      "activity_number": ACTIVITY_NUMBER,
      "page_number": PAGE_NUMBER,
      "component_number": LOTTERY_COMPONENT,
      "component_node_id": LOTTERY_NODE
    },
    "component_type": 45,
    "component_action": "lottery_v2.exec",
    "lottery_v2": { "session_id": Number(LOTTERY_SESSION) }
  };
  const lotRes = await post('lottery_v2.exec', lotteryBody);

  if (lotRes?.result === 'ok' && lotRes.data?.lottery_v2?.success) {
    const reward = lotRes.data.lottery_v2.reward_name || '未知奖励';
    summary += `🎁 抽奖成功: ${reward}`;
  } else {
    summary += `❌ 抽奖失败: ${lotRes?.msg || '未知错误'}`;
  }

  log(`任务完成\n${summary}`);
  $notify(NOTIFY_TITLE, '执行结果', summary);
  $done();
}

// --- 入口 ---
if (typeof $request !== 'undefined') {
  wpsCatch();
} else {
  wpsTask();
}
