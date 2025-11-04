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
 * Quantumult X 脚本: 终极高可配置订单信息修改脚本 (V12 - 修复详情页网络错误)
 * 核心功能: 
 * 1. 修复详情页 JSON 解析失败导致的网络请求错误。
 * 2. 确保订单列表页价格强制覆盖。
 * 3. 增强时间替换的通用性。
 */

let obj = JSON.parse($response.body);

// =======================================================
// 【配置区】请根据您提供的响应体和目标值进行配置
// =======================================================

const CONFIG = {
    // ---- 订单号修改 ----
    ENABLE_ORDER_ID_REPLACE: true,
    // 原始订单号 (从响应体中提取)
    ORDER_ID_ORIGINAL: '342228745359', 
    // 目标订单号 (已修改为您配置的新值)
    ORDER_ID_TARGET: '345882584156', 

    // ---- 时间相关修改 (精确替换) ----
    ENABLE_TIME_REPLACE: true, 
    
    // 1. 【下单时间】 (从 orderCommonVo.dateSubmit/orderList[0].submitDate 提取)
    ORDER_ORIGINAL_DATETIME: '2025-11-04 18:04:55', 
    ORDER_TARGET_DATETIME: '2025-11-05 10:05:30', 
    
    // 2. 【支付时间】 (从 summaryList 提取 - 仅在详情页)
    PAYMENT_ORIGINAL_DATETIME: '2025-11-04 18:05:11', 
    PAYMENT_TARGET_DATETIME: '2025-11-05 10:06:00', 
    
    // 3. 【完成/送达时间】 (从 orderCommonVo.orderCompleteTime/progressList 提取 - 仅在详情页)
    COMPLETE_ORIGINAL_DATETIME: '2025-11-04 18:35:12', 
    COMPLETE_TARGET_DATETIME: '2025-11-05 10:45:12', 

    // 期望配送时间段 (格式：HH:MM-HH:MM) - 仅在详情页
    NEW_DELIVERY_TIME: "10:30-11:30", 

    // ---- 店铺/地址/营业时间修改 ----
    ENABLE_SHOP_INFO_REPLACE: true, 
    // 【已添加】原始店铺名 (确保与响应体一致，解决 V9 缺少字段的问题)
    ORIGINAL_SHOP_NAME: "一家为你现炒的干锅排骨·章幺幺（昆明官渡区融创店）", 
    // 目标店铺名
    NEW_SHOP_NAME: "露缘巴蜀麻辣香锅（百家商业街店）",
    NEW_BUSINESS_HOURS: "10:00-23:59",
    NEW_SHOP_ADDRESS: "云南省昆明市官渡区六甲街道办事处陈家社区居委会陈家营村N01-03号商铺",
    
    // ---- 价格相关修改 ----
    ENABLE_PRICE_REPLACE: true, 
    // 原始实付金额 (列表页和详情页都出现)
    ORIGINAL_FACT_PRICE: "21.24",
    // 目标实付金额
    NEW_SHOULD_PAY: "25.24", 
    NEW_FACT_PRICE: "25.24", 
    
    // 价格明细调整目标 (详情页)
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
    
    const performReplacement = (original, target) => {
        if (original && target) {
            // 使用正则表达式进行全局替换
            const regex = new RegExp(original.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'); 
            modifiedData = modifiedData.replace(regex, target);
        }
    };
    
    performReplacement(CONFIG.ORDER_ORIGINAL_DATETIME, CONFIG.ORDER_TARGET_DATETIME);
    performReplacement(CONFIG.PAYMENT_ORIGINAL_DATETIME, CONFIG.PAYMENT_TARGET_DATETIME);
    performReplacement(CONFIG.COMPLETE_ORIGINAL_DATETIME, CONFIG.COMPLETE_TARGET_DATETIME);
    
    // 【V12 增强】：替换与 COMPLETE_ORIGINAL_DATETIME 日期相同，但时间略早的送达时间点
    if (CONFIG.ENABLE_TIME_REPLACE && CONFIG.COMPLETE_ORIGINAL_DATETIME) {
        // 提取原始送达日期 (例如 '2025-11-04')
        const originalDate = CONFIG.COMPLETE_ORIGINAL_DATETIME.substring(0, 10); 
        // 目标送达时间 (比目标完成时间早1秒)
        const targetDeliveryTime = CONFIG.COMPLETE_TARGET_DATETIME.replace(/:\d{2}$/, ':11'); // 示例：将 :12 替换为 :11
        
        // 查找原始送达日期 + 任意时间，并替换为目标日期和目标送达时间
        const deliveryRegex = new RegExp(originalDate + '\\s\\d{2}:\\d{2}:\\d{2}', 'g');
        modifiedData = modifiedData.replace(deliveryRegex, CONFIG.ORDER_TARGET_DATETIME.substring(0, 10) + ' ' + targetDeliveryTime.substring(11));
    }

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

            // 下单时间修改 (使用通用替换函数)
            if (CONFIG.ENABLE_TIME_REPLACE && firstOrder.submitDate) {
                firstOrder.submitDate = replaceAllTimes(firstOrder.submitDate); 
            }

            // 店铺名称修改 (使用通用替换函数，因为店铺名可能在多个子字段)
            if (CONFIG.ENABLE_SHOP_INFO_REPLACE && firstOrder.shopInfo && firstOrder.shopInfo.shopName) {
                firstOrder.shopInfo.shopName = replaceAllFields(firstOrder.shopInfo.shopName);
            }
            
            // 【V11 修复】实付金额强制覆盖
            if (CONFIG.ENABLE_PRICE_REPLACE) {
                 firstOrder.shouldPay = CONFIG.NEW_SHOULD_PAY; 
                 if (firstOrder.shouldPayTip === '实付') {
                    // 确保列表页的实付金额提示也更新
                    firstOrder.shouldPayTip = `实付￥${CONFIG.NEW_SHOULD_PAY}`;
                 }
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
            // 对整个对象进行一次通用替换，确保所有店铺名称字段都被修改
            const shopListStr = replaceAllFields(JSON.stringify(obj.body.shopList[0]));
            obj.body.shopList[0] = JSON.parse(shopListStr);
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
                    // 替换时间段，但保留替换后的日期部分 (注意这里依赖前面的替换，日期应该是目标日期)
                    let datePartMatch = item.content.match(/^\d{4}-\d{2}-\d{2}/);
                    let datePart = datePartMatch ? datePartMatch[0] : '';
                    item.content = (datePart + " " + CONFIG.NEW_DELIVERY_TIME).trim();
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

        // d. 【运费详情】修改运费详情中的店铺名称
        if (CONFIG.ENABLE_SHOP_INFO_REPLACE && obj.body && obj.body.orderPriceInfo && Array.isArray(obj.body.orderPriceInfo.freightFeeInfoVoList)) {
            obj.body.orderPriceInfo.freightFeeInfoVoList.forEach(item => {
                item.shopName = CONFIG.NEW_SHOP_NAME;
            });
        }
    }
    
    // 【V12 关键】：在 $done 之前，确保 JSON 是有效的
    const finalBody = JSON.stringify(obj);
    if (finalBody === undefined) {
        throw new Error("JSON.stringify 结果为 undefined");
    }
    
    $done({body: finalBody});

} catch (e) {
    console.log(`[jd_custom_modify] Error: ${e.message}`);
    // 如果发生错误，返回原始响应体，防止应用崩溃
    $done({}); 
}