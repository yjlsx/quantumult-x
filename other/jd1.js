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
 * Quantumult X 脚本: 终极高可配置订单信息修改脚本 (V9 - 适配用户响应体)
 * 核心功能: 
 * 1. 精确替换订单号。
 * 2. 精确替换下单时间、支付时间和完成/送达时间。
 * 3. 价格明细调整到 -¥ 10.00 并确保最终实付 ¥ 25.24。
 */

let obj = JSON.parse($response.body);

// =======================================================
// 【配置区】请根据您提供的响应体进行配置
// =======================================================

const CONFIG = {
    // ---- 订单号修改 ----
    ENABLE_ORDER_ID_REPLACE: true,
    // 原始订单号 (从响应体中提取)
    ORDER_ID_ORIGINAL: '342228745359', 
    // 目标订单号
    ORDER_ID_TARGET: '345882584156',

    // ---- 时间相关修改 (三个时间点精确替换) ----
    ENABLE_TIME_REPLACE: true, 
    
    // 1. 【下单时间】 (从 orderCommonVo.dateSubmit 提取)
    ORDER_ORIGINAL_DATETIME: '2025-11-04 18:04:55', 
    ORDER_TARGET_DATETIME: '2025-11-05 10:05:30', 
    
    // 2. 【支付时间】 (从 summaryList 提取)
    PAYMENT_ORIGINAL_DATETIME: '2025-11-04 18:05:11', 
    PAYMENT_TARGET_DATETIME: '2025-11-05 10:06:00', 
    
    // 3. 【完成/送达时间】 (从 orderCommonVo.orderCompleteTime/progressList 提取)
    COMPLETE_ORIGINAL_DATETIME: '2025-11-04 18:35:12', // orderCompleteTime
    COMPLETE_TARGET_DATETIME: '2025-11-05 10:45:12', 

    // 期望配送时间段 (格式：HH:MM-HH:MM)
    NEW_DELIVERY_TIME: "10:30-11:30", 

    // ---- 店铺/地址/营业时间修改 (使用目标值) ----
    ENABLE_SHOP_INFO_REPLACE: true, 
    NEW_SHOP_NAME: "露缘巴蜀麻辣香锅（百家商业街店）",
    NEW_BUSINESS_HOURS: "10:00-23:59",
    NEW_SHOP_ADDRESS: "云南省昆明市官渡区六甲街道办事处陈家社区居委会陈家营村N01-03号商铺",
    
    // ---- 价格相关修改 (已为您设置好，最终实付 ¥ 25.24) ----
    ENABLE_PRICE_REPLACE: true, 
    NEW_SHOULD_PAY: "25.24", 
    NEW_FACT_PRICE: "25.24", 
    
    // 价格明细调整目标
    TARGET_DISCOUNT_INDEX: 4,      
    TARGET_DISCOUNT_VALUE: "10.00",
    DISCOUNT_TO_REMOVE_INDEX: 5    
};


// =======================================================
// 【核心逻辑】
// =======================================================

/**
 * 替换所有已知的原始时间字符串为目标时间字符串。
 * @param {string} data - 包含时间信息的字符串。
 * @returns {string} 替换后的字符串。
 */
