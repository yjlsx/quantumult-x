/*
[rewrite_local]
# 匹配订单列表接口：order_list_m
^https:\/\/api\.m\.jd\.com\/client\.action\?.*functionId=order_list_m\b url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd.js

# 匹配订单详情接口：order_detail_m
^https:\/\/api\.m\.jd\.com\/client\.action\?.*functionId=order_detail_m\b url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd.js


[mitm]
hostname = api.m.jd.com
*/


let obj = JSON.parse($response.body);

// 正则表达式: 匹配前面带空格的 '18:'，并全局替换
const timeRegexShort = /(\s)18:/g; 
const timeReplacementShort = '$121:';

/**
 * 替换字符串中的 ' 18:' 为 ' 21:'
 * @param {string} data 
 * @returns {string}
 */
function replaceTime(data) {
    if (typeof data === 'string') {
        if (timeRegexShort.test(data)) {
            let newStr = data.replace(timeRegexShort, timeReplacementShort);
            return newStr;
        }
    }
    return data;
}

try {
    // ----------------------------------------------------
    // 1. 针对 order_list_m 接口的修改 (订单列表)
    // 路径: obj.body.orderList[0].submitDate
    // ----------------------------------------------------
    if (obj.body && Array.isArray(obj.body.orderList) && obj.body.orderList.length > 0) {
        let firstOrder = obj.body.orderList[0];
        if (firstOrder.submitDate) {
            firstOrder.submitDate = replaceTime(firstOrder.submitDate);
            console.log(`[QLX-JD] List time modified to: ${firstOrder.submitDate}`);
        }
    }

    // ----------------------------------------------------
    // 2. 针对 order_detail_m 接口的修改 (订单详情)
    // ----------------------------------------------------
    
    // a. 修改 orderCommonVo 下的时间 (下单时间和完成时间)
    if (obj.body && obj.body.orderCommonVo) {
        let common = obj.body.orderCommonVo;
        if (common.dateSubmit) {
            common.dateSubmit = replaceTime(common.dateSubmit);
        }
        if (common.orderCompleteTime) {
            common.orderCompleteTime = replaceTime(common.orderCompleteTime);
        }
    }

    // b. 修改 progressList (物流时间)
    if (obj.body && Array.isArray(obj.body.progressList)) {
        obj.body.progressList.forEach(item => {
            if (item.tip) {
                item.tip = replaceTime(item.tip);
            }
        });
    }

    // c. 修改 summaryList (下单时间、支付时间、期望配送时间)
    if (obj.body && Array.isArray(obj.body.summaryList)) {
        obj.body.summaryList.forEach(item => {
            if (!item.content) return;

            if (item.title === '下单时间：' || item.title === '支付时间：') {
                // 通用时间替换 (18:xx -> 21:xx)
                let newContent = replaceTime(item.content);
                if (newContent !== item.content) {
                    item.content = newContent;
                }
            } else if (item.title === '期望配送时间：') {
                // 期望配送时间特殊处理: 替换时间段为 '20:30-21:30'
                const originalContent = item.content;
                const newTimeRange = "20:30-21:30";
                
                // 尝试匹配日期部分 (e.g., "2025-11-04 ")
                let datePartMatch = originalContent.match(/^\d{4}-\d{2}-\d{2}\s/);
                let datePart = datePartMatch ? datePartMatch[0] : '';
                
                // 组合新的内容
                item.content = (datePart + newTimeRange).trim();
                console.log(`[QLX-JD] Expected delivery time modified to: ${item.content}`);
            }
        });
    }
    
    // 返回修改后的响应体
    $done({body: JSON.stringify(obj)});

} catch (e) {
    console.error(`[QLX-JD] Script execution error: ${e.message}`);
    // 如果解析出错，返回原始响应
    $done({}); 
}