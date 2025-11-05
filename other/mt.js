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

// 订单号修改：只需要修改这个数字，脚本会自动生成字符串形式
const TARGET_ORDER_ID_NUM = 888888888888888888; 
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
        // --- 🚀 订单列表接口重写逻辑：仅修改第一个订单 ---
        rewriteOrderList(obj.data.orderList);
        body = JSON.stringify(obj);
    } else if (url.includes("/openh5/order/manager/v3/detail")) {
        // --- 🚀 订单详情接口重写逻辑：对应被修改的那个订单 ---
        rewriteOrderDetail(obj.data);
        body = JSON.stringify(obj);
    }

    $done({body});

} catch (e) {
    console.log(`[美团外卖重写] JSON解析或重写失败: ${e.message}`);
    $done({}); 
}


/**
 * 订单列表 (order/list) 接口重写：仅修改第一个订单
 * @param {Array} orderList - 订单列表数组
 */
function rewriteOrderList(orderList) {
    if (Array.isArray(orderList) && orderList.length > 0) {
        // 🎯 仅修改第一个订单（索引 0）
        const order = orderList[0];
            
        // 修改店铺名
        if (order.shopName) {
            order.shopName = TARGET_SHOP_NAME;
        }
        
        // 统一修改时间 (OrderTime 字符串)
        if (order.orderTime) {
            let oldTime = order.orderTime.split(' ')[1] || TARGET_TIME; 
            order.orderTime = `${TARGET_DATE} ${oldTime}`;
        }
        
        // 统一修改订单号
        if (order.mtOrderViewId) {
            order.mtOrderViewId = TARGET_ORDER_ID_STR;
        }
        if (order.orderId) {
            order.orderId = TARGET_ORDER_ID_STR;
        }
        console.log(`[美团外卖重写] 订单列表已修改第一个订单（订单号：${TARGET_ORDER_ID_STR}）。`);
    } else {
        console.log("[美团外卖重写] 订单列表为空或不是数组，跳过修改。");
    }
}

/**
 * 订单详情 (order/manager/v3/detail) 接口重写
 * @param {Object} data - 订单详情数据对象
 */
function rewriteOrderDetail(data) {
    // 🛠️ 关键：计算包含目标时间的 Unix 时间戳（秒）
    const targetDateTimeString = `${TARGET_DATE} ${TARGET_TIME}:00`; 
    const targetTimestampSec = Math.floor(new Date(targetDateTimeString).getTime() / 1000);

    // --- 🎯 订单号修改 ---
    if (data.id) {
        data.id = TARGET_ORDER_ID_NUM; // 数字ID
    }
    if (data.id_view) {
        data.id_view = TARGET_ORDER_ID_STR; // 字符串ID
    }
    if (data.id_text) {
        data.id_text = TARGET_ORDER_ID_STR; // 字符串ID
    }
    // *******************

    // 1. 修改店铺名 (poi_name)
    if (data.poi_name) {
        data.poi_name = TARGET_SHOP_NAME;
    }
    
    // 2. 修改期望送达时间 (expected_arrival_time)
    if (data.expected_arrival_time) {
        data.expected_arrival_time = TARGET_ARRIVAL_TIME;
    }

    // 3. 修改订单时间戳 (order_time)
    if (data.order_time) {
        data.order_time = targetTimestampSec;
    }
    
    // 4. 修改评论相关时间戳 (comment)
    if (data.comment) {
        // 评论时间
        if (data.comment.comment_time) {
            data.comment.comment_time = targetTimestampSec; 
        }

        // 商家回复时间 (add_comment_list)
        if (Array.isArray(data.comment.add_comment_list)) {
            data.comment.add_comment_list.forEach((reply) => {
                if (reply.time) {
                    reply.time = targetTimestampSec; 
                }
            });
        }
    }
    
    console.log(`[美团外卖重写] 订单详情处理完成。订单号设定为: ${TARGET_ORDER_ID_STR}`);
}