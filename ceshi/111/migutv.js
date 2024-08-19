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
^https:\/\/vmesh\.miguvideo\.com\/ability\/v2\/member-info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/public-operbiz3\.miguvideo\.com\/deliver\/site\/userFeatures\/miguvideo\/iOS url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https:\/\/vmesh\.miguvideo\.com\/ability\/v2\/indexContract url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
# > 足球会员
^https:\/\/vmesh\.miguvideo\.com\/ability\/v2\/footballMemberInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js

# > Vip会员
^https?:\/\/(play|dis).*miguvideo.com\/(play|dis)(url|play)\/.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/migutv.js
^https?:\/\/play.miguvideo.com\/playurl\/v1\/play\/playurl\?2Kvivid=true?.*=true$ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/mgspck.js
# > 开屏广告
^https://.*miguvideo\.com/request/sdk url reject-200
^https://common-sc\.miguvideo\.com/task/v7/task-list/cmvideo/visitor url reject-200




*
[mitm]
hostname = app-sc.miguvideo.com, play.miguvideo.com, vmesh.miguvideo.com, public-operbiz3.miguvideo.com

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
     obj.data.miguvideo_newUser = "true";
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
     obj.body.indexMember.expiredIdentityIconUrl = "http://img.cmvideo.cn:8080/publish/noms/2019/10/18/1O1AACVKU4RVM.png";
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





// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });