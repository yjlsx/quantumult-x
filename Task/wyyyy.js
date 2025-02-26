/*
 * BoxJS配置项：
 * - wyyyy_data: 网易云音乐Cookie(多账号用&分隔)
 * - song_limit: 刷歌数量限制(默认10)
 * - enable_signin: 启用签到功能(true/false)
 * - enable_yunbei: 启用云贝签到(true/false) 
 * - enable_shuffle: 启用刷歌功能(true/false)
 */
const $ = new Env('网易云音乐启动！');
// 通知函数改造
function notify(notice) {
    `latex-inlineEquation .msg(`.name, '', notice);
}
// 获取随机User-Agent保持不变
function getRandomUserAgent() { /* 原有实现 */ }
// 云贝签到改造
async function yunbeiSignin(session, data) {
    if ($persistentStore.read("enable_yunbei") !== "true") {
        console.log('云贝签到功能已禁用');
        return '云贝签到未启用';
    }
    const apiUrl = $persistentStore.read("yunbei_url") || 'https://wyyy.ukzs.net/api/yunbei/signs';
    const response = await session.post(apiUrl, { data });
    // 原有逻辑保持不变
}
// 签到功能改造
async function signin(session, data) {
    if ($persistentStore.read("enable_signin") !== "true") {
        console.log('签到功能已禁用');
        return '签到未启用';
    }
    
    const apiUrl = $persistentStore.read("signin_url") || 'https://wyyy.ukzs.net/api/signin';
    const response = await session.post(apiUrl, { data });
    // 原有逻辑保持不变
}
// 刷歌功能改造
async function shuffleSongs(session, data) {
    if ($persistentStore.read("enable_shuffle") !== "true") {
        console.log('刷歌功能已禁用');
        return '刷歌未启用';
    }
    
    const apiUrl = $persistentStore.read("shuffle_url") || 'https://wyyy.ukzs.net/api/shuffle';
    const response = await session.post(apiUrl, { data });
    // 原有逻辑保持不变
}
// 启动函数改造
async function startGenshin(session, Cookie) {
    const data = {
        limit: parseInt($persistentStore.read("song_limit")) || 10,
        cookie: Cookie
    };
    
    // 添加延迟配置
    const delay = parseInt($persistentStore.read("request_delay")) || 1000;
    await $.wait(delay);
    // 并行执行所有启用功能
    const tasks = [];
    if ($persistentStore.read("enable_signin") === "true") tasks.push(signin(session, data));
    if ($persistentStore.read("enable_yunbei") === "true") tasks.push(yunbeiSignin(session, data));
    if ($persistentStore.read("enable_shuffle") === "true") tasks.push(shuffleSongs(session, data));
    
    const results = await Promise.all(tasks);
    return results.join(" ");
}
// 主函数改造
async function main() {
    const Cookie = $persistentStore.read("wyyyy_data");
    if (!Cookie) {
        notify("⚠️ 请先通过BoxJS填写wyyyy_data配置");
        return $.done();
    }
   // 原有账号处理逻辑保持不变
    const CookieArray = Cookie.split('&');
    // 添加UA随机化
    const headers = {
        'User-Agent': getRandomUserAgent(),
        'Cookie': CookieArray // 首个cookie用于全局headers
    };
    const session = new (require('node-fetch'))({ headers });
    
    // 任务执行逻辑
    const tasks = CookieArray.map(cookie => startGenshin(session, cookie));
    const results = await Promise.all(tasks);
   
    // 通知处理优化
    let notification = `共执行 ${CookieArray.length} 个账号\n`;
    results.forEach((result, index) => {
        notification += `【账号`latex-inlineEquation {index + 1}】\n`{result.replace(/ /g, "\n")}\n\n`;
    });
    
    notify(notification);
    $.done();
}
// 错误处理改造
main().catch(err => {
    notify(`脚本执行出错: ${err.message}`);
    $.done({error: err.message});
});