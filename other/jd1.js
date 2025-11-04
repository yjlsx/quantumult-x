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
 * Quantumult X 脚本: 终极高可配置订单信息修改脚本 (V15 - 修复期望配送时间日期)
 * 核心功能: 
 * 1. 修复订单列表页价格重复显示的问题。
 * 2. 修复期望配送时间日期未随下单时间变化的问题。
 * 3. 包含订单号、时间、店铺信息、价格的全部自定义逻辑和健壮性检查。
 */

// -------------------------------------------------------
// 【V15 健壮性检查】防止 JSON Parse error
// -------------------------------------------------------
const body = $response.body;
if (!body) {
    console.log("[JD Modify] Error: Response body is empty or undefined.");
    $done({});
    return;
}

let obj = {};
try {
    obj = JSON.parse(body);
} catch (e) {
    console.log(`[JD Modify] JSON Parse Error: ${e.message}. URL: ${$request.url}`);
    $done({});
    return;
}
// -------------------------------------------------------


// =======================================================
// 【配置区】保持您的目标配置不变
// =======================================================

const CONFIG = {
    // ---- 订单号修改 ----
    ENABLE_ORDER_ID_REPLACE: true,
    ORDER_ID_ORIGINAL: '342228745359', 
    ORDER_ID_TARGET: '345882584156', 

    // ---- 时间相关修改 (精确替换) ----
    ENABLE_TIME_REPLACE: true, 
    ORDER_ORIGINAL_DATETIME: '2025-11-04 18:04:55', 
    ORDER_TARGET_DATETIME: '2025-11-05 10:05:30', // <--- 目标日期是 11-05
    PAYMENT_ORIGINAL_DATETIME: '2025-11-04 18:05:11', 
    PAYMENT_TARGET_DATETIME: '2025-11-05 10:06:00', 
    COMPLETE_ORIGINAL_DATETIME: '2025-11-04 18:35:12', 
    COMPLETE_TARGET_DATETIME: '2025-11-05 10:45:12', 
    NEW_DELIVERY_TIME: "10:30-11:30", 

    // ---- 店铺/地址/营业时间修改 ----
    ENABLE_SHOP_INFO_REPLACE: true, 
    ORIGINAL_SHOP_NAME: "一家为你现炒的干锅排骨·章幺幺（昆明官渡区融创店）", 
    NEW_SHOP_NAME: "露缘巴蜀麻辣香锅（百家商业街店）",
    NEW_BUSINESS_HOURS: "10:00-23:59",
    NEW_SHOP_ADDRESS: "云南省昆明市官渡区六甲街道办事处陈家社区居委会陈家营村N01-03号商铺",
    
    // ---- 价格相关修改 (只修改最终金额，不碰明细) ----
    ENABLE_PRICE_REPLACE: true, 
    ORIGINAL_FACT_PRICE: "21.24",
    NEW_SHOULD_PAY: "25.24", 
    NEW_FACT_PRICE: "25.24", 
};


// =======================================================
// 【核心逻辑】
// =======================================================

// 提取目标下单日期 (例如 '2025-11-05')
const TARGET_DATE_PART = CONFIG.ORDER_TARGET_DATETIME.substring(0, 10);

