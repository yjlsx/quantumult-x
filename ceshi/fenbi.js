# Quantumult X Rewrite

[rewrite_local]
/**
# 重写 AI 教师会员信息
^https:\/\/keapi\.fenbi\.com\/ai\/iphone\/entry url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js
# 修改用户余额为
^https://ke\.fenbi\.com/iphone/v3/users/balance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/fenbi.js

*
[mitm]
hostname = keapi.fenbi.com
**/

let response = JSON.parse($response.body);
let currentTime = Date.now();

// 修改 AI 教师会员信息
if (response.data) {
    response.data.userMember = {
        "member": true,
        "memberClass": 1,
        "memberType": 52,
        "expireTime": 4102415999000,
        "hasBeenMember": true,
        "memberStatus": 1,
        "createdTime": 1551873177267
    };

    response.data.svipMemberType = 52;
}

// 修改用户余额为999999并设置updatedTime为当前时间
if (response.data && response.data.balance !== undefined) {
    response.data.balance = 999999;
    response.data.updatedTime = currentTime;
}

$done({body: JSON.stringify(response)});

