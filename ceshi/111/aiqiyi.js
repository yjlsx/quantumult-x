/**************************************
*
[rewrite local]
^https:\/\/passport\.iqiyi\.com\/apis\/profile\/info\.action url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/aiqiyi.js
^https:\/\/iface2\.iqiyi\.com\/aggregate\/3\.0\/vip_info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/aiqiyi.js
^https:\/\/sns-paopao\.iqiyi\.com\/v2\/init\/list_improve\.action url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/aiqiyi.js
^https:\/\/iface2\.iqiyi\.com\/control\/3\.0\/init_login url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/aiqiyi.js
^https:\/\/cards\.iqiyi\.com\/views_category\/3\.0\/vip_home?hasPlayRecord url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/aiqiyi.js


^https:\/\/iface2\.iqiyi\.com\/carrier\/2\.0\/init?api_v url reject-200

*
[mitm]
hostname = passport.iqiyi.com, iface2.iqiyi.com, sns-paopao.iqiyi.com, cards.iqiyi.com
*************************************/
// Quantumult X Rewrite Script
// @rewrite 

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/apis/profile/info.action') !== -1) {
   if (obj.data && obj.data.vip_list && obj.data.vip_list.length > 0) {
    obj.data.vip_list.forEach(vip => {
    vip.longestDeadline.t = 4102358400000;
    vip.deadline.t = 4102358400000;
    vip.vipTypeName = "星钻VIP会员";
    vip.surplus = "99999"
    vip.type = "3";
    vip.level = "7";
    vip.vipType = "3"; // 假设 "2" 是表示星钻VIP的类型代码
    vip.status = 1;
  });
     }
    obj.data.verify_srtatus = 1;
    obj.data.icon_pendant.type = 3;
}

if ($request.url.indexOf('/aggregate/3.0/vip_info') !== -1) {
   if (obj.vipInfoV3) {
    obj.vipInfoV3.showPingback21.r_document = "星钻VIP会员";
    obj.vipInfoV3.deadlineShowText.deadline = "2099-12-31到期";
    obj.vipInfoV3.text2 = "2099-12-31到期";
    obj.vipInfoV3.text1 = "星钻VIP会员";
    }
}

if ($request.url.indexOf('/v2/init/list_improve.action') !== -1) {
   if (obj.data && obj.data.userinfo) {
    obj.data.userinfo.isvip = 1;
    obj.data.userinfo.realVip = 1;
    obj.data.userinfo.vipLevel = 7;
    }
}

if ($request.url.indexOf('/control/3.0/init_login') !== -1) {
   if (obj.data && obj.data.userinfo) {
    obj.content.vip_info.data.qiyi_vip_info.longestDeadline.t = 4102358400000;
    obj.content.vip_info.data.qiyi_vip_info.longestDeadline.date = "2099年12月31日";
    obj.content.vip_info.data.qiyi_vip_info.deadline.t = 4102358400000;
    obj.content.vip_info.data.qiyi_vip_info.deadline.date = "2099年12月31日";
    obj.content.vip_info.data.qiyi_vip_info.vipType = "3";
    obj.content.vip_info.data.qiyi_vip_info.vipTypeName = "星钻VIP会员";
    obj.content.vip_info.data.qiyi_vip_info.surplus = "99999"
    obj.content.vip_info.data.qiyi_vip_info.type = "3";
    obj.content.vip_info.data.qiyi_vip_info.level = "7";
    obj.content.vip_info.data.qiyi_vip_info.status = "1";
    }
}

if ($request.url.indexOf('/views_category/3.0/vip_home?hasPlayRecord') !== -1) {
  obj.cards.forEach(card => {
    card.blocks.forEach(block => {
    block.metas.forEach(meta => {
      if (/^\d{4}-\d{2}-\d{2}到期$/.test(meta.text)) {
        meta.text = "2099-12-31到期";
      }
    });
    });
   });
}



// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });