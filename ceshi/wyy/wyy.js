/*
[rewrite_local]
# > 解锁VIP
^http[s]?:\/\/.+music.+(player\/url|playlist|entrance|\/eapi\/search\/).*$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy1.js
# 热推 有话想说 分享一下 歌曲下的祝福等小提示 | 评论区 乐迷 星评等级 关注 等图标
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/(batch|v\d\/resource\/comment\/floor\/) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy2.js
# 推荐主页
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/(homepage\/block\/page|link\/page\/rcmd\/(block\/resource\/multi\/refresh|resource\/show)) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy3.js
# 发现
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/link\/page\/discovery\/resource\/show url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy4.js
# 显示未关注你
;^https?:\/\/interface\d+\.music\.163\.com\/eapi\/user\/follow\/users\/mixed url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy5.js
# 播放页 歌名下方 乐迷团｜关注｜播放页提示｜音乐应用红点｜播放提示
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/(community\/friends\/fans-group\/artist\/group\/|mine\/applet\/redpoint|music\/songshare\/text\/recommend\/|resniche\/position\/play\/new\/|resource\/comments?\/musiciansaid\/|user\/sub\/artist) url reject-dict
# 今日运势 商城 Beat专区 音乐收藏家 | type:ACTIVITY | 低至5.2折
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/(delivery\/(batch-deliver|deliver)|moment\/tab\/info\/|side-bar\/mini-program\/music-service\/account|yunbei\/account\/entrance\/) url reject-dict
# 搜索页 搜索词 热搜卡片 猜你喜欢 
^https?:\/\/interface\d+\.music\.163\.com\/w?eapi\/search\/(chart\/|default\/|rcmd\/keyword\/|specialkeyword\/) url reject-dict
# 我的应用下方提醒
^https?:\/\/interface\d+\.music\.163\.com\/w?eapi\/(activity\/bonus\/playpage\/time\/query|resource-exposure\/) url reject-dict
# 会员歌曲提示框
^https?:\/\/interface\d+\.music\.163\.com\/w?e?api\/vipcenter/tspopup\/get url reject-dict
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/vip\/cashier\/tspopup url reject-dict
^https?:\/\/interface\d+\.music\.163\.com\/api\/vipsale\/vipbuy url reject
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/music-vip-rights url reject
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/vipmall url reject
# 开屏广告
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/ad url reject
^https?:\/\/interface\d+\.music\.163\.com\/e?api\/(ocpc\/)?ad\/ url reject-dict
# 评论弹窗
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/music\/partner\/picked\/user\/top url reject-dict
# 位置请求
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/lbs\/gpsStatus\/upload url reject-dict
# 屏蔽更新
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/ios url reject-dict
# 播放页,多余图标,各种小提示
^https?:\/\/interface\d+\.music\.163\.com\/eapi\/mlivestream\/entrance\/playpage url reject-dict
# 首页右上角激励图标
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/link\/scene\/show\/resource url reject-dict
# 评论回复区广告
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/v1\/content\/exposure\/comment url reject-dict
# 评论区右上角
^https?:\/\/interface(\d)?\.music\.163\.com\/w?e?api\/comment\/hotcomment\/collect url reject-dict
# 我的抓取
^https?:\/\/.*\/api\/clientlog\/encrypt\/upload url reject
^https?:\/\/d[1234]\.music\.126\.net/.*\.xz url reject
^https?:\/\/d[1234]\.music\.126\.net/.*\.gr url reject
#会员中心
^https:\/\/interface\.music\.163\.com\/api\/vip-center-bff\/float\/data url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface\.music\.163\.com\/weapi\/vip-center-bff\/float\/data url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface3\.music\.163\.com\/api\/music-vip-membership\/cashier\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface\.music\.163\.com\//weapi\/music-vip-membership\/cashier\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js

^https:\/\/music\.163\.com\/weapi\/batch\?csrf_token$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
 



[mitm] 
hostname = *.music.163.com, interface*.music.163.com,  *.music.126.net
*/

