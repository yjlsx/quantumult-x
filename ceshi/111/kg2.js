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
    const trimmed = body.trim();

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        let obj = JSON.parse(trimmed);
        console.log("🎯 命中 JSON");

        obj.fail_process = 0;
        obj.error = "";
        obj.pay_type = 0;

        $done({ body: JSON.stringify(obj) });
    } else {
        console.log("⚠️ 非 JSON 内容（可能为 HTML），不修改");
        $done({ body });
    }

} catch (e) {
    console.log("❌ JSON 解析失败：" + e.message);
    $done({ body });
}
