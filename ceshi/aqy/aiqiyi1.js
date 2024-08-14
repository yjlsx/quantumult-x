/**************************************
*
[rewrite local]
^https:\/\/cards\.iqiyi\.com\/views_category\/3\.0\/vip_home?hasPlayRecord url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/aqy/aiqiyi1.js


*
[mitm]
hostname = cards.iqiyi.com

let response = JSON.parse($response.body);

response = {
  "code" : 0,
  "kv_pair" : {
    "vip_huanfu" : "new",
    "url" : "http://iface2.iqiyi.com/aggregate/3.0/lottery_activity?res_id=R:27361034212&diaplayIds=b49e5b6aa555ff35,a0e25e6257a18229,b05f9d4dcdfd235e&chance_code_v=aca8bd7c07f1ac26&lottery_code_v=a387b0311565c216&chance_code=959a6d006068e638&lottery_code=aeec7033775fcd4d",
    "daysurpluschance" : "3",
    "sys_time" : "1723610452767",
    "mark.hide.vip" : "1",
    "diy_backtm" : "270",
    "vipService" : "new",
    "has_vote_card" : "1",
    "can_pop" : "1",
    "recordUrl" : "http://cards.iqiyi.com/views_category/3.0/vip_prize_record?from_type=57&card_v=3.0"
  },
  "cards" : [
    {
      "id" : "head_card_vip",
      "strategy_card_id" : "head_card_vip",
      "show_control" : {

      },
      "total_num" : 0,
      "blocks" : [
        {
          "images" : [
            {
              "id" : "avatar",
              "url" : "https://img7.iqiyipic.com/passport/20240730/c8/d7/passport_2447641241_172228260915653_130_130.png",
              "marks" : {
                "lu_mark" : {
                  "bg_img" : {
                    "url" : ""
                  },
                  "type" : 0,
                  "mark_show_control" : {
                    "width" : "120px",
                    "margin" : "-22px 0px 0px -23px",
                    "height" : "114px"
                  },
                  "t" : " "
                }
              }
            },
            {
              "id" : "level",
              "url" : "http://pic1.iqiyipic.com/lequ/common/lego/20231008/14a4875e170e43eda0b54d62fe218229.webp",
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "level",
                    "vv" : {
                      "s4" : "level"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/vip_level/index.html"
                  }
                }
              }
            },
            {
              "id" : "logo_icon",
              "url" : "http://pic2.iqiyipic.com/lequ/common/lego/20240520/6c35c30ba16e438a9f3f43cfe05cd008.webp",
              "actions" : {

              }
            },
            {
              "id" : "muilti_vip_promote_icon"
            }
          ],
          "buttons" : [
            {
              "kv_pair" : {
                "dynamicEffect" : "1"
              },
              "id" : "yingxiao",
              "actions" : {
                "click_event" : {
                  "data" : {
                    "vipCashierType" : "platinum",
                    "marketExtendContent" : "%7B%22preE%22%3A%222f3628101b1d4edcac1d40e5f08b3528%22%2C%22targetVipType%22%3A1%7D",
                    "fc" : "aae26f1f7da53dd6",
                    "rpage" : "interact_989a655b4fec736e_99aafedf1b9f7771_affd67c2418863b7",
                    "vipProduct" : "",
                    "fv" : "",
                    "autoRenew" : ""
                  },
                  "statistics" : {
                    "pb_map" : {
                      "cover_code" : "affd67c2418863b7",
                      "r_area" : "ms-coupon-rec",
                      "strategy_code" : "99aafedf1b9f7771",
                      "fc" : "aae26f1f7da53dd6",
                      "e" : "2f3628101b1d4edcac1d40e5f08b3528",
                      "bkt" : "send-redpacket-2;coupon-rank-random;coupon-algo",
                      "inter_posi_code" : "989a655b4fec736e"
                    },
                    "vv" : {
                      "s4" : "qiyue_interact_989a655b4fec736e_rseat"
                    },
                    "fc" : "aae26f1f7da53dd6",
                    "rseat" : "qiyue_interact_989a655b4fec736e_rseat"
                  },
                  "biz_data" : {
                    "biz_id" : "101",
                    "biz_params" : {
                      "biz_params" : "vipCashierType=platinum&marketExtendContent=%7B%22preE%22%3A%222f3628101b1d4edcac1d40e5f08b3528%22%2C%22targetVipType%22%3A1%7D&amount=&payAutoRenew=&fc=aae26f1f7da53dd6&vipFV=&rpage=interact_989a655b4fec736e_99aafedf1b9f7771_affd67c2418863b7",
                      "biz_extend_params" : "",
                      "biz_dynamic_params" : "",
                      "biz_sub_id" : "2",
                      "biz_statistics" : "s2=vip_home.suggest&s3=vip_card&s4=qiyue_interact_989a655b4fec736e_rseat"
                    }
                  },
                  "action_type" : 311
                }
              },
              "text" : "升级白金"
            }
          ],
          "block_type" : 1113,
          "metas" : [
            {
              "text" : "@yjlsx"
            },
            {
              "actions" : {

              },
              "text" : "2099-12-31到期"
            }
          ],
          "other" : {
            "block_bg" : "http://pic2.iqiyipic.com/lequ/common/lego/20240116/c545c080982e4e9b98a6cc2e3e4518e8.webp"
          },
          "statistics" : {
            "r_rank" : "0",
            "pb_map" : {
              "cover_code" : "affd67c2418863b7",
              "r_area" : "ms-coupon-rec",
              "strategy_code" : "99aafedf1b9f7771",
              "fc" : "aae26f1f7da53dd6",
              "e" : "2f3628101b1d4edcac1d40e5f08b3528",
              "bkt" : "send-redpacket-2;coupon-rank-random;coupon-algo",
              "inter_posi_code" : "989a655b4fec736e"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "wo",
              "recext" : "{\"cover_code\":\"affd67c2418863b7\",\"e\":\"2f3628101b1d4edcac1d40e5f08b3528\",\"inter_posi_code\":\"989a655b4fec736e\",\"bkt\":\"send-redpacket-2;coupon-rank-random;coupon-algo\",\"r_area\":\"ms-coupon-rec\",\"strategy_code\":\"99aafedf1b9f7771\",\"fc\":\"aae26f1f7da53dd6\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "0",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "wo"
          },
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "wo",
                "vv" : {
                  "s4" : "wo"
                }
              },
              "action_type" : 306,
              "sub_type" : 18
            }
          }
        },
        {
          "block_type" : 1114,
          "metas" : [
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "1",
                    "vv" : {
                      "s4" : "1"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/points_center/index.html"
                  }
                }
              },
              "text" : "101",
              "kv_pair" : {
                "red_point" : "0"
              }
            },
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "1",
                    "vv" : {
                      "s4" : "1"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/points_center/index.html"
                  }
                }
              },
              "text" : "会员积分"
            },
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "2",
                    "vv" : {
                      "s4" : "2"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/assetPage/index.html?navType=welfare_ticket&hideNav=1"
                  }
                }
              },
              "text" : "52",
              "kv_pair" : {
                "red_point" : "0"
              }
            },
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "2",
                    "vv" : {
                      "s4" : "2"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/assetPage/index.html?navType=welfare_ticket&hideNav=1"
                  }
                }
              },
              "text" : "已领福利"
            },
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "3",
                    "vv" : {
                      "s4" : "3"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/vipRightCenter/index.html"
                  }
                }
              },
              "text" : "5",
              "kv_pair" : {
                "red_point" : "1"
              }
            },
            {
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "3",
                    "vv" : {
                      "s4" : "3"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/vipRightCenter/index.html"
                  }
                }
              },
              "text" : "等级权益"
            },
            {
              "icon_url" : "https://pic2.iqiyipic.com/lequ/20230904/33857ecf-23fd-493c-aa2a-a66bb3ec0608.png",
              "icon_pos" : 2,
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "4",
                    "vv" : {
                      "s4" : "4"
                    }
                  },
                  "action_type" : 303,
                  "data" : {
                    "url" : "https://vip.iqiyi.com/html5VIP/activity/assetPage/index.html?hideNav=1"
                  }
                }
              },
              "text" : "全部资产"
            }
          ],
          "statistics" : {
            "r_rank" : "1",
            "vv" : {
              "stype" : "0",
              "s4" : "buy"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "1",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "buy"
          }
        },
        {
          "statistics" : {
            "r_rank" : "2",
            "pb_map" : {
              "fv" : "bd226670cb29cb82",
              "inter_posi_code" : "902da411c35aea80",
              "cover_code" : "b4979a00090a1418",
              "strategy_code" : "b528ca67a126731e"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "2",
              "recext" : "{\"fv\":\"bd226670cb29cb82\",\"cover_code\":\"b4979a00090a1418\",\"inter_posi_code\":\"902da411c35aea80\",\"strategy_code\":\"b528ca67a126731e\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "2",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "2"
          },
          "other" : {
            "block_ovr" : "vip_fenweitu"
          },
          "block_type" : 1128,
          "images" : [
            {
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240805/5adfaaa6e5a361d3d972cbe1fe8526d3.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_902da411c35aea80_rseat",
                "pb_map" : {
                  "fv" : "bd226670cb29cb82",
                  "inter_posi_code" : "902da411c35aea80",
                  "cover_code" : "b4979a00090a1418",
                  "strategy_code" : "b528ca67a126731e"
                },
                "vv" : {
                  "s4" : "qiyue_interact_902da411c35aea80_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/m-design/VIPDay-2408VIPDay/2408VIPDay/index.html?fv=bd226670cb29cb82"
              }
            }
          }
        }
      ],
      "card_class" : "card_r1_cN_vip_privilege_13100",
      "statistics" : {
        "r_show_type" : "showlizard20150609",
        "ad_flag" : false,
        "r_click_type" : "recctplay20121226",
        "vv" : {
          "position" : "1",
          "mcnt" : "qiyue_interact",
          "pspos" : "1",
          "s3" : "vip_card"
        },
        "r_click_usract" : "userclick",
        "pb_str" : "mcnt=qiyue_interact&position=1",
        "is_cupid" : 0,
        "r_show_usract" : "1",
        "block" : "vip_card",
        "pb_map" : {
          "fv" : "bd226670cb29cb82",
          "inter_posi_code" : "902da411c35aea80",
          "cover_code" : "b4979a00090a1418",
          "strategy_code" : "b528ca67a126731e"
        },
        "from_type" : 56,
        "from_subtype" : 1,
        "bstp" : "56"
      },
      "strategy_com_id" : "vip_head_card_14.9.5",
      "kv_pair" : {
        "card_bg" : "http://pic3.iqiyipic.com/lequ/common/lego/20240117/11e41a3922d843079b6c31ff644396ea.webp",
        "vip_type" : "gold",
        "card_bg_color" : "#FFFFFF",
        "refresh_url" : "https://cards.iqiyi.com/views_category/3.0/vip_home?page_st=suggest&refresh_card=head_card_vip",
        "hold_model_component" : "1"
      },
      "has_top_bg" : 0,
      "card_type" : 152,
      "cardIndex" : 0,
      "has_bottom_bg" : 0,
      "name" : "会员头部卡面"
    },
    {
      "id" : "vip_emotion",
      "strategy_card_id" : "vip_emotion",
      "show_control" : {
        "top_separate_style" : "base_card_divide_0",
        "background_color" : "vip_card_bg"
      },
      "total_num" : 0,
      "blocks" : [
        {
          "other" : {

          },
          "statistics" : {
            "r_rank" : "0",
            "vv" : {
              "stype" : "0",
              "s4" : "activity"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "0",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "activity"
          },
          "buttons" : [
            {
              "kv_pair" : {
                "signed" : "0"
              },
              "icon_url" : "",
              "icon_pos" : "1",
              "id" : "1",
              "actions" : {
                "click_event" : {
                  "statistics" : {
                    "rseat" : "qiandao",
                    "vv" : {
                      "s4" : "qiandao"
                    }
                  },
                  "action_type" : 311,
                  "biz_data" : {
                    "biz_params" : {
                      "biz_params" : "bizId=kaleidoscope&componentName=kaleidoscope",
                      "biz_extend_params" : "",
                      "biz_dynamic_params" : "initParams=%7b%22dataUrl%22%3a%22http%3a%2f%2flequ-qfe.iqiyi.com%2fmb%2fpage%2fnc%2frender%2f2002%22%7d",
                      "biz_sub_id" : "106",
                      "biz_statistics" : "s2=vip_home.suggest&s3=vipfuwu&s4=qiandao"
                    },
                    "biz_id" : "100",
                    "biz_plugin" : "qiyibase"
                  }
                }
              },
              "text" : "签到有礼"
            }
          ],
          "block_type" : 1122,
          "actions" : {

          },
          "metas" : [
            {
              "text" : "中午好，记得吃顿美味的午餐"
            }
          ]
        },
        {
          "statistics" : {
            "r_rank" : "1",
            "vv" : {
              "stype" : "0",
              "s4" : "aa113ff338af41bek"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "1",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "aa113ff338af41bek"
          },
          "block_type" : 1123,
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "aa113ff338af41bek",
                "vv" : {
                  "s4" : "aa113ff338af41bek"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/levelup_tiyu/index.html?fv=aa5094b76579a36fl"
              }
            }
          },
          "metas" : [
            {
              "text" : "体育会员"
            },
            {
              "icon_url" : "https://pic1.iqiyipic.com/lequ/common/lego/20240116/6c1b403bf777460ba8083bb23ce3ccf0.png",
              "text" : "去领取",
              "icon_pos" : 1
            }
          ]
        },
        {
          "statistics" : {
            "r_rank" : "2",
            "vv" : {
              "stype" : "0",
              "s4" : "ee113ff37314a95f20246a"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "2",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "ee113ff37314a95f20246a"
          },
          "block_type" : 1123,
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "ee113ff37314a95f20246a",
                "vv" : {
                  "s4" : "ee113ff37314a95f20246a"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/fls_brand/index.html?code=84c4a1cbd4a46b7d&sourceType=1&displayCode=91f287918f7536ba&fv=948fc0630a1cffec"
              }
            }
          },
          "metas" : [
            {
              "text" : "高德打车"
            },
            {
              "icon_url" : "https://pic1.iqiyipic.com/lequ/common/lego/20240116/6c1b403bf777460ba8083bb23ce3ccf0.png",
              "text" : "去领取",
              "icon_pos" : 1
            }
          ]
        },
        {
          "statistics" : {
            "r_rank" : "3",
            "vv" : {
              "stype" : "0",
              "s4" : "aa113ff338af41ben"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "3",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "aa113ff338af41ben"
          },
          "block_type" : 1123,
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "aa113ff338af41ben",
                "vv" : {
                  "s4" : "aa113ff338af41ben"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/operatorBenefits/index.html"
              }
            }
          },
          "metas" : [
            {
              "text" : "5G权益"
            },
            {
              "icon_url" : "https://pic1.iqiyipic.com/lequ/common/lego/20240116/6c1b403bf777460ba8083bb23ce3ccf0.png",
              "text" : "去领取",
              "icon_pos" : 1
            }
          ]
        },
        {
          "statistics" : {
            "r_rank" : "4",
            "vv" : {
              "stype" : "0",
              "s4" : "nc28937ca93e8411ef"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "4",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "nc28937ca93e8411ef"
          },
          "block_type" : 1123,
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "nc28937ca93e8411ef",
                "vv" : {
                  "s4" : "nc28937ca93e8411ef"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/ipMedalGallery/index.html?source=vip-center-tanggui2"
              }
            }
          },
          "metas" : [
            {
              "text" : "专属徽章"
            },
            {
              "icon_url" : "https://pic1.iqiyipic.com/lequ/common/lego/20240116/6c1b403bf777460ba8083bb23ce3ccf0.png",
              "text" : "去收集",
              "icon_pos" : 1
            }
          ]
        },
        {
          "statistics" : {
            "r_rank" : "5",
            "vv" : {
              "stype" : "0",
              "s4" : "aa113ff338af41bey"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "5",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "aa113ff338af41bey"
          },
          "block_type" : 1123,
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "aa113ff338af41bey",
                "vv" : {
                  "s4" : "aa113ff338af41bey"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/memberBusiness/index.html?webview=channel"
              }
            }
          },
          "metas" : [
            {
              "text" : "会员优选"
            },
            {
              "icon_url" : "https://pic1.iqiyipic.com/lequ/common/lego/20240116/6c1b403bf777460ba8083bb23ce3ccf0.png",
              "text" : "去查看",
              "icon_pos" : 1
            }
          ]
        }
      ],
      "card_class" : "card_r1_cN_vip_emotion",
      "statistics" : {
        "r_show_type" : "showlizard20150609",
        "ad_flag" : false,
        "r_click_type" : "recctplay20121226",
        "vv" : {
          "pspos" : "2",
          "position" : "2",
          "s3" : "vipfuwu"
        },
        "r_click_usract" : "userclick",
        "pb_str" : "position=2",
        "is_cupid" : 0,
        "r_show_usract" : "1",
        "block" : "vipfuwu",
        "from_type" : 56,
        "from_subtype" : 1,
        "bstp" : "56"
      },
      "strategy_com_id" : "vip_emotion_14.9.5",
      "kv_pair" : {
        "hold_model_component" : "1",
        "refresh_url" : "https://cards.iqiyi.com/views_category/3.0/vip_home?page_st=suggest&refresh_card=vip_emotion",
        "card_exp_sec" : "10"
      },
      "has_top_bg" : 0,
      "card_type" : 156,
      "cardIndex" : 0,
      "has_bottom_bg" : 0,
      "name" : "会员情感签到"
    },
    {
      "id" : "vip_activity",
      "strategy_card_id" : "vip_activity",
      "show_control" : {
        "top_separate_style" : "vip_card_hot_top_divide",
        "background_color" : "vip_card_bg",
        "bg_img" : {
          "url" : "https://pic3.iqiyipic.com/lequ/20240103/5b6cde5f-d5d0-438c-8656-25923ab371e8.jpg"
        }
      },
      "total_num" : 0,
      "blocks" : [
        {
          "metas" : [
            {
              "text" : "摇一摇抽奖"
            },
            {
              "text" : "每日限免3次"
            }
          ],
          "statistics" : {
            "r_rank" : "0",
            "pb_map" : {
              "inter_posi_code" : "807f7e76623c8f18",
              "strategy_code" : "86ff7310ed6fa816",
              "cover_code" : "a0bbfc775361c767"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "0",
              "recext" : "{\"cover_code\":\"a0bbfc775361c767\",\"inter_posi_code\":\"807f7e76623c8f18\",\"strategy_code\":\"86ff7310ed6fa816\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "0",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "0"
          },
          "other" : {

          },
          "block_type" : 1126,
          "images" : [
            {
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20231220/c06be62bfa8a3a122b127a016e9a3df8.png",
              "image_class" : ""
            },
            {
              "url" : "https://pic1.iqiyipic.com/qiyue2.0/20231207/c107b50edaa9f9b05ba9b973642869da.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_807f7e76623c8f18_rseat",
                "pb_map" : {
                  "inter_posi_code" : "807f7e76623c8f18",
                  "strategy_code" : "86ff7310ed6fa816",
                  "cover_code" : "a0bbfc775361c767"
                },
                "vv" : {
                  "s4" : "qiyue_interact_807f7e76623c8f18_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/shakePrize/index.html?hideNav=1&fv=afc0b50ed49e732d"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "会员任务中心"
            },
            {
              "text" : "加速获取成长值"
            }
          ],
          "statistics" : {
            "r_rank" : "1",
            "pb_map" : {
              "inter_posi_code" : "80c61e2ddff7e16b",
              "strategy_code" : "b68434b4c086d8c4",
              "cover_code" : "bb8cc1e4ac8751e3"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "1",
              "recext" : "{\"cover_code\":\"bb8cc1e4ac8751e3\",\"inter_posi_code\":\"80c61e2ddff7e16b\",\"strategy_code\":\"b68434b4c086d8c4\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "1",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "1"
          },
          "block_type" : 1126,
          "images" : [
            {
              "url" : "https://pic1.iqiyipic.com/qiyue2.0/20231220/ec0d6598b58525271d970214cab04800.png",
              "image_class" : ""
            },
            {
              "url" : "https://pic0.iqiyipic.com/qiyue2.0/20231207/9c91a5e86eb0c81cc90f819578efac72.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_80c61e2ddff7e16b_rseat",
                "pb_map" : {
                  "inter_posi_code" : "80c61e2ddff7e16b",
                  "strategy_code" : "b68434b4c086d8c4",
                  "cover_code" : "bb8cc1e4ac8751e3"
                },
                "vv" : {
                  "s4" : "qiyue_interact_80c61e2ddff7e16b_rseat"
                }
              },
              "action_type" : 311,
              "biz_data" : {
                "biz_params" : {
                  "biz_params" : "bizId=kaleidoscope&componentName=kaleidoscope",
                  "biz_extend_params" : "",
                  "biz_dynamic_params" : "initParams=%7b%22dataUrl%22%3a%22http%3a%2f%2flequ-qfe.iqiyi.com%2fmb%2fpage%2fnc%2frender%2f2002%22%7d",
                  "biz_sub_id" : "106",
                  "biz_statistics" : "s2=vip_home.suggest&s3=huodong&s4=qiyue_interact_80c61e2ddff7e16b_rseat"
                },
                "biz_id" : "100",
                "biz_plugin" : ""
              }
            }
          }
        },
        {
          "statistics" : {
            "r_rank" : "2",
            "pb_map" : {
              "fv" : "a87cb2ef5c1e5ef6",
              "inter_posi_code" : "954fc14defabb7c1",
              "cover_code" : "80fe147ae428adb9",
              "strategy_code" : "971bc6617ef163ab"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "2",
              "recext" : "{\"fv\":\"a87cb2ef5c1e5ef6\",\"cover_code\":\"80fe147ae428adb9\",\"inter_posi_code\":\"954fc14defabb7c1\",\"strategy_code\":\"971bc6617ef163ab\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "2",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "2"
          },
          "block_type" : 1125,
          "images" : [
            {
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240808/1e459a65905fc18b550bd31c1881119d.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_954fc14defabb7c1_rseat",
                "pb_map" : {
                  "fv" : "a87cb2ef5c1e5ef6",
                  "inter_posi_code" : "954fc14defabb7c1",
                  "cover_code" : "80fe147ae428adb9",
                  "strategy_code" : "971bc6617ef163ab"
                },
                "vv" : {
                  "s4" : "qiyue_interact_954fc14defabb7c1_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/giftCardBuyPage/index.html?fv=a87cb2ef5c1e5ef6"
              }
            }
          }
        },
        {
          "statistics" : {
            "r_rank" : "3",
            "pb_map" : {
              "fv" : "b5f1cbec0a141dea",
              "inter_posi_code" : "9444cc992b1af7fd",
              "cover_code" : "a81930305477d244",
              "strategy_code" : "ae60eb5a320d7f13"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "3",
              "recext" : "{\"fv\":\"b5f1cbec0a141dea\",\"cover_code\":\"a81930305477d244\",\"inter_posi_code\":\"9444cc992b1af7fd\",\"strategy_code\":\"ae60eb5a320d7f13\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "3",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "3"
          },
          "block_type" : 1125,
          "images" : [
            {
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240806/9312664a670e7093b8165324102a2b09.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_9444cc992b1af7fd_rseat",
                "pb_map" : {
                  "fv" : "b5f1cbec0a141dea",
                  "inter_posi_code" : "9444cc992b1af7fd",
                  "cover_code" : "a81930305477d244",
                  "strategy_code" : "ae60eb5a320d7f13"
                },
                "vv" : {
                  "s4" : "qiyue_interact_9444cc992b1af7fd_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/m-design/Welfare-2408MovieWelfare/2408MovieWelfare/index.html?fv=b5f1cbec0a141dea"
              }
            }
          }
        },
        {
          "statistics" : {
            "r_rank" : "4",
            "pb_map" : {
              "fv" : "9743e64e38158ba3",
              "inter_posi_code" : "a0667163be3346b8",
              "cover_code" : "9a25e61614f38759",
              "strategy_code" : "9e03055471c4434e"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "4",
              "recext" : "{\"fv\":\"9743e64e38158ba3\",\"cover_code\":\"9a25e61614f38759\",\"inter_posi_code\":\"a0667163be3346b8\",\"strategy_code\":\"9e03055471c4434e\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "4",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "4"
          },
          "block_type" : 1125,
          "images" : [
            {
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240813/a897573844d8630925b1886b3c137513.png",
              "image_class" : ""
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_a0667163be3346b8_rseat",
                "pb_map" : {
                  "fv" : "9743e64e38158ba3",
                  "inter_posi_code" : "a0667163be3346b8",
                  "cover_code" : "9a25e61614f38759",
                  "strategy_code" : "9e03055471c4434e"
                },
                "vv" : {
                  "s4" : "qiyue_interact_a0667163be3346b8_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/inviteFriends/index.html?fv=9743e64e38158ba3"
              }
            }
          }
        }
      ],
      "card_class" : "card_r3_cN_vip_hot_activity",
      "statistics" : {
        "r_show_type" : "showlizard20150609",
        "ad_flag" : false,
        "r_click_type" : "recctplay20121226",
        "vv" : {
          "position" : "3",
          "mcnt" : "qiyue_interact",
          "pspos" : "3",
          "s3" : "huodong"
        },
        "r_click_usract" : "userclick",
        "pb_str" : "mcnt=qiyue_interact&position=3",
        "is_cupid" : 0,
        "r_show_usract" : "1",
        "block" : "huodong",
        "pb_map" : {
          "fv" : "1_b5f1cbec0a141dea|2_a87cb2ef5c1e5ef6|5_9743e64e38158ba3",
          "inter_posi_code" : "1_9444cc992b1af7fd|2_954fc14defabb7c1|3_807f7e76623c8f18|4_80c61e2ddff7e16b|5_a0667163be3346b8",
          "cover_code" : "1_a81930305477d244|2_80fe147ae428adb9|3_a0bbfc775361c767|4_bb8cc1e4ac8751e3|5_9a25e61614f38759",
          "strategy_code" : "1_ae60eb5a320d7f13|2_971bc6617ef163ab|3_86ff7310ed6fa816|4_b68434b4c086d8c4|5_9e03055471c4434e"
        },
        "from_type" : 56,
        "from_subtype" : 1,
        "bstp" : "56"
      },
      "strategy_com_id" : "vip_activity_14.9.5",
      "kv_pair" : {
        "focus_btn_postion" : "center",
        "need_focus_btn" : "1",
        "not_replace_topbanner_separator" : "1",
        "hold_model_component" : "1"
      },
      "has_top_bg" : 0,
      "card_type" : 157,
      "cardIndex" : 0,
      "has_bottom_bg" : 0,
      "name" : "会员热门活动"
    },
    {
      "id" : "vip_more_select",
      "strategy_card_id" : "vip_more_select",
      "show_control" : {
        "top_separate_style" : "vip_card_top_divide",
        "background_color" : "vip_card_bg",
        "show_num" : 4
      },
      "total_num" : 0,
      "blocks" : [
        {
          "metas" : [
            {
              "text" : "移动积分换会员"
            },
            {
              "text" : "990积分起>"
            },
            {
              "text" : "积分当钱花"
            }
          ],
          "statistics" : {
            "r_rank" : "0",
            "pb_map" : {
              "inter_posi_code" : "9a29b989b9a6c34a",
              "strategy_code" : "baef3419f000766b",
              "cover_code" : "a0922aa1ef1ef290"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "0",
              "recext" : "{\"cover_code\":\"a0922aa1ef1ef290\",\"inter_posi_code\":\"9a29b989b9a6c34a\",\"strategy_code\":\"baef3419f000766b\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "0",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "0"
          },
          "other" : {

          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic0.iqiyipic.com/qiyue2.0/20240712/56f3a426c1e966552c294600f901f4a6.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_9a29b989b9a6c34a_rseat",
                "pb_map" : {
                  "inter_posi_code" : "9a29b989b9a6c34a",
                  "strategy_code" : "baef3419f000766b",
                  "cover_code" : "a0922aa1ef1ef290"
                },
                "vv" : {
                  "s4" : "qiyue_interact_9a29b989b9a6c34a_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://cmapi.jiyurewards.com/bankPage/iqiyi/iqiyixwz3jy.html"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "0.01元领会员"
            },
            {
              "text" : "送30G流量>"
            },
            {
              "text" : "超值首选"
            }
          ],
          "statistics" : {
            "r_rank" : "1",
            "pb_map" : {
              "inter_posi_code" : "9852833672432288",
              "strategy_code" : "85073b77bb4f8771",
              "cover_code" : "87d3a963f2d06563"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "1",
              "recext" : "{\"cover_code\":\"87d3a963f2d06563\",\"inter_posi_code\":\"9852833672432288\",\"strategy_code\":\"85073b77bb4f8771\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "1",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "1"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic1.iqiyipic.com/qiyue2.0/20240712/d590b0d7aa15006724787a99c91d635d.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_9852833672432288_rseat",
                "pb_map" : {
                  "inter_posi_code" : "9852833672432288",
                  "strategy_code" : "85073b77bb4f8771",
                  "cover_code" : "87d3a963f2d06563"
                },
                "vv" : {
                  "s4" : "qiyue_interact_9852833672432288_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://dev.coc.10086.cn/coc/web1/aqiyiPackage/?pageId=1508616487535362048&channelId=P00000005200"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "每月免费领会员"
            },
            {
              "text" : "移动专属特权>"
            },
            {
              "text" : "已办用户速领"
            }
          ],
          "statistics" : {
            "r_rank" : "2",
            "pb_map" : {
              "inter_posi_code" : "a00abf40894da603",
              "strategy_code" : "a7ec0ba3e0f73a69",
              "cover_code" : "b46821473f85366c"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "2",
              "recext" : "{\"cover_code\":\"b46821473f85366c\",\"inter_posi_code\":\"a00abf40894da603\",\"strategy_code\":\"a7ec0ba3e0f73a69\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "2",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "2"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240604/fada6f8e00abccc56f9daf66d5aa08c5.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_a00abf40894da603_rseat",
                "pb_map" : {
                  "inter_posi_code" : "a00abf40894da603",
                  "strategy_code" : "a7ec0ba3e0f73a69",
                  "cover_code" : "b46821473f85366c"
                },
                "vv" : {
                  "s4" : "qiyue_interact_a00abf40894da603_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://dev.coc.10086.cn/coc3/gr/static-2c/rightsget/#/aqyRights?from=GR.F100001033&channelId=P00000015191"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "移动卡号送会员"
            },
            {
              "text" : "24个月+100话费>"
            },
            {
              "text" : "首月0元"
            }
          ],
          "statistics" : {
            "r_rank" : "3",
            "pb_map" : {
              "inter_posi_code" : "993dcebe70bbd5d5",
              "strategy_code" : "a3efdde8829b6a60",
              "cover_code" : "93972304188fd441"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "3",
              "recext" : "{\"cover_code\":\"93972304188fd441\",\"inter_posi_code\":\"993dcebe70bbd5d5\",\"strategy_code\":\"a3efdde8829b6a60\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "3",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "3"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic1.iqiyipic.com/qiyue2.0/20240712/0c14083c9395f017ec1a46c08b42172e.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_993dcebe70bbd5d5_rseat",
                "pb_map" : {
                  "inter_posi_code" : "993dcebe70bbd5d5",
                  "strategy_code" : "a3efdde8829b6a60",
                  "cover_code" : "93972304188fd441"
                },
                "vv" : {
                  "s4" : "qiyue_interact_993dcebe70bbd5d5_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://dev.coc.10086.cn/coc/web1/contractssolo_IqiyiCard-2/#/?pageId=1541592314538524672&channelId=P00000005200"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "实体VIP礼品卡"
            },
            {
              "text" : "心意送到家"
            },
            {
              "text" : "精美定制"
            }
          ],
          "statistics" : {
            "r_rank" : "4",
            "pb_map" : {
              "inter_posi_code" : "97a1d82e3689982b",
              "strategy_code" : "9c858fae42a780e8",
              "cover_code" : "8fc5d5bd2ec64c9d"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "4",
              "recext" : "{\"cover_code\":\"8fc5d5bd2ec64c9d\",\"inter_posi_code\":\"97a1d82e3689982b\",\"strategy_code\":\"9c858fae42a780e8\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "4",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "4"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic0.iqiyipic.com/qiyue2.0/20240802/3208e342c6d1ff953a4dcd4ef40e1eca.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_97a1d82e3689982b_rseat",
                "pb_map" : {
                  "inter_posi_code" : "97a1d82e3689982b",
                  "strategy_code" : "9c858fae42a780e8",
                  "cover_code" : "8fc5d5bd2ec64c9d"
                },
                "vv" : {
                  "s4" : "qiyue_interact_97a1d82e3689982b_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/saleVipCardMiddlePage/index.html"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "VIP+QQ音乐"
            },
            {
              "text" : "海量专属曲库"
            },
            {
              "text" : "权益加倍"
            }
          ],
          "statistics" : {
            "r_rank" : "5",
            "pb_map" : {
              "inter_posi_code" : "9d920232329148ab",
              "strategy_code" : "834c815e84f4321e",
              "cover_code" : "bad5947ad73d7791"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "5",
              "recext" : "{\"cover_code\":\"bad5947ad73d7791\",\"inter_posi_code\":\"9d920232329148ab\",\"strategy_code\":\"834c815e84f4321e\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "5",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "5"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240613/56c3231badd01f7a2e6b464fd2e786c7.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_9d920232329148ab_rseat",
                "pb_map" : {
                  "inter_posi_code" : "9d920232329148ab",
                  "strategy_code" : "834c815e84f4321e",
                  "cover_code" : "bad5947ad73d7791"
                },
                "vv" : {
                  "s4" : "qiyue_interact_9d920232329148ab_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/unionVipDetail/index.html?rmsId=171654027310597"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "VIP+京东"
            },
            {
              "text" : "爱奇艺专享"
            },
            {
              "text" : "购物+追剧"
            }
          ],
          "statistics" : {
            "r_rank" : "6",
            "pb_map" : {
              "inter_posi_code" : "9ccc456de3d87849",
              "strategy_code" : "976a71b9171cb89e",
              "cover_code" : "b3b6b47c096c2c5c"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "6",
              "recext" : "{\"cover_code\":\"b3b6b47c096c2c5c\",\"inter_posi_code\":\"9ccc456de3d87849\",\"strategy_code\":\"976a71b9171cb89e\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "6",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "6"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic0.iqiyipic.com/qiyue2.0/20240319/63d3226c743ca15ee49cf220c943d0f2.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_9ccc456de3d87849_rseat",
                "pb_map" : {
                  "inter_posi_code" : "9ccc456de3d87849",
                  "strategy_code" : "976a71b9171cb89e",
                  "cover_code" : "b3b6b47c096c2c5c"
                },
                "vv" : {
                  "s4" : "qiyue_interact_9ccc456de3d87849_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/unionVipDetail/index.html?rmsId=165572079357016"
              }
            }
          }
        },
        {
          "metas" : [
            {
              "text" : "送亲友VIP"
            },
            {
              "text" : "尊享好礼"
            },
            {
              "text" : "精美卡面"
            }
          ],
          "statistics" : {
            "r_rank" : "7",
            "pb_map" : {
              "inter_posi_code" : "a9cc582fe9bb7b1e",
              "strategy_code" : "b79f9377d85bd94c",
              "cover_code" : "b27bc73835d6d003"
            },
            "vv" : {
              "stype" : "0",
              "s4" : "7",
              "recext" : "{\"cover_code\":\"b27bc73835d6d003\",\"inter_posi_code\":\"a9cc582fe9bb7b1e\",\"strategy_code\":\"b79f9377d85bd94c\"}"
            },
            "ctp" : "-1",
            "c_rclktp" : "-1",
            "rank" : "7",
            "stype" : 0,
            "c_rtype" : 0,
            "rseat" : "7"
          },
          "block_type" : 1120,
          "images" : [
            {
              "id" : "icon",
              "url" : "https://pic2.iqiyipic.com/qiyue2.0/20240319/ecedfac13b6357bca13a743f5da38da6.png"
            }
          ],
          "actions" : {
            "click_event" : {
              "statistics" : {
                "rseat" : "qiyue_interact_a9cc582fe9bb7b1e_rseat",
                "pb_map" : {
                  "inter_posi_code" : "a9cc582fe9bb7b1e",
                  "strategy_code" : "b79f9377d85bd94c",
                  "cover_code" : "b27bc73835d6d003"
                },
                "vv" : {
                  "s4" : "qiyue_interact_a9cc582fe9bb7b1e_rseat"
                }
              },
              "action_type" : 303,
              "data" : {
                "url" : "https://vip.iqiyi.com/html5VIP/activity/marketing_group/index.html?hideNav=1"
              }
            }
          }
        }
      ],
      "card_class" : "card_r2_c2_vip_union_vip",
      "statistics" : {
        "r_show_type" : "showlizard20150609",
        "ad_flag" : false,
        "r_click_type" : "recctplay20121226",
        "vv" : {
          "position" : "4",
          "mcnt" : "qiyue_interact",
          "pspos" : "4",
          "s3" : "mai"
        },
        "r_click_usract" : "userclick",
        "pb_str" : "mcnt=qiyue_interact&position=4",
        "is_cupid" : 0,
        "r_show_usract" : "1",
        "block" : "mai",
        "pb_map" : {
          "inter_posi_code" : "1_97a1d82e3689982b|2_9d920232329148ab|3_9ccc456de3d87849|4_9852833672432288|5_993dcebe70bbd5d5|6_9a29b989b9a6c34a|7_a00abf40894da603|8_a9cc582fe9bb7b1e",
          "strategy_code" : "1_9c858fae42a780e8|2_834c815e84f4321e|3_976a71b9171cb89e|4_85073b77bb4f8771|5_a3efdde8829b6a60|6_baef3419f000766b|7_a7ec0ba3e0f73a69|8_b79f9377d85bd94c",
          "cover_code" : "1_8fc5d5bd2ec64c9d|2_bad5947ad73d7791|3_b3b6b47c096c2c5c|4_87d3a963f2d06563|5_93972304188fd441|6_a0922aa1ef1ef290|7_b46821473f85366c|8_b27bc73835d6d003"
        },
        "from_type" : 56,
        "from_subtype" : 1,
        "bstp" : "56"
      },
      "strategy_com_id" : "vip_more_select_14.9.5",
      "kv_pair" : {
        "hold_model_component" : "1",
        "not_replace_topbanner_separator" : "1"
      },
      "top_banner" : {
        "l_blocks" : [
          {
            "block_id" : "-1",
            "buttons" : [
              {
                "icon_pos" : "1",
                "id" : "1",
                "text" : "换一换",
                "icon_url" : "https://pic2.iqiyipic.com/lequ/20240711/dc3fed23-4e7b-4ffe-8bb7-32176f01fe58.png",
                "mode_url" : {
                  "dark" : ""
                },
                "actions" : {
                  "click_event" : {
                    "statistics" : {
                      "rseat" : "3",
                      "vv" : {
                        "s4" : "3"
                      }
                    },
                    "action_type" : 385,
                    "data" : {
                      "batch_num" : "4"
                    }
                  }
                },
                "show_control" : {
                  "press_style" : "press_alpha_default"
                }
              }
            ],
            "block_type" : 1117,
            "metas" : [
              {
                "text" : "更多开通选择"
              }
            ]
          }
        ],
        "effective" : 1
      },
      "has_top_bg" : 1,
      "card_type" : 3,
      "cardIndex" : 0,
      "has_bottom_bg" : 0,
      "name" : "会员更多选择"
    }
  ],
  "base" : {
    "id" : "0.phone.0.cn.vip_home.suggest.0-5.0",
    "show_control" : {
      "enable_font_scale" : "1"
    },
    "business" : "baseline",
    "page_st" : "suggest",
    "page_t" : "vip_home",
    "layout_files" : "base_layout",
    "statistics" : {
      "pb_str" : "abtest=&mod=cn_s",
      "send_duration_pingback" : "1",
      "vv" : {
        "s2" : "vip_home.suggest"
      },
      "bstp" : "56",
      "rpage" : "vip_home.suggest",
      "ad_str_map" : {

      },
      "from_category_id" : "94",
      "pingback_switch" : "1"
    },
    "exp_time" : 10,
    "has_next" : 1,
    "page_name" : "VIP精选",
    "latest_layouts" : [
      {
        "name" : "base_layout",
        "version" : "161.21",
        "url" : "http://cards-css.iqiyi.com/css_layout/3.0/get_layout?layout_name=base_layout&version=161.21&card_v=3.0"
      }
    ],
    "theme_ts" : "100111",
    "next_url" : "https://cards.iqiyi.com/views_category/3.0/vip_home?page_v=4.0&page_st=suggest&card_v=3.0&pg_num=2&partition_card_id=vip_welfare_optimization,vip_video_comming_soon&from_type=56&ad_skip=0&prev_card_index=4&user_first_time=20240510&prev_card_separate_style=D&houyi_ab=&vip_huanfu=new",
    "disable_refresh" : 0
  },
  "req_sn" : 1723610451352
};

$response.body = JSON.stringify(response);
$done({ body: $response.body });
