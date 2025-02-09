/**
 * @fileoverview Quantumult X 
 * App : 步知公考
 * By @yjlsx
 * 脚本功能：签到领取学分.
 * 使用方法：
 * Date: 2024.07.19
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
 *[rewrite_local]
 * # 捕获用户ID并执行签到逻辑
 *^http://api\.yaotia\.cn/shuati/api/v1/game/waba/home\?user_id=(\d+) url script-response-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/buzhi.js
 *
 * [mitm]
 *hostname = api.yaotia.cn
 */

// 检查用户ID是否已存储
// 定义存储键名（避免重复）
const STORAGE_KEYS = {
   USER_ID: 'buzhi_user_id',
   UUID: 'buzhi_uuid',
   AUTH_TOKEN: 'buzhi_auth_token',
   APP_SIGN: 'buzhi_app_sign',
   SIGN: 'buzhi_sign'
};

// 判断运行模式
if (typeof $request !== "undefined") {
   // Rewrite 模式 - 参数捕获
   handleRewriteCapture();
} else {
   // Task 模式 - 执行签到
   executeSignTask();
}

/********************
* Rewrite 模式逻辑 *
********************/
function handleRewriteCapture() {
   let captured = false;
   const url = $request.url;
   const headers = $request.headers;

   // 捕获 user_id
   if (url.includes('game/waba/home')) {
       const userIdMatch = url.match(/user_id=(\d+)/);
       if (userIdMatch && userIdMatch[1]) {
           $prefs.setValueForKey(userIdMatch[1], STORAGE_KEYS.USER_ID);
           console.log(`🔧 捕获到 user_id: ${userIdMatch[1]}`);
           captured = true;
       }
   }

   // 捕获 headers 参数
   if (url.includes('game/waba/sign/logs')) {
       ['Device-Token', 'Auth-Token', 'Sign'].forEach(key => {
           if (headers[key]) {
               const storageKey = {
                   'Device-Token': STORAGE_KEYS.UUID,
                   'Auth-Token': STORAGE_KEYS.AUTH_TOKEN,
                   'Sign': STORAGE_KEYS.SIGN
               }[key];
               $prefs.setValueForKey(headers[key], storageKey);
               console.log(`🔧 捕获到 ${key}: ${headers[key]}`);
               captured = true;
           }
       });
   }

   // 捕获 app_sign
   if (url.includes('game/waba/home') && headers['App-Sign']) {
       $prefs.setValueForKey(headers['App-Sign'], STORAGE_KEYS.APP_SIGN);
       console.log(`🔧 捕获到 App-Sign: ${headers['App-Sign']}`);
       captured = true;
   }

   // 提示捕获结果
   if (captured) {
       $notify("步知公考", "✅ 参数捕获成功", "请检查日志查看详情");
   } else {
       console.log("⚠️ 未捕获到有效参数，请检查匹配规则");
       $notify("步知公考", "❌ 参数捕获失败", "请打开APP后重试");
   }
   $done();
}

/*******************
* Task 模式逻辑 *
*******************/
async function executeSignTask() {
   // 读取存储参数
   const params = {
       userId: $prefs.valueForKey(STORAGE_KEYS.USER_ID),
       uuid: $prefs.valueForKey(STORAGE_KEYS.UUID),
       authToken: $prefs.valueForKey(STORAGE_KEYS.AUTH_TOKEN),
       appSign: $prefs.valueForKey(STORAGE_KEYS.APP_SIGN),
       sign: $prefs.valueForKey(STORAGE_KEYS.SIGN)
   };
   
   // 参数校验
   const missingParams = Object.entries(params)
       .filter(([k, v]) => !v)
       .map(([k]) => k.replace(/([A-Z])/g, ' $1').toUpperCase());
   
   if (missingParams.length > 0) {
       const msg = `缺失参数: ${missingParams.join(', ')}\n请打开APP触发捕获规则`;
       console.log(`❌ ${msg}`);
       $notify("步知公考", "❌ 参数不全", msg);
       $done();
       return;
   }
   console.log("✅ 所有参数校验通过");

   try {
       // 执行签到
       console.log("🔄 开始执行签到请求...");
       await performSignRequest(params);
       
       // 获取数据
       console.log("🔄 获取签到日志与用户信息...");
       const [signLogs, userInfo] = await Promise.all([
           getSignLogs(params),
           getUserInfo(params)
       ]);
       
       // 解析数据
       const totalCredits = userInfo.data?.user?.point || '未知';
       const continuousDays = signLogs.data?.continuous_day || '未知';
       const todayCredits = signLogs.data?.signlogs?.[0]?.credits || '未知';
       
       // 生成通知
       const subtitle = continuousDays ? `已连续签到 ${continuousDays} 天` : '签到状态更新';
       const message = [
           `今日学分: ${todayCredits}`,
           `累计学分: ${totalCredits}`,
           `设备标识: ${params.uuid.slice(0, 6)}...`
       ].join('\n');
       
       $notify("步知公考", subtitle, message);
       console.log("✅ 通知已发送");
   } catch (err) {
       handleError(err);
   } finally {
       $done();
   }
}

/*********************
* 核心功能函数 *
*********************/
async function performSignRequest(params) {
   const startTime = Math.floor(Date.now() / 1000) - 5; // 模拟正常操作延迟
   const body = `app_version=7.1.3&duration=0&event=IndexSignClick&extra=${encodeURIComponent('{"moudle_name":"签到"}')}&platform=ios&starttime=${startTime}&userid=${params.userId}&uuid=${params.uuid}`;
   
   console.log(`📤 发送签到请求:\nURL: http://e.yaotia.cn/app/report\nBODY: ${body}`);
   
   const response = await $task.fetch({
       url: 'http://e.yaotia.cn/app/report',
       method: 'POST',
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Host': 'e.yaotia.cn',
           'User-Agent': 'YaoTiA/4 CFNetwork/1474 Darwin/23.0.0'
       },
       body: body
   });
   
   console.log(`📥 签到响应状态: ${response.statusCode}\n响应内容: ${response.body}`);
   if (response.body !== 'ok') throw new Error('签到响应异常');
}

async function getSignLogs(params) {
   const url = 'http://api.yaotia.cn/shuati/api/v2/game/waba/sign/logs';
   const headers = {
       'Device-Token': params.uuid,
       'Auth-Token': params.authToken,
       'Sign': params.sign,
       'Time': Math.floor(Date.now() / 1000).toString(),
       'Host': 'api.yaotia.cn',
       'User-Agent': 'YaoTiA/7.1.3 (iPhone; iOS 17.0; Scale/3.00)'
   };
   
   console.log(`📤 获取签到日志:\nURL: ${url}\nHEADERS: ${JSON.stringify(headers, null, 2)}`);
   
   const response = await $task.fetch({ url, headers });
   console.log(`📥 日志响应状态: ${response.statusCode}\n响应内容: ${response.body.slice(0, 200)}...`); // 截断长内容
   return JSON.parse(response.body);
}

async function getUserInfo(params) {
   const url = `http://api.yaotia.cn/shuati/api/v1/game/waba/home?user_id=${params.userId}`;
   const headers = {
       'Auth-Token': params.authToken,
       'App-Sign': params.appSign,
       'Host': 'api.yaotia.cn',
       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
   };
   
   console.log(`📤 获取用户信息:\nURL: ${url}\nHEADERS: ${JSON.stringify(headers, null, 2)}`);
   
   const response = await $task.fetch({ url, headers });
   console.log(`📥 用户信息响应状态: ${response.statusCode}\n响应内容: ${response.body.slice(0, 200)}...`);
   return JSON.parse(response.body);
}

/*********************
* 错误处理函数 *
*********************/
function handleError(err) {
   console.log(`❌ 错误详情:\n${err}\n堆栈: ${err.stack}`);
   const errorMsg = err.message.includes('JSON')
       ? '数据解析失败，请检查API响应格式'
       : err.message;
   $notify("步知公考", "❌ 签到失败", errorMsg);
}