/*
[rewrite_local]
# 修改URL中的参数值
^https:\/\/mobile-stream\.api\.mgtv\.com\/v1\/video\/source?.* url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/MGTV5.js

[mitm]
hostname = mobile-stream.api.mgtv.com
*/

const url = $request.url;

// 解析 URL 参数
let urlParams = new URLSearchParams(url.split('?')[1]);

// 更 新指定的参数值
//urlParams.set('suuid', '70def149b2823ddb7e7ba3c2db58ce4d');
//urlParams.set('seqId', '5111e39fb40dc93e25cd59c9137ac589'); 
urlParams.set('ticket', 'AF1FEA58193736728B7146096D5E786A');

// 重新构建 URL
let baseUrl = url.split('?')[0];
let modifiedUrl = `${baseUrl}?${urlParams.toString()}`;

// 返回修改后的 URL
$done({ url: modifiedUrl });

