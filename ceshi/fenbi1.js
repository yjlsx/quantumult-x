[rewrite_local]
# 修改 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/iphone\/entry url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi1.js

[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com

let obj = JSON.parse($response.body);

// 修改 AI 教师会员信息
if (obj.data && obj.data.userMember) {
    obj.data.userMember.member = true;
    obj.data.userMember.memberClass = 1; // 设置会员级别
    obj.data.userMember.memberType = 51; // 设置会员类型
    obj.data.userMember.expireTime = 4102415999000; // 设置过期时间，例如2099年12月31日
    obj.data.userMember.hasBeenMember = true; // 已经是会员
    obj.data.userMember.memberStatus = 1; // 会员状态设为已开通
    obj.data.userMember.createdTime = 1551873177267; // 设置创建时间
}

$done({body: JSON.stringify(obj)});
