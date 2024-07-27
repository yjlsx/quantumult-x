/*
 *
 *
脚本功能：微信读书 解锁付费vip
下载地址：苹果商店下载
脚本作者：
更新时间：
电报频道：
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 微信读书vip(需重新用微信登陆，无法刷新->关闭脚本进入) 
^https://i.\weread\.qq\.com/(login|user/profile|mobileSync).*$  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i\.weread\.qq\.com/pay/memberCardSummary url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i.\weread\.qq\.com/weekly/exchange url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i.\weread\.qq\.com/storyfeed/getRecentBooks  url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i.\weread\.qq\.com/pay/balance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i\.weread\.qq\.com/pay/membercardexitems url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i\.weread\.qq\.com/pay/membercardfrozen url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i\.weread\.qq\.com/book/getProgress url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wxds.js
^https://i\.weread\.qq\.com/updateConfig url reject
[mitm] 
hostname = i.weread.qq.com
*
*
*/
const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/pay/memberCardSummary')) {
    obj.canUseDiscount = 1;
    obj.remainCount = 9999;
    obj.startTime = 1711011078; // 你可以根据需要调整
    obj.totalFreeReadDay = 9999;
    obj.remainCoupon = 55;
    obj.autoRenewableType = "permanent"; // 自动续费类型
    if (obj.hintsForRecharge) {
        obj.hintsForRecharge.buttonSubtitle = "永久会员";
        obj.hintsForRecharge.predictedChapterPrice = 0;
        obj.hintsForRecharge.pricePerMonth = 0;
    }
    obj.giftIsExpired = 0;
    obj.tipforpayFlag = "0|0|0";
    obj.mcardHint = "永久会员";
    obj.payingRemainTime = 99999;
    obj.shareForCardIsActive = 1; // 分享卡片状态为激活
    obj.payingUsedDay = 1;
    obj.permanent = 1; // 标记为永久会员
    obj.expiredTime = 4102444799; // 永久会员没有过期时间
    obj.expired = 0; // 永久会员状态未过期
    obj.remainTime = 99999;
    obj.isPaying = 1;
}

if (url.includes('/weekly/exchange')) {
    if (obj.memberCardExchange) {
        obj.memberCardExchange.forEach(card => {
            card.canExchange = 1;
            card.days = 9999;
            card.price = 0;
            card.needFreeCardCnt = 1;
        });
    }
    if (obj.infiniteCard) {
        obj.infiniteCard.day = 9999;
        obj.infiniteCard.paying = 1;
    }
    obj.isMCardVip = 1; // 设置为会员
}

if (url.includes('/storyfeed/getRecentBooks')) {
    if (obj.items) {
        obj.items.forEach(function(item) {
            if (item.book) {
                item.book.free = 1; // 设置书籍为免费
                item.book.originalPrice = 0; // 设置原价为 0
                item.book.centPrice = 0;
                item.book.payType = 0;
            }
        });
    }
}

if (url.includes('pay/balance')) {
    obj.giftBalance = 9999;
    obj.peerBalance = 999999;
    obj.paperBalance = 999999;
    obj.incentive = 9999;
    obj.balance = 99999;
}

if (url.includes('user/profile')) {
    obj.role = 1;
}

if (url.includes('mobileSync')) {
    obj.gift = true;
    obj.giftCount = 99999;
}

if (url.includes('/pay/membercardexitems')) {
   obj.items.forEach(item => {
     item.canExchange = 1;
     item.buttonText = "免费兑换 ${item.days} 天付费会员卡";
     item.description = "免费兑换";
     item.price = 0;
     item.needFreeCardCnt = 0;
     });
   obj.remainFreeDays = 99999;
}

if (url.includes('/pay/membercardfrozen')) {
    obj.errcode = 0;
    obj.errlog = "";
    obj.errmsg = "兑换成功";
}

if (url.includes('/book/getProgress')) {
    obj.canFreeRead = 1;
}


$done({ body: JSON.stringify(obj) });
