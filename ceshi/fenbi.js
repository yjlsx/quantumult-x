/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite_local]
# 修改 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/iphone\/entry url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
# 修改用户余额为
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/users\/balance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
# 修改课程价格
#^https:\/\/ke\.fenbi\.com\/iphone\/v3\/member_centers\/sale_center url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/orders\/uni url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/sydw\/v3\/orders\/pre_best url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/lectures\/\d+\/detail_for_sale_v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

# 修改会员显示
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/members\/member_static_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/user_member\/home url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

# 修改课程配置
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/user_member\/course_configs url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/members\/member_static_config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/keapi\.fenbi\.com\/im\/iphone\/signatures\/signature url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/my\/lectures\/visible url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/fenbi1.js
# 检查试听权限
^https:\/\/ke\.fenbi\.com\/iphone\/sydw\/v3\/orders\/unpaid_order url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/member_lectures url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/sydw\/v3\/episodes url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/lectures\/\d+\/episode_nodes url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

#我的课程
//^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/my\/lectures\/\d+\/episodes url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/my\/lectures\/\d+\/summary url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/keapi\.fenbi\.com\/school\/iphone\/offline_classes\/config\/get_by_biz url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

#电子书
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/ebook\/list_by_cat url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/ebook\/detail url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/ebook\/update\/user_books url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

#订单处理
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/red_packet_share\/activities\/detail\/by_order url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
#教室权限
^https:\/\/live\.fenbi\.com\/iphone\/sydw\/v3\/livereplay\/replay\/lectures url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/keapi\.fenbi\.com\/primelecture\/iphone\/user_prime_lectures\/is_user_prime_lecture url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
#异常处理
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/my\/lectures\/(\d+)\/episode_sets url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/sydw\/v3\/user_content_forms\/is_filled url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/ticket url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/live\.fenbi\.com\/dispatcher\/iphone\/jdwz\/config\/server\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/episodes\/\d+\/mediafile\/meta url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js


*
[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com, live.fenbi.com
*/

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);
let currentTime = Date.now();


// 修改 AI 教师会员信息
if (url.includes('/ai/iphone/entry')) {
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true;
        obj.data.aiteacherDisplayed = true;
        obj.data.aiteacherActivated = true;
        obj.data.userMember.memberClass = 52;    //[1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]
        obj.data.userMember.memberType = 52;  // 设置会员配置的类型为指定数组;
        obj.data.userMember.expireTime = 4102415999000;  // 2099-12-31
        obj.data.userMember.hasBeenMember = true;
        obj.data.userMember.memberStatus = 1;
        obj.data.userMember.createdTime = 1551873177267;
    }
}

// 修改用户余额为 999999 并设置 updatedTime 为当前时间
if (url.includes('/iphone/v3/users/balance')) {
    if (obj.data && obj.data.balance !== undefined) {
        obj.data.balance = 999999;
        obj.data.updatedTime = currentTime;
    }
}

/*
// 课程价格修改
if (url.includes('/iphone/v3/member_centers/sale_center')) {
    for (let item of obj.data) {
        if (item.memberContents) {
            for (let content of item.memberContents) {
                content.payPrice = 0;
                content.price = 0;
            }
        }
        if (item.contents) {
            for (let content of item.contents) {
                content.payPrice = 0;
                content.price = 0;
            }
        }
    }
}
*/

// 判断 URL 是否包含特定地址
if (url.includes('/iphone/v3/user_member/home')) {
    // 修改 userMember 部分
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true; // 开通会员
        obj.data.userMember.memberClass = 3; // 设置会员级别[1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]
        obj.data.userMember.memberType = 52; // 设置会员类型为指定数组
        obj.data.userMember.expireTime = 4102444799000; // 设置过期时间
        obj.data.userMember.hasBeenMember = true; // 已经是会员
        obj.data.userMember.memberStatus = 1; // 会员状态设为已开通
        obj.data.userMember.createdTime = 1651873177267; // 设置创建时间
    }

    // 修改 memberConfig 部分
  if (obj.data && obj.data.memberConfig) {
        obj.data.memberConfig.memberType = 20;
        obj.data.memberConfig.shadowColor = "111111";
        obj.data.memberConfig.textColor = "efb96d";
    // 遍历 memberBenefits 数组，将每个元素的 svip 属性设置为 true
     if (obj.data && obj.data.memberConfig && Array.isArray(obj.data.memberConfig.memberBenefits)) {
       obj.data.memberConfig.memberBenefits.forEach(item => {
              item.svip = true;
         });
     }


        if (Array.isArray(obj.data.memberConfig.memberBenefits)) {
            obj.data.memberConfig.memberBenefits.forEach(benefit => {
                if (benefit.title === "视频解析" || benefit.title === "精选电子书") {
                    benefit.native = false;
                }
            });
        }
    }