// @yjlsx

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/vip-center-bff/float/data') !== -1) {
   if (obj.data && obj.data.vipInfo) {
    obj.data.vipInfo.redVipAnnualCount = 1;
    obj.data.vipInfo.redVipLevel = 7;
    obj.data.vipInfo.musicPackage.isSign = true;
    obj.data.vipInfo.musicPackage.vipLevel = 7;
    obj.data.vipInfo.musicPackage.expireTime = 4102358400000;
    obj.data.vipInfo.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj.data.vipInfo.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.vipInfo.associator.vipCode = 100;
    obj.data.vipInfo.associator.vipLevel = 7;
    obj.data.vipInfo.associator.expireTime = 4102358400000;
    obj.data.vipInfo.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj.data.vipInfo.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj.data.vipInfo.redplus.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png"; //svip1静态
    obj.data.vipInfo.redplus.vipCode = 5;
    obj.data.vipInfo.redplus.expireTime = 4102358400000;
    obj.data.vipInfo.redplus.vipLevel = 7;
    }
}

if ($request.url.indexOf('/music-vip-membership/cashier/info') !== -1) {
    obj.data.vip.redVipAnnualCount = 1;
    obj.data.vip.redVipLevel = 7;
    obj.data.vip.musicPackage.isSign = true;
    obj.data.vip.musicPackage.vipCode = 220;
    obj.data.vip.musicPackage.vipLevel = 7;
    obj.data.vip.musicPackage.expireTime = 4102358400000;
    obj.data.vip.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj.data.vip.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.vip.associator.vipCode = 100;
    obj.data.vip.associator.vipLevel = 7;
    obj.data.vip.associator.expireTime = 4102358400000;
    obj.data.vip.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj.data.vip.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj.data.vip.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582306080/a905/24c9/63cd/1d065fb7c32a5fe002d223f9ed8945f3.png"; //svip1静态
    obj.data.vip.redplus.vipCode = 0;
    obj.data.vip.redplus.expireTime = 4102358400000;
    obj.data.vip.redplus.vipLevel = 7;
    obj.data.vip.userVipStatus = [ 10, 15, 25 ];
    obj.data.user.account.vipType = 15;
    obj.data.user.account.status = 1;
    obj.data.user.profile.vipType = 6;  //11是vip
    obj.data.user.profile.accountType = 15;
     if (Array.isArray(obj.data.vip)) {
    obj.data.vip.forEach(item => {
        item.publishPrice = 0;
        item.iapPrice = 0;
        item.price = 0;
        });
       }
}

if ($request.url.indexOf('/weapi/batch?csrf_token') !== -1) {
    obj["/api/nuser/account/get"].account.vipType = 11;
    obj["/api/nuser/account/get"].profile.vipType = 11;
    obj["/api/nuser/account/get"].profile.accountType = 1;
    obj["/api/music-vip-membership/front/vip/info"].data.redVipLevel = 7;
    obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipCode = 220;
    obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipLevel = 7;
    obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.expireTime = 4102358400000;
    obj["/api/music-vip-membership/front/vip/info"].data.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj["/api/music-vip-membership/front/vip/info"].data.associator.vipCode = 100;
    obj["/api/music-vip-membership/front/vip/info"].data.associator.vipLevel = 7;
    obj["/api/music-vip-membership/front/vip/info"].data.associator.expireTime = 4102358400000;
    obj["/api/music-vip-membership/front/vip/info"].data.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582186486/9f31/5cfe/207c/2846c11ce0bd05aae1754aed7e63ca58.png"; //vip1静态
    obj["/api/music-vip-membership/front/vip/info"].data.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj["/api/music-vip-membership/front/vip/info"].data.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582306080/a905/24c9/63cd/1d065fb7c32a5fe002d223f9ed8945f3.png"; //svip1静态
    obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipCode = 0;
    obj["/api/music-vip-membership/front/vip/info"].data.redplus.expireTime = 4102358400000;
    obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipLevel = 7;
    obj["/api/purchased/redvip/vipstatus"].userVipStatus = [ 10, 15, 25 ];

   obj["/api/pendant/frontend/list"].data.forEach(item => {
    item.pendantList.forEach(pendant => {
        pendant.hasUsePermission = true;
       });
   });
}



// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });