/***********************************************
> 应用名称：
> 脚本作者：@yjlsx
> 更新时间：2024-08-19
> 特别提醒：如需转载请注明出处，谢谢合作！
*
[rewrite local]
^https:\/\/app-sc\.miguvideo\.com\/ability\/v2\/member-rights\/miguvideo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/play\.miguvideo\.com\/playurl\/v1\/play\/playurl url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
//^https:\/\/api\.bilibili\.com\/x\/vip\/price\/panel\/lexi?access_key url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js



*
[mitm]
hostname = app-sc.miguvideo.com, play.miguvideo.com

***********************************************/

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/ability/v2/member-rights/miguvideo') !== -1) {
    // 遍历每个会员信息
   for (let key in body.body.memberInfos) {
    let rights = body.body.memberInfos[key].rights;
    
    // 将所有目标字段设置为true
    rights.isTiyutong = true;
    rights.isNba = true;
    rights.isDiamond = true;
    rights.isZuqiuvip = true;
    rights.skipBeforeAd = true;
    rights.isUfc = true;
    rights.isVip = true;
    rights.isCba = true;
        }
  }

if ($request.url.indexOf('/playurl/v1/play/playurl') !== -1) {
    obj.code = "200";
    obj.PlayCode = "200";
    obj.message = "永久会员，免费观看";
}




// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });