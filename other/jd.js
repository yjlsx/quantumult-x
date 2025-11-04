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

function replaceTime(data, regex, replacement) {
    // 基础情况：如果是字符串，则尝试替换时间
    if (typeof data === 'string') {
        if (regex.test(data)) {
            let newStr = data.replace(regex, replacement);
            console.log(`[Time Replace] Replaced: "${data}" -> "${newStr}"`);
            return newStr;
        }
        return data;
    }
    
    // 递归处理数组
    if (Array.isArray(data)) {
        return data.map(item => replaceTime(item, regex, replacement));
    }
    
    // 递归处理对象（简化版，仅遍历）
    if (typeof data === 'object' && data !== null) {
        for (let key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // 这里进行递归调用，将替换逻辑交给上面的 string 分支处理
                data[key] = replaceTime(data[key], regex, replacement);
            }
        }
    }
    
    return data;
}

// 匹配 " 年-月-日 18:xx:xx" 的通用时间模式
const timeRegex = /(\s\d{4}-\d{2}-\d{2}\s)18:/g; // 添加 g (全局) 确保替换完全
const timeReplacement = '$121:';
// 针对只有小时分钟或不带日期的简短时间（例如 "18:xx:xx" 或 " 18:xx"）
const timeRegexShort = /18:/g; // 只需要匹配并替换 "18:"
const timeReplacementShort = '21:';

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
    // 2. 针对 order_detail_m 接口的修改
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

    // b. 修改 progressList (物流时间 tip)
    if (obj.body && Array.isArray(obj.body.progressList)) {
        obj.body.progressList.forEach(item => {
            if (item.tip) {
                // 使用短正则替换（因为它可能是完整的日期时间，或只是简短时间）
                item.tip = replaceTime(item.tip, timeRegexShort, timeReplacementShort);
            }
        });
    }

    // c. 修改 summaryList (下单时间、支付时间等 content)
    if (obj.body && Array.isArray(obj.body.summaryList)) {
        obj.body.summaryList.forEach(item => {
            // 注意：summaryList 中的 content 可能只包含时间，所以使用短正则
            if (item.title && (item.title.includes('下单时间') || item.title.includes('支付时间')) && item.content) {
                item.content = replaceTime(item.content, timeRegexShort, timeReplacementShort);
            }
        });
    }
    
    // 将修改后的对象重新序列化为 JSON 字符串
    $done({body: JSON.stringify(obj)});

} catch (e) {
    // 捕获 JSON 解析或处理错误
    console.log(`[jd_time_modify] Error: ${e.message}`);
    // 如果出错，则返回空响应，防止应用崩溃
    $done({}); 
}