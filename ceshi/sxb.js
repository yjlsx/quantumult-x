/**
 * [rewrite_local]
 * ^https:\/\/sxbapi\.xuesai\.net\/exam\/(order\/create|test\/createExercisePaper|common\/checkPermission|test\/sequenceTestByQuestionIds|test\/content) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
 *
 * [mitm]
 * hostname = sxbapi.xuesai.net
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
    obj.resultMsg = "成功";
}

body = JSON.stringify(obj);
$done({ body });
