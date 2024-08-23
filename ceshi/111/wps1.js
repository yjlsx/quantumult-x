/*************************************
项目名称：WPS Office
日期： 2024.07.23
脚本作者：@yjlsx
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(vas|account|drive)\.wps\.cn\/(query\/api\/.+\/list_purchase_info|api\/(v\d\/spaces|users\/.+\/overview)) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps1.js
^https:\/\/drive\.wps\.cn\/api\/v3\/userinfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps1.js
^https:\/\/vip\.wps\.cn\/(v2\/vip_center\/my\/privilege|partner\/invoke\/usable) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps1.js
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps1.js
^https:\/\/account\.wps\.cn\/api\/v3\/mine\/vips url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps1.js

[mitm]
hostname = *.wps.cn

*************************************/


var obj = JSON.parse($response.body);
const vip1 = '/list_purchase_info';
const vip2 = '/overview';
const vip3 ='/v3/userinfo';
const vips ='/mine/vips';
const pri ='/my/privilege';
const flkj = '/spaces';
const act = '/market/activity';
const able = '/partner\/invoke\/usable';

if ($request.url.indexOf(vip1) != -1){
obj.data["merchandises"] = [
      {
        "sku_key" : "12",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "稻壳会员",
        "type" : "vip"
      },
      {
        "sku_key" : "20",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "WPS会员",
        "type" : "vip"
      },
      {
        "sku_key" : "vip_pro",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "超级会员",
        "type" : "vip"
      },
      {
        "sku_key" : "vip_pro_plus",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "超级会员Pro",
        "type" : "vip"
      },
      {
        "sku_key" : "cloud_space",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "超级会员空间",
        "type" : "vip"
      },
      {
        "sku_key" : "vip_ai",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "WPS AI会员",
        "type" : "vip"
      },
      {
        "sku_key" : "vip_365",
        "expire_time" : 4092599349,
        "effect_time" : 1704171277,
        "name" : "WPS大会员",
        "type" : "vip"
      }
  ];
}

if ($request.url.indexOf(vip2) != -1){
  obj["privilege"] = [
    {
      "times" : 541826,
      "spid" : "data_recover",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "ocr",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf2doc",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_merge",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_sign",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_split",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "speech_record",
      "expire_time" : 4092599349
    }
  ];
  obj["level"] = 3,
  obj["vip"] = {
    "memberid" : 40,
    "expire_time" : 4092599349,
    "name" : "超级会员",
    "has_ad" : 0,
    "enabled" : [
      {
        "name" : "超级会员",
        "memberid" : 40,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS会员",
        "memberid" : 20,
        "expire_time" : 4092599349
      },
      {
        "name" : "稻壳会员",
        "memberid" : 12,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS AI会员",
        "memberid" : 11,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS大会员",
        "memberid" : 365,
        "expire_time" : 4092599349
      }
    ]
  };
}

if ($request.url.indexOf(vip3) != -1){
  obj["vipinfo"] =  {
    "expire_time" : 4092599349,
    "memberid" : 40,
    "name" : "超级会员",
    "has_ad" : 0,
    "enabled" : [
     {
        "name" : "超级会员Pro",
        "expire_time" : 4092599349,
        "memberid" : 60
      },     
    {
        "name" : "超级会员",
        "expire_time" : 4092599349,
        "memberid" : 40
      },
      {
        "name" : "WPS会员",
        "expire_time" : 4092599349,
        "memberid" : 20
      },
      {
        "name" : "稻壳会员",
        "expire_time" : 4092599349,
        "memberid" : 12
      },
      {
        "name" : "WPS AI会员",
        "memberid" : 11,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS大会员",
        "memberid" : 365,
        "expire_time" : 4092599349
      }
    ]
  }
}


if ($request.url.indexOf(pri) != -1){
  obj["data"] = [
    "pdf_sign",
    "pdf_split",
    "speech_record",
    "data_recover",
    "ocr",
    "pdf2word",
    "pdf_merge",
    "audio_conversion",
    "cloud_font",
    "doc_lose_weight",
    "doc_translate",
    "docer_chart",
    "docer_theme",
    "et_filter",
    "art_words",
    "hd_noise_reduction",
    "free_gradation",
    "output_long_img",
    "lossless_enlarge",
    "docrecover",
    "face_beauty",
    "paper_layout",
    "no_ad",
    "custom_cover_page",
    "docer_video",
    "id_photo",
    "image_repair",
    "advanced_print",
    "ads_free",
    "pdf",
    "pdf2doc",
    "pdf_merge",
    "share_visit_gt3",
    "sync_folder",
    "ads_free",
    "batch_download_file_size",
    "data_recover",
    "manage_similar_files",
    "user_free_group_member_number",
    "filesize_limit",
    "secret_folder",
    "share_set_expire",
    "share_set_password",
    "batch_download",
    "corp_free_group_number",
    "extract_online",
    "pdf_split",
    "full_text_search",
    "link_expire_time_custom",
    "speech_record",
    "history_version",
    "smart_sync",
    "batch_download_file_number",
    "batch_export",
    "cloud_space",
    "doc_roaming",
    "filenum_in_sync_folder",
    "ocr",
    "user_free_group_number",
    "download_speed_up",
    "net_doc_auto_update",
    "pdf_sign",
    "recycle_bin_gt7"
    ]
}

if ($request.url.indexOf(act) != -1){
  if(obj.data){
  obj.data = [
     {
      "id" : 4835,
      "channel_code" : "SCDBT3001",
      "package_id" : 101945,
      "listen_change" : [
        "sku",
        "privilege"
      ],
      "mk_key" : "2i7EGKpF0NvHdLnrTELWQ2IDISO",
      "config" : {
        "material" : [
          {
            "id" : 14213,
            "name" : "【iOS】个人中心卡片（新超级会员）_在期NEW",
            "element" : {
             "card_list" : [
                {
                  "sub_material_common" : {
                    "property_content_color" : "#5E3715FF",
                    "property_title_color" : "#6E4727FF",
                    "type_image_url" : "https://img7.file.cache.docer.com/storage/official/file/2024/03/25/723f08058af9070ee339a83d97115519.png",
                    "sku" : "vip_pro",
                    "card_bg_colors" : {
                      "colors" : [
                        "#FFECBD",
                        "#FFF7E5"
                      ]
                    },
                    "card_left_bgimage_url" : "",
                    "jump_url" : "https://personal-act.wps.cn/vcl/h5_usercenter/?csource=ios_vip_icon&hideNavigation=1&mk_key=cZXZrDeOG2FNMQMvOuGAxxWXA&position=vip_pro_card&vcl_cli=ios",
                    "card_right_image_url" : "https://img7.file.cache.docer.com/storage/official/file/2024/03/26/8493f3497700a289666b8027117c49d3.png",
                    "property_list" : [
                      {
                        "jump_url" : "",
                        "name" : "功能特权",
                        "num" : "150+"
                      },
                      {
                        "jump_url" : "",
                        "name" : "资源特权",
                        "num" : "50+"
                      },
                      {
                        "jump_url" : "",
                        "name" : "云特权",
                        "num" : "20+"
                      },
                      {
                        "jump_url" : "",
                        "name" : "个人云空间",
                        "num" : "365G"
                      }
                    ],
                    "card_bg_colors_dark" : {

                    }
                  },
                  "type" : "basicVip",
                  "sub_material_bottom" : {
                    "bottom_bgColors" : {
                      "colors" : [
                        "#FFF5E5"
                      ]
                    },
                    "bottom_bgColors_dark" : {

                    },
                    "bottom_button_color" : "#FFF7DEFF",
                    "bottom_button_bgColors" : {
                      "colors" : [
                        "#92582D",
                        "#76401D"
                      ]
                    },
                    "bottom_topline_colors" : {
                      "colors" : [
                        "#FFFFFF"
                      ]
                    },
                    "bottom_content" : "有效期至2099-09-09",
                    "bottom_jump_url" : "https://personal-act.wps.cn/vcl/h5_usercenter/?csource=ios_vip_icon&hideNavigation=1&mk_key=cZXZrDeOG2FNMQMvOuGAxxWXA&position=vip_pro_tips&vcl_cli=ios",
                    "bottom_content_color" : "#805128FF",
                    "bottom_full_screen" : false,
                    "bottom_button" : "会员中心"
                  }
                }
              ]
            },
            "style_id" : 671
          },
          {
            "id" : 14211,
            "name" : "【iOS】个人中心卡片（AI会员）_在期NEW",
            "element" : {
              "card_list" : [
                {
                  "sub_material_common" : {
                    "property_content_color" : "#60307DFF",
                    "property_title_color" : "#725A81FF",
                    "type_image_url" : "https://img8.file.cache.docer.com/storage/official/file/2024/03/25/c65ff01f625c6316e5081775d643c726.png",
                    "card_bg_colors" : {
                      "colors" : [
                        "#E5E1FF",
                        "#FCF2FF"
                      ]
                    },
                    "card_left_bgimage_url" : "",
                    "jump_url" : "https://personal-act.wps.cn/vcl/h5_usercenter/?csource=ios_vip_icon&hideNavigation=1&mk_key=cZXZrDeOG33Hlk4sNMofVhlcu&position=vip_ai_card&vcl_cli=ios",
                    "card_right_image_url" : "https://img8.file.cache.docer.com/storage/official/file/2024/03/25/36627ddf72216895bacdec22305ff9f1.png",
                    "property_list" : [
                      {
                        "jump_url" : "",
                        "name" : "一键生成",
                        "num" : "PPT"
                      },
                      {
                        "jump_url" : "",
                        "name" : "内容生产",
                        "num" : "文字"
                      },
                      {
                        "jump_url" : "",
                        "name" : "AI写公式",
                        "num" : "表格"
                      },
                      {
                        "jump_url" : "",
                        "name" : "AI权益",
                        "num" : "10+"
                      }
                    ],
                    "card_bg_colors_dark" : {

                    }
                  },
                  "type" : "aiVip",
                  "sub_material_bottom" : {
                    "bottom_bgColors" : {
                      "colors" : [
                        "#F6EAFF"
                      ]
                    },
                    "bottom_bgColors_dark" : {

                    },
                    "bottom_button_color" : "#FFFFFFFF",
                    "bottom_button_bgColors" : {
                      "colors" : [
                        "#A27BFF",
                        "#6A43D6"
                      ]
                    },
                    "bottom_topline_colors" : {
                      "colors" : [
                        "#FFFFFF"
                      ]
                    },
                    "bottom_content" : "有效期至2099-09-09",
                    "bottom_jump_url" : "https://personal-act.wps.cn/vcl/h5_usercenter/?csource=ios_vip_icon&hideNavigation=1&mk_key=cZXZrDeOG33Hlk4sNMofVhlcu&position=vip_ai_tips&vcl_cli=ios",
                    "bottom_content_color" : "#2A0645FF",
                    "bottom_full_screen" : false,
                    "bottom_button" : "会员中心"
                  }
                }
              ]
            },
            "style_id" : 671
                        }
                    ]
               },
      "ab_group" : "",
      "ab_type" : 0,
      "max_age_sec" : 7200,
      "end_time" : 4092599349,
      "name" : "【升级】ios切换面板会员卡片AI&大会员不续费-活动",
      "system_id" : "mk"
            }
         ];
  }
}

if ($request.url.indexOf(vips) != -1){
   obj["vips"] = [
       {
      "enabled" : null,
      "expire_time" : 4092599349,
      "memberid" : 365,
      "has_ad" : 0,
      "name" : "大会员"
       }
   ];
   obj["enabled"] = [
     {
        "name" : "超级会员Pro",
        "expire_time" : 4092599349,
        "memberid" : 60
      },     
    {
        "name" : "超级会员",
        "expire_time" : 4092599349,
        "memberid" : 40
      },
      {
        "name" : "WPS会员",
        "expire_time" : 4092599349,
        "memberid" : 20
      },
      {
        "name" : "稻壳会员",
        "expire_time" : 4092599349,
        "memberid" : 12
      },
      {
        "name" : "WPS AI会员",
        "memberid" : 11,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS大会员",
        "memberid" : 365,
        "expire_time" : 4092599349
      }
 ];
}

if ($request.url.indexOf(flkj) != -1){
  obj["total"] = 1100585369600;
}

if ($request.url.indexOf(able) != -1){
  obj["times"] = 9999;
  obj["expire_time"] = 4092599349;
  obj["result"] = "ok";
}

$done({body: JSON.stringify(obj)});