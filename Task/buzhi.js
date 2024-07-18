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
if (!storedUserId) {
    const userIdRegex = /user_id=(\d+)/;
    const match = $request.url.match(userIdRegex);

    if (match && match[1]) {
        const user_id = match[1];
        console.log(`用户ID从URL捕获成功: ${user_id}`);

        // 存储用户ID
        $prefs.setValueForKey(user_id, 'user_id');
        console.log("用户ID存储成功");

        // 通知用户ID捕获成功，但不包含具体用户ID信息
        $notify("步知公考", "用户ID捕获成功🎉", "");

        // 继续签到操作
        performSignIn(user_id);
    } else {
        console.log("未能从URL中捕获用户ID");
        $notify("步知公考", "捕获用户ID失败", "未能从URL中捕获用户ID");
        $done();
    }
} else {
    console.log(`用户ID已存储: ${storedUserId}`);
    // 继续签到操作
    performSignIn(storedUserId);
}

function performSignIn(user_id) {
    // 定义获取学分的请求参数
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

    // 发送获取学分的请求
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
        
        // 在第一个请求结束后执行签到报告请求
        performSignInReport(user_id);
    });
}

function performSignInReport(user_id) {
    // 定义签到报告请求参数
    const reportUrl = `http://e.yaotia.cn/app/report`;
    const reportHeaders = {
        'Accept': `*/*`,
        'Accept-Encoding': `gzip, deflate`,
        'Connection': `keep-alive`,
        'Content-Type': `application/x-www-form-urlencoded`,
        'Host': `e.yaotia.cn`,
        'User-Agent': `YaoTiA/12 CFNetwork/1474 Darwin/23.0.0`,
        'Accept-Language': `zh-CN,zh-Hans;q=0.9`
    };
    
    // 获取当前时间的秒数表示的时间戳
    const starttime = Math.floor(Date.now() / 1000);

    const reportBody = `app_version=7.0.7&duration=0&event=IndexSignClick&extra={"moudle_name":"签到"}&platform=ios&starttime=${starttime}&userid=${user_id}&uuid=A341CC11-BDDC-4F47-8D87-7F14259D2727`;

    const reportRequest = {
        url: reportUrl,
        method: 'POST',
        headers: reportHeaders,
        body: reportBody
    };

    console.log(`开始发送签到报告请求到 ${reportUrl}`);

    // 发送签到报告请求
    $task.fetch(reportRequest).then(response => {
        const data = response.body;
        console.log(`签到报告请求响应: ${response.statusCode} ${data}`);
        
        // 处理签到报告响应逻辑
        if (response.statusCode === 200) {
            try {
                const result = JSON.parse(data);
                const todayAddCredits = result.today_add_credits || 0;
                const totalPoints = result.user.point || 0;
                $notify("步知公考", "签到成功", `获得${todayAddCredits}学分，总学分为${totalPoints}🎉！`);
            } catch (e) {
                console.error(`解析签到报告响应数据失败: ${e.message}`);
                $notify("步知公考", "签到成功", "签到报告已成功提交，但解析响应数据失败");
            }
        } else {
            $notify("步知公考", "签到失败", `签到报告请求错误，状态码: ${response.statusCode}`);
        }
    }).catch(error => {
        console.error(`签到报告请求错误: ${error}`);
        $notify("步知公考", "签到失败", `签到报告请求错误: ${error}`);
    }).finally(() => {
        console.log('签到报告请求结束');
        $done();
    });
}