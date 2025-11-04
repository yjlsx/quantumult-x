/*

[rewrite_local]
# 匹配订单列表接口：order_list_m
^https:\/\/api\.m\.jd\.com\/client\.action\?.*functionId=order_list_m\b url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd.js

# 匹配订单详情接口：order_detail_m
^https:\/\/api\.m\.jd\.com\/client\.action\?.*functionId=order_detail_m\b url script-response-body_https://raw.githubusercontent.com/yjlsx/quantumult-x/master/other/jd.js


[mitm]
hostname = api.m.jd.com
 */

let obj = JSON.parse($response.body);

function replaceTime(data, regex, replacement) {
    if (typeof data === 'string') {
        // 使用正则表达式替换时间 (例如: ' 18:' 替换为 ' 21:')
        if (regex.test(data)) {
            let newStr = data.replace(regex, replacement);
            console.log(`[Time Replace] Replaced: "${data}" -> "${newStr}"`);
            return newStr;
        }
        return data;
    }
    
    if (Array.isArray(data)) {
        // 递归处理数组
        return data.map(item => replaceTime(item, regex, replacement));
    }
    
    if (typeof data === 'object' && data !== null) {
        // 递归处理对象
        for (let key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // 特殊处理时间相关的已知字段
                if (key === 'submitDate' || key === 'dateSubmit' || key === 'orderCompleteTime' || key === 'tip' || key === 'content') {
                     data[key] = replaceTime(data[key], regex, replacement);
                } else {
                    // 对所有其他字段进行深度搜索替换
                    data[key] = replaceTime(data[key], regex, replacement);
                }
            }
        }
    }
    
    return data;
}

// 匹配 " 年-月-日 18:xx:xx" 或 " 18:xx" 的通用时间模式
// 目标: 将 ' 18:' 改为 ' 21:'
const timeRegex = /(\s\d{4}-\d{2}-\d{2}\s)18:/;
const timeReplacement = '$121:';
const timeRegexShort = /(\s)18:/; // 针对某些只有小时分钟的简短时间（例如 progressList.tip）
const timeReplacementShort = '$121:';

try {
    // ----------------------------------------------------
    // 1. 针对 order_list_m 接口的修改
    // 路径: obj.body.orderList[0].submitDate
    // ----------------------------------------------------
    if (obj.body && Array.isArray(obj.body.orderList) && obj.body.orderList.length > 0) {
        let firstOrder = obj.body.orderList[0];
        if (firstOrder.submitDate) {
            firstOrder.submitDate = replaceTime(firstOrder.submitDate, timeRegex, timeReplacement);
        }
    }

    // ----------------------------------------------------
    // 2. 针对 order_detail_m 接口的修改 (深度替换)
    // 涉及字段: dateSubmit, orderCompleteTime, progressList[].tip, summaryList[].content
    // ----------------------------------------------------
    
    // a. 修改 orderCommonVo 下的时间 (下单时间和完成时间)
    if (obj.body && obj.body.orderCommonVo) {
        let common = obj.body.orderCommonVo;
        if (common.dateSubmit) {
            common.dateSubmit = replaceTime(common.dateSubmit, timeRegex, timeReplacement);
        }
        if (common.orderCompleteTime) {
            common.orderCompleteTime = replaceTime(common.orderCompleteTime, timeRegex, timeReplacement);
        }
    }

    // b. 修改 progressList (物流时间)
    if (obj.body && Array.isArray(obj.body.progressList)) {
        obj.body.progressList.forEach(item => {
            if (item.tip) {
                // 注意：progressList.tip 可能是 '2025-11-04 18:35:11'，也可能只是 '18:xx'
                // 这里使用更宽松的正则来替换所有出现的 ' 18:'
                item.tip = replaceTime(item.tip, timeRegexShort, timeReplacementShort);
            }
        });
    }

    // c. 修改 summaryList (下单时间、支付时间等)
    if (obj.body && Array.isArray(obj.body.summaryList)) {
        obj.body.summaryList.forEach(item => {
            if (item.title === '下单时间：' || item.title === '支付时间：') {
                 if (item.content) {
                    item.content = replaceTime(item.content, timeRegexShort, timeReplacementShort);
                 }
            }
        });
    }
    
    // 将修改后的对象重新序列化为 JSON 字符串
    $done({body: JSON.stringify(obj)});

} catch (e) {
    // 捕获 JSON 解析或处理错误
    console.log(`[jd_time_modify] Error: ${e.message}`);
    // 如果出错，则返回原始响应体
    $done({}); 
}