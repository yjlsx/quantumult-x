/*
* BoxJS配置项：
* - wyyyy_data: 网易云音乐Cookie(多账号用&分隔)
* - song_limit: 刷歌数量限制(默认10)
* - enable_signin: 启用签到功能(true/false)
* - enable_yunbei: 启用云贝签到(true/false)
* - enable_shuffle: 启用刷歌功能(true/false)
*/
const $ = new Env('网易云音乐启动！');

// ==================== 修复1：修正通知函数 ====================
function notify(notice) {
   $.msg($.name, '', notice); // 修正模板字符串错误
}

// ==================== 修复2：获取随机User-Agent ====================
function getRandomUserAgent() {
   const agents = [
       'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
       'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
   ];
   return agents[Math.floor(Math.random() * agents.length)];
}

// ==================== 修复3：异步请求函数 ====================
async function httpRequest(url, method, headers, body) {
   return new Promise((resolve, reject) => {
       $task.fetch({
           url: url,
           method: method,
           headers: headers,
           body: body
       }).then(
           response => resolve(JSON.parse(response.body)),
           reason => reject(reason.error)
       );
   });
}

// ==================== 修复4：云贝签到 ====================
async function yunbeiSignin(cookie) {
   if ($prefs.valueForKey("enable_yunbei") !== "true") {
       console.log('云贝签到功能已禁用');
       return '云贝签到未启用';
   }
   const apiUrl = 'https://music.163.com/api/yunbei/signs';
   try {
       const response = await httpRequest(apiUrl, 'POST', {
           'Cookie': cookie,
           'User-Agent': getRandomUserAgent()
       }, '');
       return response.code === 200 ? '云贝签到成功' : '云贝签到失败';
   } catch (e) {
       return `云贝请求失败: ${e}`;
   }
}

// ==================== 修复5：签到功能 ====================
async function signin(cookie) {
   if ($prefs.valueForKey("enable_signin") !== "true") {
       console.log('签到功能已禁用');
       return '签到未启用';
   }
   const apiUrl = 'https://music.163.com/api/daily_signin';
   try {
       const response = await httpRequest(apiUrl, 'POST', {
           'Cookie': cookie,
           'User-Agent': getRandomUserAgent()
       }, '');
       return response.code === 200 ? '签到成功' : '签到失败';
   } catch (e) {
       return `签到请求失败: ${e}`;
   }
}

// ==================== 修复6：刷歌功能 ====================
async function shuffleSongs(cookie) {
   if ($prefs.valueForKey("enable_shuffle") !== "true") {
       console.log('刷歌功能已禁用');
       return '刷歌未启用';
   }
   const apiUrl = 'https://music.163.com/api/personalized';
   const limit = parseInt($prefs.valueForKey("song_limit")) || 10;
   try {
       const response = await httpRequest(apiUrl, 'POST', {
           'Cookie': cookie,
           'User-Agent': getRandomUserAgent()
       }, JSON.stringify({ limit }));
       return response.code === 200 ? `刷歌${limit}首成功` : '刷歌失败';
   } catch (e) {
       return `刷歌请求失败: ${e}`;
   }
}

// ==================== 修复7：主执行函数 ====================
async function processAccount(cookie, index) {
   const delay = parseInt($prefs.valueForKey("request_delay")) || 1000;
   await new Promise(resolve => setTimeout(resolve, delay));
   
   const results = [];
   try {
       if ($prefs.valueForKey("enable_signin") === "true")
           results.push(await signin(cookie));
       
       if ($prefs.valueForKey("enable_yunbei") === "true")
           results.push(await yunbeiSignin(cookie));
       
       if ($prefs.valueForKey("enable_shuffle") === "true")
           results.push(await shuffleSongs(cookie));
       
       return `【账号${index + 1}】\n${results.join('\n')}`;
   } catch (e) {
       return `【账号${index + 1}】\n❌ 执行异常: ${e.message}`;
   }
}

// ==================== 修复8：主函数重构 ====================
async function main() {
   const cookieData = $prefs.valueForKey("wyyyy_data");
   if (!cookieData) {
       notify("⚠️ 请先通过BoxJS填写wyyyy_data配置");
       return $.done();
   }

   const cookies = cookieData.split('&');
   let notification = `共执行 ${cookies.length} 个账号\n\n`;
   
   for (const [index, cookie] of cookies.entries()) {
       const result = await processAccount(cookie.trim(), index);
       notification += result + '\n\n';
   }
   
   notify(notification);
   $.done();
}

// ==================== 修复9：错误处理 ====================
main().catch(err => {
   notify(`脚本执行出错: ${err}`);
   $.done();
});

// ==================== BoxJS捕获处理 ====================
if (typeof $request !== 'undefined') {
   const cookie = $request.headers?.Cookie || $request.headers?.cookie;
   if (cookie) {
       const current = $prefs.valueForKey("wyyyy_data") || '';
       const newData = current ? `${current}&${cookie}` : cookie;
       $prefs.setValueForKey(newData, "wyyyy_data");
       notify("Cookie添加成功", `当前账号数: ${newData.split('&').length}`);
   }
   $.done();
}