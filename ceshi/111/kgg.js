 /*
[rewrite_local]
^https://gateway\.kugou\.com/v5/url?album_audio_id url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kgg.js

[mitm]
hostname = gateway.kugou.com
*/

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes("/v5/url?")) {
  if(obj && obj.privilege === 10)  {
      obj.privilege = 0;  // 设置无版权限制
  obj["128privilege"] = 0;
  obj["320privilege"] = 0;
  obj["sqprivilege"] = 0;
  obj["highprivilege"] = 0;
  obj.pay_type = 0;  // 设置为无需支付
  obj.fail_process = 0; // 无错误处理
  obj.error = "";  // 清除错误信息
  obj.trans_param.appid_block = "";  // 去除 appid 限制
  }
}

$done({ body: JSON.stringify(obj) });