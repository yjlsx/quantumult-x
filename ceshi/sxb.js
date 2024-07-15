/**
 [rewrite_local]
 ^https:\/\/sxbapi\.xuesai\.net\/exam\/(order\/create|test\/createExercisePaper|common\/checkPermission|test\/sequenceTestByQuestionIds|test\/content|user\/allAreaList|userupload\/getUserTikuList) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
 ^https:\/\/sxbapi\.xuesai\.net\/user\/center\/getUserInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
 ^https:\/\/sxbapi\.xuesai\.net\/ask\/answer url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
 ^https:\/\/sxbapi\.xuesai\.net\/ask\/order\/submit url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
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

if ($request.url.includes("/exam/order/create") || $request.url.includes("/ask/order/submit")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "支付成功";
} else if ($request.url.includes("/exam/test/createExercisePaper") || $request.url.includes("/exam/common/checkPermission") || $request.url.includes("/exam/test/sequenceTestByQuestionIds") || $request.url.includes("/exam/test/content") || $request.url.includes("/exam/user/allAreaList")|| $request.url.includes("/exam/userupload/getUserTikuList")) {
    obj.resultCode = "SUCCESS";
    obj.model = "+iQ00dAnf8/CIcXZbGc9b57sMgXXjNyc2szCVVHJjrPHFpui03F8FtdfF7gwAkhOofKW2nkvxWk2vibY09lViQ617Fb+1FCaTlFGqg8i8YkKjwvJNX+RTFLszY8tqRKMMTBYBPAI5P1evb23r3KZoQ==";
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
}else if ($request.url.includes("/ask/answer")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "已是会员";
}



body = JSON.stringify(obj);
$done({ body });
