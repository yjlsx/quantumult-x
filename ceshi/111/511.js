// Quantumult X rewrite script
/*
[rewrite]
^https:\/\/cupid\.51job\.com\/open\/product\/monthly-card\/rec url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51job\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js

^https:\/\/cupid\.51job\.com\/open\/order\/vip\/pre-check url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51job\.com\/open\/order\/order\/create  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/appapi\.51jobapp\.com\/api\/3\/util.*$ url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51.js






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


    if (url.includes('/open/noauth/popUp/getCommonPopUp')) {
        if (obj.resultbody) {
        obj.resultbody.forEach(item => {
            if (item.popUpVO) {
                item.popUpVO.jumpUrl = ""; // 清空 jumpUrl
               }
          });
      }
   }

    // 修改 /open/product/monthly-card/rec 的响应体
    if (url.includes('/open/product/monthly-card/rec')) {
        if (obj.resultbody && obj.resultbody.productDetailList) {
            obj.resultbody.productDetailList.forEach(product => {
                if (product.skuList) {
                    product.skuList.forEach(sku => {
                        sku.price = 0.01;
                        sku.originalPrice = 0.01;
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
                        sku.price = 0.01;
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


