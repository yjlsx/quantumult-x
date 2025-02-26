/*
 * BoxJS配置项：
 * - wyyyy_data: 网易云音乐Cookie(多账号用&分隔)
 * - song_limit: 刷歌数量限制(默认10)
 * - enable_signin: 启用签到功能(true/false)
 * - enable_yunbei: 启用云贝签到(true/false) 
 * - enable_shuffle: 启用刷歌功能(true/false)
 */


const $ = new Env('网易云音乐任务');
const APP_VERSION = '1.2.0';

// ==================== 配置管理 ====================
const CONFIG_SCHEMA = {
 cookies: { type: 'textarea', label: '账号Cookie', desc: '多账号用 & 分隔' },
 song_limit: { type: 'number', label: '刷歌数量', default: 10 },
 request_delay: { type: 'number', label: '请求间隔(ms)', default: 1000 },
 enable_sign: { type: 'boolean', label: '启用签到', default: true },
 enable_yunbei: { type: 'boolean', label: '云贝签到', default: true },
 enable_shuffle: { type: 'boolean', label: '刷歌功能', default: true },
 max_retries: { type: 'number', label: '最大重试', default: 3 }
};

// ==================== 核心类 ====================
class NeteaseClient {
 constructor(cookie, index) {
   this.cookie = cookie;
   this.accountIndex = index + 1;
   this.retryCount = 0;
   this.ua = this.generateUA();
 }

 generateUA() {
   const devices = [
     `Mozilla/5.0 (iPhone; CPU iPhone OS ${this.randomVersion(14,16)} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
     `Mozilla/5.0 (Linux; Android ${this.randomVersion(10,12)}; ${this.randomModel()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${this.randomVersion(90,105)}.0.0.0 Mobile Safari/537.36`
   ];
   return devices[Math.floor(Math.random() * devices.length)];
 }

 async request(endpoint, method = 'POST', body = {}) {
   const url = `https://music.163.com/api/${endpoint}`;
   try {
     const response = await $.fetch({
       url: url,
       method: method,
       headers: {
         'Cookie': this.cookie,
         'User-Agent': this.ua,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(body)
     });
     return response.json();
   } catch (e) {
     if (this.retryCount < getConfig('max_retries')) {
       this.retryCount++;
       await this.delay(getConfig('request_delay'));
       return this.request(endpoint, method, body);
     }
     throw new Error(`请求失败: ${e.message}`);
   }
 }

 async signin() {
   if (!getConfig('enable_sign')) return '🔴 签到未启用';
   const res = await this.request('daily_signin');
   return res.code === 200 ? '🟢 签到成功' : `🔴 签到失败: ${res.msg}`;
 }

 async yunbeiSign() {
   if (!getConfig('enable_yunbei')) return '🔴 云贝未启用';
   const res = await this.request('yunbei/signs');
   return res.code === 200 ? '🟢 云贝成功' : `🔴 云贝失败: ${res.msg}`;
 }

 async shuffleSongs() {
   if (!getConfig('enable_shuffle')) return '🔴 刷歌未启用';
   const res = await this.request('personalized', 'POST', {
     limit: getConfig('song_limit')
   });
   return res.code === 200 ? `🟢 刷歌${getConfig('song_limit')}首` : `🔴 刷歌失败`;
 }

 async delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }

 randomVersion(min, max) {
   return min + Math.floor(Math.random() * (max - min + 1));
 }

 randomModel() {
   const models = ['Mi 11', 'P50 Pro', 'Galaxy S22', 'Pixel 6'];
   return models[Math.floor(Math.random() * models.length)];
 }
}

// ==================== 工具函数 ====================
function getConfig(key) {
 const value = $.getdata(key);
 return value !== undefined ? value : CONFIG_SCHEMA[key]?.default;
}

function formatResults(results) {
 return results.map((r, i) =>
   `【账号 ${i+1}】\n${r.join('\n')}`).join('\n\n');
}

function showNotification(title, subtitle) {
 $.msg($.name, title, subtitle);
}

// ==================== 主流程 ====================
async function processAccounts() {
 const cookies = getConfig('cookies')?.split('&') || [];
 if (cookies.length === 0) {
   showNotification('配置错误', '未找到有效Cookie');
   return;
 }

 const results = [];
 for (const [index, cookie] of cookies.entries()) {
   try {
     const client = new NeteaseClient(cookie.trim(), index);
     const tasks = [
       client.signin(),
       client.yunbeiSign(),
       client.shuffleSongs()
     ];
     const accountResults = await Promise.all(tasks);
     results.push(accountResults);
   } catch (e) {
     results.push([`❌ 账号异常: ${e.message}`]);
   }
   await client.delay(getConfig('request_delay'));
 }

 showNotification(
   `执行完成 (${cookies.length}个账号)`,
   formatResults(results)
 );
}

// ==================== BoxJS处理 ====================
if (typeof $request !== 'undefined') {
 const cookie = $request.headers?.Cookie || $request.headers?.cookie;
 if (cookie) {
   const currentCookies = ($.getdata('cookies') || '').split('&');
   if (!currentCookies.includes(cookie)) {
     const newCookies = [...currentCookies, cookie].join('&');
     $.setdata(newCookies, 'cookies');
     showNotification('账号添加成功', `当前账号数: ${currentCookies.length + 1}`);
   }
 }
 $.done();
} else {
 (async () => {
   try {
     await processAccounts();
   } catch (e) {
     showNotification('执行出错', e.message);
   } finally {
     $.done();
   }
 })();
}