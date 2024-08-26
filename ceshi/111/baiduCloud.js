/*

// 2024-08-25 18:35

[rewrite_local]
# 统一处理脚本
^https?:\/\/pan\.baidu\.com\/api\/(quota|getsyscfg\?) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https?:\/\/pan\.baidu\.com\/(api\/getsyscfg|act\/api\/conf) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https?:\/\/pan\.baidu\.com\/rest\/.*\/membership\/user url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https:\/\/pan\.baidu\.com\/pmall\/order\/privilege\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https:\/\/pan\.baidu\.com\/api\/user\/getinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https:\/\/pan\.baidu\.com\/rest\/.*\/membership\/proxy\/guide url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
^https:\/\/pan\.baidu\.com\/cms\/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/baiduCloud.js
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


if (url.includes("/membership/user?app_id")) {
   obj.product_infos = [
    {
      "product_id" : "5210897752128663390",
      "end_time" : 4102415999,
      "buy_time" : "1384234467",
      "cluster" : "offlinedl",
      "status" : "1",
      "start_time" : 1384234467,
      "function_num" : 2,
      "buy_description" : "离线下载套餐(永久)",
      "product_description" : "离线下载套餐(永久)",
      "detail_cluster" : "offlinedl",
      "product_name" : "offlinedl_permanent"
    },
    {
      "cur_svip_type" : "year",
      "product_name" : "svip2_nd",
      "product_description" : "",
      "function_num" : 0,
      "start_time" : 1688356160,
      "buy_description" : "",
      "buy_time" : 1384234467,
      "product_id" : "",
      "auto_upgrade_to_svip" : 0,
      "end_time" : 4102415999,
      "cluster" : "vip",
      "detail_cluster" : "svip",
      "status" : 1
    },
    {
      "product_name" : "contentvip_nd",
      "product_description" : "",
      "function_num" : 0,
      "start_time" : 1688356160,
      "buy_description" : "",
      "buy_time" : 1384234467,
      "product_id" : "",
      "auto_upgrade_to_svip" : 0,
      "end_time" : 4102415999,
      "cluster" : "contentvip",
      "detail_cluster" : "contentvip",
      "status" : 1
    }
  ];
   obj.level_info = {
    "history_value" : 100000,
    "current_level" : 10,
    "last_manual_collection_time" : 0,
    "current_value" : 100000,
    "history_level" : 10,
    "v10_id" : ""
  };
  obj.current_product = {
    "product_id" : "12187135090581539740",
    "detail_cluster" : "svip",
    "cluster" : "vip",
    "product_type" : "vip2_1y_auto"
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
      "leftseconds" : 4102415999,
      "nextState" : "normal"
    }
  };
 }

if (url.includes("/cms\/config")) {
   obj.cfg.p2sp_time_sharing.user_type = "svip";
}

if (url.includes("/membership/user/info?app_id")) {
   if (obj.user_info) {
   obj.user_info.is_scan_vip = 1;
   obj.user_info.is_svip = 1;
   obj.user_info.is_vip = 1;
   obj.user_info.is_vip_v2 = 1;
   obj.user_info.is_mvip = 1;
   obj.user_info.is_plus_buy = 1;
     }
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
  obj.current_valid_end_time = 4102415999;
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
    obj.data.ubc_dot.vip_expired_days = 4102415999;
    obj.data.ubc_dot.svip_expired_days = 4102415999;
    obj.data.ubc_dot_map.IsVip = "1";
    obj.data.ubc_dot_map.IsSvip = "1";
    obj.data.ubc_dot_map.HasVipBuyRecord = "1";
    obj.data.ubc_dot_map.HasSvipBuyRecord = "1";
    obj.data.ubc_dot_map.SvipExpiredDays = "4102415999";
    obj.data.ubc_dot_map.VipExpiredDays = "4102415999";
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

if (url.includes("/membership/user?method")) {
   if (obj.privilege_list) {
  obj.privilege_list = [
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageRemoveWatermark",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToExcelShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToPdfRemoveLogo",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "export_document",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "excelToPdfRemoveLogoSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfRemoveWatermarkShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "editing_document",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageZip",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "wordToPdfRemoveLogoSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageCompressSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToWordSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "recognitionText",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToWordShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "real_time_audio_recording",
      "privilege_value" : 3600
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "removeHandWritingShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToLongImage",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToWord",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "removeHandWriting",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "makePuzzleShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "cardScan",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "cardScanShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToPdfRemoveLogoSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "smooth_play",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToPpt",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToWordSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToWordShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToExcelSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pptToPdfRemoveLogoSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "officeToPdfRemoveLogo",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToPptSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToExcel",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "intelligent_summary",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToPdfRemoveLogoShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageZipShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToExcel",
      "privilege_value" : 1
    },
     {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageToWord",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "pdfToExcelSimpleConversion",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "quality_translation_of_texts",
      "privilege_value" : 36000
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageRemoveWatermarkShouBai",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "video_multiple_speed",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "imageAiTranslate",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "makePuzzle",
      "privilege_value" : 1
    },
    {
      "free_count" : -1,
      "is_limitedfree" : 0,
      "scope" : 0,
      "privilege_id" : "video_high_definition",
      "privilege_value" : 1
       }
     ];
   } 

if (url.includes("/membership/user?freeisp")) {
   if (obj.user_tag) {
   obj.user_tag =  "{\"is_vip\":1,\"is_svip\":1,\"is_vipv10\":1,\"is_vip_v2\":1,\"is_svip_sign\":0,\"is_vipv2_sign\":0,\"is_scan_vip_sign\":0,\"has_buy_record\":1,\"has_vip_buy_record\":0,\"has_vipv2_buy_record\":0,\"has_svip_buy_record\":0,\"has_buy_vip_svip_record\":0,\"last_buy_record_creat_time\":4102415999,\"is_first_charge\":0,\"is_vip_first_charge\":0,\"notice_user_type\":2,\"notice_user_status\":3,\"last_vip_type\":1,\"last_vip_svip_end_time\":4102415999,\"last_vip_end_time\":4102415999,\"last_vipv2_end_time\":0,\"last_svip_end_time\":4102415999,\"is_first_act\":0,\"activateTime\":1704719871,\"last_v10_end_time\":4102415999,\"last_scan_vip_end_time\":4102415999}";
     }
   if (obj.product_infos) {
   obj.product_infos = [
    {
      "cluster" : "volume_pri",
      "buy_description" : "200GB(1年)",
      "buy_time" : "1724497678",
      "end_time" : 4102415999,
      "function_num" : 1,
      "product_description" : "200GB(1年)",
      "product_id" : "17283190021318115647",
      "start_time" : 1724497678,
      "status" : 0,
      "detail_cluster" : "volume_pri",
      "product_name" : "volume_200GB_1y"
    },
    {
      "cluster" : "offlinedl",
      "buy_description" : "离线下载套餐(永久)",
      "buy_time" : "1705485869",
      "end_time" : 4102415999,
      "function_num" : 2,
      "product_description" : "离线下载套餐(永久)",
      "product_id" : "5210897752128663390",
      "start_time" : 1705485869,
      "status" : 0,
      "detail_cluster" : "offlinedl",
      "product_name" : "offlinedl_permanent"
    },
    {
      "cur_svip_type" : "year",
      "product_name" : "svip2_nd",
      "product_description" : "",
      "buy_description" : "",
      "function_num" : 0,
      "start_time" : 1722039929,
      "buy_time" : "0",
      "auto_upgrade_to_svip" : 0,
      "product_id" : "",
      "end_time" : 4102415999,
      "cluster" : "vip",
      "detail_cluster" : "svip",
      "status" : 0
    }
  ];
     }
   if (obj.level_info) {
         obj.level_info = {
    "history_value" : 100000,
    "current_level" : 10,
    "last_manual_collection_time" : 0,
    "current_value" : 100000,
    "history_level" : 10,
    "v10_id" : ""
              };
   }
   if (obj.reminder) {
     obj.reminder.svip.leftseconds = 4102415999;
     obj.reminder.svip.nextStatus = "normal";
   }
   if (obj.current_product) {
      obj.current_product = {
    "product_id" : "12187135090581539740",
    "detail_cluster" : "svip",
    "cluster" : "vip",
    "product_type" : "vip2_1y_auto"
         };
   }
   if (obj.user_define_tools) {
     obj.user_define_tools = [
    "photobackup",
    "contactbackup",
    "filerecovery"
      ];
   }

   if (obj.tips_data_list) {
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
  obj.status_data = "超级会员至：2099-12-31";
  obj.guide_data = {
    "action_url" : "",
    "title" : "超级会员SVIP",
    "title_action_url" : "",
    "content" : "已拥有极速下载+视频倍速等74项特权",
  };
  obj.user_status = 2;
  obj.tips_data = {
    "title" : "新上线了PDF转Word >",
    "action_url" : "bdnetdisk://n/action.swan?m_n_v=10.0&swan_app_key=8PPKdfjaGUz2lYS7d3zDvT6Gt2Ct9iVO"
  };
  obj.user_type = "svip";

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
  obj.status_data_arr = [
    "超级会员至：2099-12-31"
  ];
obj.new_guide_data = {
    "action_url" : "",
    "title" : "SVIP V10",
    "title_action_url" : "",
    "button" : {
      "text" : "SVIP10",
       },
  };
obj.new_guide_data.title = "SVIP V10";
   }
}

if (obj.netdisk_common_listening_notes_vip) {
  obj.netdisk_common_listening_notes_vip.status = 0;
  obj.identity_icon = {
  "vip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
  "common": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
  "svip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
  "contentvip": ""
};
   obj.svip =  {
    "emotional_tips_back" : {
      "first" : "很高兴你在x年x月x日成为超级会员，愿美好时光与你相伴。",
      "daily" : [
        "据说超级会员，法力无边",
        "你喜欢的样子，超级会员都有~",
        "对你的祝福，一如超级会员极速下载般真挚。",
        "一起走过的每一天，我给了陪伴，而你给了我成长。",
        "有人说我是野蛮霸道，只有你知道我是贴心的暖宝宝。",
        "有时候我还不太懂你，请千万告诉我，因为有你，我才存在。",
        "世间所有的相遇，都是久别重逢，感谢你的到来。",
        "很高兴你与你相遇，愿美好时光与你相伴。",
        "我心中不会有黄昏，有你在，永远像初春的清晨。",
        "其实我有超能力，超级会员喜欢你。",
        "你开心吗？开啊，不开你怎么进来。",
        "来者何人？超级会员的人。",
        "我是九你是三，除了你还是你。",
        "从今以后我只能称呼你为您了，因为，你在我心上。",
        "没有你，我的时间是缓慢的米勒行星。"
      ]
    },
    "expire_remind_tip" : "将不再享有极速下载、5T空间等特权",
    "emotional_tip_front" : "陪你走过的每一天",
    "identity_icon_list" : [
      "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
      ""
    ],
    "status" : 1,
    "expired_tip" : "不再享有极速下载、5T空间等特权",
    "guide_tip" : [
      "暂未开通 ·  超级会员尊享5T空间和极速下载特权"
    ],
    "is_sign_user" : false
  };
if (obj.vipv2) {
  obj.vipv2.status = 0;
}
if (obj.scan_vip) {
  obj.scan_vip.status = 0;
   }
}


}

if (url.includes("/membership/user?logid=")) {
  if (obj.privilege_title) {
   obj = {
  "privilege_title" : {
    "vip" : "尊享2T空间、在线解压、自动备份文件、大文件上传等24项特权",
    "scan" : "扫描会员尊享转Word、PDF工具、提取文字等22项特权",
    "vipv2" : "VIP享20G/月极速流量、超清画质等28项特权，另赠空间500G",
    "svip" : "尊享5T空间、极速下载、在线解压、极速同步等74项特权"
  },
  "total_num" : {
    "vip" : 24,
    "scan" : 22,
    "vipv2" : 28,
    "svip" : 74
  },
  "baidu_app_scene" : {
    "vipv2" : {
      "text" : "VIP尊享流畅播、极速下载20G、视频原画备份等21项特权",
      "icon" : ""
    },
    "scan" : {
      "text" : "扫描会员尊享转Word、PDF工具、证件扫描等20+权益",
      "icon" : ""
    },
    "svip" : {
      "text" : "SVIP尊享流畅播、极速下载、5T空间等54项特权",
      "icon" : ""
    }
  },
  "error_code" : 0,
  "request_id" : 8998630192098299000,
  "rights_info" : [
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "一键智能消除",
        "scan_vip" : "一键智能消除",
        "default" : "一键智能消除",
        "svip" : "一键智能消除"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "去水印",
        "scan_vip" : "去水印",
        "default" : "去水印",
        "svip" : "去水印"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557411533/高清扫描导出无水印.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557411533/高清扫描导出无水印.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207417242/%E5%8E%BB%E6%B0%B4%E5%8D%B0.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204985067/%E5%8E%BB%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 50
    },
    {
      "right_id" : 1,
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913156038/%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913156038/%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204982743/%E8%B6%85%E5%A4%A7%E4%BA%91%E5%AD%98%E5%82%A8.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206876283/%E8%B6%85%E5%A4%A7%E4%BA%91%E5%AD%98%E5%82%A8.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270584972/%E5%AD%98%E5%82%A8%E7%A9%BA%E9%97%B4.png"
      },
      "right_name" : {
        "vip" : "2T空间",
        "scan_vip" : "超大云空间",
        "default" : "超大空间",
        "svip" : "5T空间"
      },
      "privilege_type" : "quota",
      "in_vip" : true,
      "in_normal" : true,
      "in_svip" : true,
      "apps" : [
        "android",
        "iphone",
        "iPad",
        "pcguanjia",
        "MAC"
      ],
      "is_new" : false,
      "right_description" : {
        "vip" : "超大空间任你存",
        "scan_vip" : "超大空间任你存",
        "default" : "超大空间任你存",
        "svip" : "超大空间任你存"
      },
      "in_vipv2" : false,
      "in_scan" : true
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC"
      ],
      "right_description" : {
        "vip" : "飞一般的速度",
        "scan_vip" : "飞一般的速度",
        "default" : "飞一般的速度",
        "svip" : "飞一般的速度"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "极速下载",
        "scan_vip" : "极速下载",
        "default" : "极速下载",
        "svip" : "极速下载"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913541724/%E6%9E%81%E9%80%9F%E4%B8%8B%E8%BD%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913541724/%E6%9E%81%E9%80%9F%E4%B8%8B%E8%BD%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270584626/%E6%9E%81%E9%80%9F%E4%B8%8B%E8%BD%BD.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270584626/%E6%9E%81%E9%80%9F%E4%B8%8B%E8%BD%BD.png"
      },
      "in_svip" : true,
      "right_id" : 2
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia"
      ],
      "right_description" : {
        "vip" : "缩短无聊/放大精彩",
        "scan_vip" : "缩短无聊/放大精彩",
        "default" : "缩短无聊/放大精彩",
        "svip" : "缩短无聊/放大精彩"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频倍速",
        "scan_vip" : "视频倍速",
        "default" : "视频倍速",
        "svip" : "视频倍速"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913811539/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913811539/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270584381/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270584381/%E8%A7%86%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE.png"
      },
      "in_svip" : true,
      "right_id" : 3
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "快速学习好帮手",
        "scan_vip" : "快速学习好帮手",
        "default" : "快速学习好帮手",
        "svip" : "快速学习好帮手"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "音频倍速",
        "scan_vip" : "音频倍速",
        "default" : "音频倍速",
        "svip" : "音频倍速"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914681576/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914681576/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270099233/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270099233/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE.png"
      },
      "in_svip" : true,
      "right_id" : 17
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "1080P/2K/4K",
        "scan_vip" : "1080P/2K/4K",
        "default" : "1080P/2K/4K",
        "svip" : "1080P/2K/4K"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "高清画质",
        "scan_vip" : "高清画质",
        "default" : "高清画质",
        "svip" : "高清画质"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913895567/%E8%A7%86%E9%A2%91%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913895567/%E8%A7%86%E9%A2%91%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270583934/%E8%A7%86%E9%A2%91%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270583934/%E8%A7%86%E9%A2%91%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8.png"
      },
      "in_svip" : true,
      "right_id" : 4
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "视频播放极速加载",
        "scan_vip" : "视频播放极速加载",
        "default" : "视频播放极速加载",
        "svip" : "视频播放极速加载"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "高速播放",
        "scan_vip" : "高速播放",
        "default" : "高速播放",
        "svip" : "高速播放"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914681576/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914681576/%E9%9F%B3%E9%A2%91%E5%80%8D%E9%80%9F%E6%92%AD%E6%94%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270098415/%E8%A7%86%E9%A2%91%E9%AB%98%E9%80%9F%E9%80%9A%E9%81%93.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270098415/%E8%A7%86%E9%A2%91%E9%AB%98%E9%80%9F%E9%80%9A%E9%81%93.png"
      },
      "in_svip" : true,
      "right_id" : 18
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "web"
      ],
      "right_description" : {
        "vip" : "重复文件/空文件夹",
        "scan_vip" : "重复文件/空文件夹",
        "default" : "重复文件/空文件夹",
        "svip" : "重复文件/空文件夹"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "文件清理",
        "scan_vip" : "文件清理",
        "default" : "文件清理",
        "svip" : "文件清理"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913582570/%E5%9E%83%E5%9C%BE%E6%96%87%E4%BB%B6%E6%B8%85%E7%90%86%E7%89%B9%E6%9D%83_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913582570/%E5%9E%83%E5%9C%BE%E6%96%87%E4%BB%B6%E6%B8%85%E7%90%86%E7%89%B9%E6%9D%83_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269129760/%E5%9E%83%E5%9C%BE%E6%96%87%E4%BB%B6%E6%B8%85%E7%90%86%E7%89%B9%E6%9D%83.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269129760/%E5%9E%83%E5%9C%BE%E6%96%87%E4%BB%B6%E6%B8%85%E7%90%86%E7%89%B9%E6%9D%83.png"
      },
      "in_svip" : true,
      "right_id" : 19
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "pcguanjia",
        "MAC"
      ],
      "right_description" : {
        "vip" : "单次上传最高500",
        "scan_vip" : "单次上传无数量限制",
        "default" : "单次上传最高500",
        "svip" : "单次上传无数量限制"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "批量上传",
        "scan_vip" : "批量上传",
        "default" : "批量上传",
        "svip" : "批量上传"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913734390/%E6%89%B9%E9%87%8F%E4%B8%8A%E4%BC%A0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913734390/%E6%89%B9%E9%87%8F%E4%B8%8A%E4%BC%A0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269505479/%E6%89%B9%E9%87%8F%E4%B8%8A%E4%BC%A0.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269505479/%E6%89%B9%E9%87%8F%E4%B8%8A%E4%BC%A0.png"
      },
      "in_svip" : true,
      "right_id" : 14
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "手机视频无损备份",
        "scan_vip" : "手机视频无损备份",
        "default" : "手机视频无损备份",
        "svip" : "手机视频无损备份"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "视频备份",
        "scan_vip" : "视频备份",
        "default" : "视频备份",
        "svip" : "视频备份"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913987278/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E5%A4%87%E4%BB%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913987278/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E5%A4%87%E4%BB%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270098167/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E5%A4%87%E4%BB%BD.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270098167/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E5%A4%87%E4%BB%BD.png"
      },
      "in_svip" : true,
      "right_id" : 7
    },
    {
      "right_id" : 5,
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914570974/%E6%96%87%E4%BB%B6%E8%BD%AC%E5%AD%98_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914570974/%E6%96%87%E4%BB%B6%E8%BD%AC%E5%AD%98_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270097054/%E6%96%87%E4%BB%B6%E8%BD%AC%E5%AD%98.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270097054/%E6%96%87%E4%BB%B6%E8%BD%AC%E5%AD%98.png"
      },
      "right_name" : {
        "vip" : "转存数提升",
        "scan_vip" : "转存数提升",
        "default" : "转存数提升",
        "svip" : "转存数提升"
      },
      "privilege_type" : "transafer",
      "in_vip" : true,
      "in_normal" : true,
      "in_svip" : true,
      "apps" : [
        "android",
        "iphone"
      ],
      "is_new" : false,
      "right_description" : {
        "vip" : "单次转存数提升至3000",
        "scan_vip" : "单次转存数提升至5万",
        "default" : "单次转存数500",
        "svip" : "单次转存数提升至5万"
      },
      "in_vipv2" : true,
      "in_scan" : false
    },
    {
      "right_id" : 6,
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914882495/%E5%9C%A8%E7%BA%BF%E8%A7%A3%E5%8E%8B_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914882495/%E5%9C%A8%E7%BA%BF%E8%A7%A3%E5%8E%8B_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269504975/%E5%9C%A8%E7%BA%BF%E8%A7%A3%E5%8E%8B.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269504975/%E5%9C%A8%E7%BA%BF%E8%A7%A3%E5%8E%8B.png"
      },
      "right_name" : {
        "vip" : "在线解压",
        "scan_vip" : "在线解压",
        "default" : "在线解压",
        "svip" : "在线解压"
      },
      "privilege_type" : "unzip",
      "in_vip" : true,
      "in_normal" : false,
      "in_svip" : true,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "is_new" : false,
      "right_description" : {
        "vip" : "2G内压缩包在线打开",
        "scan_vip" : "8G内压缩包在线打开",
        "default" : "在线解压",
        "svip" : "8G内压缩包在线打开"
      },
      "in_vipv2" : true,
      "in_scan" : false
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "自动备份手机文件夹",
        "scan_vip" : "自动备份手机文件夹",
        "default" : "自动备份手机文件夹",
        "svip" : "自动备份手机文件夹"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "文件夹备份",
        "scan_vip" : "文件夹备份",
        "default" : "文件夹备份",
        "svip" : "文件夹备份"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914497678/%E6%96%87%E4%BB%B6%E5%A4%B9%E5%A4%87%E4%BB%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914497678/%E6%96%87%E4%BB%B6%E5%A4%B9%E5%A4%87%E4%BB%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270097663/%E6%96%87%E4%BB%B6%E5%A4%B9%E5%A4%87%E4%BB%BD.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270097663/%E6%96%87%E4%BB%B6%E5%A4%B9%E5%A4%87%E4%BB%BD.png"
      },
      "in_svip" : true,
      "right_id" : 8
    },
    {
      "right_id" : 9,
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913402548/%E5%9B%9E%E6%94%B6%E7%AB%99%E6%9C%89%E6%95%88%E6%9C%9F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913402548/%E5%9B%9E%E6%94%B6%E7%AB%99%E6%9C%89%E6%95%88%E6%9C%9F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269500666/%E5%9B%9E%E6%94%B6%E7%AB%99%E6%9C%89%E6%95%88%E6%9C%9F.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269500666/%E5%9B%9E%E6%94%B6%E7%AB%99%E6%9C%89%E6%95%88%E6%9C%9F.png"
      },
      "right_name" : {
        "vip" : "回收站有效期",
        "scan_vip" : "回收站有效期",
        "default" : "回收站有效期",
        "svip" : "回收站有效期"
      },
      "privilege_type" : "receycle",
      "in_vip" : true,
      "in_normal" : true,
      "in_svip" : true,
      "apps" : [
        "android",
        "iphone"
      ],
      "is_new" : false,
      "right_description" : {
        "vip" : "回收站文件保留15天",
        "scan_vip" : "回收站文件保留30天",
        "default" : "回收站文件保留10天",
        "svip" : "回收站文件保留30天"
      },
      "in_vipv2" : true,
      "in_scan" : false
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia"
      ],
      "right_description" : {
        "vip" : "隐藏空间存储无限制",
        "scan_vip" : "隐藏空间存储无限制",
        "default" : "隐藏空间存储无限制",
        "svip" : "隐藏空间存储无限制"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "隐藏空间",
        "scan_vip" : "隐藏空间",
        "default" : "隐藏空间",
        "svip" : "隐藏空间"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914837083/%E9%9A%90%E8%97%8F%E7%A9%BA%E9%97%B4%E6%97%A0%E9%99%90%E5%88%B6_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914837083/%E9%9A%90%E8%97%8F%E7%A9%BA%E9%97%B4%E6%97%A0%E9%99%90%E5%88%B6_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270096598/%E9%9A%90%E8%97%8F%E7%A9%BA%E9%97%B4%E6%97%A0%E9%99%90%E5%88%B6.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270096598/%E9%9A%90%E8%97%8F%E7%A9%BA%E9%97%B4%E6%97%A0%E9%99%90%E5%88%B6.png"
      },
      "in_svip" : true,
      "right_id" : 10
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "pcguanjia"
      ],
      "right_description" : {
        "vip" : "自动备份本地文件夹",
        "scan_vip" : "自动备份本地文件夹",
        "default" : "自动备份本地文件夹",
        "svip" : "自动备份本地文件夹"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "自动备份",
        "scan_vip" : "自动备份",
        "default" : "自动备份",
        "svip" : "自动备份"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915020107/%E8%87%AA%E5%8A%A8%E5%A4%87%E4%BB%BD%E6%96%87%E4%BB%B6%E5%A4%B9_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915020107/%E8%87%AA%E5%8A%A8%E5%A4%87%E4%BB%BD%E6%96%87%E4%BB%B6%E5%A4%B9_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269129326/%E8%87%AA%E5%8A%A8%E5%A4%87%E4%BB%BD%E6%96%87%E4%BB%B6%E5%A4%B9.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269129326/%E8%87%AA%E5%8A%A8%E5%A4%87%E4%BB%BD%E6%96%87%E4%BB%B6%E5%A4%B9.png"
      },
      "in_svip" : true,
      "right_id" : 12
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "pcguanjia"
      ],
      "right_description" : {
        "vip" : "管理文档历史版本",
        "scan_vip" : "管理文档历史版本",
        "default" : "管理文档历史版本",
        "svip" : "管理文档历史版本"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "历史版本",
        "scan_vip" : "历史版本",
        "default" : "历史版本",
        "svip" : "历史版本"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913655552/%E5%8E%86%E5%8F%B2%E7%89%88%E6%9C%AC_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913655552/%E5%8E%86%E5%8F%B2%E7%89%88%E6%9C%AC_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269498898/%E5%8E%86%E5%8F%B2%E7%89%88%E6%9C%AC.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269498898/%E5%8E%86%E5%8F%B2%E7%89%88%E6%9C%AC.png"
      },
      "in_svip" : true,
      "right_id" : 13
    },
    {
      "right_id" : 11,
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913220396/%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913220396/%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270096121/%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270096121/%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.png"
      },
      "right_name" : {
        "vip" : "大文件上传",
        "scan_vip" : "大文件上传",
        "default" : "大文件上传",
        "svip" : "大文件上传"
      },
      "privilege_type" : "bigfile",
      "in_vip" : true,
      "in_normal" : true,
      "in_svip" : true,
      "apps" : [
        "pcguanjia",
        "MAC"
      ],
      "is_new" : false,
      "right_description" : {
        "vip" : "支持10G单文件上传",
        "scan_vip" : "支持300G单文件上传",
        "default" : "大文件上传",
        "svip" : "支持300G单文件上传"
      },
      "in_vipv2" : true,
      "in_scan" : false
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "VIP标识亮起来",
        "scan_vip" : "SVIP标识亮起来",
        "default" : "尊贵身份标识",
        "svip" : "SVIP标识亮起来"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "尊贵身份",
        "scan_vip" : "尊贵身份",
        "default" : "尊贵身份",
        "svip" : "尊贵身份"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915084246/%E5%B0%8A%E8%B4%B5%E8%BA%AB%E4%BB%BD%E6%A0%87%E8%AF%86_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915084246/%E5%B0%8A%E8%B4%B5%E8%BA%AB%E4%BB%BD%E6%A0%87%E8%AF%86_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270095716/%E5%B0%8A%E8%B4%B5%E8%BA%AB%E4%BB%BD%E6%A0%87%E8%AF%86.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270095716/%E5%B0%8A%E8%B4%B5%E8%BA%AB%E4%BB%BD%E6%A0%87%E8%AF%86.png"
      },
      "in_svip" : true,
      "right_id" : 15
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "转换更便捷",
        "scan_vip" : "转换更便捷",
        "default" : "转换更便捷",
        "svip" : "转换更便捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "PDF转PPT",
        "scan_vip" : "PDF转PPT",
        "default" : "PDF转PPT",
        "svip" : "PDF转PPT"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915330931/PDF%E8%BD%ACPPT_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915330931/PDF%E8%BD%ACPPT_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207104738/PDF%E8%BD%ACPPT.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206365319/PDF%E8%BD%ACPPT.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269130287/PDF%E8%BD%ACPPT.png"
      },
      "in_svip" : true,
      "right_id" : 21
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "转换更便捷",
        "scan_vip" : "转换更便捷",
        "default" : "转换更便捷",
        "svip" : "转换更便捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "转Excel",
        "scan_vip" : "转Excel",
        "default" : "转Excel",
        "svip" : "转Excel"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915298167/PDF%E8%BD%AC%E8%BD%ACExcel_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915298167/PDF%E8%BD%AC%E8%BD%ACExcel_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206879881/%E6%8F%90%E5%8F%96%E8%A1%A8%E6%A0%BC.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206087810/%E6%8F%90%E5%8F%96%E8%A1%A8%E6%A0%BC.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268648539/PDF%E8%BD%AC%E8%BD%ACExcel.png"
      },
      "in_svip" : true,
      "right_id" : 22
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "导出更方便",
        "scan_vip" : "导出更方便",
        "default" : "导出更方便",
        "svip" : "导出更方便"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "PDF导长图",
        "scan_vip" : "PDF导长图",
        "default" : "PDF导长图",
        "svip" : "PDF导长图"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915245038/PDF%E8%BD%AC%E9%95%BF%E5%9B%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915245038/PDF%E8%BD%AC%E9%95%BF%E5%9B%BE_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207104206/PDF%E8%BD%AC%E9%95%BF%E5%9B%BE.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206089545/PDF%E5%AF%BC%E9%95%BF%E5%9B%BE.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269127138/PDF%E8%BD%AC%E9%95%BF%E5%9B%BE.png"
      },
      "in_svip" : true,
      "right_id" : 23
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "搜图片更快捷",
        "scan_vip" : "搜图片更快捷",
        "default" : "搜图片更快捷",
        "svip" : "搜图片更快捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "图中文字搜索",
        "scan_vip" : "图中文字搜索",
        "default" : "图中文字搜索",
        "svip" : "图中文字搜索"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557414784/Group%201135.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557414784/Group%201135.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272796683/%E5%9B%BE%E4%B8%AD%E6%96%87%E5%AD%97%E6%90%9C%E7%B4%A2.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272796683/%E5%9B%BE%E4%B8%AD%E6%96%87%E5%AD%97%E6%90%9C%E7%B4%A2.png"
      },
      "in_svip" : true,
      "right_id" : 51
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "智能修复，效果惊艳",
        "scan_vip" : "智能修复，效果惊艳",
        "default" : "智能修复，效果惊艳",
        "svip" : "智能修复，效果惊艳"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "扫描AI滤镜",
        "scan_vip" : "扫描AI滤镜",
        "default" : "扫描AI滤镜",
        "svip" : "扫描AI滤镜"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557412456/文字修复.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557412456/文字修复.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206879520/%E6%89%AB%E6%8F%8FAI%E6%BB%A4%E9%95%9C.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206087550/%E6%89%AB%E6%8F%8FAI%E6%BB%A4%E9%95%9C.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272797750/%E6%96%87%E5%AD%97%E4%BF%AE%E5%A4%8D.png"
      },
      "in_svip" : true,
      "right_id" : 48
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "生日专享福利",
        "scan_vip" : "生日专享福利",
        "default" : "生日专享福利",
        "svip" : "生日专享福利"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "生日福利",
        "scan_vip" : "生日福利",
        "default" : "生日福利",
        "svip" : "生日福利"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668762976402/8.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668762976402/8.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668740643768/srl.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668740643768/srl.png"
      },
      "in_svip" : true,
      "right_id" : 55
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "极致文档扫描体验",
        "scan_vip" : "极致文档扫描体验",
        "default" : "极致文档扫描体验",
        "svip" : "极致文档扫描体验"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "导出无Logo",
        "scan_vip" : "导出无Logo",
        "default" : "导出无Logo",
        "svip" : "导出无Logo"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657626868109/smdcwlogo.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657626868109/smdcwlogo.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207416541/%E9%AB%98%E6%B8%85%E6%89%AB%E6%8F%8F%E5%AF%BC%E5%87%BA%E6%97%A0logo.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204983372/%E5%AF%BC%E5%87%BA%E6%97%A0logo.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630511/%E9%AB%98%E6%B8%85%E6%89%AB%E6%8F%8F%E5%AF%BC%E5%87%BA%E6%97%A0logo.png"
      },
      "in_svip" : true,
      "right_id" : 41
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "保留格式/编辑便捷",
        "scan_vip" : "保留格式/编辑便捷",
        "default" : "保留格式/编辑便捷",
        "svip" : "保留格式/编辑便捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "转Word",
        "scan_vip" : "转Word",
        "default" : "转Word",
        "svip" : "转Word"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557412880/Group%20501.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557412880/Group%20501.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207416908/%E6%8B%8D%E5%9B%BE%E8%BD%ACword.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206089138/%E8%BD%ACWord.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272631539/%E6%8B%8D%E5%9B%BE%E8%BD%ACword.png"
      },
      "in_svip" : true,
      "right_id" : 42
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "pcguanjia",
        "MAC"
      ],
      "right_description" : {
        "vip" : "找文件更快捷",
        "scan_vip" : "找文件更快捷",
        "default" : "找文件更快捷",
        "svip" : "找文件更快捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "文档全文搜索",
        "scan_vip" : "文档全文搜索",
        "default" : "文档全文搜索",
        "svip" : "文档全文搜索"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-8/1692327045834/2d7808b7d7ff913c94d6bcf69.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-8/1692327045834/2d7808b7d7ff913c94d6bcf69.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272797172/%E6%96%87%E6%A1%A3%E6%AD%A3%E6%96%87%E6%90%9C%E7%B4%A2.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272797172/%E6%96%87%E6%A1%A3%E6%AD%A3%E6%96%87%E6%90%9C%E7%B4%A2.png"
      },
      "in_svip" : true,
      "right_id" : 43
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "听音频学习更高效",
        "scan_vip" : "听音频学习更高效",
        "default" : "听音频学习更高效",
        "svip" : "听音频学习更高效"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "音频转文稿",
        "scan_vip" : "音频转文稿",
        "default" : "音频转文稿",
        "svip" : "音频转文稿"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557414384/Group%201061.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557414384/Group%201061.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272798128/%E9%9F%B3%E9%A2%91%E8%BD%AC%E6%96%87%E7%A8%BF.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272798128/%E9%9F%B3%E9%A2%91%E8%BD%AC%E6%96%87%E7%A8%BF.png"
      },
      "in_svip" : true,
      "right_id" : 44
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "转译多语种文档",
        "scan_vip" : "转译多语种文档",
        "default" : "转译多语种文档",
        "svip" : "转译多语种文档"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "全文翻译",
        "scan_vip" : "全文翻译",
        "default" : "全文翻译",
        "svip" : "全文翻译"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557413342/Group%201035.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557413342/Group%201035.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207417487/%E5%85%A8%E6%96%87%E7%BF%BB%E8%AF%91.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204985467/%E5%85%A8%E6%96%87%E7%BF%BB%E8%AF%91.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272884524/%E5%85%A8%E6%96%87%E7%BF%BB%E8%AF%91.png"
      },
      "in_svip" : true,
      "right_id" : 45
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "手机视频原画存储",
        "scan_vip" : "手机视频原画存储",
        "default" : "手机视频原画存储",
        "svip" : "手机视频原画存储"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "手机视频上传",
        "scan_vip" : "手机视频上传",
        "default" : "手机视频上传",
        "svip" : "手机视频上传"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557621448/sjspsc_svip.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657557621448/sjspsc_svip.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269126283/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E4%B8%8A%E4%BC%A0.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269126283/%E6%89%8B%E6%9C%BA%E8%A7%86%E9%A2%91%E4%B8%8A%E4%BC%A0.png"
      },
      "in_svip" : true,
      "right_id" : 46
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "无限次（限时体验）",
        "scan_vip" : "锁屏也能听视频",
        "default" : "无限次（限时体验）",
        "svip" : "锁屏也能听视频"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "音频模式",
        "scan_vip" : "音频模式",
        "default" : "音频模式",
        "svip" : "音频模式"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914797051/%E9%9F%B3%E9%A2%91%E6%A8%A1%E5%BC%8F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914797051/%E9%9F%B3%E9%A2%91%E6%A8%A1%E5%BC%8F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269126677/%E9%9F%B3%E9%A2%91%E6%A8%A1%E5%BC%8F.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269126677/%E9%9F%B3%E9%A2%91%E6%A8%A1%E5%BC%8F.png"
      },
      "in_svip" : true,
      "right_id" : 24
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "随心享PDF格式导出",
        "scan_vip" : "随心享PDF格式导出",
        "default" : "随心享PDF格式导出",
        "svip" : "随心享PDF格式导出"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "导出PDF",
        "scan_vip" : "导出PDF",
        "default" : "导出PDF",
        "svip" : "导出PDF"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915161203/Office%E8%BD%ACPDF_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915161203/Office%E8%BD%ACPDF_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204983964/%E5%AF%BC%E5%87%BAPDF.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207103176/Office%E8%BD%ACPDF.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268647478/Office%E8%BD%ACPDF.png"
      },
      "in_svip" : true,
      "right_id" : 25
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "提取图中文字",
        "scan_vip" : "提取图中文字",
        "default" : "提取图中文字",
        "svip" : "提取图中文字"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "文字识别",
        "scan_vip" : "文字识别",
        "default" : "文字识别",
        "svip" : "文字识别"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914156208/%E5%9B%BE%E7%89%87%E8%BD%AC%E6%96%87%E5%AD%97_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914156208/%E5%9B%BE%E7%89%87%E8%BD%AC%E6%96%87%E5%AD%97_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207101788/%E6%8F%90%E5%8F%96%E6%96%87%E5%AD%97.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206088133/%E6%8F%90%E5%8F%96%E6%96%87%E5%AD%97.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268647478/Office%E8%BD%ACPDF.png"
      },
      "in_svip" : true,
      "right_id" : 26
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "一键合并",
        "scan_vip" : "一键合并",
        "default" : "一键合并",
        "svip" : "一键合并"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "PDF合并",
        "scan_vip" : "PDF合并",
        "default" : "PDF合并",
        "svip" : "PDF合并"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915214580/PDF%E5%90%88%E5%B9%B6_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915214580/PDF%E5%90%88%E5%B9%B6_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206089852/PDF%E5%90%88%E5%B9%B6.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207103453/PDF%E5%90%88%E5%B9%B6.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268645467/PDF%E5%90%88%E5%B9%B6.png"
      },
      "in_svip" : true,
      "right_id" : 27
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "彰显不同",
        "scan_vip" : "彰显不同",
        "default" : "彰显不同",
        "svip" : "彰显不同"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "会员卡换肤",
        "scan_vip" : "会员卡换肤",
        "default" : "会员卡换肤",
        "svip" : "会员卡换肤"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915124546/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915124546/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270585471/%E4%BC%9A%E5%91%98%E5%8D%A1%E6%8D%A2%E8%82%A4.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270585471/%E4%BC%9A%E5%91%98%E5%8D%A1%E6%8D%A2%E8%82%A4.png"
      },
      "in_svip" : true,
      "right_id" : 28
    },
    {
      "in_vipv2" : false,
      "in_vip" : true,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "海量福利随心领",
        "scan_vip" : "海量福利随心领",
        "default" : "海量福利随心领",
        "svip" : "海量福利随心领"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "等级福利",
        "scan_vip" : "等级福利",
        "default" : "等级福利",
        "svip" : "等级福利"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913356140/%E7%AD%89%E7%BA%A7%E7%A6%8F%E5%88%A9_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913356140/%E7%AD%89%E7%BA%A7%E7%A6%8F%E5%88%A9_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269507047/%E7%AD%89%E7%BA%A7%E7%A6%8F%E5%88%A9.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269507047/%E7%AD%89%E7%BA%A7%E7%A6%8F%E5%88%A9.png"
      },
      "in_svip" : true,
      "right_id" : 29
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone"
      ],
      "right_description" : {
        "vip" : "专属桌面图标主题",
        "scan_vip" : "专属桌面图标主题",
        "default" : "专属桌面图标主题",
        "svip" : "专属桌面图标主题"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "尊享皮肤",
        "scan_vip" : "尊享皮肤",
        "default" : "尊享皮肤",
        "svip" : "尊享皮肤"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915124546/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915124546/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268646409/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268646409/%E5%B0%8A%E4%BA%AB%E7%9A%AE%E8%82%A4.png"
      },
      "in_svip" : true,
      "right_id" : 30
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "支持10台设备同时使用",
        "scan_vip" : "支持6台设备同时使用",
        "default" : "支持10台设备同时使用",
        "svip" : "支持10台设备同时使用"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "登录设备扩展",
        "scan_vip" : "登录设备扩展",
        "default" : "登录设备扩展",
        "svip" : "登录设备扩展"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913270669/%E7%99%BB%E5%BD%95%E8%AE%BE%E5%A4%87%E6%89%A9%E5%B1%95_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913270669/%E7%99%BB%E5%BD%95%E8%AE%BE%E5%A4%87%E6%89%A9%E5%B1%95_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269128769/%E7%99%BB%E5%BD%95%E8%AE%BE%E5%A4%87%E6%89%A9%E5%B1%95.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269128769/%E7%99%BB%E5%BD%95%E8%AE%BE%E5%A4%87%E6%89%A9%E5%B1%95.png"
      },
      "in_svip" : true,
      "right_id" : 32
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "3~5个文件同时下载",
        "scan_vip" : "3~5个文件同时下载",
        "default" : "3~5个文件同时下载",
        "svip" : "3~5个文件同时下载"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "并行下载",
        "scan_vip" : "并行下载",
        "default" : "并行下载",
        "svip" : "并行下载"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637912958207/%E5%B9%B6%E8%A1%8C%E4%B8%8B%E8%BD%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637912958207/%E5%B9%B6%E8%A1%8C%E4%B8%8B%E8%BD%BD_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268644631/%E5%B9%B6%E8%A1%8C%E4%B8%8B%E8%BD%BD.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268644631/%E5%B9%B6%E8%A1%8C%E4%B8%8B%E8%BD%BD.png"
      },
      "in_svip" : true,
      "right_id" : 33
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "工作空间畅享极速同步",
        "scan_vip" : "工作空间畅享极速同步",
        "default" : "工作空间畅享极速同步",
        "svip" : "工作空间畅享极速同步"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "极速同步",
        "scan_vip" : "极速同步",
        "default" : "极速同步",
        "svip" : "极速同步"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913509474/%E6%9E%81%E9%80%9F%E5%90%8C%E6%AD%A5_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913509474/%E6%9E%81%E9%80%9F%E5%90%8C%E6%AD%A5_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269501171/%E6%9E%81%E9%80%9F%E5%90%8C%E6%AD%A5.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269501171/%E6%9E%81%E9%80%9F%E5%90%8C%E6%AD%A5.png"
      },
      "in_svip" : true,
      "right_id" : 34
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "工作空间无限流量同步",
        "scan_vip" : "工作空间无限流量同步",
        "default" : "工作空间无限流量同步",
        "svip" : "工作空间无限流量同步"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "无限同步流量",
        "scan_vip" : "无限同步流量",
        "default" : "无限同步流量",
        "svip" : "无限同步流量"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914607804/%E6%97%A0%E9%99%90%E5%90%8C%E6%AD%A5%E6%B5%81%E9%87%8F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914607804/%E6%97%A0%E9%99%90%E5%90%8C%E6%AD%A5%E6%B5%81%E9%87%8F_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268644135/%E6%97%A0%E9%99%90%E5%90%8C%E6%AD%A5%E6%B5%81%E9%87%8F.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268644135/%E6%97%A0%E9%99%90%E5%90%8C%E6%AD%A5%E6%B5%81%E9%87%8F.png"
      },
      "in_svip" : true,
      "right_id" : 35
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "标记关键时刻",
        "scan_vip" : "标记关键时刻",
        "default" : "标记关键时刻",
        "svip" : "标记关键时刻"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频定点标记",
        "scan_vip" : "视频定点标记",
        "default" : "视频定点标记",
        "svip" : "视频定点标记"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913853112/%E8%A7%86%E9%A2%91%E5%AE%9A%E7%82%B9%E6%A0%87%E8%AE%B0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913853112/%E8%A7%86%E9%A2%91%E5%AE%9A%E7%82%B9%E6%A0%87%E8%AE%B0_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270099746/%E8%A7%86%E9%A2%91%E5%AE%9A%E7%82%B9%E6%A0%87%E8%AE%B0.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664270099746/%E8%A7%86%E9%A2%91%E5%AE%9A%E7%82%B9%E6%A0%87%E8%AE%B0.png"
      },
      "in_svip" : true,
      "right_id" : 36
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "提升整理效率",
        "scan_vip" : "提升整理效率",
        "default" : "提升整理效率",
        "svip" : "提升整理效率"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "批量重命名",
        "scan_vip" : "批量重命名",
        "default" : "批量重命名",
        "svip" : "批量重命名"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913767298/%E6%89%B9%E9%87%8F%E9%87%8D%E5%91%BD%E5%90%8D_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637913767298/%E6%89%B9%E9%87%8F%E9%87%8D%E5%91%BD%E5%90%8D_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268645050/%E6%89%B9%E9%87%8F%E9%87%8D%E5%91%BD%E5%90%8D.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268645050/%E6%89%B9%E9%87%8F%E9%87%8D%E5%91%BD%E5%90%8D.png"
      },
      "in_svip" : true,
      "right_id" : 37
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "外链皮肤随心换",
        "scan_vip" : "外链皮肤随心换",
        "default" : "外链皮肤随心换",
        "svip" : "外链皮肤随心换"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "外链皮肤管理",
        "scan_vip" : "外链皮肤管理",
        "default" : "外链皮肤管理",
        "svip" : "外链皮肤管理"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914211690/%E5%A4%96%E9%93%BE%E7%9A%AE%E8%82%A4%E7%AE%A1%E7%90%86_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914211690/%E5%A4%96%E9%93%BE%E7%9A%AE%E8%82%A4%E7%AE%A1%E7%90%86_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268645859/%E5%A4%96%E9%93%BE%E7%9A%AE%E8%82%A4%E7%AE%A1%E7%90%86.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664268645859/%E5%A4%96%E9%93%BE%E7%9A%AE%E8%82%A4%E7%AE%A1%E7%90%86.png"
      },
      "in_svip" : true,
      "right_id" : 38
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "避免删除文件无法找回",
        "scan_vip" : "避免删除文件无法找回",
        "default" : "避免删除文件无法找回",
        "svip" : "避免删除文件无法找回"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "文件恢复服务",
        "scan_vip" : "文件恢复服务",
        "default" : "文件恢复服务",
        "svip" : "文件恢复服务"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914466673/%E6%96%87%E4%BB%B6%E6%81%A2%E5%A4%8D%E6%9C%8D%E5%8A%A1_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637914466673/%E6%96%87%E4%BB%B6%E6%81%A2%E5%A4%8D%E6%9C%8D%E5%8A%A1_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269507802/%E6%96%87%E4%BB%B6%E6%81%A2%E5%A4%8D%E6%9C%8D%E5%8A%A1.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269507802/%E6%96%87%E4%BB%B6%E6%81%A2%E5%A4%8D%E6%9C%8D%E5%8A%A1.png"
      },
      "in_svip" : true,
      "right_id" : 39
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "畅享高画质",
        "scan_vip" : "畅享高画质",
        "default" : "畅享高画质",
        "svip" : "畅享高画质"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "投屏画质",
        "scan_vip" : "投屏画质",
        "default" : "投屏画质",
        "svip" : "投屏画质"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668763045888/8.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-11/1668763045888/8.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269128293/%E6%8A%95%E5%B1%8F%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269128293/%E6%8A%95%E5%B1%8F%E9%AB%98%E6%B8%85%E7%94%BB%E8%B4%A8.png"
      },
      "in_svip" : true,
      "right_id" : 56
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "pcguanjia",
        "MAC",
        "web",
        "iPad"
      ],
      "right_description" : {
        "vip" : "电脑端权益畅享",
        "scan_vip" : "电脑端权益畅享",
        "default" : "电脑端权益畅享",
        "svip" : "电脑端权益畅享"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "TV特权",
        "scan_vip" : "TV特权",
        "default" : "TV特权",
        "svip" : "TV特权"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915411275/TV%E7%89%B9%E6%9D%83_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2021-11/1637915411275/TV%E7%89%B9%E6%9D%83_%E5%B7%B2%E8%BF%87%E6%9C%9F.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269499388/TV%E7%89%B9%E6%9D%83.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664269499388/TV%E7%89%B9%E6%9D%83.png"
      },
      "in_svip" : true,
      "right_id" : 40
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "观影学习极致体验",
        "scan_vip" : "观影学习极致体验",
        "default" : "观影学习极致体验",
        "svip" : "观影学习极致体验"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "智能字幕",
        "scan_vip" : "智能字幕",
        "default" : "智能字幕",
        "svip" : "智能字幕"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657625070508/znzmwxzsy.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657625070508/znzmwxzsy.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272798490/%E6%99%BA%E8%83%BD%E5%AD%97%E5%B9%95.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272798490/%E6%99%BA%E8%83%BD%E5%AD%97%E5%B9%95.png"
      },
      "in_svip" : true,
      "right_id" : 52
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "iPad"
      ],
      "right_description" : {
        "vip" : "专属字幕一键生成",
        "scan_vip" : "专属字幕一键生成",
        "default" : "专属字幕一键生成",
        "svip" : "专属字幕一键生成"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "专属字幕申请",
        "scan_vip" : "专属字幕申请",
        "default" : "专属字幕申请",
        "svip" : "专属字幕申请"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657625070950/zszmsq.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2022-7/1657625070950/zszmsq.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-10/1665489153566/Property%201%3DSVIP.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-10/1665489153566/Property%201%3DSVIP.png"
      },
      "in_svip" : true,
      "right_id" : 54
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "智能超清/帧彩映画",
        "scan_vip" : "智能超清/帧彩映画",
        "default" : "智能超清/帧彩映画",
        "svip" : "智能超清/帧彩映画"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "智能超清/帧彩映画",
        "scan_vip" : "智能超清/帧彩映画",
        "default" : "智能超清/帧彩映画",
        "svip" : "智能超清/帧彩映画"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-4/1681210900054/%E6%99%BA%E8%83%BD%E9%AB%98%E6%B8%85-1.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-4/1681210900054/%E6%99%BA%E8%83%BD%E9%AB%98%E6%B8%85-1.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2023-3/1680258908089/%E6%99%BA%E8%83%BD%E9%AB%98%E6%B8%85.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2023-3/1680258908089/%E6%99%BA%E8%83%BD%E9%AB%98%E6%B8%85.png"
      },
      "in_svip" : true,
      "right_id" : 57
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "文件传输更安全",
        "scan_vip" : "文件传输更安全",
        "default" : "文件传输更安全",
        "svip" : "文件传输更安全"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "分享外链加水印",
        "scan_vip" : "分享外链加水印",
        "default" : "分享外链加水印",
        "svip" : "分享外链加水印"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 53
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "证件扫描轻而易举",
        "scan_vip" : "证件扫描轻而易举",
        "default" : "证件扫描轻而易举",
        "svip" : "证件扫描轻而易举"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "证件扫描",
        "scan_vip" : "证件扫描",
        "default" : "证件扫描",
        "svip" : "证件扫描"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206087200/%E6%89%AB%E6%8F%8F%E8%AF%81%E4%BB%B6.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206879117/%E6%89%AB%E6%8F%8F%E8%AF%81%E4%BB%B6.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-1/1706593336186/%E6%89%AB%E6%8F%8F%E8%AF%81%E4%BB%B6.png"
      },
      "in_svip" : true,
      "right_id" : 60
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "精准提取，简单高效",
        "scan_vip" : "精准提取，简单高效",
        "default" : "精准提取，简单高效",
        "svip" : "精准提取，简单高效"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "PDF页面提取",
        "scan_vip" : "PDF页面提取",
        "default" : "PDF页面提取",
        "svip" : "PDF页面提取"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207103907/PDF%E9%A1%B5%E9%9D%A2%E6%8F%90%E5%8F%96.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206364803/PDF%E9%A1%B5%E9%9D%A2%E6%8F%90%E5%8F%96.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 59
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "快速压缩，保质保量",
        "scan_vip" : "快速压缩，保质保量",
        "default" : "快速压缩，保质保量",
        "svip" : "快速压缩，保质保量"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "图片压缩",
        "scan_vip" : "图片压缩",
        "default" : "图片压缩",
        "svip" : "图片压缩"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207102670/%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206483293/%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 61
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "清洁文档，焕然一新",
        "scan_vip" : "清洁文档，焕然一新",
        "default" : "清洁文档，焕然一新",
        "svip" : "清洁文档，焕然一新"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "去手写",
        "scan_vip" : "去手写",
        "default" : "去手写",
        "svip" : "去手写"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206877573/%E5%8E%BB%E6%89%8B%E5%86%99.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204984693/%E5%8E%BB%E6%89%8B%E5%86%99.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 62
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "拼接便捷，效果出众",
        "scan_vip" : "拼接便捷，效果出众",
        "default" : "拼接便捷，效果出众",
        "svip" : "拼接便捷，效果出众"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "扫描制作拼图",
        "scan_vip" : "扫描制作拼图",
        "default" : "扫描制作拼图",
        "svip" : "扫描制作拼图"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204985848/%E6%89%AB%E6%8F%8F%E6%8B%BC%E5%9B%BE.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206878002/%E6%89%AB%E6%8F%8F%E6%8B%BC%E5%9B%BE.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 63
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "数据整理，一键搞定",
        "scan_vip" : "数据整理，一键搞定",
        "default" : "数据整理，一键搞定",
        "svip" : "数据整理，一键搞定"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "导出Excel",
        "scan_vip" : "导出Excel",
        "default" : "导出Excel",
        "svip" : "导出Excel"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206876974/%E5%AF%BC%E5%87%BAexcel.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204983658/%E5%AF%BC%E5%87%BAExcel.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 64
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "文档转换，轻松便捷",
        "scan_vip" : "文档转换，轻松便捷",
        "default" : "文档转换，轻松便捷",
        "svip" : "文档转换，轻松便捷"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "导出Word",
        "scan_vip" : "导出Word",
        "default" : "导出Word",
        "svip" : "导出Word"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206877200/%E5%AF%BC%E5%87%BAWord.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204984291/%E5%AF%BC%E5%87%BAWord.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 65
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "编辑自如，创意无限",
        "scan_vip" : "编辑自如，创意无限",
        "default" : "编辑自如，创意无限",
        "svip" : "编辑自如，创意无限"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "扫描图片编辑",
        "scan_vip" : "扫描图片编辑",
        "default" : "扫描图片编辑",
        "svip" : "扫描图片编辑"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206878641/%E6%89%AB%E6%8F%8F%E5%9B%BE%E7%89%87%E7%BC%96%E8%BE%91.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206086597/%E6%89%AB%E6%8F%8F%E5%9B%BE%E7%89%87%E7%BC%96%E8%BE%91.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 66
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "智能侦测，扫描高效",
        "scan_vip" : "智能侦测，扫描高效",
        "default" : "智能侦测，扫描高效",
        "svip" : "智能侦测，扫描高效"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "智能扫描",
        "scan_vip" : "智能扫描",
        "default" : "智能扫描",
        "svip" : "智能扫描"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707207102973/%E6%99%BA%E8%83%BD%E6%89%AB%E6%8F%8F.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206483666/%E6%99%BA%E8%83%BD%E6%89%AB%E6%8F%8F.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 67
    },
    {
      "in_vipv2" : true,
      "in_vip" : true,
      "in_scan" : true,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "图片导出，快速便利",
        "scan_vip" : "图片导出，快速便利",
        "default" : "图片导出，快速便利",
        "svip" : "图片导出，快速便利"
      },
      "in_normal" : true,
      "right_name" : {
        "vip" : "导出图片",
        "scan_vip" : "导出图片",
        "default" : "导出图片",
        "svip" : "导出图片"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2023-7/1689669739031/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707206876669/%E5%AF%BC%E5%87%BA%E5%9B%BE%E7%89%87.png",
        "right_icon_scan_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-2/1707204982952/%E5%AF%BC%E5%87%BA%E5%9B%BE%E7%89%87.png",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2022-9/1664272630091/%E5%88%86%E4%BA%AB%E5%8A%A0%E6%B0%B4%E5%8D%B0.png"
      },
      "in_svip" : true,
      "right_id" : 68
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "畅享视频智能总结",
        "scan_vip" : "畅享视频智能总结",
        "default" : "畅享视频智能总结",
        "svip" : "畅享视频智能总结"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频AI看",
        "scan_vip" : "视频AI看",
        "default" : "视频AI看",
        "svip" : "视频AI看"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863604181/AI%E7%9C%8B.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863604181/AI%E7%9C%8B.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 69
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "AI提取内容",
        "scan_vip" : "AI提取内容",
        "default" : "AI提取内容",
        "svip" : "AI提取内容"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频智能课件",
        "scan_vip" : "视频智能课件",
        "default" : "视频智能课件",
        "svip" : "视频智能课件"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863603149/%E6%99%BA%E8%83%BD%E8%AF%BE%E4%BB%B6.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863603149/%E6%99%BA%E8%83%BD%E8%AF%BE%E4%BB%B6.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 70
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "快速定位关键内容",
        "scan_vip" : "快速定位关键内容",
        "default" : "快速定位关键内容",
        "svip" : "快速定位关键内容"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频内容关键词查找",
        "scan_vip" : "视频内容关键词查找",
        "default" : "视频内容关键词查找",
        "svip" : "视频内容关键词查找"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863707518/701d31e59f4f19ed8c779e306.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863707518/701d31e59f4f19ed8c779e306.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 71
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "无限视频文稿生成",
        "scan_vip" : "无限视频文稿生成",
        "default" : "无限视频文稿生成",
        "svip" : "无限视频文稿生成"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频文稿",
        "scan_vip" : "视频文稿",
        "default" : "视频文稿",
        "svip" : "视频文稿"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863603559/%E8%A7%86%E9%A2%91%E6%96%87%E7%A8%BF.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-3/1709863603559/%E8%A7%86%E9%A2%91%E6%96%87%E7%A8%BF.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 72
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "音频智能总结",
        "scan_vip" : "音频智能总结",
        "default" : "音频智能总结",
        "svip" : "音频智能总结"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "音频AI听",
        "scan_vip" : "音频AI听",
        "default" : "音频AI听",
        "svip" : "音频AI听"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713254931433/%E9%9F%B3%E9%A2%91ai%E5%90%AC.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713254931433/%E9%9F%B3%E9%A2%91ai%E5%90%AC.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 73
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "高效复制和解读",
        "scan_vip" : "高效复制和解读",
        "default" : "高效复制和解读",
        "svip" : "高效复制和解读"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "影印版PDF识别",
        "scan_vip" : "影印版PDF识别",
        "default" : "影印版PDF识别",
        "svip" : "影印版PDF识别"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713255021903/%E5%BD%B1%E5%8D%B0pdf%E8%AF%86%E5%88%AB.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713255021903/%E5%BD%B1%E5%8D%B0pdf%E8%AF%86%E5%88%AB.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 74
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "快速总结",
        "scan_vip" : "快速总结",
        "default" : "快速总结",
        "svip" : "快速总结"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "视频AI分集概要",
        "scan_vip" : "视频AI分集概要",
        "default" : "视频AI分集概要",
        "svip" : "视AI频分集概要"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713254976367/%E7%9F%AD%E5%89%A7%E5%90%88%E5%B9%B6.png",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-4/1713254976367/%E7%9F%AD%E5%89%A7%E5%90%88%E5%B9%B6.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 75
    },
    {
      "in_vipv2" : true,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : true,
      "apps" : [
        "android",
        "pcguanjia",
        "MAC"
      ],
      "right_description" : {
        "privilegecard_work" : "",
        "privilegecard_life" : "",
        "svip" : "1000次/天",
        "vipv2" : "100次/天",
        "vip" : "",
        "scan_vip" : "",
        "privilegecard_audio_visual" : "",
        "default" : "限时3次/天"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "云添加",
        "scan_vip" : "云添加",
        "default" : "云添加",
        "svip" : "云添加"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-7/1721295352898/%E7%A6%BB%E7%BA%BF%E4%B8%8B%E8%BD%BDn.png",
        "right_icon_vip_expired" : "https://staticsns.cdn.bcebos.com/amis/2024-7/1721295352898/%E7%A6%BB%E7%BA%BF%E4%B8%8B%E8%BD%BDn.png",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-7/1721209539663/%E7%A6%BB%E7%BA%BF%E4%B8%8B%E8%BD%BD.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : "https://staticsns.cdn.bcebos.com/amis/2024-7/1721209539663/%E7%A6%BB%E7%BA%BF%E4%B8%8B%E8%BD%BD.png"
      },
      "in_svip" : true,
      "right_id" : 76
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "边听边转",
        "scan_vip" : "边听边转",
        "default" : "边听边转",
        "svip" : "边听边转"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "边听边转",
        "scan_vip" : "边听边转",
        "default" : "边听边转",
        "svip" : "边听边转"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-6/1718870827609/btbz.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 77
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记高精转写",
        "svip" : "听记高精转写"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记高精转写",
        "svip" : "听记高精转写"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-6/1718870828107/jzwg.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 78
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记智能总结",
        "svip" : "听记智能总结"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记智能总结",
        "svip" : "听记智能总结"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-6/1718870828572/znzj.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 79
    },
    {
      "in_vipv2" : false,
      "in_vip" : false,
      "in_scan" : false,
      "is_new" : false,
      "apps" : [
        "android",
        "iphone",
        "ipad"
      ],
      "right_description" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记内容编辑/导出",
        "svip" : "听记内容编辑/导出"
      },
      "in_normal" : false,
      "right_name" : {
        "vip" : "",
        "scan_vip" : "",
        "default" : "听记内容编辑/导出",
        "svip" : "听记内容编辑/导出"
      },
      "right_icon" : {
        "right_icon_disable" : "",
        "right_icon_svip_expired" : "",
        "right_icon_vip_expired" : "",
        "right_icon_svip" : "https://staticsns.cdn.bcebos.com/amis/2024-6/1718870827284/bjdc.png",
        "right_icon_scan_vip" : "",
        "right_icon_vip" : ""
      },
      "in_svip" : true,
      "right_id" : 80
    }
  ],
  "show_more_info" : ""
     };
    }
if (obj.netdisk_common_listening_notes_vip) {
  obj.netdisk_common_listening_notes_vip.status = 0;
  obj.identity_icon = {
  "vip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
  "common": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
  "svip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
  "contentvip": ""
};
   obj.svip =  {
    "emotional_tips_back" : {
      "first" : "很高兴你在x年x月x日成为超级会员，愿美好时光与你相伴。",
      "daily" : [
        "据说超级会员，法力无边",
        "你喜欢的样子，超级会员都有~",
        "对你的祝福，一如超级会员极速下载般真挚。",
        "一起走过的每一天，我给了陪伴，而你给了我成长。",
        "有人说我是野蛮霸道，只有你知道我是贴心的暖宝宝。",
        "有时候我还不太懂你，请千万告诉我，因为有你，我才存在。",
        "世间所有的相遇，都是久别重逢，感谢你的到来。",
        "很高兴你与你相遇，愿美好时光与你相伴。",
        "我心中不会有黄昏，有你在，永远像初春的清晨。",
        "其实我有超能力，超级会员喜欢你。",
        "你开心吗？开啊，不开你怎么进来。",
        "来者何人？超级会员的人。",
        "我是九你是三，除了你还是你。",
        "从今以后我只能称呼你为您了，因为，你在我心上。",
        "没有你，我的时间是缓慢的米勒行星。"
      ]
    },
    "expire_remind_tip" : "将不再享有极速下载、5T空间等特权",
    "emotional_tip_front" : "陪你走过的每一天",
    "identity_icon_list" : [
      "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
      ""
    ],
    "status" : 1,
    "expired_tip" : "不再享有极速下载、5T空间等特权",
    "guide_tip" : [
      "暂未开通 ·  超级会员尊享5T空间和极速下载特权"
      ],
    "is_sign_user" : false
     };
if (obj.vipv2) {
  obj.vipv2.status = 0;
    }
  if (obj.scan_vip) {
  obj.scan_vip.status = 0;
      }
   }
   
       if (obj.product_infos) {
   obj.product_infos = [
    {
      "cluster" : "volume_pri",
      "buy_description" : "200GB(1年)",
      "buy_time" : "1724497678",
      "end_time" : 4102415999,
      "function_num" : 1,
      "product_description" : "200GB(1年)",
      "product_id" : "17283190021318115647",
      "start_time" : 1724497678,
      "status" : 0,
      "detail_cluster" : "volume_pri",
      "product_name" : "volume_200GB_1y"
    },
    {
      "cluster" : "offlinedl",
      "buy_description" : "离线下载套餐(永久)",
      "buy_time" : "1705485869",
      "end_time" : 4102415999,
      "function_num" : 2,
      "product_description" : "离线下载套餐(永久)",
      "product_id" : "5210897752128663390",
      "start_time" : 1705485869,
      "status" : 0,
      "detail_cluster" : "offlinedl",
      "product_name" : "offlinedl_permanent"
    },
    {
      "cur_svip_type" : "year",
      "product_name" : "svip2_nd",
      "product_description" : "",
      "buy_description" : "",
      "function_num" : 0,
      "start_time" : 1722039929,
      "buy_time" : "0",
      "auto_upgrade_to_svip" : 0,
      "product_id" : "",
      "end_time" : 4102415999,
      "cluster" : "vip",
      "detail_cluster" : "svip",
      "status" : 0
    }
  ];
     }
   if (obj.level_info) {
         obj.level_info = {
    "history_value" : 100000,
    "current_level" : 10,
    "last_manual_collection_time" : 0,
    "current_value" : 100000,
    "history_level" : 10,
    "v10_id" : ""
              };
   }
   if (obj.reminder) {
     obj.reminder.svip.leftseconds = 4102415999;
     obj.reminder.svip.nextStatus = "normal";
   }
   if (obj.current_product) {
      obj.current_product = {
    "product_id" : "12187135090581539740",
    "detail_cluster" : "svip",
    "cluster" : "vip",
    "product_type" : "vip2_1y_auto"
         };
   }
   if (obj.user_define_tools) {
     obj.user_define_tools = [
    "photobackup",
    "contactbackup",
    "filerecovery"
      ];
   }

}

$done({ body: JSON.stringify(obj) });