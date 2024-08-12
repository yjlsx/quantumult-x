/**************************************
*
[rewrite local]
^https:\/\/vip\.video\.qq\.com\/rpc\/trpc\.query_vipinfo\.vipinfo\.QueryVipInfo\/GetVipUserInfoH5 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/txsp.js
^https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/txsp.js
^https:\/\/vip\.video\.qq\.com\/rpc\/trpc\.vipcontent\.vip_area_channel\.VIPAreaChannelRPC\/LevelBenefits url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/txsp.js


*
[mitm]
hostname = vip.video.qq.com
*************************************/
// Quantumult X Rewrite Script
// @rewrite 

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/rpc/trpc.query_vipinfo.vipinfo.QueryVipInfo/GetVipUserInfoH5') !== -1) {
    obj.annualendtime = "2099-12-31 23:59:59";
   // 修改 VIP 和 SVIP 部分的结束时间
   if (obj.nba) {
    obj.nba.vip.endTime = "2099-12-31 23:59:59";
    obj.nba.vip.score = 99999;
    obj.nba.vip.level = 4;
    obj.nba.vip.icon_url = "https://vfiles.gtimg.cn/vupload/20220925/sport_grep_v4_3x.png";
    obj.nba.vip.vip = 1;
    obj.nba.score = 99999;
    obj.nba.level = 4;
    obj.nba.svip.endTime = "2099-12-31 23:59:59";
    obj.nba.svip.score = 99999;
    obj.nba.svip.level = 4;
    obj.nba.svip.vip = 1;
   }
    obj.score = 99999;
   if (obj.sports) {
    obj.sports.vip.endTime = "2099-12-31 23:59:59";
    obj.sports.vip.score = 99999;
    obj.sports.vip.level = 4;
    obj.sports.vip.vip = 1;
    obj.sports.score = 99999;
    obj.sports.level = 4;
    obj.sports.svip.endTime = "2099-12-31 23:59:59";
    obj.sports.svip.score = 99999;
    obj.sports.svip.level = 4;
    obj.sports.svip.vip = 1;
   }
    obj.endTime = "2099-12-31 23:59:59";
    obj.dailyscore = 0;
    obj.annualvip = 1;
    obj.level = 4;
    obj.vip = 1;
    obj.result.code = 200;
    obj.servicetype = "svip";
   if (obj.svip) {
    obj.svip.vip = 1;
    obj.svip.endTime = "2099-12-31 23:59:59";
    obj.svip.level = 4;
   }
}

if ($request.url.indexOf('/fcgi-bin/comm_cgi') !== -1) {
    obj.vip_scores = null;
    obj.vip_score_total = 99999;
}

if ($request.url.indexOf('/rpc/trpc.vipcontent.vip_area_channel.VIPAreaChannelRPC/LevelBenefits') !== -1) {
    obj.level_infos[0].welfare_amount = 9999;
    obj.level_infos[0].level = 7;
    obj.level_infos[0].benefit_value = 9999;
    obj.level_infos[0].level_score = 99999;
    obj.level_infos[0].benefit_amount = 9999;
    obj.v_score = 99999;
    obj.vip_level = 7;
    obj.is_vip = true;
}



// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });
