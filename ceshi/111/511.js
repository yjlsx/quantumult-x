// Quantumult X rewrite script
/*
[rewrite]
^https:\/\/cupid\.51job\.com\/open\/product\/monthly-card\/rec url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/511.js
^https:\/\/cupid\.51job\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/511.js

^https:\/\/cupid\.51job\.com\/open\/order\/vip\/pre-check url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/511.js
^https:\/\/cupid\.51job\.com\/open\/order\/order\/create url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/511.js
^https:\/\/appapi\.51jobapp\.com\/api\/3\/util.*$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js
^https:\/\/cupid\.51jobapp\.com\/open\/order\/ios\/order\/create url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/511.js






*
[mitm]
hostname = cupid.51jobapp.com, cupid.51job.com, appapi.51jobapp.com

*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

try {

    if (url.includes('/open/order/vip/pre-check')) {
            obj.resultbody.existFreeOrder = false;
    }

    if (url.includes('/open/order/order/create')) {
            obj.status = "1";
            obj.message = "成功";
    }

    if (url.includes('/open/order/ios/order/create')) {
            obj.result = "1";
            obj.status = "1";
            obj.message = "支付成功";
    }


    if (url.includes('/open/noauth/popUp/getCommonPopUp')) {
        if (obj.resultbody) {
        obj.resultbody.forEach(item => {
            if (item.popUpVO) {
                item.popUpVO.jumpUrl = ""; // 清空 jumpUrl
               }
          });
      }
   }


    if (url.includes('/getCoinsAmount') || url.includes('/getExpiringCoins')) {
            obj.resultbody = 9999;
    }

    if (url.includes('/reward/deductionCoins')) {
            obj.status = "1";
            obj.message = "成功";
            obj.resultbody.taskRewardVO.dailyCurrentInventory = 10;
            obj.resultbody.taskRewardVO.canExchange = true;
            obj.resultbody.exchangeResult.code = "1";
           obj.resultbody.exchangeResult.msg = "已兑换";
           obj.resultbody.exchangeResult.rewardExchangeWord = "VIP套餐月卡";
           obj.resultbody.taskRewardVO.redemptionWard = "VIP套餐月卡";
  obj.resultbody.taskRewardVO.coinsCnt = 1000;            // 奖励硬币数，可根据实际逻辑调整
  obj.resultbody.taskRewardVO.countMsg = "30天";           // 显示期限
  obj.resultbody.taskRewardVO.count = 30;                 // 数量调整为 30 天
  obj.resultbody.taskRewardVO.estimatedAchieveMentTime = 2; // 预计达成时间（示例值）
  obj.resultbody.taskRewardVO.value = 58;                  // 奖励价值（示例值）
  obj.resultbody.taskRewardVO.rewardDictId = 17;          // 奖励字典 ID（示例值）
  obj.resultbody.taskRewardVO.rewardTypeName = "VIP套餐";   // 奖励类型名称，根据实际情况调整

    }

    if (url.includes('/user-task/main')) {
            obj.resultbody.amount = 9999;
            obj.resultbody.scoreTip.isExposure = true;
    }

    // 修改 /open/product/monthly-card/rec 的响应体
    if (url.includes('/open/product/monthly-card/rec')) {
        if (obj.resultbody && obj.resultbody.productDetailList) {
            obj.resultbody.productDetailList.forEach(product => {
                if (product.skuList) {
                    product.skuList.forEach(sku => {
                        sku.price = 0;
                        sku.originalPrice = 0;
                    });
                }
            });
        }
    }

    // 修改 /open/product/product-list 的响应体
    if (url.includes('/open/product/product-list')) {
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
$done({ body });


