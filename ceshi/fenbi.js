# Quantumult X Rewrite

[rewrite_local]
/**
# 重写 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/iphone\/entry url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
# 修改用户余额为
^https://ke\.fenbi\.com/iphone/v3/users/balance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
#改价格
^https://ke.fenbi\.com/iphone/v3/member_centers/sale_center url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
^https://ke.fenbi.com/iphone/v3/user_member/home url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
*
[mitm]
hostname = keapi.fenbi.com
**/

let obj = JSON.parse($response.body);
let currentTime = Date.now();
let url = $request.url;

// 修改 AI 教师会员信息
if (url.includes('/ai/iphone/entry')) {
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true;
        obj.data.userMember.memberClass = 9;
        obj.data.userMember.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40]; // 设置会员配置的类型为指定数组;
        obj.data.userMember.expireTime = 4102415999000;  // 2099-12-31
        obj.data.userMember.hasBeenMember = true;
        obj.data.userMember.memberStatus = 1;
        obj.data.userMember.createdTime = 1551873177267;
        
        obj.data.svipMemberType = 52;  // 确保 svipMemberType 为 52
    }
}

// 修改用户余额为 999999 并设置 updatedTime 为当前时间
if (url.includes('/iphone/v3/users/balance')) {
    if (obj.data && obj.data.balance !== undefined) {
        obj.data.balance = 999999;
        obj.data.updatedTime = currentTime;
    }
}

//课程价格修改
if (url.includes('/iphone/v3/member_centers/sale_center')) {
  // 修改 data 中的 memberContents 和 contents 的部分属性值
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

// 判断 URL 是否包含特定地址
if (url.includes('https://ke.fenbi.com/iphone/v3/user_member/home')) {
    // 修改 userMember 部分
    if (obj.data && obj.data.userMember) {
        obj.data.userMember.member = true; // 开通会员
        obj.data.userMember.memberClass = 3; // 设置会员级别为 3
        obj.data.userMember.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40]; // 设置会员类型为指定数组
        obj.data.userMember.expireTime = 1721145600000; // 设置过期时间
        obj.data.userMember.hasBeenMember = true; // 已经是会员
        obj.data.userMember.memberStatus = 1; // 会员状态设为已开通
        obj.data.userMember.createdTime = 1700000000000; // 设置创建时间
    }

    // 修改 memberConfig 部分
    if (obj.data && obj.data.memberConfig) {
        obj.data.memberConfig.memberType = [1, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 40]; // 设置会员配置的类型为指定数组
    }
}

// 将所有电子书设为已购买
if (obj.data && obj.data.modules) {
    for (let module of obj.data.modules) {
        if (module.memberModuleType === 1 && module.content.eBooks) {
            for (let ebook of module.content.eBooks) {
                ebook.paid = true; // 将电子书标记为已购买
            }
        }
    }
}

// 将所有课程设为已购买
if (obj.data && obj.data.modules) {
    for (let module of obj.data.modules) {
        if (module.memberModuleType === 4 && module.content.lectures) {
            for (let lecture of module.content.lectures) {
                lecture.hasAudition = true; // 将课程标记为已试听，相当于已购买
            }
        }
    }
}

// 将所有会员专享内容设为已购买
if (obj.data && obj.data.modules) {
    for (let module of obj.data.modules) {
        if (module.memberModuleType === 2 && module.content.userMorningReading) {
            module.content.userMorningReading.trial = false; // 取消试用状态
            module.content.userMorningReading.memberUserSummaryRet.readMemberArticle = true; // 标记会员专享内容已读
        }
    }
}

$done({body: JSON.stringify(obj)});