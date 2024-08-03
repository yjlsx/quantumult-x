
/**************************************

[rewrite_local]
https?:\/\/drive.*\.quark\.cn\/.+\/clouddrive\/(member.+|distribute\/detail.+|capacity\/growth\/info.+|activ\/manage\/coupon\/available.+|act\/growth\/reward) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js
^https:\/\/coral2\.quark\.cn\/quark\/v2\/(queryMemberInfo|getMemberMessage|home) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js
^https:\/\/order-api\.sm\.cn\/api\/(payorder\/v1\/precreate|member\/v1\/lotteryDraw|member\/v1\/center) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js
^https:\/\/drive-m\.quark\.cn\/1\/clouddrive\/(auth\/identity\/get|activ\/right\/list|file\/v2\/play) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js


[mitm]
hostname = drive*.quark.cn, coral2.quark.cn, order-api.sm.cn

*************************************/


var body = $response.body;
var yjlsx = JSON.parse(body);

const vipa = '/clouddrive/member';
const vipb = '/clouddrive/distribute/detail';
const vipc = '/clouddrive/capacity/growth/info';

if ($request.url.indexOf(vipa) != -1){
  yjlsx.data = {
    "member_type": "Z_VIP",
    "image_backup": 1,
    "deep_recycle_stat": {
      "recycle_normal_serve_days" : 10,
      "recycle_zvip_serve_days" : 90,
      "recycle_vip_serve_days" : 10,
      "recycle_pay_serve_days" : 30,
      "deep_recycle_serve_days" : 180,
      "recycle_svip_serve_days" : 30
    },
    "member_info": {
      "video_save_to_uses": 0,
      "video_save_to_remains": -1,
      "file_save_to_remains": -1,
      "offline_download_remains": -1,
      "member_type_map": {
        "MINI_VIP": {
          "video_save_to_total": 10
        }
      }
    },
    "acc_status": 0,
    "secret_use_capacity": 55042952572,
    "super_vip_exp_at": 4092599349000,
    "z_vip_exp_at": 4092599349000, //有效期
    "use_capacity": 152445599387,
    "video_backup": 1,
    "extend_capacity_composition": {},
    "is_new_user": false,
    "member_status": {
      "Z_VIP": "PAID",
      "VIP": "UNPAID",
      "SUPER_VIP": "PAID",
      "MINI_VIP": "UNPAID"
    },
    "identity" : [
      {
        "status" : 1,
        "user_identity_type" : 4,
        "expire_time" : 4092599349000,
        "expire_type" : 2,
        "extra" : {
          "vip88_new" : true,
          "source" : "88_vip_99709506180",
          "rollback_times" : 1,
          "distribute_id" : "88_vip_99709506180"
        }
      }
    ],
    "secret_total_capacity": 10995116277760,
    "subscribe_pay_channel_map": {},
    "fr_subscribe_status_map": {},
    "exp_at": 4092599349000,
    "subscribe_status_map": {},
    "total_capacity": 10995116277760
  };
}

if ($request.url.indexOf(vipb) != -1){
  yjlsx.data = {
    "last_id": 0,
    "last_page": true,
    "distribute_detail": [{
      "title": "SVIP+会员",
      "product_category": "MEMBER",
      "member_detail": {
        "member_type": "Z_VIP",
        "capacity": 10995116277760
      },
      "expired_at": 4092599349000
    }]
  };
}

if ($request.url.indexOf(vipc) != -1){
  yjlsx.data = {
    "member_type": "Z_VIP",
    "super_vip_exp_at": 4092599349000,
    "use_capacity": 55029395707,
    "cap_growth": {
      "cur_total_cap": 0
    },
    "88VIP": true,
    "member_status": {
      "Z_VIP": "PAID",
      "SUPER_VIP": "PAID",
      "MINI_VIP": "PAID",
      "VIP": "PAID"
    },
    "cap_sign": {
      "sign_daily": false,
      "sign_target": 7,
      "sign_daily_reward": 104857600,
      "sign_progress": 0,
      "sign_rewards": [{
        "name": "+100MB",
        "reward_cap": 104857600
      }, {
        "name": "+200MB",
        "highlight": "翻倍",
        "reward_cap": 209715200
      }, {
        "name": "+100MB",
        "reward_cap": 104857600
      }, {
        "name": "+100MB",
        "reward_cap": 104857600
      }, {
        "name": "+100MB",
        "reward_cap": 104857600
      }, {
        "name": "+100MB",
        "reward_cap": 104857600
      }, {
        "name": "+1024MB",
        "highlight": "翻十倍",
        "reward_cap": 1073741824
      }]
    },
    "cap_composition": {
      "other": 0,
      "member_own": 10995116277760
    },
    "total_capacity": 10995116277760
  };
}

if ($request.url.indexOf('/quark/v2/queryMemberInfo') !== -1) {
  // 修改 memberList 的 memberType
  if (yjlsx && yjlsx.data && Array.isArray(yjlsx.data.memberList)) {
                obj.data.memberList.forEach(member => {
                    if (member.module === "drive") {
                        member.memberType = "S_VIP";
                    }
                    if (member.module === "scan") {
                        member.memberType = "photo_vip";
                    }
                    if (member.module === "doc") {
                        member.memberType = "doc_vip";
                    }
                });
          }
}

