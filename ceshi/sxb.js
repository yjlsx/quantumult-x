/**
 [rewrite_local]
 ^https:\/\/sxbapi\.xuesai\.net\/exam\/(order\/create|test\/createExercisePaper|common\/checkPermission|test\/sequenceTestByQuestionIds|test\/content|user\/allAreaList) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
^https:\/\/sxbapi\.xuesai\.net\/user\/center\/getUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js

 *
 [mitm]
 hostname = sxbapi.xuesai.net
 */

var body = $response.body;
if (!body) {
    $done({});
    return;
}

var obj = JSON.parse(body);

if ($request.url.includes("/exam/order/create")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "支付成功";
} else if ($request.url.includes("/exam/test/createExercisePaper") || $request.url.includes("/exam/common/checkPermission") || $request.url.includes("/exam/test/sequenceTestByQuestionIds") || $request.url.includes("/exam/test/content") || $request.url.includes("/exam/user/allAreaList")) {
    obj.resultCode = "SUCCESS";
    obj.model = "NosF9/5p+z9bIIC6yZU7jXd9NRw/NiZdaFpMFYOgPc7T/IcRbdVVNGmSdK7zpLvzgOsCEckWi2HwW+iuOTgpiDinIjpxnoQ6O7IUvI3FLy+dftQB6ZoB1ZPlvwtrMl5SWBrIodnWVqFJVik18ZtDthqgmVXnQ8zr3AzLu48tU3nlc/ciciG4+yxb52F/ez1f7/iyhnaSfpxkRset8BI0/fOsRi0EwqOmf4z+N2fZJLJForXm7VtvFh6Dcb9NAT+FkD3e0+BeK6B1Orpkt9q5GDzmHDbYZx3/tg4A/Ug4u64=";
    obj.resultMsg = "成功";
}else if ($request.url.includes("/user/center/getUserInfo")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "成功";
    obj.extraInfoMap = {
        "wxbind": "U",
        "canPhotoPaperSearch": "true",
        "canVoiceSearch": "true",
        "isAskMember": "true",
        "askCount": "99999",
        "canPhotoSearch": "true",
        "receiveMkt": "Y",
        "askMemberExpireTime": "999999999999999"
    };
}


body = JSON.stringify(obj);
$done({ body });