function replaceAllTimes(data) {
    if (!CONFIG.ENABLE_TIME_REPLACE || typeof data !== 'string') return data;
    
    let modifiedData = data;
    
    // 辅助函数：安全地创建并执行替换
    const performReplacement = (original, target) => {
        if (original && target) {
            // 使用正则表达式进行全局替换，并转义特殊字符
            const regex = new RegExp(original.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'); 
            modifiedData = modifiedData.replace(regex, target);
        }
    };
    
    // 替换所有已知的精确时间点
    performReplacement(CONFIG.ORDER_ORIGINAL_DATETIME, CONFIG.ORDER_TARGET_DATETIME);
    performReplacement(CONFIG.PAYMENT_ORIGINAL_DATETIME, CONFIG.PAYMENT_TARGET_DATETIME);
    performReplacement(CONFIG.COMPLETE_ORIGINAL_DATETIME, CONFIG.COMPLETE_TARGET_DATETIME);
    
    // 针对进度列表中 '2025-11-04 18:35:11' 的特殊替换（送达时间）
    performReplacement('2025-11-04 18:35:11', CONFIG.COMPLETE_TARGET_DATETIME.replace('22:00:00', '21:59:59')); // 比完成时间早1秒

    return modifiedData;
}

/**
 * 替换所有非时间类的字段，包括订单号和店铺名。
 * @param {string} data - 包含字段信息的字符串。
 * @returns {string} 替换后的字符串。
 */
function replaceAllFields(data) {
    if (typeof data !== 'string') return data;
    let modifiedData = data;

    // 1. 替换订单号
    if (CONFIG.ENABLE_ORDER_ID_REPLACE && CONFIG.ORDER_ID_ORIGINAL && CONFIG.ORDER_ID_TARGET) {
        const idRegex = new RegExp(CONFIG.ORDER_ID_ORIGINAL.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        modifiedData = modifiedData.replace(idRegex, CONFIG.ORDER_ID_TARGET);
    }

    // 2. 替换店铺名称
    if (CONFIG.ENABLE_SHOP_INFO_REPLACE && CONFIG.ORIGINAL_SHOP_NAME && CONFIG.NEW_SHOP_NAME) {
        const shopRegex = new RegExp(CONFIG.ORIGINAL_SHOP_NAME.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        modifiedData = modifiedData.replace(shopRegex, CONFIG.NEW_SHOP_NAME);
    }
    
    return modifiedData;
}

/**
 * 价格明细修复函数 (仅用于详情页)
 * @param {object} body - orderPriceInfo 对象。
 */
function fixPriceDetails(body) {
    if (!CONFIG.ENABLE_PRICE_REPLACE || !body || !Array.isArray(body.billsList)) return;

    let billsList = body.billsList;
    
    // 1. 移除指定的优惠项 (DISCOUNT_TO_REMOVE_INDEX)
    if (CONFIG.DISCOUNT_TO_REMOVE_INDEX < billsList.length && billsList[CONFIG.DISCOUNT_TO_REMOVE_INDEX].money.startsWith('-')) {
        billsList.splice(CONFIG.DISCOUNT_TO_REMOVE_INDEX, 1);
    }
    
    // 2. 调整目标优惠项 1 的金额 (TARGET_DISCOUNT_INDEX)
    if (CONFIG.TARGET_DISCOUNT_INDEX < billsList.length) {
        let item = billsList[CONFIG.TARGET_DISCOUNT_INDEX];
        if (item.money.startsWith('-')) {
            item.money = `- ¥ ${CONFIG.TARGET_DISCOUNT_VALUE}`;
        }
    }
}


try {
    const url = $request.url;

    // ----------------------------------------------------
    // 1. order_list_m 接口修改 (订单列表)
    // ----------------------------------------------------
    if (url.includes('functionId=order_list_m')) {
        if (obj.body && Array.isArray(obj.body.orderList) && obj.body.orderList.length > 0) {
            
            // 处理第一个订单
            let firstOrder = obj.body.orderList[0];
            
            // 订单号修改
            if (CONFIG.ENABLE_ORDER_ID_REPLACE && firstOrder.orderId) {
                firstOrder.orderId = CONFIG.ORDER_ID_TARGET;
                // 同时修改订单详情链接中的 orderId
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
                firstOrder.shopInfo.shopName = CONFIG.NEW_SHOP_NAME; 
            }
            // 同时修改商品列表中的店铺名
            if (CONFIG.ENABLE_SHOP_INFO_REPLACE && Array.isArray(firstOrder.wareInfoList)) {
                 firstOrder.wareInfoList.forEach(ware => {
                     // order_list_m 接口的商品列表没有 shopName 字段，无需修改
                 });
            }

            // 【修复点】实付金额强制覆盖
            if (CONFIG.ENABLE_PRICE_REPLACE) {
                 firstOrder.shouldPay = CONFIG.NEW_SHOULD_PAY; 
                 // 列表页的价格通常显示在 orderStatusInfo.stateTip 或 otherInfo，但您的响应体只在 shouldPay 中，已覆盖。
            }
        }
    }
    
    // ----------------------------------------------------
    // 2. order_detail_m 接口修改 (订单详情)
    // ----------------------------------------------------
    else if (url.includes('functionId=order_detail_m')) {
        
        // **价格明细调整**
        if (obj.body && obj.body.orderPriceInfo) {
            fixPriceDetails(obj.body.orderPriceInfo);
            obj.body.orderPriceInfo.factPrice = CONFIG.NEW_FACT_PRICE; // 覆盖实付金额
        }

        // 订单号修改
        if (CONFIG.ENABLE_ORDER_ID_REPLACE && obj.body && obj.body.orderCommonVo) {
             obj.body.orderCommonVo.orderId = CONFIG.ORDER_ID_TARGET;
        }

        // a. 【时间】修改 orderCommonVo 和 progressList
        if (CONFIG.ENABLE_TIME_REPLACE && obj.body) {
            if (obj.body.orderCommonVo) {
                obj.body.orderCommonVo.dateSubmit = replaceAllTimes(obj.body.orderCommonVo.dateSubmit); // 下单时间
                obj.body.orderCommonVo.orderCompleteTime = replaceAllTimes(obj.body.orderCommonVo.orderCompleteTime); // 完成时间
            }
            if (Array.isArray(obj.body.progressList)) {
                obj.body.progressList.forEach(item => { 
                    if(item.tip) {
                        item.tip = replaceAllTimes(item.tip); // 进度/送达时间点
                    }
                });
            }
        }
        
        // b. 【店铺】修改 shopList 里的店铺名称等
        if (CONFIG.ENABLE_SHOP_INFO_REPLACE && obj.body && Array.isArray(obj.body.shopList) && obj.body.shopList.length > 0) {
            obj.body.shopList[0].shopName = CONFIG.NEW_SHOP_NAME;
            
            if (Array.isArray(obj.body.shopList[0].orderWareList)) {
                obj.body.shopList[0].orderWareList.forEach(ware => {
                    ware.shopName = CONFIG.NEW_SHOP_NAME; // 修改商品下的店铺名称
                });
            }
        }
        
        // c. 【多项】修改 summaryList (下单时间/支付时间/期望配送时间/订单编号/店铺信息)
        if (obj.body && Array.isArray(obj.body.summaryList)) {
            obj.body.summaryList.forEach(item => {
                if (!item.content) return;
                
                // 1. 通用字段替换 (包含订单号和店铺名)
                item.content = replaceAllFields(item.content);
                
                // 2. 替换所有时间点
                if (CONFIG.ENABLE_TIME_REPLACE) {
                    item.content = replaceAllTimes(item.content);
                }

                // 3. 特殊处理期望配送时间
                if (CONFIG.ENABLE_TIME_REPLACE && item.title === '期望配送时间：') {
                    // 替换时间段，但保留替换后的日期部分
                    let datePartMatch = item.content.match(/^\d{4}-\d{2}-\d{2}/);
                    let datePart = datePartMatch ? datePartMatch[0] : '';
                    item.content = (datePart + " " + CONFIG.NEW_DELIVERY_TIME).trim();
                }

                // 4. 替换店铺信息
                if (CONFIG.ENABLE_SHOP_INFO_REPLACE) {
                    switch (item.title) {
                        case '营业时间：': item.content = CONFIG.NEW_BUSINESS_HOURS; break;
                        case '门店名称：': item.content = CONFIG.NEW_SHOP_NAME; break;
                        case '门店地址：': item.content = CONFIG.NEW_SHOP_ADDRESS; break;
                    }
                }
            });
        }

        // d. 【运费详情】修改运费详情中的店铺名称
        if (CONFIG.ENABLE_SHOP_INFO_REPLACE && obj.body && obj.body.orderPriceInfo && Array.isArray(obj.body.orderPriceInfo.freightFeeInfoVoList)) {
            obj.body.orderPriceInfo.freightFeeInfoVoList.forEach(item => {
                item.shopName = CONFIG.NEW_SHOP_NAME;
            });
        }
    }
    
    $done({body: JSON.stringify(obj)});

} catch (e) {
    console.log(`[jd_custom_modify] Error: ${e.message}`);
    $done({}); 
}