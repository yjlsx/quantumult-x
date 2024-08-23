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
//^https?:\/\/interface\d+\.music\.163\.com\/eapi\/music-vip-rights url reject
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
#续费管理
^https:\/\/interface3\.music\.163\.com\/api\/music-vip-membership\/cashier\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface\.music\.163\.com\/weapi\/music-vip-membership\/cashier\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
//^https:\/\/(interface\.music\.163\.com\/api\/batch|music\.163\.com\/weapi\/batch\?csrf_token) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface\.music\.163\.com\/api\/music-vip-membership\/client\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js

 #装扮解锁
^https?:\/\/interface\.music\.163\.com\/(weapi\/batch\?csrf_token|api/batch)$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/interface\.music\.163\.com\/(api\/batch|weapi\/batch\?csrf_token=[0-9a-fA-F]+)$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
#补充
^https:\/\/interface\.music\.163\.com\/(api\/nuser\/account\/get|store\/api\/coin\/user|api\/ordering\/web\/digital) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js
^https:\/\/music\.163\.com\/weapi\/(cashier\/service\/asset\/account\/ichange|nuser\/account\/get|music-vip-membership\/front\/vip\/info|ordering\/web\/status|single\/salepage\/detail) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/wyy/wyy.js



[mitm] 
hostname = *.music.163.com, interface*.music.163.com,  *.music.126.net, interface.music.163.com, music.163.com
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
    obj.data.vipInfo.musicPackage.vipCode = 220;
    obj.data.vipInfo.musicPackage.expireTime = 4102358400000;
    obj.data.vipInfo.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip7静态
    obj.data.vipInfo.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.vipInfo.associator.vipCode = 100;
    obj.data.vipInfo.associator.vipLevel = 7;
    obj.data.vipInfo.associator.expireTime = 4102358400000;
    obj.data.vipInfo.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip1静态
    obj.data.vipInfo.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj.data.vipInfo.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582305307/8bab/f0f1/ba3f/3f574fb88acef4c7e5bc441d2f12fd5b.png"; //svip7静态
    obj.data.vipInfo.redplus.vipCode = 500;  //
    obj.data.vipInfo.redplus.expireTime = 4102358400000;
    obj.data.vipInfo.redplus.vipLevel = 7;
    }
}


if ($request.url.indexOf('/music-vip-membership/cashier/info') !== -1) {
   if (obj.data && obj.data.vip) {
    obj.data.vip.redVipAnnualCount = 1;
    obj.data.vip.redVipLevel = 7;
    obj.data.vip.musicPackage.isSign = true;
    obj.data.vip.musicPackage.vipCode = 220;
    obj.data.vip.musicPackage.vipLevel = 7;
    obj.data.vip.musicPackage.expireTime = 4102358400000;
    obj.data.vip.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip7静态
    obj.data.vip.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.vip.associator.vipCode = 100;
    obj.data.vip.associator.vipLevel = 7;
    obj.data.vip.associator.expireTime = 4102358400000;
    obj.data.vip.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip7静态
    obj.data.vip.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj.data.vip.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582305307/8bab/f0f1/ba3f/3f574fb88acef4c7e5bc441d2f12fd5b.png"; //svip7静态
    obj.data.vip.redplus.vipCode = 500;
    obj.data.vip.redplus.expireTime = 4102358400000;
    obj.data.vip.redplus.vipLevel = 7;
    obj.data.vip.userVipStatus = [ 10, 15, 25 ];
        }
   if (obj.data && obj.data.user) {
    obj.data.user.account.vipType = 15;
    obj.data.user.account.status = 1;
    obj.data.user.profile.vipType = 15;  //11是vip
    obj.data.user.profile.accountType = 1;  //?
            }
     if (Array.isArray(obj.data.vip)) {
    obj.data.vip.forEach(item => {
        item.publishPrice = 0;
        item.iapPrice = 0;
        item.price = 0;
        });
       }
}