// 将所有电子书//课程设为已购买
 if (obj.data && obj.data.modules) {
        for (let module of obj.data.modules) {
            if (module.content.eBooks) {
                for (let ebook of module.content.eBooks) {
                    ebook.paid = true;
                }
            }
            if (module.content.lectures) {
                for (let lecture of module.content.lectures) {
                    lecture.hasAudition = true;
                }
            }
            if (module.content.userMorningReading) {
                module.content.userMorningReading.trial = false;
                module.content.userMorningReading.memberUserSummaryRet.readMemberArticle = true;
            }
        }
    }

// 将所有已购买
    obj.data.modules.forEach(module => {
        if (module.content) {
            if (module.content.eBooks) {
                module.content.eBooks.forEach(eBook => {
                    eBook.paid = true;
                    eBook.free = true;
                });
            }
            if (module.content.lectures) {
                module.content.lectures.forEach(lecture => {
                    lecture.paid = true;
                    lecture.free = true;
                });
            }
        }
    });
}

// 修改每个都为SVIP
    if (url.includes("/iphone/v3/user_member/course_configs")) {
var memberTypeDict = {};

// 遍历 datas 数组中的每个 course
if (obj.datas && Array.isArray(obj.datas)) {
    obj.datas.forEach(course => {
        if (course.memberConfigs && Array.isArray(course.memberConfigs)) {
            course.memberConfigs.forEach(config => {
                if (config.memberType !== undefined) {
                    // 记录每个 memberType 的 svipMemberType
                    if (!memberTypeDict[config.memberType]) {
                        memberTypeDict[config.memberType] = config.svipMemberType;
                    }
                }
            });
        }
    });

    // 遍历 datas 数组中的每个 course，再次设置 svipMemberType 和 svipTitle
    obj.datas.forEach(course => {
        if (course.memberConfigs && Array.isArray(course.memberConfigs)) {
            course.memberConfigs.forEach(config => {
                if (config.memberType !== undefined && memberTypeDict[config.memberType] !== undefined) {
                    config.svipMemberType = memberTypeDict[config.memberType];
                    config.svipTitle = config.title + "SVIP"; // 设置 svipTitle
                       }
                });
            }
        });
      }
    }

    if (url.includes("/members/member_static_config")) {
  obj.data.forEach(item => {
  item.svipMemberType = item.memberType;
});

 }

if (url.includes("/iphone/jdwz/v3/lectures")) {
    if (url.includes("/summary")) {
        if (obj.datas && Array.isArray(obj.datas)) {
            obj.datas.forEach(item => {
                if (item.payload) {
                    item.payload.hasAudition = true;
                }
            });
        }
    }
}


    if (url.includes("/iphone/sydw/v3/orders/unpaid_order")) {
       obj.data.orderId = 999999999;
       obj.code = 1;
   }

    if (url.includes("/iphone/jdwz/v3/orders/uni")) {
       obj.data.orderId = 999999999;
       obj.data.order_id_str = "99999999";
       obj.code = 1;
       obj.msg = "购买成功";
   }

    if (url.includes("/iphone/sydw/v3/orders/pre_best")) {
       obj.data.payFee = 0;
       obj.data.dealRelief = 0;
       obj.data.cutFee = 0;
       obj.data.totalFee = 0;
   }

if (url.includes("/jdwz/v3/lectures/") && url.includes("/detail_for_sale_v2")) {
    if (obj.data) {
        // 确保 obj.data 和其属性存在
        obj.data.hasRedirectInstructorAfterPaid = true;
        obj.data.promotionPrice = 0;
        obj.data.distributionId = 1;
        obj.data.price = 0;
        obj.data.topPrice = 0;
        obj.data.floorPrice = 0;
        
        // 确保 bestDiscount 存在
        if (obj.data.bestDiscount) {
            obj.data.bestDiscount.discountedPrice = 0;
        }        
        obj.data.payPrice = 0;
    }
}


