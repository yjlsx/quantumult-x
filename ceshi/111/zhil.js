/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/


const VIP_ENTRY = {
  referrerEntry: "VipV4.0_VIPCard", // 强制锁定的入口标识
  refcode: "5073"                   // 关联的推荐码
};

// ================== 核心修改逻辑 ==================
function rewriteRequest(request) {
  try {
    // 仅处理目标API
    if (!request.url.includes('/bapi/order/creation')) return request;

    const newReq = { ...request };
    const url = new URL(newReq.url);

    // ------------ 1. 修改URL参数 ------------
    // 时间戳参数动态化
    url.searchParams.set('_v', Date.now().toString().slice(-8)); // 示例: _v=75115628
    url.searchParams.set('x-zp-page-request-id', `ts_${Date.now()}_r${Math.random().toString(36).slice(2,8)}`);

    // ------------ 2. 修改Headers ------------
    if (newReq.headers?.Referer) {
      // 替换Referer中的入口标识
      newReq.headers.Referer = newReq.headers.Referer
        .replace(/referrerEntry=[^&]+/, `referrerEntry=${VIP_ENTRY.referrerEntry}`)
        .replace(/refcode=[^&]+/, `refcode=${VIP_ENTRY.refcode}`);
    }

    // ------------ 3. 修改Body ------------
    if (newReq.body) {
      try {
        const body = JSON.parse(newReq.body);
        if (body.remark) {
          const remark = JSON.parse(body.remark);
          remark.forEach(item => {
            // 修改入口标识
            if (item.contentType === 'referrerEntry') {
              item.content = VIP_ENTRY.referrerEntry;
            }
            // 修改推荐码
            if (item.contentType === 'refcode') {
              item.content = VIP_ENTRY.refcode;
            }
          });
          body.remark = JSON.stringify(remark);
        }
        newReq.body = JSON.stringify(body);
      } catch (e) {
        console.log(`Body解析失败: ${e}`);
      }
    }

    // 返回修改后的请求
    return {
      ...newReq,
      url: url.toString(),
      headers: newReq.headers,
      body: newReq.body
    };

  } catch (e) {
    console.log(`重写异常: ${e}`);
    return request;
  }
}

// ================== 代理工具适配 ==================
if (typeof $httpClient !== 'undefined') {
  $httpClient.onRequest((req) => $done(rewriteRequest(req)));
} else if (typeof $request !== 'undefined') {
  $done(rewriteRequest($request));
}