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
  obj.body.icons.memberInfos.province_biz_gansu.rights.isTiyutong = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isDiamond = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isNba = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isZuqiuvip = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.skipBeforeAd = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isUfc = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isVip = true;
  obj.body.icons.memberInfos.province_biz_gansu.rights.isCba = true;
  obj.body.icons.memberInfos.province_biz_gansu.memberGroup = 4;
  obj.body.icons.memberInfos.province_biz_gansu.title = "钻石会员";
  obj.body.icons.memberInfos.province_biz_gansu.containMember = true;
  obj.body.icons.memberInfos.province_biz_gansu.icons = "diamond";
      if(obj.body.icons.memberInfos.ufc.rights) {
     obj.body.icons.memberInfos.ufc.rights.isTiyutong = true;
     obj.body.icons.memberInfos.ufc.rights.isDiamond = true;
     obj.body.icons.memberInfos.ufc.rights.isNba = true;
     obj.body.icons.memberInfos.ufc.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.ufc.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.ufc.rights.isUfc = true;
     obj.body.icons.memberInfos.ufc.rights.isVip = true;
     obj.body.icons.memberInfos.ufc.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.migu_dazhanbao.rights) {
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isTiyutong = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isDiamond = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isNba = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isUfc = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isVip = true;
     obj.body.icons.memberInfos.migu_dazhanbao.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.zuqiuvip.rights) {
     obj.body.icons.memberInfos.zuqiuvip.rights.isTiyutong = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isDiamond = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isNba = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isUfc = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isVip = true;
     obj.body.icons.memberInfos.zuqiuvip.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.nba.rights) {
     obj.body.icons.memberInfos.nba.rights.isTiyutong = true;
     obj.body.icons.memberInfos.nba.rights.isDiamond = true;
     obj.body.icons.memberInfos.nba.rights.isNba = true;
     obj.body.icons.memberInfos.nba.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.nba.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.nba.rights.isUfc = true;
     obj.body.icons.memberInfos.nba.rights.isVip = true;
     obj.body.icons.memberInfos.nba.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.tiyutong.rights) {
     obj.body.icons.memberInfos.tiyutong.rights.isTiyutong = true;
     obj.body.icons.memberInfos.tiyutong.rights.isDiamond = true;
     obj.body.icons.memberInfos.tiyutong.rights.isNba = true;
     obj.body.icons.memberInfos.tiyutong.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.tiyutong.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.tiyutong.rights.isUfc = true;
     obj.body.icons.memberInfos.tiyutong.rights.isVip = true;
     obj.body.icons.memberInfos.tiyutong.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.cba.rights) {
     obj.body.icons.memberInfos.cba.rights.isTiyutong = true;
     obj.body.icons.memberInfos.cba.rights.isDiamond = true;
     obj.body.icons.memberInfos.cba.rights.isNba = true;
     obj.body.icons.memberInfos.cba.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.cba.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.cba.rights.isUfc = true;
     obj.body.icons.memberInfos.cba.rights.isVip = true;
     obj.body.icons.memberInfos.cba.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.black_diamond.rights) {
     obj.body.icons.memberInfos.black_diamond.rights.isTiyutong = true;
     obj.body.icons.memberInfos.black_diamond.rights.isDiamond = true;
     obj.body.icons.memberInfos.black_diamond.rights.isNba = true;
     obj.body.icons.memberInfos.black_diamond.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.black_diamond.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.black_diamond.rights.isUfc = true;
     obj.body.icons.memberInfos.black_diamond.rights.isVip = true;
     obj.body.icons.memberInfos.black_diamond.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.diamond.rights) {
     obj.body.icons.memberInfos.diamond.rights.isTiyutong = true;
     obj.body.icons.memberInfos.diamond.rights.isDiamond = true;
     obj.body.icons.memberInfos.diamond.rights.isNba = true;
     obj.body.icons.memberInfos.diamond.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.diamond.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.diamond.rights.isUfc = true;
     obj.body.icons.memberInfos.diamond.rights.isVip = true;
     obj.body.icons.memberInfos.diamond.rights.isCba = true;
       }
      if(obj.body.icons.memberInfos.province_biz_guangzhou.rights) {
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isTiyutong = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isDiamond = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isNba = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isZuqiuvip = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.skipBeforeAd = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isUfc = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isVip = true;
     obj.body.icons.memberInfos.province_biz_guangzhou.rights.isCba = true;
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