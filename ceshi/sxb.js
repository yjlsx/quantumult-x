/**
 [rewrite_local]
 ^https:\/\/sxbapi\.xuesai\.net\/exam\/(test\/createExercisePaper|common\/checkPermission) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
 # 修改 sequenceTestByQuestionIds 接口的响应
^https:\/\/sxbapi\.xuesai\.net\/exam\/test\/sequenceTestByQuestionIds url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
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

if ($request.url.includes("/exam/test/createExercisePaper") || $request.url.includes("/exam/common/checkPermission")) {
    obj.resultCode = "SUCCESS";
    obj.resultMsg = "成功";
}

body = JSON.stringify(obj);
$done({ body });
