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
const storedUserId = $prefs.valueForKey('user_id');

if (typeof $request !== "undefined") {
   // 这是 Rewrite 模式
   const userIdRegex = /user_id=(\d+)/;
   const match = $request.url.match(userIdRegex);

   if (match && match[1]) {
       const user_id = match[1];
       console.log(`用户ID从URL捕获成功: ${user_id}`);

       // 存储用户ID
       $prefs.setValueForKey(user_id, 'user_id');
       console.log("用户ID存储成功");

       // 通知用户ID捕获成功
       $notify("步知公考", "用户ID捕获成功🎉", "");
   } else {
       console.log("未能从URL中捕获用户ID");
       $notify("步知公考", "捕获用户ID失败", "未能从URL中捕获用户ID");
   }
   $done();
} else {
   // 这是 Task（定时任务）模式
   if (storedUserId) {
       console.log(`用户ID已存储: ${storedUserId}`);
       performSignIn(storedUserId);
   } else {
       console.log("未找到存储的用户ID");
       $notify("步知公考", "签到失败", "未找到存储的用户ID，请先打开 App 触发 Rewrite 规则");
       $done();
   }
}

function performSignIn(user_id) {
   // 定义签到请求参数
   const firstUrl = `http://api.yaotia.cn/shuati/api/v1/game/waba/home?user_id=${user_id}`;
   const firstHeaders = {
       'Auth-Token': `8rik5116wnrwbusm`,
       'App-Sign': `c432685f6401249a1513646db2e365af`,
       'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
       'Host': `api.yaotia.cn`,
   };

   const firstRequest = {
       url: firstUrl,
       headers: firstHeaders,
   };

   console.log(`开始第一个请求到 ${firstUrl}`);

   $task.fetch(firstRequest).then(response => {
       const firstResult = JSON.parse(response.body);
       console.log(`第一个请求响应: ${response.body}`);
       
       if (firstResult.code === 1 && firstResult.msg === "success") {
           const todayAddCredits = firstResult.data.today_add_credits;
           const totalPoints = firstResult.data.user.point;
           $notify("步知公考", "签到成功", `获得${todayAddCredits}学分，总学分为${totalPoints}🎉！`);
       } else {
           $notify("步知公考", "签到失败", "未获得学分");
       }
   }).catch(error => {
       console.error(`错误: ${error}`);
       $notify("步知公考", "签到失败", `原因: ${error}`);
   }).finally(() => {
       console.log('第一个请求结束');
       performSignInReport(user_id);
   });
}