// 检查请求 URL
if ($request.url.indexOf('/api/batch') !== -1 || $request.url.indexOf('/weapi/batch?csrf_token') !== -1) {
    if (obj["/api/nuser/account/get"]) {
        obj["/api/nuser/account/get"].account.vipType = 15; 
        obj["/api/nuser/account/get"].profile.vipType = 15;
        obj["/api/nuser/account/get"].profile.accountType = 1;
    }

    if (obj["/api/music-vip-membership/front/vip/info"]) {
        obj["/api/music-vip-membership/front/vip/info"].data.redVipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipCode = 220;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png";
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png";
        obj["/api/music-vip-membership/front/vip/info"].data.associator.vipCode = 100;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.vipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582305307/8bab/f0f1/ba3f/3f574fb88acef4c7e5bc441d2f12fd5b.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipCode = 500;
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipLevel = 7;
    }

    if (obj["/api/purchased/redvip/vipstatus"]) {
        obj["/api/purchased/redvip/vipstatus"].userVipStatus = [10, 15, 25];
    }

    if (obj["/api/vip-center-bff/card/entry/list"] && obj["/api/vip-center-bff/card/entry/list"].data) {
    obj["/api/vip-center-bff/card/entry/list"].data.forEach(item => {
      if (item.type === "level" && item.level !== undefined) {
        item.level = 7;
        }
      });
    }



    if (obj["/api/pendant/frontend/list"] && Array.isArray(obj["/api/pendant/frontend/list"].data)) {
        obj["/api/pendant/frontend/list"].data.forEach(item => {
            if (Array.isArray(item.pendantList)) {
                item.pendantList.forEach(pendant => {
                    if (pendant.hasOwnProperty('hasUsePermission')) {
                        pendant.hasUsePermission = true;
                    }
                });
            }
        });
    }
}


if (/^https:\/\/interface\.music\.163\.com\/(weapi\/batch\?csrf_token|api\/batch)$/.test($request.url)) {
    if (obj["/api/nuser/account/get"]) {
        obj["/api/nuser/account/get"].account.vipType = 15; 
        obj["/api/nuser/account/get"].profile.vipType = 15;
        obj["/api/nuser/account/get"].profile.accountType = 1;
    }

    if (obj["/api/music-vip-membership/front/vip/info"]) {
        obj["/api/music-vip-membership/front/vip/info"].data.redVipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipCode = 220;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png";
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.vipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.musicPackage.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png";
        obj["/api/music-vip-membership/front/vip/info"].data.associator.vipCode = 100;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.vipLevel = 7;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582305307/8bab/f0f1/ba3f/3f574fb88acef4c7e5bc441d2f12fd5b.png";
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipCode = 500;
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.expireTime = 4102358400000;
        obj["/api/music-vip-membership/front/vip/info"].data.redplus.vipLevel = 7;
    }

    if (obj["/api/purchased/redvip/vipstatus"]) {
        obj["/api/purchased/redvip/vipstatus"].userVipStatus = [10, 15, 25];
    }


   // 处理 /api/vipnewcenter/app/resource/common/list 的部分
   if (obj["/api/vipnewcenter/app/resource/common/list"]) {
      let contentList = obj["/api/vipnewcenter/app/resource/common/list"].data.contentList;
  contentList.forEach(item => {
    let content = JSON.parse(item);
    content.jumpUrl = ""; // 清空 jumpUrl
    item = JSON.stringify(content);
    });
   }

   // 处理 /api/vipauth/app/auth/interests/query/position 的部分
    if (obj["/api/vipauth/app/auth/interests/query/position"]) {
     let dataList = obj["/api/vipauth/app/auth/interests/query/position"].data;
      dataList.forEach(item => {
        //item.authRespItemDto.interestsVipType = 6; 
        item.authRespItemDto.authResult.canUse = true; // canUse 改为 true
     });
   }

  obj?.["/api/vipnewcenter/app/vipplayer/simple"]?.data?.forEach(item => {
  if (item) {
    if (item.hasOwnProperty('activityLockVo')) {
      item.activityLockVo = { 
                                         "unLock": true,
                                         "activityUrl": null 
                                          };
                                 } 
    if (item.hasOwnProperty('limitFree')) {
      item.limitFree = false;
             }
       }
    });

// 遍历响应中的每个 API 路径
 for (let apiPath in obj) {
  let data = obj[apiPath].data;
  // 检查 data 是否为数组
  if (Array.isArray(data)) {
    data.forEach(item => {
      let authResult = item.authRespItemDto?.authResult;
      if (authResult) {
        if (authResult.hasOwnProperty('canUse')) authResult.canUse = true;
        if (authResult.hasOwnProperty('canUseType')) authResult.canUseType = 2;

        if (authResult.canNotUseGuideContent?.hasOwnProperty('jumpUrl')) {
          authResult.canNotUseGuideContent.jumpUrl = "";
               }
           }
        });
     }
  }

}

