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


*
[mitm]
hostname = pan.baidu.com
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
    "product_type" : "vip10_9y_auto"
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
      "status" : 1,
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
      "status" : 1,
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
      "status" : 1
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
    "product_type" : "vip10_9y_auto"
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
obj.new_guide_data.title = "SVIP V10";
   }
}

if (obj.netdisk_common_listening_notes_vip) {
  obj.netdisk_common_listening_notes_vip.status = 1;
  obj.identity_icon = {
  "vip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452237582/78b88bf113b7.png",
  "common": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452539056/bf72cf66fae1.png",
  "svip": "https://internal-amis-res.cdn.bcebos.com/images/2019-8/1566452115696/38c1d743bfe9.png",
  "contentvip": ""
};
if (obj.vipv2) {
  obj.vipv2.status = 1;
}
if (obj.scan_vip) {
  obj.scan_vip.status = 1;
   }
}



}

$done({ body: JSON.stringify(obj) });