# Quantumult X Rewrite

[rewrite_local]
/**
# 重写 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/iphone\/entry url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
# 修改用户余额为
^https://ke\.fenbi\.com/iphone/v3/users/balance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
#改价格
^https://ke.fenbi\.com/iphone/v3/member_centers/sale_centerurl script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

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
        obj.data.userMember.memberType = 52;
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

$done({body: JSON.stringify(obj)});
