/*
[rewrite_local]
//^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg2.js
^https:\/\/m\.kugou\.com\/app\/i\/getSongInfo\.php\?cmd=playInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg2.js

[mitm]
passphrase = 
p12 = 
hostname = *.kugou.com, gateway.kugou.com, m.kugou.com
skip_validating_cert = true

*/

if ($response && $response.body) {
  let body = $response.body;

  try {
    // 建议先输出部分响应体内容，确认格式
    // console.log("响应体预览: " + body.slice(0, 200));

    body = body.replace(/"pay_type"\s*:\s*\d+/g, `"pay_type": 0`);
    body = body.replace(/"fail_process"\s*:\s*\d+/g, `"fail_process": 0`);
    body = body.replace(/"error"\s*:\s*".*?"/g, `"error": ""`);

    $done({ body });
  } catch (e) {
    // 捕获异常也返回原始内容，避免脚本挂起
    $done({ body });
  }
} else {
  $done({});
}

