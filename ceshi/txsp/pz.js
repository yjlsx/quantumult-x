/**************************************
*
[rewrite local]
^https:\/\/cache\.wuji\.qq\.com\/x\/api\/wuji_cache\/object?appid=vip&schemaid=vip_privilege_by_grade_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/pz.js
^https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi?name=get_levelupdate&cmd=1&version=1&otype=xjson url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/pz.js

*
[mitm]
hostname = vip.video.qq.com, i.video.qq.com, cache.wuji.qq.com
*************************************/
// Quantumult X Rewrite Script
// @rewrite 

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/object?appid=vip&schemaid=vip_privilege_by_grade_list') !== -1) {
  obj.data.forEach(item => {
    item.v0 = [...item.v8]; // 深拷贝v8内容到v0
    item.v1 = [...item.v8]; // 深拷贝v8内容到v1
    item.v2 = [...item.v8]; 
    item.v7 = [...item.v8]; 
  });
}

if ($request.url.indexOf('/comm_cgi?name=get_levelupdate&cmd=1&version=1&otype=xjson') !== -1) {
  obj.result.code =  200;
  obj.current_level = 7;
  obj.previous_level = 7;
}




// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });


