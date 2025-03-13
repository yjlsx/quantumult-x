/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/


// ================== 预设 VIP 信息 ==================
const VIP_ENTRY = {
  referrerEntry: "VipV4.0_VIPCard",
  refcode: "5073"
};

// ================== 修改请求逻辑 ==================
try {
  let newReq = { ...$request };
  let url = new URL(newReq.url);

  // 1. 修改 URL 参数
  const new_v = `0.${Math.random().toString().slice(2, 10)}`;
  url.searchParams.set('_v', new_v);
  url.searchParams.set('x-zp-page-request-id', `ts_${Date.now()}_r${Math.random().toString(36).slice(2,8)}`);

  // 2. 修改 Headers
  if (newReq.headers?.Referer) {
    newReq.headers.Referer = newReq.headers.Referer
      .replace(/referrerEntry=[^&]+/g, `referrerEntry=${VIP_ENTRY.referrerEntry}`)
      .replace(/refcode=[^&]+/g, `refcode=${VIP_ENTRY.refcode}`);
  }

  if (newReq.headers?.Cookie) {
    newReq.headers.Cookie = newReq.headers.Cookie
      .replace(/referrerEntry=[^;]+/, `referrerEntry=${VIP_ENTRY.referrerEntry}`)
      .replace(/refcode=[^;]+/, `refcode=${VIP_ENTRY.refcode}`);
  }

  // 3. 修改 Body
  if (newReq.body) {
    try {
      let body = JSON.parse(newReq.body);
      if (body.remark) {
        let remark = JSON.parse(body.remark);
        remark.forEach(item => {
          if (item.contentType === 'referrerEntry') {
            item.content = VIP_ENTRY.referrerEntry;
          }
          if (item.contentType === 'refcode') {
            item.content = VIP_ENTRY.refcode;
          }
          if (item.contentType === 'pageUrl') {
            item.content = item.content
              .replace(/referrerEntry=[^&]+/g, `referrerEntry=${VIP_ENTRY.referrerEntry}`)
              .replace(/refcode=[^&]+/g, `refcode=${VIP_ENTRY.refcode}`);
          }
        });
        body.remark = JSON.stringify(remark);
      }
      newReq.body = JSON.stringify(body);
    } catch (e) {
      console.log(`Body 解析失败: ${e}`);
    }
  }

  $done({ url: url.toString(), headers: newReq.headers, body: newReq.body });

} catch (e) {
  console.log(`请求修改失败: ${e}`);
  $done({});
}