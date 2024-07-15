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
    obj.model = "VtOFztFgGq//qfca2jpIH5sr+26l3eAzhd0Zhp9DiWI8WHojE1rLhxa80fjy0SfUxrMiwN0yw5f83XKvfU/1dSMlNFi+18RekFOaFlfnaBOV+ZIKWhYA58/mti+cfyjttPObm7Urvop1uuhr1k4Klep+N9Yterf78cNmWCLNuPxIUVK43G80lKzk90QqHE9UFi/WqZL8E0ps6z9xUBVLRrk/VVVzKfFB5OgTTCZd/IVYJMOFzPVNGnu3VfuvQiPE9I8whzH4o374JSRflTQPjSkUSx2m+OBTcsVImQN/N1k+IXUX34UDmcJpkypXrFjqURF+fiG30wSjOl4pdtpaj1j/EupxlSrBbbJlHn/LcjCGUSjpMrK3F8sO0xLPFkiDFtHzNHRqMP2b3ecsHAvf/A==";
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
