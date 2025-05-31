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

/*
[rewrite_local]
^https:\/\/m\.kugou\.com\/app\/i\/getSongInfo\.php\?cmd=playInfo url script-response-body https://your_cdn_or_github/your_kg_unlock.js
[mitm]
hostname = m.kugou.com
*/

if ($response?.body) {
  let body = $response.body;

  try {
    // 强制替换关键字段，即使响应是 text/html
    body = body.replace(/"pay_type"\s*:\s*\d+/g, `"pay_type": 0`);
    body = body.replace(/"fail_process"\s*:\s*\d+/g, `"fail_process": 0`);
    body = body.replace(/"error"\s*:\s*".*?"/g, `"error": ""`);

    console.log(" 响应体字段替换完成");
    $done({ body });

  } catch (e) {
    console.log(" 替换失败: " + e.message);
    $done({ body });
  }
} else {
  console.log("响应体为空");
  $done({});
}
