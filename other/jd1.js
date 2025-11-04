/*
[rewrite_local]
# 匹配订单列表接口：order_list_m
^https?:\/\/[^\/]*\.jd\.com\/client\.action\?.*functionId=order_list_m\b url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd1.js

# 匹配订单详情接口：order_detail_m
^https?:\/\/[^\/]*\.jd\.com\/client\.action\?.*functionId=order_detail_m\b url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd1.js



[mitm]
hostname = api.m.jd.com
*/


/*
 * Quantumult X 脚本: 店铺信息修改
 * 作用: 
 * 1. 修改订单详情和订单列表中的店铺名称。
 * 2. 修改订单详情中的门店地址。
 * 匹配接口: order_list_m 和 order_detail_m
 */

let obj = JSON.parse($response.body);

// =======================================================
// 【配置区】要替换的新信息
// =======================================================
const NEW_SHOP_NAME = "露缘巴蜀麻辣香锅（百家商业街店）";
const NEW_SHOP_ADDRESS = "云南省昆明市官渡区六甲街道办事处陈家社区居委会陈家营村N01-03号商铺";
const NEW_BUSINESS_HOURS = "10:00-23:59"; // 虽然您说只改店名和地址，但营业时间通常和店名地址一起出现，此处一并修改以保证数据一致性。


try {
    // ----------------------------------------------------
    // 1. 针对 order_list_m 接口的修改 (订单列表)
    // ----------------------------------------------------
    if ($request.url.includes('functionId=order_list_m')) {
        if (obj.body && Array.isArray(obj.body.orderList) && obj.body.orderList.length > 0) {
            let firstOrder = obj.body.orderList[0];
            
            // 修改店铺名称 (在列表页展示)
            if (firstOrder.shopInfo && firstOrder.shopInfo.shopName) {
                firstOrder.shopInfo.shopName = NEW_SHOP_NAME;
            }
        }
    }
    
    // ----------------------------------------------------
    // 2. 针对 order_detail_m 接口的修改 (订单详情)
    // ----------------------------------------------------
    if ($request.url.includes('functionId=order_detail_m')) {
        
        // a. 修改 shopList 里的店铺名称
        if (obj.body && Array.isArray(obj.body.shopList) && obj.body.shopList.length > 0) {
            let firstShop = obj.body.shopList[0];
            if (firstShop.shopName) {
                firstShop.shopName = NEW_SHOP_NAME;
            }
        }

        // b. 修改 summaryList (门店名称, 门店地址, 营业时间)
        if (obj.body && Array.isArray(obj.body.summaryList)) {
            obj.body.summaryList.forEach(item => {
                if (!item.content) return;

                switch (item.title) {
                    case '营业时间：':
                        // 替换营业时间
                        item.content = NEW_BUSINESS_HOURS;
                        break;
                    case '门店名称：':
                        // 替换门店名称
                        item.content = NEW_SHOP_NAME;
                        break;
                    case '门店地址：':
                        // 替换门店地址
                        item.content = NEW_SHOP_ADDRESS;
                        break;
                }
            });
        }
    }
    
    // 返回修改后的响应体
    $done({body: JSON.stringify(obj)});

} catch (e) {
    console.log(`[jd_shop_info_modify] Error: ${e.message}`);
    $done({}); 
}