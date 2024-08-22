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

// 更新指定的参数值
urlParams.set('suuid', 'a88e1d1553248a0337f97e52f4ae7546');
//urlParams.set('seqId', '05768a1987f60bd0dffba3679cb940e6'); 
urlParams.set('ticket', '233266506BF03F9FA01EDC6D4C9859AB');

// 重新构建 URL
let baseUrl = url.split('?')[0];
let modifiedUrl = `${baseUrl}?${urlParams.toString()}`;

// 返回修改后的 URL
$done({ url: modifiedUrl });

