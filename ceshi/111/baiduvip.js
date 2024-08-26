/*

// 2024-08-25 18:35

[rewrite_local]
# 统一处理脚本
^https?:\/\/pan\.baidu\.com\/api\/(quota|getsyscfg\?) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https?:\/\/pan\.baidu\.com\/(api\/getsyscfg|act\/api\/conf) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https?:\/\/pan\.baidu\.com\/rest\/.*\/membership\/user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https:\/\/pan\.baidu\.com\/pmall\/order\/privilege\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https:\/\/pan\.baidu\.com\/api\/user\/getinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https:\/\/pan\.baidu\.com\/rest\/.*\/membership\/proxy\/guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https:\/\/pan\.baidu\.com\/cms\/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
^https?:\/\/pan\.baidu\.com\/(youai\/(user\/.+\/getminfo|membership\/.+\/adswitch)|(rest\/.+\/membership\/user|act\/.+\/(bchannel|welfare)\/list|api\/usercfg)) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduvip.js
# > 百度网盘_广告推广
^https?:\/\/afd\.baidu\.com\/afd\/entry url reject-200
# > 百度网盘_设置信息流
^https?:\/\/pan\.baidu\.com\/act\/v\d\/(bchannel|welfare)\/list url reject-200
# > 百度网盘_启动弹窗
^https?:\/\/afd\.baidu\.com\/rest\/.*\/membership\/proxy\/guide url reject-200
# > 百度网盘_搜索填词
^https:\/\/pan\.baidu\.com\/queryintent\/queryhint url reject-200
# > 百度网盘_金币乐园
^https:\/\/pan\.baidu\.com\/coins\/center\/notice url reject-200
# > 百度网盘_通用广告
^https?:\/\/pan\.baidu\.com\/rest\/.*\/pcs\/ad url reject-200
# > 百度网盘_活动推广
^https?:\/\/pan\.baidu\.com\/act\/api\/activityentry url reject-200
^https:\/\/pan\.baidu\.com\/rest\/2\.0\/membership\/user?method=gamecenter&freeisp= url reject-200
# > 百度网盘_首页信息流
^https:\/\/pan\.baidu\.com\/feed\/cardinfos url reject-dict
# > 百度网盘_热搜list
^https:\/\/pan\.baidu\.com\/feed\/hotlist url reject-200

*
[mitm]
hostname = pan.baidu.com, afd.baidu.com
*/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
const yike = '/youai/user/v1/getminfo';
const ad = '/youai/membership/v1/adswitch';
const list = '/bchannel/list';
const hf = '/welfare/list';
const usercfg = '/api/usercfg';


if (url.includes("/api/getsyscfg?")) {
  const switchs = [
    "active_sigin_text", // 签到文案
    "ai_search_h5", // ai搜索
    "album_story_config", // 首页视频故事卡片开关配置
    "bdnc_commerce_expire_alert_area", // 商业化到期提醒开关
    "bdnc_commerce_video_ad_area_pad", // 视频贴片广告跳转链接
    "business_ad_config_area", // 各种插入广告
    "certification_user_area", // 我的页面 网盘认证
    "enterprise_banner_area", // 企业运营位
    "enterprise_bottom_banner", // 企业版banner
    "enterprise_hot_tools_area", // 企业首页热门工具
    "enterprise_share_file_list", // 企业空间
    "enterprise_space_area", // 企业空间
    "enterprise_space_config_area", // 企业入口
    "enterprise_space_document_pay_guide", // 开通企业套餐尊享PDF工具
    "flutter_business_area", // Flutter配置
    "home_card_area", // 首页卡片
    "home_recnet_chasing_card_switch", // 首页最近在追tab开关
    "home_tool_area_all_tool_item_area", // 全部工具角标
    "ios_carplay_config_area", // 网盘iOS端CarPlay引导功能节点
    "local_push", // 本地Push
    "magictrick", // 神机-Sugs区显示灵感库开关配置
    "magictrick_inspiration_area", // 学霸神器 玩点有趣 社交情感
    "my_person_service", // 度小满
    "my_share_tag_area", // 企业权益
    "new_user_card", // 新人必看
    "ocr_ai_scan_entrance_area", // 拍一拍home页相机入口飘条
    "private_background_upload", // 后台传输
    "public_guide_config", // 引导飘条
    "public_home_config", // 首页运营
    "public_imprint_config", // 印迹频道节点配置
    "push_active_area", // push弹窗
    "share_Im_idol_area", // idol特权解锁展示
    "share_tool_area", // 共享页顶部图标
    "splash_advertise_fetch_config_area", // 开屏广告
    "splash_advertise_type_area", // 开屏广告
    "theme_skin_active_area", // 十周年皮肤配置节点
    "thrid_ad_buads_service", // 穿山甲SDK初始化开关
    "thrid_ad_funads_service", // 小熊SDK初始化开关
    "universal_card_area", // 各种卡片
    "upload_retrieve" // 自动上报配置
  ];
  for (let i of switchs) {
    if (obj?.[i]?.cfg_list?.length > 0) {
      for (let ii of obj[i].cfg_list) {
        if (ii?.switch) {
          ii.switch = "0";
        }
        if (ii?.open) {
          ii.open = "0";
        }
      }
    }
  }
} 

