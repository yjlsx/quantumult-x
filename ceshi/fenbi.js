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
# 修改会员显示
#
# 修改课程配置
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/user_member\/course_configs url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https:\/\/ke\.fenbi\.com\/iphone\/v3\/members\/member_static_config  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

*
[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com,
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
        obj.data.userMember.memberClass = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52];
        obj.data.userMember.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]; // 设置会员配置的类型为指定数组;
        obj.data.userMember.expireTime = 4102415999000;  // 2099-12-31
        obj.data.userMember.hasBeenMember = true;
        obj.data.userMember.memberStatus = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52];
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
/*
// 判断 URL 是否包含特定地址
if (url.includes('/iphone/v3/user_member/home')) {
    // 修改 userMember 部分
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true; // 开通会员
        obj.data.userMember.memberClass = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]; // 设置会员级别
        obj.data.userMember.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]; // 设置会员类型为指定数组
        obj.data.userMember.expireTime = 4102415999000; // 设置过期时间
        obj.data.userMember.hasBeenMember = true; // 已经是会员
        obj.data.userMember.memberStatus = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52]; // 会员状态设为已开通
        obj.data.userMember.createdTime = 1651873177267; // 设置创建时间
    }

    // 修改 memberConfig 部分
  if (obj.data && obj.data.memberConfig) {
        obj.data.memberConfig.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40, 52];
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
*/
// 修改每个都为SVIP
    if (url.includes("/iphone/v3/user_member/course_configs")) {
        if (obj.datas && Array.isArray(obj.datas)) {
            obj.datas.forEach(course => {
                if (course.memberConfigs && Array.isArray(course.memberConfigs)) {
                    course.memberConfigs.forEach(member => {
                        member.svipMemberType = 52;
                        member.svipTitle = member.title + "SVIP";
                    });
                }
            });
        }
    }

    if (url.includes("/members/member_static_config")) {
        if (obj.data && Array.isArray(obj.data)) {
               obj.data.forEach(item => {
                    item.svipMemberType = 1;
                           });
                    }
 }


$done({body: JSON.stringify(obj)});
