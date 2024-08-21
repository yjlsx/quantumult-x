// Quantumult X rewrite script
/*
[rewrite]
^https:\/\/cupid\.51jobapp\.com\/open\/my-page\/v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51jobapp\.com\/open\/vip\/competitiveness url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51jobapp\.com\/open\/vip url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51jobapp\.com\/open\/equity\/equity\/duration url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51jobapp\.com\/open\/product\/product-list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51job\.com\/open\/product\/monthly-card\/rec url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51jobapp\.com\/open\/job-apply url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/appapi\.51jobapp\.com\/api\/payservice\/get_ios_service_info\.php url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js


*
[mitm]
hostname = cupid.51jobapp.com, cupid.51job.com, appapi.51jobapp.com

*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

// 根据不同的 URL 修改响应体内容
try {
    if (url.includes('/open/my-page/v2')) {
        if (obj.resultbody) {
            obj.resultbody.vipInfo.isVip = true;
            obj.resultbody.vipInfo.effectiveDate = "2099-12-31T23:59:59Z";
            obj.resultbody.showManagementPage = 2;
        }
    } else if (url.includes('/open/vip')) {
        if (obj.resultbody.hasCompetitivenessService) {
            obj.resultbody.hasCompetitivenessService = true;
            obj.resultbody.remainCompetitivenessCount = true;
            obj.resultbody.isVip = true;
         }
        if (obj.resultbody.isVip) {
            obj.resultbody.isVip = true;
            obj.resultbody.effectiveDate = "2099-12-31T23:59:59Z";
        }
        if (obj.resultbody.interestedInVO) {
            obj.resultbody.interestedInVO.maxViewedCount = 99999;
        }
        if (obj.resultbody.vipInfoVO) {
            obj.resultbody.vipInfoVO.isVip = true;
            obj.resultbody.vipInfoVO.effectiveDate = "2099-12-31T23:59:59Z";
        }
        if (obj.resultbody.competitivenessVO) {
            obj.resultbody.competitivenessVO.maxViewedCount = 99999;
            obj.resultbody.competitivenessVO.isCompetitivenessAnalysis = true;
        }
        if (obj.resultbody.resumeRefreshVO) {
            obj.resultbody.resumeRefreshVO.maxRefreshCount = 99999;
        }
    }else if (url.includes('/open/equity/equity/duration')) {
        if (obj.resultbody) {
            obj.resultbody.opened = true;
        }
    }else if (url.includes('/api/payservice/get_ios_service_info.php')) {
        if (obj.hadbuy) {
            obj.hadbuy = "1";
        }
    }else if (url.includes('/open/job-apply')) {
        if (obj.resultbody) {
            obj.resultbody.buyService = true;
            obj.resultbody.showOptimize = true;
        }
    }else if (url.includes('/open/product/monthly-card/rec')) {
      obj.resultbody.productDetailList.forEach(product => {
          product.skuList.forEach(sku => {
             sku.price = 0;
             sku.originalPrice = 0;
                });
           });
    }else if (url.includes('/open/product/product-list')) {
    if (obj.resultbody && obj.resultbody.productDetailList) {
    obj.resultbody.productDetailList.forEach(product => {
        if (product.skuList) {
            product.skuList.forEach(sku => {
                sku.price = 0;
            });
        }
    });
    }   
  }
} catch (e) {
    // 忽略错误，继续处理其他部分
}



body = JSON.stringify(obj);
$done({body});