if (url.includes("/cms\/config")) {
   obj.cfg.p2sp_time_sharing.user_type = "svip";
}



if (url.includes("/pmall/order/privilege/info")) {
    obj.detail = [
    {
      "type" : 1,
      "total_times" : 9, //3
      "valid_times" : 9
    },
    {
      "type" : 2,
      "total_times" : 10, //5
      "valid_times" : 10
    }
  ];
  obj.current_valid_times = 3;
  obj.vip_type = "svip";
  obj.has_privilege = "1";
  obj.current_valid_end_time = 4102358400;
}


if (url.includes("/api/quota")) {
    obj.expire = false;
}

if (url.includes("/api/user/getinfo")) {
    obj.records[0].vip_level = 10;
    obj.records[0].vip_type = 2;
    obj.records[0].vip_point = 100000;
}

if (url.includes("/membership/proxy/guide")) {
    obj.data.ubc_dot.is_vip = 1; 
    obj.data.ubc_dot.is_svip = 1;
    obj.data.ubc_dot.has_vip_buy_record = 1;
    obj.data.ubc_dot.has_svip_buy_record = 1;
    obj.data.ubc_dot.vip_expired_days = 4102358400;
    obj.data.ubc_dot.svip_expired_days = 4102358400;
    obj.data.ubc_dot_map.IsVip = "1";
    obj.data.ubc_dot_map.IsSvip = "1";
    obj.data.ubc_dot_map.HasVipBuyRecord = "1";
    obj.data.ubc_dot_map.HasSvipBuyRecord = "1";
    obj.data.ubc_dot_map.SvipExpiredDays = "4102358400";
    obj.data.ubc_dot_map.VipExpiredDays = "4102358400";
}

if (url.includes("/act\/api\/conf")) {
   obj.data = [
    {
      "conf_key" : "svip_member_tab_list",
      "id" : 4087,
      "end_time" : 3139747200,
      "name" : "新版会员频道tab配置",
      "start_time" : 1686153600,
      "conf_value" : {
        "tabList" : "[\n    {\n        \"name\": \"我的会员\",\n        \"path\": \"/userCenter\"\n    },\n    {\n        \"name\": \"会员购\",\n        \"path\": \"/svipPurchase\"\n    }\n]"
      }
    }
  ];
}

if ($request.url.indexOf(yike) != -1){
  love = {
    "errno": 0,
    "request_id": 342581654394297772,
    "has_purchased": 1,
    "has_buy_1m_auto_first": 0,
    "can_buy_1m_auto_first": 0,
    "can_buy_1m_auto_first_6": 0,
    "has_received_7dfree": 1,
    "product_tag": 3,
    "sign_status": 1,
    "sign_infos": [{
      "product_id": "12745849497343294855",
      "order_no": "2203060931530010416",
      "ctime": 1646537208,
      "mtime": "2022-05-06 11:26:48",
      "status": 1,
      "sign_price": 1000,
      "sign_channel": 0
    }],
    "vip_tags": ["album_vip"],
    "product_infos": [{
      "product_id": "12745849497343294855",
      "start_time": 1646534568,
      "end_time": 4092599349,
      "buy_time": 1649994533,
      "tag": "album_vip",
      "order_no": "2203060931530010416"
    }],
    "vip_infos": [{
      "tag": "album_vip",
      "start_time": 1646537208,
      "end_time": 4092599349
    }],
    "expire_time": 0
  };
}

if ($request.url.indexOf(ad) != -1){
  love.switch = "open";
}

if ($request.url.indexOf(list) != -1){
  love.data = [
    {
      "sub_title": "",
      "id": 856,
      "bg_icon": "",
      "button_text": "",
      "web_url": "",
      "type": 3,
      "name": "已解锁SVIP，未完整解锁"
    },
    {
      "sub_title": "",
      "id": 460,
      "bg_icon": "",
      "button_text": "",
      "web_url": "",
      "type": 3,
      "name": "已拥有极速下载+视频倍速特权"
    }
  ];
}

if ($request.url.indexOf(hf) != -1){
  delete love.data;
}

