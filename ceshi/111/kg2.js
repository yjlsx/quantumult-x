/*
[rewrite_local]
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg2.js
^https:\/\/m\.kugou\.com\/app\/i\/getSongInfo\.php\?cmd=playInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg2.js

[mitm]
passphrase = 
p12 = 
hostname = *.kugou.com, gateway.kugou.com, m.kugou.com
skip_validating_cert = true

*/

let body = $response.body;

try {
    if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
        let obj = JSON.parse(body);

        console.log("🎯 命中响应体重写，原始数据：", JSON.stringify(obj));

        // 修改关键字段
        obj.fail_process = 0;
        obj.error = "";
        obj.pay_type = 0;
        obj.errcode = 0;

        // 解锁特权字段
        ['privilege', '128privilege', '320privilege', 'sqprivilege', 'highprivilege'].forEach(k => {
            if (k in obj) obj[k] = 10;
        });

        $done({ body: JSON.stringify(obj) });
    } else {
        console.log("❗响应体非 JSON 格式，跳过处理。内容预览：", body.substring(0, 200));
        $done({ body });
    }
} catch (e) {
    console.log("❌ JSON 解析失败：", e.message);
    $done({ body });
}