function replaceAllTimes(data) {
    if (!CONFIG.ENABLE_TIME_REPLACE || typeof data !== 'string') return data;
    
    let modifiedData = data;
    
    const performReplacement = (original, target) => {
        if (original && target) {
            const regex = new RegExp(original.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'); 
            modifiedData = modifiedData.replace(regex, target);
        }
    };
    
    performReplacement(CONFIG.ORDER_ORIGINAL_DATETIME, CONFIG.ORDER_TARGET_DATETIME);
    performReplacement(CONFIG.PAYMENT_ORIGINAL_DATETIME, CONFIG.PAYMENT_TARGET_DATETIME);
    performReplacement(CONFIG.COMPLETE_ORIGINAL_DATETIME, CONFIG.COMPLETE_TARGET_DATETIME);
    
    if (CONFIG.ENABLE_TIME_REPLACE && CONFIG.COMPLETE_ORIGINAL_DATETIME) {
        const originalDate = CONFIG.COMPLETE_ORIGINAL_DATETIME.substring(0, 10); 
        const targetDeliveryTime = CONFIG.COMPLETE_TARGET_DATETIME.replace(/:\d{2}$/, ':11'); 
        
        const deliveryRegex = new RegExp(originalDate + '\\s\\d{2}:\\d{2}:\\d{2}', 'g');
        modifiedData = modifiedData.replace(deliveryRegex, CONFIG.ORDER_TARGET_DATETIME.substring(0, 10) + ' ' + targetDeliveryTime.substring(11));
    }

    return modifiedData;
}

function replaceAllFields(data) {
    if (typeof data !== 'string') return data;
    let modifiedData = data;

    if (CONFIG.ENABLE_ORDER_ID_REPLACE && CONFIG.ORDER_ID_ORIGINAL && CONFIG.ORDER_ID_TARGET) {
        const idRegex = new RegExp(CONFIG.ORDER_ID_ORIGINAL.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        modifiedData = modifiedData.replace(idRegex, CONFIG.ORDER_ID_TARGET);
    }

    if (CONFIG.ENABLE_SHOP_INFO_REPLACE && CONFIG.ORIGINAL_SHOP_NAME && CONFIG.NEW_SHOP_NAME) {
        const shopRegex = new RegExp(CONFIG.ORIGINAL_SHOP_NAME.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        modifiedData = modifiedData.replace(shopRegex, CONFIG.NEW_SHOP_NAME);
    }
    
    return modifiedData;
}


try {
    const url = $request.url;

    // ----------------------------------------------------
    // 1. order_list_m 接口修改 (订单列表)
    // ----------------------------------------------------
    if (url.includes('functionId=order_list_m')) {
        if (obj.body && Array.isArray(obj.body.orderList) && obj.body.orderList.length > 0) {
            let firstOrder = obj.body.orderList[0];
            
            // 订单号修改
            if (CONFIG.ENABLE_ORDER_ID_REPLACE && firstOrder.orderId) {
                firstOrder.orderId = CONFIG.ORDER_ID_TARGET;
                if(firstOrder.orderDetailLink && firstOrder.orderDetailLink.url) {
                    firstOrder.orderDetailLink.url = firstOrder.orderDetailLink.url.replace(CONFIG.ORDER_ID_ORIGINAL, CONFIG.ORDER_ID_TARGET);
                }
            }

            // 下单时间修改
            if (CONFIG.ENABLE_TIME_REPLACE && firstOrder.submitDate) {
                firstOrder.submitDate = replaceAllTimes(firstOrder.submitDate); 
            }

            // 店铺名称修改
            if (CONFIG.ENABLE_SHOP_INFO_REPLACE && firstOrder.shopInfo && firstOrder.shopInfo.shopName) {
                firstOrder.shopInfo.shopName = replaceAllFields(firstOrder.shopInfo.shopName);
            }
            
            // 实付金额强制覆盖 (V14 修复：只修改 shouldPay)
            if (CONFIG.ENABLE_PRICE_REPLACE) {
                 firstOrder.shouldPay = CONFIG.NEW_SHOULD_PAY; 
            }
        }
    }
    
    // ----------------------------------------------------
    // 2. order_detail_m 接口修改 (订单详情)
    // ----------------------------------------------------
    else if (url.includes('functionId=order_detail_m')) {
        
        // 价格修改
        if (CONFIG.ENABLE_PRICE_REPLACE && obj.body && obj.body.orderPriceInfo) {
            obj.body.orderPriceInfo.factPrice = CONFIG.NEW_FACT_PRICE; 
        }

        // 订单号修改
        if (CONFIG.ENABLE_ORDER_ID_REPLACE && obj.body && obj.body.orderCommonVo) {
             obj.body.orderCommonVo.orderId = CONFIG.ORDER_ID_TARGET;
        }

        // 时间修改
        if (CONFIG.ENABLE_TIME_REPLACE && obj.body) {
            if (obj.body.orderCommonVo) {
                obj.body.orderCommonVo.dateSubmit = replaceAllTimes(obj.body.orderCommonVo.dateSubmit);
                obj.body.orderCommonVo.orderCompleteTime = replaceAllTimes(obj.body.orderCommonVo.orderCompleteTime);
            }
            if (Array.isArray(obj.body.progressList)) {
                obj.body.progressList.forEach(item => { 
                    if(item.tip) {
                        item.tip = replaceAllTimes(item.tip);
                    }
                });
            }
        }
        
        // 店铺修改
        if (CONFIG.ENABLE_SHOP_INFO_REPLACE && obj.body && Array.isArray(obj.body.shopList) && obj.body.shopList.length > 0) {
            const shopListStr = replaceAllFields(JSON.stringify(obj.body.shopList[0]));
            obj.body.shopList[0] = JSON.parse(shopListStr);
        }

        // Summary List 多字段修改
        if (obj.body && Array.isArray(obj.body.summaryList)) {
            obj.body.summaryList.forEach(item => {
                if (!item.content) return;
                
                // 1. 通用字段替换 (订单号和店铺名)
                item.content = replaceAllFields(item.content);
                
                // 2. 替换所有时间点
                if (CONFIG.ENABLE_TIME_REPLACE) {
                    item.content = replaceAllTimes(item.content);
                }

                // 3. 特殊处理期望配送时间
                if (CONFIG.ENABLE_TIME_REPLACE && item.title === '期望配送时间：') {
                    // 【V15 修复】：强制使用目标下单日期，避免使用原始日期
                    item.content = (TARGET_DATE_PART + " " + CONFIG.NEW_DELIVERY_TIME).trim();
                }

                // 4. 替换店铺信息 (硬编码替换)
                if (CONFIG.ENABLE_SHOP_INFO_REPLACE) {
                    switch (item.title) {
                        case '营业时间：': item.content = CONFIG.NEW_BUSINESS_HOURS; break;
                        case '门店名称：': item.content = CONFIG.NEW_SHOP_NAME; break;
                        case '门店地址：': item.content = CONFIG.NEW_SHOP_ADDRESS; break;
                    }
                }
            });
        }
        
        // 运费详情修改店铺名称
        if (CONFIG.ENABLE_SHOP_INFO_REPLACE && obj.body && obj.body.orderPriceInfo && Array.isArray(obj.body.orderPriceInfo.freightFeeInfoVoList)) {
            obj.body.orderPriceInfo.freightFeeInfoVoList.forEach(item => {
                item.shopName = CONFIG.NEW_SHOP_NAME;
            });
        }
    }
    
    const finalBody = JSON.stringify(obj);
    if (finalBody === undefined) {
        throw new Error("JSON.stringify 结果为 undefined");
    }
    
    $done({body: finalBody});

} catch (e) {
    console.log(`[jd_custom_modify] Error: ${e.message}`);
    $done({}); 
}