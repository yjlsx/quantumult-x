// modify-payment-status.js

let request = $request;

// 获取原始请求体
let body = JSON.parse(request.body);

// 检查是否包含支付日志数据，并修改 `transaction_state`
if (body.data) {
  let logData = JSON.parse(body.data).logdata;

  // 如果支付状态为失败（transaction_state = 2），则修改为成功（transaction_state = 1）
  if (logData) {
    let userLogs = JSON.parse(logData);
    if (userLogs['169799378']) {
      let userLog = userLogs['169799378'];
      if (userLog.log_content) {
        // 修改 transaction_state 为成功（1）
        userLog.log_content.transaction_state = 1;
        userLog.log_content.transaction_state_desc = "Success"; // 修改描述为 "Success"
      }
    }
  }
}

// 将修改后的请求体重新赋值
request.body = JSON.stringify(body);

// 返回修改后的请求
$done({ request });
