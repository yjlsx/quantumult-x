/***********************************************
> 应用名称：
> 脚本作者：@yjlsx
> 更新时间：2024-08-19
> 特别提醒：如需转载请注明出处，谢谢合作！
*
[rewrite local]
^https:\/\/app-sc\.miguvideo\.com\/ability\/v2\/member-rights\/miguvideo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
//^https:\/\/play\.miguvideo\.com\/playurl\/v1\/play\/playurl url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/mesh\/v1\/mesh-info\/voucherIdentity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/public-operbiz3\.miguvideo\.com\/deliver\/site\/userFeatures\/miguvideo\/iOS url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/v3-sc\.miguvideo\.com\/program\/v4\/staticcache\/datavo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/ability\/v1\/(vipMemberCard|queryContractByTag) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/ability\/v2\/(member-card|nbaMemberInfo|indexContract|member-info) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js


# > 足球会员
^https:\/\/vmesh\.miguvideo\.com\/ability\/v2\/footballMemberInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/ability\/v3\/member\/identityWall url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/morder\/v3\/sales\/vod-pricing url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js

# > Vip会员
^https?:\/\/(play|dis).*miguvideo.com\/(play|dis)(url|play)\/.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https?:\/\/play.miguvideo.com\/playurl\/v1\/play\/playurl\?2Kvivid=true?.*=true$ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/mgspck.js
# > 开屏广告
^https://.*miguvideo\.com/request/sdk url reject-200
^https://common-sc\.miguvideo\.com/task/v7/task-list/cmvideo/visitor url reject-200




*
[mitm]
hostname = app-sc.miguvideo.com, play.miguvideo.com, vmesh.miguvideo.com, public-operbiz3.miguvideo.com, v3-sc.miguvideo.com

***********************************************/

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/ability/v2/member-rights/miguvideo') !== -1) {

    // 遍历每个会员信息
   for (let key in obj.body.memberInfos) {
    let rights = obj.body.memberInfos[key].rights;
    
    // 将所有目标字段设置为true
    rights.isTiyutong = true;
    rights.isNba = true;
    rights.isDiamond = true;
    rights.isZuqiuvip = true;
    rights.skipBeforeAd = true;
    rights.isUfc = true;
    rights.isVip = true;
    rights.isCba = true;
        }
  }

if ($request.url.indexOf('/mesh/v1/mesh-info/voucherIdentity') !== -1) {
    obj.body.conditionResult = true;

   obj.body.data.forEach(task => {
    if (task.taskName === "queryBalanceByTag" && task.body && task.body.balances) {
        task.body.balances.forEach(balance => {
            balance.expiryDate = "20991231085300";
                 });
          }
     });
}

if ($request.url.indexOf('/playurl/v1/play/playurl') !== -1) {
    obj.code = "200";
    obj.PlayCode = "200";
    obj.message = "永久会员，免费观看";
}

if ($request.url.indexOf('/ability/v2/member-info') !== -1) {
     // 修改 rights 中的 vip 状态
    if (obj.body && obj.body.memberInfo && obj.body.memberInfo.memberInfo && obj.body.memberInfo.memberInfo.rights) {
    let rights = obj.body.memberInfo.memberInfo.rights;
    // 将所有 vip 相关的属性设置为 true
    rights.isVip = true;
    rights.isDiamond = true;
    rights.isTiyutong = true;
    rights.isNba = true;
    rights.isZuqiuvip = true;
    rights.isUfc = true;
    rights.isCba = true;
       }

   // 修改 benefitsInfo 中的时间为 2099-12-31 00:00:00
    if (obj.body && obj.body.memberInfo && obj.body.memberInfo.benefitsInfo) {
    let benefitsInfo = obj.body.memberInfo.benefitsInfo;
    for (let key in benefitsInfo) {
        benefitsInfo[key] = "2099-12-31 00:00:00";
       }
   }
    obj.body.memberInfo.memberInfo.memberGroup = "5";
    obj.body.memberInfo.memberInfo.icons = "black_diamond";
    obj.body.memberInfo.memberInfo.title = "钻石会员 (TV尊享)";
    obj.body.memberInfo.memberInfo.iconsDetail.teamBorderIcon = "https://img.cmvideo.cn/publish/noms/2020/05/25/1O25B1UFFBKG2.png";
    obj.body.memberInfo.memberInfo.iconsDetail.personalCenterIcon = "https://img.cmvideo.cn/publish/noms/2021/10/12/1O334R58PKR4U.png";
    obj.body.memberInfo.memberInfo.iconsDetail.badgeIcon = "https://img.cmvideo.cn/publish/noms/2020/05/25/1O25B1UEP6IGO.png";
    obj.body.memberInfo.memberInfo.iconsDetail.personalInfoIcon = "https://img.cmvideo.cn/publish/noms/2020/05/27/1O25B7OO72I6A.png";
    obj.body.memberInfo.memberInfo.iconsDetail.smallIcon = "https://img.cmvideo.cn/publish/noms/2020/05/25/1O25B1UCBTBH3.png";
    obj.body.memberInfo.memberInfo.iconsDetail.barrageIcon = "https://img.cmvideo.cn/publish/noms/2020/05/25/1O25B1UD0L1D8.png";
    obj.body.memberInfo.memberInfo.type = "black_diamond";
    obj.body.memberInfo.memberInfo.term = "2099-12-31 00:00:00";
  if (obj.body.memberInfo.memberTerm.diamond) {
    obj.body.memberInfo.memberTerm.diamond = "2099-12-31 00:00:00";
    obj.body.memberInfo.memberTerm.bigvr = "UNLIMITED";
      }
}

