/*

[rewrite_local]
# 美团外卖订单列表 - 重写响应体
^https:\/\/i\.waimai\.meituan\.com\/openh5\/order\/list\?.* url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/mt.js


# 美团外卖订单详情 - 重写响应体
^https:\/\/i\.waimai\.meituan\.com\/openh5\/order\/manager\/v3\/detail\?.* url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/mt.js

[mitm]
hostname = i.waimai.meituan.com, *.meituan.com

*/

/*
 * 美团外卖订单响应体重写脚本 (Quantumult X)
 * 目标：
 * 1. 统一修改指定店铺名称。
 * 2. 统一修改所有可见日期时间。
 * 3. 修正时间戳，确保订单详情时间正确显示。
 */

// --- 🎯 方便修改区 ---
const TARGET_SHOP_NAME = "武松醉鹅（鹅汁泡饭·南悦城店）";
const TARGET_DATE = "2025-11-05";
const TARGET_TIME = "10:52"; // 订单列表和时间戳的基础时间
const TARGET_ARRIVAL_TIME = "11月5日 11:30-12:20"; // 订单详情页的期望送达时间
// --------------------

// 订单详情修改项
const TARGET_ORDER_ID_NUM = 601849523259524586; 
// --------------------

// 自动生成字符串形式的订单号
const TARGET_ORDER_ID_STR = TARGET_ORDER_ID_NUM.toString();

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (!obj || obj.code !== 0 || !obj.data) {
        $done({});
    }

    if (url.includes("/openh5/order/list")) {
        // --- 🚀 订单列表接口重写逻辑：修改店铺名和时间 ---
        rewriteOrderList(obj.data.orderList);
        body = JSON.stringify(obj);
    } else if (url.includes("/openh5/order/manager/v3/detail")) {
        // --- 🚀 订单详情接口重写逻辑：仅修改订单号 ---
        rewriteOrderDetailID(obj.data);
        body = JSON.stringify(obj);
    }

    $done({body});

} catch (e) {
    console.log(`[美团外卖重写] JSON解析或重写失败: ${e.message}`);
    $done({}); 
}


/**
 * 订单列表 (order/list) 接口重写：修改店铺名和订单时间
 * @param {Array} orderList - 订单列表数组
 */
function rewriteOrderList(orderList) {
    if (Array.isArray(orderList) && orderList.length > 0) {
        orderList.forEach((order) => {
            
            // 1. 🎯 修改店铺名 (适用于所有订单)
            if (order.shopName) {
                order.shopName = TARGET_SHOP_NAME;
            }
            
            // 2. 🎯 统一修改时间 (OrderTime 字符串)
            if (order.orderTime) {
                // 替换日期部分，保留原始时间或使用 TARGET_TIME
                let oldTime = order.orderTime.split(' ')[1] || TARGET_TIME; 
                order.orderTime = `${TARGET_DATE} ${oldTime}`;
            }
            
            // ❗ 注意：不修改订单号 (mtOrderViewId, orderId)
        });
        console.log(`[美团外卖重写] 订单列表处理完成，店铺名和日期已修改。`);
    } else {
        console.log("[美团外卖重写] 订单列表为空或不是数组，跳过修改。");
    }
}

/**
 * 订单详情 (order/manager/v3/detail) 接口重写：仅修改订单号
 * @param {Object} data - 订单详情数据对象
 */
function rewriteOrderDetailID(data) {
    
    // --- 🎯 仅修改订单号 ---
    
    // 1. 修改数字类型订单ID (id)
    if (data.id) {
        data.id = TARGET_ORDER_ID_NUM;
    }
    
    // 2. 修改字符串类型订单ID (id_view)
    if (data.id_view) {
        data.id_view = TARGET_ORDER_ID_STR;
    }
    
    // 3. 修改另一个字符串类型订单ID (id_text)
    if (data.id_text) {
        data.id_text = TARGET_ORDER_ID_STR;
    }
    
    // ❗ 注意：不修改 poi_name, order_time, expected_arrival_time 等任何其他字段

    console.log(`[美团外卖重写] 订单详情订单号已修改为: ${TARGET_ORDER_ID_STR}`);
}