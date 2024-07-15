/**
 [rewrite_local]
 ^https:\/\/sxbapi\.xuesai\.net\/exam\/(order\/create|test\/createExercisePaper|common\/checkPermission|test\/sequenceTestByQuestionIds|test\/content) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
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
} else if ($request.url.includes("/exam/test/createExercisePaper") || $request.url.includes("/exam/common/checkPermission") || $request.url.includes("/exam/test/sequenceTestByQuestionIds") || $request.url.includes("/exam/test/content")) {
    obj.resultCode = "SUCCESS";
    obj.model = "NosF9/5p+z9bIIC6yZU7jXd9NRw/NiZdaFpMFYOgPc7T/IcRbdVVNGmSdK7zpLvzgOsCEckWi2HwW+iuOTgpiMMVRUFOTZUnVZ/z4i0rrsk+OpIN3cd9ZV9UhrK899V/jowb0pAILsc2DrQP/G3100AKKHEym7CPDPj08nuHnSZWXwTvne9Jcp2bgp9EDx/nWnku6oipmxXM8Pmqic3BPX0nfwObRBZxKd+LOgt7jTZFMfvyWl1Ys3BC2JOo8i+7Y5ElJQntE1L9ojEJdimMneScFHCW6xbsoY+XWmbpqNo=";
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
