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
if ($response?.body) {
  let body = $response.body;

  try {
    const obj = JSON.parse(body);

    // 顶层状态字段
    obj.status = 1;
    obj.error_code = 0;
    obj.error = "";
    obj.fail_process = [];

    // 处理 tracker_through
    if (obj.tracker_through) {
      obj.tracker_through.all_quality_free = 1;
    }

    // 处理 auth_through
    if (obj.auth_through) {
      obj.auth_through.status = 1;
      obj.auth_through.pay_type = 0;
      obj.auth_through.fail_process = 0;
      obj.auth_through.pay_block_tpl = 0;
    }

    console.log("✅ 响应字段伪装完成");
    $done({ body: JSON.stringify(obj) });

  } catch (e) {
    console.log("❌ JSON 解析失败: ", e.message);
    $done({ body });
  }
} else {
  console.log("⚠️ 响应体为空");
  $done({});
}