if ($request.url.indexOf('/deliver/site/userFeatures/miguvideo/iOS') !== -1) {
    if (obj.data.miguvideo_diamondMember) {
    // 假设 obj 是你的 JSON 对象
     obj.data.miguvideo_EuroCupPayLowValueUser = "true";
     obj.data.miguvideo_newUser = "false";
     obj.data.miguvideo_diamondMember = "true";
     obj.data.miguvideo_continuousMonthlyIsOrdered = "true";
     obj.data.miguvideo_EuroCupPayNewUser = "true";
     obj.data.miguvideo_EuroCupPayRepeatUser = "true";
    }
}

if ($request.url.indexOf('/ability/v2/indexContract') !== -1) {
    if (obj.body.indexMember) {
     obj.body.indexMember.expireTime = "2099-12-31 00:00:00";
     obj.body.indexMember.expiredCardImg = "",
     obj.body.indexMember.serialNumber = 5;
     obj.body.indexMember.expiredIdentityIconUrl = "https://img.cmvideo.cn/publish/noms/2020/05/25/1O25B1UEP6IGO.png";
     obj.body.indexMember.memberType = "black_diamond";
     obj.body.indexMember.timesFlag = "1";
     obj.body.indexMember.memberName = "钻石会员 (TV尊享)";
     obj.body.indexMember.assetType = "member";
    }
}

if ($request.url.indexOf('/ability/v2/footballMemberInfo') !== -1) {
    if (obj.body.footballMemberInfo.xijia) {
    obj.body.footballMemberInfo.xijia.title = "您已开通足球赛季包";
    obj.body.footballMemberInfo.xijia.isOpen = 1;
     }
    if (obj.body.footballMemberInfo.yingchao) {
    obj.body.footballMemberInfo.yingchao.title = "您已开通足球赛季包";
    obj.body.footballMemberInfo.yingchao.isOpen = 1;
     }
    if (obj.body.footballMemberInfo.zhongchao) {
     obj.body.footballMemberInfo.zhongchao.title = "您已开通足球赛季包";
     obj.body.footballMemberInfo.zhongchao.isOpen = 1;
     }
    if (obj.body.footballMemberInfo.fajia) {
     obj.body.footballMemberInfo.fajia.title = "您已开通足球赛季包";
     obj.body.footballMemberInfo.fajia.isOpen = 1;
     }
     obj.body.footballMemberInfo.isZuqiuvip = 1;
    if (obj.body.footballMemberInfo.zhongchaoMob) {
     obj.body.footballMemberInfo.zhongchaoMob.title = "您已开通足球赛季包";
     obj.body.footballMemberInfo.zhongchaoMob.isOpen = 1;
     }
    if (obj.body.footballMemberInfo.yijia) {
      obj.body.footballMemberInfo.yijia.title = "您已开通足球赛季包";
       obj.body.footballMemberInfo.yijia.isOpen = 1;
     }
       obj.body.footballMemberInfo.openFootballNumber = 1;
    if (obj.body.footballMemberInfo.dejia) {
        obj.body.footballMemberInfo.dejia.title = "您已开通足球赛季包";
        obj.body.footballMemberInfo.dejia.isOpen = 1;
     }
 }

if ($request.url.indexOf('/program/v4/staticcache/datavo') !== -1) {
  // 修改结束日期的函数
   function modifyEndDate(obj, fieldPath) {
    if (obj && obj[fieldPath] && obj[fieldPath].endDate) {
        obj[fieldPath].endDate = "2099-12-31 23:59:59";
    }
   }
    // 修改 shieldStrategy 下所有字段为 true
    function modifyShieldStrategy(obj) {
    if (obj && obj.shieldStrategy) {
        Object.keys(obj.shieldStrategy).forEach(key => {
            obj.shieldStrategy[key] = true;
        });
    }
   }
  modifyEndDate(obj.body.copyRightVo, 'endDate');
   // 修改限免的结束日期
    if (obj.body.limitedTimeTips) {
    obj.body.limitedTimeTips.forEach(tip => {
        if (tip.limitedTime) {
            tip.limitedTime.forEach(time => {
                time.endDate = "2099-12-31 23:59:59";
              });
          }
       });
    }
// 修改 shieldStrategy 下所有字段为 true
modifyShieldStrategy(obj.body);
}