//电子书
    if (url.includes("/iphone/v3/ebook/list_by_cat")) {
     if (Array.isArray(obj.datas)) {
        obj.datas.forEach(item => {
            if (item) { // 确保 item 存在
                item.paid = true; 
                item.free = true; 
            }
        });
    }
}

    if (url.includes("/iphone/v3/ebook/detail")) {
    obj.data.paid = true;
    obj.data.free = true;
    obj.data.payPrice = 0;
    obj.data.price = 0;
}

    if (url.includes("/iphone/v3/member_lectures")) {
    obj.datas.forEach(item => {
      item.hasAudition = true;
      item.episodeDetail.hasAudition = true;
      item.episodeDetail.status = 1;
      item.privilegePopInfo = "永久会员";
    });
}


// 我的课程
if (url.includes("/jdwz/v3/my/lectures/")) { // 检查 URL 是否匹配
    // 判断是否是期望的课程ID的URL
    if (url.includes("/summary")) {
        // 针对summary的处理
        if (obj.data && obj.data.title) {
            obj.data.hasUserFormAfterOrder = true;
            obj.data.enrollStatus = 1;
            obj.data.hasWatchStatPanel = true;
            obj.data.hasUserContentInfo = true;
            obj.data.needAgreement = true;
            obj.data.hasRedirectInstructorAfterPaid = false;
            obj.data.code = 1;
            obj.data.groupType = 1;
        } else if (obj.msg && obj.code) {
            obj.code = 1;
            obj.msg = "";
        }
    }
}

// 确保 URL 符合目标模式
if (url.match(/\/iphone\/jdwz\/v3\/lectures\/\d+\/episode_nodes/)) {
    // 确保 obj.datas 存在且是一个数组
    if (obj.datas && Array.isArray(obj.datas)) {
        obj.datas.forEach(item => {
            if (item.payload) {
                item.payload.hasAudition = true;  
                item.payload.playStatus = 3;
                item.payload.status = 3;
            }
        });
    }
}


// 处理 "/im/iphone/signatures/signature" 的响应
if (url.includes("/im/iphone/signatures/signature")) {
    obj.code = 1;
}

if (url.includes("/v3/red_packet_share/activities/detail/by_order") || url.includes("/dispatcher/iphone/jdwz/config/server/list")) {
    obj.code = 1;
    obj.msg = "";
}

if (url.includes("/sydw/v3/livereplay/replay/lectures") || url.includes("/iphone/jdwz/v3/ticket")) {
    obj.code = 1;
    obj.msg = "";
}
if (url.includes("/user_prime_lectures/is_user_prime_lecture") || url.includes("/v3/ebook/update/user_books")) {
    obj.data = true;
}
if (url.includes("/sydw/v3/episodes")) {
     if (obj.data.hasVideo && obj.data.hasAudition) {
    obj.data.playStatus = 1;
    obj.data.hasAudition = false;
    obj.data.hasVideo = true;
    obj.data.videoDisplayType = true;
    obj.data.supportMultiGroup = true;
    obj.data.liveConfig.useIntelligentRoom =true;
    obj.data.playStatus = 3;
    obj.data.enterRoomTimeInterval = 0;
    obj.data.recordingType = 1;
    obj.data.status = 3;
       }
}

if (url.includes("/school/iphone/offline_classes/config/get_by_biz")) {
    obj.data.seatConfig.enable = true;
    obj.data.seatConfig.seatStatus = 1;
    obj.data.seatConfig.openTime = 1;
    obj.data.seatConfig.supportSelectSet = 1;
    obj.data.leaveConfig.enable = true;
}

if (url.includes("/jdwz/v3/my/lectures/") && url.includes("/episode_sets")) {
    if (obj.msg) {
      obj.msg = "";
      obj.code = 1;
     }
}

if (url.includes("/iphone/jdwz/v3/episodes")) {
    obj.data = true;
}
if (url.includes("/mediafile\/meta")) { 
    if (url.includes("/summary")) {
      obj.msg = "";
      obj.code = 1;
     }
}


$done({body: JSON.stringify(obj)});