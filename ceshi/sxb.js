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
    obj.model = "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";
    obj.resultMsg = "成功";
}else if ($request.url.includes("/user/center/getUserInfo")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "成功";
    obj.extraInfoMap = {
        "wxbind": "U",
        "canPhotoPaperSearch": "true",
        "canVoiceSearch": "true",
        "isAskMember": "true",
        "askCount": "10",
        "canPhotoSearch": "true",
        "receiveMkt": "Y",
        "askMemberExpireTime": "9999999999999"
    };
}


body = JSON.stringify(obj);
$done({ body });