if ($request.url.indexOf('/ability/v1/vipMemberCard') !== -1) {
obj.body.memberStatus = obj.body.memberStatus.map(item => {
    return {
        ...item,
        member: true,
        title: item.memberType === 'zuqiuvip' ? '足球会员 2099-12-31' : (item.memberType === 'member' ? '钻石会员 2099-12-31' : (item.memberType === 'tiyutong' ? '体育通会员 2099-12-31' : (item.memberType === 'nba' ? 'NBA会员 2099-12-31' : (item.memberType === 'cba' ? 'CBA会员 2099-12-31' : (item.memberType === 'ufc' ? 'UFC会员 2099-12-31' : item.title))))) 
    };
});
   obj.body.mainMemberInfo.memberDesc = obj.body.mainMemberInfo.memberDesc.map(desc => {
    return {
        ...desc,
        title: '钻石会员（TV尊享） 2099-12-31'
    };
  });
   obj.body.mainMemberInfo.mainMemberDetailType = "black_diamond";
   obj.body.mainMemberInfo.mainMemberType = "member";

}


if ($request.url.indexOf('/ability/v2/member-card') !== -1) {
     if (obj.body && obj.body.zuqiuvip) {
    // 激活按钮状态
    if (obj.body.zuqiuvip.button) {
        obj.body.zuqiuvip.button.title = "足球会员";
        obj.body.zuqiuvip.button.isOpen = "true";
    }
  }
    if (obj.body.zuqiuvip && obj.body.zuqiuvip.entrances) {
    obj.body.zuqiuvip.entrances = obj.body.zuqiuvip.entrances.map(entrance => {
        if (entrance.memberType === 'zuqiuvip') {
            return {
                ...entrance,
                isOpen: 'true',
                title: '足球会员'
            };
        }
        return entrance;
    });
    obj.body.zuqiuvip.isOpen = 'true';
   }
}

   if ($request.url.indexOf('/ability/v2/member-card') !== -1) {
       obj.body.isTeam = true;
       obj.body.isNba = true;
       obj.body.isContinue = true;
     if (obj.body.extra && obj.body.extra.contents && obj.body.extra.contents.nbaEntrance) {
      obj.body.extra.contents.nbaEntrance.nbaUnionDes = "您已开通NBA联盟通会员";
      obj.body.extra.contents.nbaEntrance.nbaTeamDes = "您已开通NBA球队通会员";
    }
      obj.body.isUnion = true;
      obj.body.nbaTeamNumber = 1;  // 设置为适当的数字
}

   if ($request.url.indexOf('/ability/v3/member/identityWall') !== -1) {
     obj.body.validMembers.forEach(member => {
    if (member.memberType === "diamond") {
        member.memberName = "钻石会员（TV尊享）";
        member.memberPeriodTip = "将于 2099-12-31 到期";
        member.expireTime = "2099-12-31 23:59:59";
        member.rightsCopywriting = "尊享手机、Pad、电脑端会员权益，享全站免广、会员片库、蓝光原画等会员特权，每月可获赠8张通看券，用于观看全站付费内容。";
      }
    });
   // 激活足球通会员
     obj.body.invalidMembers.forEach(member => {
        if (member.memberName === "咪咕体育通") {
        member.memberStatus = "tiyutong";
        member.expireTime = "2099-12-31 23:59:59";
        member.effectiveFlag = 1;
        member.memberPeriodTip = "足球会员：2099-12-31 到期";
        member.rightsCopywriting = "尊享全站所有体育赛事直播、回看及点播内容，尊享体育通会员专属特权：免广告、蓝光1080P、原画50帧、专属缓存等。";
        member.productStatus = "using";
        }
    });
}


  if ($request.url.indexOf('/morder/v3/sales/vod-pricing') !== -1) {
    if (obj.body && obj.body.data && obj.body.data.pricing) {
    obj.body.data.pricing.lastPrice = 0;

    if (obj.body.data.pricing.mainDeliveryItem && obj.body.data.pricing.mainDeliveryItem.authorization) {
        let auth = obj.body.data.pricing.mainDeliveryItem.authorization;
        auth.amount = "99999";
        auth.effectOn = "1725116789557";
        auth.validTimeSecond = "4102358400000";
        auth.expireOn = "4102358400000";
    }

    if (obj.body.data.pricing.payments && obj.body.data.pricing.payments.length > 0) {
        let payment = obj.body.data.pricing.payments[0];
        payment.balance = 9999;
        payment.amount = 0;
        payment.originAmount = 0;
         }
   } 
}

   if ($request.url.indexOf('/queryContractByTag') !== -1) {
     obj.status = 1;
}




body = JSON.stringify(obj);
$done({ body });