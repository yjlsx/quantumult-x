/*
 *
 *
脚本功能：网易云音乐黑胶vip+
24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 网易云音乐黑胶vip
# 播放器会员皮肤
^https:\/\/interface.+music\.163\.com\/eapi\/playermode\/ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 搜索结果会员歌曲
^https:\/\/interface.+music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 播放器会员歌曲
^https:\/\/interface.+music\.163\.com\/eapi\/v3\/song\/detail url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
^https:\/\/interface.+music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
^https:\/\/interface.+music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 侧边栏会员等级
^https:\/\/interface.+music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 首页歌单会员歌曲
^https?:\/\/interface.+music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 会员认证
^https?:\/\/interface.+music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
^https:\/\/interface\.music\.163\.com\/api\/vip-center-bff\/float\/data url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/wyy/wyy.js
[mitm] 
hostname = *music.163.com,
*
*
*/
const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("/vip-center-bff") ) {
      obj.data.vipInfo.redVipLevel = 9;
      obj.data.vipInfo.redVipAnnualCount = 1;
      obj.data.vipInfo.musicPackage.vipLevel = 9;
      obj.data.vipInfo.musicPackage.isSign = true;
      obj.data.vipInfo.musicPackage.expireTime = 4102415999000; // 设置一个远未来的时间，表示永久
      obj.data.vipInfo.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png";
      obj.data.vipInfo.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png";
      obj.data.vipInfo.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png";
     // 设置年度 VIP 会员信息
      obj.data.vipInfo.associator.vipLevel = 9;
      obj.data.vipInfo.associator.vipCode = 100;
      obj.data.vipInfo.associator.isSign = true;
      obj.data.vipInfo.associator.expireTime = 4102415999000; // 设置到期时间，以 UNIX 时间戳表示
     // 设置 PLUS 会员信息
     obj.data.vipInfo.redplus.isSign = true;
     obj.data.vipInfo.redplus.vipLevel = 9;
     obj.data.vipInfo.redplus.expireTime = 4102415999000; // 设置一个远未来的时间，表示永久
     obj.data.vipInfo.redplus.vipCode = 200;
}

$done({ body: JSON.stringify(obj) });



