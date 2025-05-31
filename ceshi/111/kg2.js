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

if (typeof $response !== 'undefined') {
  let body = $response.body;

  try {
    if (body && (body.trim().startsWith('{') || body.trim().startsWith('['))) {
      let obj = JSON.parse(body);

      // 示例：解除播放限制
      obj.pay_type = 0;
      obj.fail_process = 0;
      obj.error = "";

      // 特权解锁字段（按需）
      ['privilege', '128privilege', '320privilege', 'sqprivilege', 'highprivilege'].forEach(k => {
        if (obj.hasOwnProperty(k)) {
          obj[k] = 10;
        }
      });

      $done({ body: JSON.stringify(obj) });
    } else {
      console.log("⚠️ 响应体非 JSON 格式，内容预览：", body.substring(0, 200));
      $done({ body }); // 不处理
    }
  } catch (e) {
    console.log("❌ JSON 解析失败:", e.message);
    $done({ body }); // 保持原样
  }
}