if ($request.url.indexOf(usercfg) != -1){
  love.user_new_define_cards = [
    {
      "card_id" : "1",
      "card_type" : "4",
      "card_area_name" : "首页笔记-卡片"
    },
    {
      "is_manager" : 1,
      "card_area_name" : "最近",
      "card_id" : "1",
      "card_type" : "7"
    },
    {
      "card_id" : "1",
      "card_type" : "13",
      "card_area_name" : "卡片管理-卡片"
    }
  ];
}

 if (url.includes("/membership/user?")) {
  obj.product_infos = [
    {
      "cluster" : "volume_pri",
      "buy_description" : "200GB(99年)",
      "buy_time" : "1724497678",
      "end_time" : 4102358400,
      "function_num" : 1,
      "product_description" : "200GB(99年)",
      "product_id" : "17283190021318115647",
      "start_time" : 1724497678,
      "status" : 1,
      "detail_cluster" : "volume_pri",
      "product_name" : "volume_200GB_1y"
    },
    {
      "cluster" : "offlinedl",
      "buy_description" : "离线下载套餐(永久)",
      "buy_time" : "1705485869",
      "end_time" : 4102358400,
      "function_num" : 2,
      "product_description" : "离线下载套餐(永久)",
      "product_id" : "5210897752128663390",
      "start_time" : 1705485869,
      "status" : 1,
      "detail_cluster" : "offlinedl",
      "product_name" : "offlinedl_permanent"
    },
    {
      "product_id" : "5310897792128633390",
      "end_time" : 4102358400,
      "buy_time" : "1417260485",
      "cluster" : "offlinedl",
      "start_time" : 1417260485,
      "detail_cluster" : "offlinedl",
      "product_name" : "gz_telecom_exp"
    },
    {
      "product_name" : "svip2_nd",
      "product_description" : "超级会员",
      "function_num" : 0,
      "start_time" : 1417260485,
      "buy_description" : "",
      "buy_time" : 1417260485,
      "product_id" : "1",
      "auto_upgrade_to_svip" : 1,
      "end_time" : 4102358400,
      "cluster" : "vip",
      "detail_cluster" : "svip",
      "status" : 1
    }
  ];

 obj.tips_data_list = [
    {
      "title" : "实名羡慕你的在线解压",
      "action_url" : ""
    },
    {
      "title" : "新上线了PDF转Word >",
      "action_url" : "bdnetdisk://n/action.swan?m_n_v=10.0&swan_app_key=8PPKdfjaGUz2lYS7d3zDvT6Gt2Ct9iVO"
    },
    {
      "title" : "为你定制了V10专属福利 >",
      "action_url" : "https://pan.baidu.com/wap/vip/memberChannel?newChannelBack=1#/userCenter"
       }
    ];

  obj.guide_data = {
    "title" : "超级会员 SVIP",
    "content" : "已拥有极速下载+视频倍速特权",
    "button" : {
      "text" : "会员中心",
      "action_url" : "https://pan.baidu.com/wap/vip/user?from=myvip2#svip"
    }
  };
obj.new_guide_data = {
    "action_url" : "",
    "title" : "SVIP V10",
    "title_action_url" : "",
    "button" : {
      "text" : "SVIP10",
       },
  };

  obj.reminder = {
    "reminderWithContent" : {
      "title" : "已拥有超级会员",
      "notice" : "5T大空间、极速下载等特权已拥有~"
    },
    "advertiseContent" : {
      "url" : "https://yun.baidu.com/buy/center?tag=8&from=reminderpush1",
      "title" : "您的超级会员将于2099-12-31到期",
      "notice" : "5T大空间、极速下载等特权已拥有~"
    },
    "svip" : {
      "leftseconds" : 4102358400,
      "nextState" : "normal"
    }
  };
 obj.level_info = {
    "last_manual_collection_time" : 0,
    "current_max_points" : 100000,
    "current_value" : 100000,
    "history_level" : 10,
    "accumulated_uncollected_points" : 0,
    "v10_id" : "",
    "daily_value" : 0,
    "accumulated_day" : 0,
    "history_value" : 100000,
    "current_level" : 10,
    "accumulated_lost_points" : 0,
    "default_daily_value" : 5
  };
obj.current_product = {
    "product_id" : "12187135090581539740",
    "detail_cluster" : "svip",
    "cluster" : "vip",
    "product_type" : "vip2_1y_auto"
        };
  obj.identity_icon = {
    "vip" : "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
    "common" : "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
    "svip" : "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
    "contentvip" : ""
  };
  obj.status_data_arr = [
    "超级会员至：2099-12-31"
  ];

  obj.level_info = {
      current_level: 10,
      current_value: 100000,
    };
  obj.user_tag =  "{\"is_vip\":1,\"is_svip\":1,\"is_vipv10\":1,\"is_vip_v2\":1,\"is_svip_sign\":0,\"is_vipv2_sign\":0,\"is_scan_vip_sign\":0,\"has_buy_record\":1,\"has_vip_buy_record\":0,\"has_vipv2_buy_record\":0,\"has_svip_buy_record\":0,\"has_buy_vip_svip_record\":0,\"last_buy_record_creat_time\":4102358400,\"is_first_charge\":0,\"is_vip_first_charge\":0,\"notice_user_type\":2,\"notice_user_status\":3,\"last_vip_type\":1,\"last_vip_svip_end_time\":4102358400,\"last_vip_end_time\":4102358400,\"last_vipv2_end_time\":0,\"last_svip_end_time\":4102358400,\"is_first_act\":0,\"activateTime\":1704719871,\"last_v10_end_time\":4102358400,\"last_scan_vip_end_time\":4102358400}";
  obj.user_status = 2;
  obj.user_type = "svip";
  obj.status_data = "超级会员至：2099-12-31";
  obj.error_code = 1;
  delete obj.tips_data_list;
  delete obj.status_data_arr;
  delete obj.sub_card_list;
}



$done({ body: JSON.stringify(obj) });