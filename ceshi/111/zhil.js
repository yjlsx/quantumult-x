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
  REFERRER_ENTRY: "VipV4.0_VIPCard",  // 强制入口标识
  REF_CODE: "5073",                   // 关联推荐码
  USE_COIN_AMOUNT: 0                  // 积分清零
};

// == 动态参数生成器 ==
const DynamicUtils = {
  // 生成符合智联格式的 _v
  generateV() {
    return `0.${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
  },

  // 生成合规的请求ID
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

    // -------------------------------
    // 第一部分：修改URL参数
    // -------------------------------
    url.searchParams.set('_v', DynamicUtils.generateV());
    url.searchParams.set('x-zp-page-request-id', DynamicUtils.generateRequestId());

    // -------------------------------
    // 第二部分：修改Headers
    // -------------------------------
    // 处理Referer
    if (newReq.headers?.Referer) {
      newReq.headers.Referer = newReq.headers.Referer
        .replace(/referrerEntry=[^&]+/g, `referrerEntry=${CONFIG.REFERRER_ENTRY}`)
        .replace(/refcode=[^&]+/g, `refcode=${CONFIG.REF_CODE}`);
    }

    // 处理Cookie
    if (newReq.headers?.Cookie) {
      newReq.headers.Cookie = newReq.headers.Cookie
        .replace(/referrerEntry=[^;]+/g, `referrerEntry=${CONFIG.REFERRER_ENTRY}`)
        .replace(/refcode=[^;]+/g, `refcode=${CONFIG.REF_CODE}`);
    }

    // -------------------------------
    // 第三部分：修改请求体
    // -------------------------------
    if (newReq.body) {
      try {
        let body = JSON.parse(newReq.body);
        
        // 修改remark字段
        if (body.remark) {
          const remark = JSON.parse(body.remark);
          
          remark.forEach(item => {
            // 入口标识修改
            if (item.contentType === 'referrerEntry') {
              item.content = CONFIG.REFERRER_ENTRY;
            }
            
            // 推荐码修改
            if (item.contentType === 'refcode') {
              item.content = CONFIG.REF_CODE;
            }
            
            // 积分清零 (新增功能)
            if (item.contentType === 'useCoinAmount') {
              item.content = CONFIG.USE_COIN_AMOUNT;
            }
            
            // 处理嵌套的pageUrl参数
            if (item.contentType === 'pageUrl') {
              item.content = item.content
                .replace(/referrerEntry=[^&]+/g, `referrerEntry=${CONFIG.REFERRER_ENTRY}`)
                .replace(/refcode=[^&]+/g, `refcode=${CONFIG.REF_CODE}`);
            }
          });
          
          body.remark = JSON.stringify(remark);
        }

        // 处理外层积分字段（如果存在）
        if (body.useCoins !== undefined) {
          body.useCoins = CONFIG.USE_COIN_AMOUNT;
        }

        newReq.body = JSON.stringify(body);
      } catch (e) {
        console.log(`Body处理失败: ${e}`);
      }
    }

    // -------------------------------
    // 返回修改后的请求
    // -------------------------------
    return {
      ...newReq,
      url: url.toString(),
      headers: newReq.headers,
      body: newReq.body
    };

  } catch (e) {
    console.log(`全局错误: ${e.stack}`);
    return request;
  }
}

// == 代理工具适配 ==
if (typeof $task !== 'undefined') {
  // Quantumult X
  $done(rewriteRequest($request));
} else if (typeof $httpClient !== 'undefined') {
  // Surge/Loon
  $httpClient.onRequest((req) => $done(rewriteRequest(req)));
}