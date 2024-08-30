[rewrite_local]
# 统一处理脚本
^https:\/\/m\.suanya\.com\/restapi\/soa2\/\d+\/json\/(GetSpeedKillAreaWelfareCenter|getGrowthGradePageInfo|GetVipRecords) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhixing.js
^https:\/\/m\.suanya\.com\/restapi\/soa2\/\d+\/json\/(getVipDetailInfo|get2020ZtripIntergrationDailyAttendanceRecord) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhixing.js



*
[mitm]
hostname = m.suanya.com
*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;

if (url.includes('/GetSpeedKillAreaWelfareCenter')) {
   if (obj.godBuyFlag) {
   obj.godBuyFlag = true;
   obj.couponType = "train-god-card";
   obj.isBuyFlag = true;
       }
}

if (url.includes('/getGrowthGradePageInfo')) {
    obj.histogramEntity.vipName = "黑钻会员";
    obj.histogramEntity.growthValue = 2500;
    obj.histogramEntity.grade = 40;
    obj.histogramEntity.termDesc = "2099.12.31到期";
    obj.myGrowthEntity.nextVipName = "黑钻会员";
    obj.myGrowthEntity.growthValueRight = 1800;
    obj.myGrowthEntity.expireTime = "2099.12.31到期";
    obj.myGrowthEntity.growthValue = 2500;
    obj.myGrowthEntity.vipName = "黑钻会员";
}

if (url.includes('/GetVipRecords')) {
    obj.totalValue = 2500;
}

if (url.includes('/get2020ZtripIntergrationDailyAttendanceRecord')) {
    obj.totalPayment = 999999;
    obj.successDays = 9999;
}

if (url.includes('/json/getVipDetailInfo')) {
    obj.grade = 2500;
    obj.gradeType = 4;
    obj.isRmbVipFlag = true;

    function rewriteJson(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === "isHave") {
                    obj[key] = 1;
                } else if (key === "obtainedCount") {
                    obj[key] = 2500;
                } else if (key === "alreadyUpGradeEntity" && typeof obj[key] === "object") {
                    if (obj[key].hasOwnProperty("content")) {
                        obj[key]["content"] = "已开通黑钻会员";
                    }
                } else if (typeof obj[key] === "object") {
                    rewriteJson(obj[key]);
                }
            }
        }
    }
    rewriteJson(obj);
}

body = JSON.stringify(obj);
$done({body});