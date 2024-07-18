/**
 * 
 [rewrite_local]
^http://api\.yaotia\.cn/api/v1/course/sprintInfo\?course_id=76 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const dataUrl = 'https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fbly.json'; 

// 判断请求 URL
if ($request.url.includes('http://api.yaotia.cn/api/v1/course/sprintInfo?course_id=76')) {
  $http.get(dataUrl).then(response => {
    // 替换响应体
    $response.body = response.body;
    $done();
  }).catch(() => {
    // 如果请求失败，返回错误信息
    $response.body = JSON.stringify({ error: 'Failed to fetch fbly.json' });
    $done();
  });
} else {
  // 如果 URL 不匹配，则不做任何修改
  $done();
}
