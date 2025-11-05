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
 *
 * 方便修改区：
 * 您可以在下方的常量区修改店铺名和目标日期。
 */

// --- 🎯 方便修改区 ---
const TARGET_SHOP_NAME = "武松醉鹅（鹅汁泡皈・南悦城店）";
const TARGET_DATE = "2025-11-05";
const TARGET_TIME = "10:42"; // 示例时间，用于 orderList 中的 orderTime
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

    if (!obj || obj.code !== 0 || !obj.data) {
        // 如果不是成功的响应体，直接返回
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
    console.log(`JSON解析或重写失败: ${e.message}`);
    $done({});
}


/**
 * 订单列表 (order/list) 接口重写
 * @param {Array} orderList - 订单列表数组
 */
function rewriteOrderList(orderList) {
    if (Array.isArray(orderList) && orderList.length > 0) {
        orderList.forEach((order, index) => {
            // 示例：只修改第一个订单的店铺名
            if (index === 0) {
                // 修改店铺名
                if (order.shopName) {
                    order.shopName = TARGET_SHOP_NAME;
                    console.log(`[美团外卖] 订单列表 - 订单 #${index + 1} 店铺名已修改为: ${TARGET_SHOP_NAME}`);
                }
            }
            
            // 统一修改时间
            if (order.orderTime) {
                // 仅替换日期部分，保留原始时间
                let oldTime = order.orderTime.split(' ')[1] || TARGET_TIME; 
                order.orderTime = `${TARGET_DATE} ${oldTime}`;
                console.log(`[美团外卖] 订单列表 - 订单 #${index + 1} 订单时间已修改为: ${order.orderTime}`);
            }
            // 理论上 orderTimeSec 也会影响，但此处先不改，避免时间戳校验问题
            // order.orderTimeSec = new Date(TARGET_DATE).getTime() / 1000; 
        });
    }
}

/**
 * 订单详情 (order/manager/v3/detail) 接口重写
 * @param {Object} data - 订单详情数据对象
 */
function rewriteOrderDetail(data) {
    // 1. 修改店铺名
    if (data.poi_name) {
        data.poi_name = TARGET_SHOP_NAME;
        console.log(`[美团外卖] 订单详情 - 店铺名已修改为: ${TARGET_SHOP_NAME}`);
    }
    
    // 2. 修改期望送达时间 (expected_arrival_time)
    if (data.expected_arrival_time) {
        data.expected_arrival_time = TARGET_ARRIVAL_TIME;
        console.log(`[美团外卖] 订单详情 - 期望送达时间已修改为: ${TARGET_ARRIVAL_TIME}`);
    }

    // 3. 修改评论时间 (comment.comment_time)
    if (data.comment && data.comment.comment_time) {
        // 将时间戳改为 2025-11-05 左右的时间戳
        data.comment.comment_time = Math.floor(new Date(TARGET_DATE).getTime() / 1000); 
        console.log(`[美团外卖] 订单详情 - 评论时间戳已修改为: ${data.comment.comment_time}`);
    }

    // 4. 修改商家回复时间 (comment.add_comment_list)
    if (data.comment && Array.isArray(data.comment.add_comment_list)) {
        data.comment.add_comment_list.forEach((reply, index) => {
            if (reply.time) {
                // 将时间戳改为 2025-11-05 左右的时间戳
                reply.time = Math.floor(new Date(TARGET_DATE).getTime() / 1000); 
                console.log(`[美团外卖] 订单详情 - 商家回复时间戳 #${index + 1} 已修改为: ${reply.time}`);
            }
        });
    }

    // 5. 修改订单时间戳 (order_time) - **请谨慎修改，可能会影响页面状态判断**
    if (data.order_time) {
        data.order_time = Math.floor(new Date(TARGET_DATE).getTime() / 1000);
        console.log(`[美团外卖] 订单详情 - 订单时间戳已修改为: ${data.order_time}`);
    }
}