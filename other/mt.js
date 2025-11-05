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
const TARGET_SHOP_NAME = "武松醉鹅（鹅汁泡皈·南悦城店）";
const TARGET_DATE = "2025-11-05";
const TARGET_TIME = "10:52"; // 订单列表和时间戳的基础时间
const TARGET_ARRIVAL_TIME = "11月5日 11:30-12:20"; // 订单详情页的期望送达时间
// --------------------

const url = $request.url;
let body = $response.body;

// 检查响应体是否为空或无法解析
if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    // 检查响应状态码和数据结构
    if (!obj || obj.code !== 0 || !obj.data) {
        $done({});
    }

    if (url.includes("/openh5/order/list")) {
        // --- 🚀 订单列表接口重写逻辑 ---
        rewriteOrderList(obj.data.orderList);
        body = JSON.stringify(obj);
    } else if (url.includes("/openh5/order/manager/v3/detail")) {
        // --- 🚀 订单详情接口重写逻辑 ---
        rewriteOrderDetail(obj.data);
        body = JSON.stringify(obj);
    }

    $done({body});

} catch (e) {
    console.log(`[美团外卖重写] JSON解析或重写失败: ${e.message}`);
    // 失败时也返回原始数据，避免页面崩溃
    $done({}); 
}


/**
 * 订单列表 (order/list) 接口重写
 * @param {Array} orderList - 订单列表数组
 */
function rewriteOrderList(orderList) {
    if (Array.isArray(orderList) && orderList.length > 0) {
        orderList.forEach((order, index) => {
            // 🎯 修改店铺名：仅修改第一个订单的店铺名 (根据您的需求)
            if (index === 0) {
                if (order.shopName) {
                    order.shopName = TARGET_SHOP_NAME;
                    // console.log(`[美团外卖] 订单列表 - 订单 #${index + 1} 店铺名已修改为: ${TARGET_SHOP_NAME}`);
                }
            }
            
            // 🎯 统一修改时间 (OrderTime 字符串)
            if (order.orderTime) {
                // 替换日期部分，保留原始时间或使用 TARGET_TIME
                let oldTime = order.orderTime.split(' ')[1] || TARGET_TIME; 
                order.orderTime = `${TARGET_DATE} ${oldTime}`;
                // console.log(`[美团外卖] 订单列表 - 订单 #${index + 1} 订单时间已修改为: ${order.orderTime}`);
            }
            
            // 🌟 如果需要修改所有订单的店铺名，请移除上面的 if (index === 0) {} 块。
        });
        console.log(`[美团外卖重写] 订单列表处理完成。`);
    }
}

/**
 * 订单详情 (order/manager/v3/detail) 接口重写
 * @param {Object} data - 订单详情数据对象
 */
function rewriteOrderDetail(data) {
    // 🛠️ 关键：计算包含目标时间的 Unix 时间戳（秒）
    const targetDateTimeString = `${TARGET_DATE} ${TARGET_TIME}:00`; 
    // new Date() 会根据本地时区解析这个字符串
    const targetTimestampSec = Math.floor(new Date(targetDateTimeString).getTime() / 1000);

    // 1. 🎯 修改店铺名 (poi_name)
    if (data.poi_name) {
        data.poi_name = TARGET_SHOP_NAME;
    }
    
    // 2. 🎯 修改期望送达时间 (expected_arrival_time)
    if (data.expected_arrival_time) {
        data.expected_arrival_time = TARGET_ARRIVAL_TIME;
    }

    // 3. 🎯 修改订单时间戳 (order_time) - 影响订单创建时间
    if (data.order_time) {
        data.order_time = targetTimestampSec;
    }
    
    // 4. 🎯 修改评论相关时间戳 (comment)
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
    
    // 5. 修改 `wm_order_pay_type` 避免出现“在线支付”的时间戳校验问题 (可选，但推荐)
    // 响应体中为 2 (在线支付)，但实际可能需要修改为其他类型，此处暂不修改。

    console.log(`[美团外卖重写] 订单详情处理完成。订单时间戳设定为: ${targetTimestampSec}`);
}