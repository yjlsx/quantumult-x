/**************************************
*
[rewrite local]
^https:\/\/vip\.video\.qq\.com\/rpc\/trpc\.query_vipinfo\.vipinfo\.QueryVipInfo\/GetVipUserInfoH5 url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp.js
^https:\/\/vip\.video\.qq\.com\/rpc\/trpc\.query_vipinfo\.vipinfo\.QueryVipInfo\/GetVipUserInfoH5 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp.js
^https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi?name=spp_vscore_user_mashup url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp.js
^https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi?otype=xjson&name=get_cscore url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp.js
^https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi?name=get_levelupdate&cmd=1&version=1&otype=xjson url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/pz.js
^https:\/\/vip\.video\.qq\.com\/rpc\/trpc\.vipcontent\.vip_area_channel\.VIPAreaChannelRPC\/LevelBenefits url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp.js
^https://i.video.qq.com/ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/txsp1.js
^https:\/\/cache\.wuji\.qq\.com\/x\/api\/wuji_cache\/object?appid=vip&schemaid=vip_privilege_by_grade_list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/txsp/pz.js


*
[mitm]
hostname = vip.video.qq.com, i.video.qq.com, cache.wuji.qq.com
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
    obj.nba.vip.level = 7;
    obj.nba.vip.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
    obj.nba.vip.vip = 1;
    obj.nba.score = 99999;
    obj.nba.level = 7;
    obj.nba.svip.endTime = "2099-12-31 23:59:59";
    obj.nba.svip.score = 99999;
    obj.nba.svip.level = 7;
    obj.nba.svip.vip = 1;
   }
   if (obj.vip_icon) {
   obj.vip_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
  }
   obj.svip_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
   obj.svip.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
   obj.sports.svip.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
   obj.sports.vip.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
   obj.composite_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
    obj.score = 99999;
   if (obj.sports) {
    obj.sports.vip.endTime = "2099-12-31 23:59:59";
    obj.sports.vip.score = 99999;
    obj.sports.vip.level = 77;
    obj.sports.vip.vip = 1;
    obj.sports.score = 99999;
    obj.sports.level = 7;
    obj.sports.svip.endTime = "2099-12-31 23:59:59";
    obj.sports.svip.score = 99999;
    obj.sports.svip.level = 7;
    obj.sports.svip.vip = 1;
   }
    obj.endTime = "2099-12-31 23:59:59";
    obj.dailyscore = 10;
    obj.annualvip = 1;
    obj.level = 7;
    obj.vip = 1;
    obj.result.code = 0;
    obj.servicetype = "TXSP";
    obj.nextgivedate = "0";
   if (obj.svip_info) {
    obj.svip_info.vip = 1;
    obj.svip_info.endTime = "2099-12-31 23:59:59";
    obj.svip_info.level = 7;
   }
}

if ($request.url.indexOf('/fcgi-bin/comm_cgi?name=spp_vscore_user_mashup') !== -1) {
        // 确保 lscore_info 字段存在并设置其值
obj.1score_info = obj.lscore_info || {};
obj.1score_info.reduce_score = 0;
obj.1score_info.score = 99999;
obj.1score_info.level = 7;
obj.1score_info.create_time = 0;
obj.1score_info.modify_time = 0;
obj.1score_info.new_level_time = 0;

// 确保 milestone_info 字段存在并设置其值
obj.milestone_info = obj.milestone_info || [
    { "level": 7, "create_time": 1723445937 },
    { "level": 7, "create_time": 1657848074 },
    { "level": 7, "create_time": 1654782006 },
    { "level": 7, "create_time": 1648946635 },
    { "level": 7, "create_time": 1648276467 }
];

// 确保 star_vipinfo 字段存在并设置其值
obj.star_vipinfo = obj.star_vipinfo || {};
obj.star_vipinfo.end_time = 4102358400;
obj.star_vipinfo.status = 1;
obj.star_vipinfo.begin_time = 1723445937;

// 确保 msg 字段存在并设置其值
obj.msg = "成功";

// 确保 vip_status 字段存在并设置其值
obj.vip_status = obj.vip_status || {};
obj.vip_status.hvip = 1;
obj.vip_status.star_vip = 1;
obj.vip_status.svip = 1;

// 确保 ret 字段存在并设置其值
obj.ret = 0;

// 确保 cscore_info 字段存在并设置其值
obj.cscore_info = obj.cscore_info || {};
obj.cscore_info.vip_score_total = 9999;
obj.cscore_info.vip_scores = [
    {
         "score" : 1,
         "year" : 2024
     }
   ]
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

if ($request.url.indexOf('/fcgi-bin/comm_cgi?otype=xjson&name=get_cscore') !== -1) {
    if (!obj.vip_scores) {
    obj.vip_scores = [];
  }
  let updated = false;
  obj.vip_scores.forEach(score => {
    if (score.year === 2024) {
      score.score = 99999;
      updated = true;
    }
  });
  if (!updated) {
     obj.vip_scores.push({
      year: 2024,
      score: 99999
    });
  }
    if (obj.vip_scores) {
    obj.vip_score_total = 99999;
     }
}



// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });


//请求体修改
if ($request.url.includes("https://vip.video.qq.com/rpc/trpc.query_vipinfo.vipinfo.QueryVipInfo/GetVipUserInfoH5")) {
    let newRequestBody = {
        "geticon": 1,
        "viptype": "svip|subvip|sub_svip|nfl",
        "platform": 7
    };

    $done({ body: JSON.stringify(newRequestBody) });
}