if ($request.url.indexOf('/quark/v2/getMemberMessage') !== -1) {
if (yjlsx.data && Array.isArray(yjlsx.data.vipList)) {
                if (!yjlsx.data.vipList.includes("drive_svip")) {
                    yjlsx.data.vipList.push("drive_svip");
                }
                if (!yjlsx.data.vipList.includes("scan_vip")) {
                    yjlsx.data.vipList.push("scan_vip");
                }
                if (!yjlsx.data.vipList.includes("doc_vip")) {
                    yjlsx.data.vipList.push("doc_vip");
                }
                if (!yjlsx.data.vipList.includes("study_vip")) {
                    yjlsx.data.vipList.push("study_vip");
                }
                if (!yjlsx.data.vipList.includes("novel_vip")) {
                    yjlsx.data.vipList.push("novel_vip");
                }
            } else {
                obj.data.vipList = ["drive_svip", "scan_vip", "doc_vip", "study_vip", "novel_vip"];
            }
            if (yjlsx.data) {
                yjlsx.data.hasVip = false;
            }
}

if ($request.url.indexOf('/quark/v2/home') !== -1) {
  // 修改 "网盘" 会员的信息
  if (yjlsx && yjlsx.data && Array.isArray(yjlsx.data.memberInfoList)) {
    yjlsx.data.memberInfoList.forEach(member => {
      if (member.name === '网盘') {
        member.memberType = 'S_VIP';
        member.expireTime = 4092599349000;
        member.productInfo.memberStatus = "UNPAID";
        member.productInfo.nameplateDesc = "永久SVIP";
        member.diffDay = 9999;
        member.lowAmount = 0;
      }
      if (member.name === '扫描王') {
        member.memberType = 'photo_vip';
        member.expireTime = 4092599349000;
        member.productInfo.memberStatus = "UNPAID";
        member.productInfo.nameplateDesc = "永久会员";
        member.diffDay = 9999;
        member.lowAmount = 0;
      }
      if (member.name === '文档') {
        member.memberType = 'doc_vip';
        member.expireTime = 4092599349000;
        member.productInfo.memberStatus = "UNPAID";
        member.productInfo.nameplateDesc = "永久SVIP";
        member.diffDay = 9999;
        member.lowAmount = 0;
      }
      if (member.name === '学习') {
        member.memberType = 'study_vip';
        member.expireTime = 4092599349000;
        member.productInfo.memberStatus = "UNPAID";
        member.productInfo.nameplateDesc = "永久SVIP";
        member.diffDay = 9999;
        member.lowAmount = 0;
      }
      if (member.name === '书城') {
        member.memberType = 'novel_vip';
        member.expireTime = 4092599349000;
        member.productInfo.memberStatus = "UNPAID";
        member.productInfo.nameplateDesc = "永久SVIP";
        member.diffDay = 9999;
        member.lowAmount = 0;
      }
    });
  }
}


if ($request.url.indexOf('/api/payorder/v1/precreate') !== -1) {
  // 修改 hasVip 为 true
  if (yjlsx && yjlsx.data) {
    yjlsx.code = 0;
    yjlsx.status = 200;
    yjlsx.data.created = true;
    yjlsx.data.free = true;
  }
}

if ($request.url.indexOf('act/growth/reward') !== -1) {
  if (yjlsx && yjlsx.data) {
    yjlsx.code = 0;
    yjlsx.data.autopay_reward_info.cur_reward_start = true;
    yjlsx.data.autopay_reward_list.cur_reward_start = true;
    yjlsx.data.autopay_reward_list.reward_left_chance = 20;
    yjlsx.data.autopay_reward_info.reward_left_chance = 20;
    yjlsx.status = 200;
  }
}

if ($request.url.indexOf('member\/v1\/lotteryDraw') !== -1) {
  if (yjlsx && yjlsx.data) {
    yjlsx.data.autopay_reward_info.cur_reward_start = true;
    yjlsx.data.autopay_reward_info.reward_left_chance = 20;
  }
}

if ($request.url.indexOf('activ/manage/coupon/available') !== -1) {
  if (yjlsx && yjlsx.metadata) {
    yjlsx.metadata.client_pull_auto_trigger = true;
  }
}

if ($request.url.indexOf('member\/v1\/center') !== -1) {
  if (yjlsx && yjlsx.data) {
    yjlsx.code = 0;
    yjlsx.status = 200;
    yjlsx.data.userInfo.is88Freeze = true;    
    yjlsx.data.userInfo.memberType = 'Z_VIP';
    yjlsx.data.userInfo.memberStatus = "PAID";
    yjlsx.data.userInfo.vipExpirationTime = 4092599349000;
  }
}

if ($request.url.indexOf('/1/clouddrive/auth/identity/get') !== -1) {
  if (yjlsx && yjlsx.data) {
    yjlsx.data.user_identity_type = 4;
    yjlsx.data.expire_time = 1742399999000;
    yjlsx.data.expire_type = 2;
    yjlsx.data.extra.vip88_new = true;
    yjlsx.data.extra.source = "88_vip_99709506180";
    yjlsx.data.extra.rollback_times = 1;
    yjlsx.data.extra.distribute_id = "88_vip_99709506180";
  }
}

//容量卡
if ($request.url.indexOf('/activ/right/list') !== -1) {
  if (yjlsx && yjlsx.metadata) {
    yjlsx.metadata.receive.etime = 4092599349000;
  } else if(yjlsx && yjlsx.data.valid_days) {
    yjlsx.data.act_id = "1d5980ee31ca489986b75b89906dde8d";
    yjlsx.data.valid_days = 9999;
     }
}

if ($request.url.indexOf('/clouddrive/file/v2/play') !== -1) {
if (yjlsx && yjlsx.data) {
  yjlsx.data.video_list.forEach(video => {
    if (!video.video_info) {  // 仅当 video_info 不存在时
      video.member_right = "normal";
      video.right = "normal";
    }
  });
  yjlsx.data.default_resolution = "high";  // 修改 default_resolution
} else {
    yjlsx.status = 200;
    yjlsx.code = 0;
    yjlsx.message = "";
  }
}




$done({body : JSON.stringify(yjlsx)});
