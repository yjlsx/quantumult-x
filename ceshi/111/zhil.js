/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js


*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/


// == 配置项 ==
const CONFIG = {
  REFERRER_ENTRY: "VipV4.0_VIPCard",
  REF_CODE: "5073",
  USE_COIN_AMOUNT: 0 // 积分清零
};

// == 动态参数生成器 ==
const DynamicUtils = {
  generateV() {
    return `0.${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
  },
  generateRequestId() {
    const uuid = Array.from({length: 8}, () => 
      Math.random().toString(16).slice(2,6)
    ).join('');
    return `${uuid}-${Date.now()}-${Math.floor(Math.random() * 99999)}`;
  }
};

// == 主重写函数 ==
function rewriteRequest(request) {
  try {
    let newReq = { ...request };
    let url = new URL(newReq.url);

    // 1. 修改URL参数
    url.searchParams.set('_v', DynamicUtils.generateV());
    url.searchParams.set('x-zp-page-request-id', DynamicUtils.generateRequestId());

    // 2. 修改Headers
    if (newReq.headers?.Referer) {
      newReq.headers.Referer = newReq.headers.Referer
        .replace(/referrerEntry=[^&]+/g, `referrerEntry=${CONFIG.REFERRER_ENTRY}`)
        .replace(/refcode=[^&]+/g, `refcode=${CONFIG.REF_CODE}`)
        // 新增：修改pageUrl中的积分值
        .replace(/useCoinAmount=\d+/g, `useCoinAmount=${CONFIG.USE_COIN_AMOUNT}`);
    }

    // 3. 修改Body
    if (newReq.body) {
      try {
        let body = JSON.parse(newReq.body);
        
        // 3.1 处理外层积分字段
        if (typeof body.useCoinAmount === 'number') {
          body.useCoinAmount = CONFIG.USE_COIN_AMOUNT;
        }

        // 3.2 处理remark内的积分值
        if (body.remark) {
          const remark = JSON.parse(body.remark);
          remark.forEach(item => {
            if (item.contentType === 'useCoinAmount') {
              item.content = CONFIG.USE_COIN_AMOUNT;
            }
            // 处理嵌套的pageUrl参数
            if (item.contentType === 'pageUrl') {
              item.content = item.content
                .replace(/useCoinAmount=\d+/g, `useCoinAmount=${CONFIG.USE_COIN_AMOUNT}`);
            }
          });
          body.remark = JSON.stringify(remark);
        }

        newReq.body = JSON.stringify(body);
        console.log("修改后的Body:", newReq.body); // 调试日志
      } catch (e) {
        console.log(`Body处理失败: ${e}`);
      }
    }

    return { ...newReq, url: url.toString() };
  } catch (e) {
    console.log(`全局错误: ${e.stack}`);
    return request;
  }
}

// == 代理工具适配 ==
if (typeof $task !== 'undefined') {
  $done(rewriteRequest($request));
} else if (typeof $httpClient !== 'undefined') {
  $httpClient.onRequest((req) => $done(rewriteRequest(req)));
}