if ($request.url.indexOf('/api/music-vip-membership/client/vip/info') !== -1) {
   if (obj.data && obj.data.vip) {
    obj.data.redVipAnnualCount = 1;
    obj.data.redVipLevel = 7;
    obj.data.musicPackage.isSign = true;
    obj.data.musicPackage.vipCode = 220;
    obj.data.musicPackage.vipLevel = 7;
    obj.data.musicPackage.expireTime = 4102358400000;
    obj.data.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.associator.vipCode = 100;
    obj.data.associator.vipLevel = 7;
    obj.data.associator.expireTime = 4102358400000;
    obj.data.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip7静态
    obj.data.relationOtherUserRedVipExxpireTime = 4102358400000;
     }
}

if ($request.url.indexOf('/api/nuser/account/get') !== -1) {
    obj.account.paidFee = true;
    obj.account.vipType = 15;
    obj.account.status = 1;
    obj.profile.vipType = 15;
}

if ($request.url.indexOf('/weapi/cashier/service/asset/account/ichange') !== -1 || $request.url.indexOf('/store/api/coin/user') !== -1) {
    obj.data.balance = "999.00";
   if (obj.coin) {
    obj.coin = "999.00";
      }
}

if ($request.url.indexOf('/api/ordering/web/digital') !== -1 || $request.url.indexOf('/ordering/web/status') !== -1) {
    obj.code = 200;
    obj.msg = "购买成功";
}

if ($request.url.indexOf('/single/salepage/detail') !== -1) {
    obj.data.unlockModuleConfig.title = obj.data.name;
    obj.data.unlockModuleConfig.songId = obj.data.songId;
}

if ($request.url.indexOf('/music-vip-membership/front/vip/info') !== -1) {
    obj.data.redVipAnnualCount = 1;
    obj.data.redVipLevel = 7;
    obj.data.musicPackage.isSign = true;
    obj.data.musicPackage.vipLevel = 7;
    obj.data.musicPackage.vipCode = 220;
    obj.data.musicPackage.expireTime = 4102358400000;
    obj.data.redVipLevelIcon = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip7静态
    obj.data.associator.dynamicIconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32141292744/0634/5100/c09f/eeca8bd06770efbff522a3b77627e2d4.png"; //vip1动态
    obj.data.associator.vipCode = 100;
    obj.data.associator.vipLevel = 7;
    obj.data.associator.expireTime = 4102358400000;
    obj.data.associator.iconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582185437/838c/3e35/26c7/1483dd70f2bbbf601f095dff56c603b8.png"; //vip1静态
    obj.data.redplus.dynamicIconUrl = "https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32815146704/bbb8/496f/6cdb/930f24fcdf7276ef00b2de12f71325d7.png";  //svip1动态
    obj.data.redplus.iconUrl = "https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32582305307/8bab/f0f1/ba3f/3f574fb88acef4c7e5bc441d2f12fd5b.png"; //svip7静态
    obj.data.redplus.vipCode = 500;  
    obj.data.redplus.expireTime = 4102358400000;
    obj.data.redplus.vipLevel = 7;
}


// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });