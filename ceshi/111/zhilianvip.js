[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/business\/vip\/v3 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilianvip.js

*
[mitm]
hostname = m.zhaopin.com
*/
// Quantumult X Script
(function() {
    // 获取原始响应体（可选，当前示例未使用）
    const responseBody = $response.body;

    // 新的 HTML 内容
    let newhtml = `
<html>
  <head>
    <title>VIP</title>
    <meta charset="utf-8">
<meta name="keywords" content="招聘,求职,找工作,人才网">
<meta name="description" content="智联招聘人才网面向全国,是权威的求职找工作平台,提供2024最新最全最准确的招聘网站信息,为企业和求职者提供人才招聘、求职、找工作、培训等在内的全方位的人力资源服务,更多求职找工作信息尽在智联招聘!">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta content="telephone=no, email=no" name="format-detection">
<link rel="apple-touch-icon" sizes="57x57" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="//img09.zhaopin.cn/2012/other/mobile/favicons/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="//img09.zhaopin.cn/2012/other/mobile/favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="//img09.zhaopin.cn/2012/other/mobile/favicons/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="//img09.zhaopin.cn/2012/other/mobile/favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="//img09.zhaopin.cn/2012/other/mobile/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="stylesheet" href="//fecdn2.zhaopin.cn/m_zhaopin_com/business/vip.v3.3870084db528521ab3f65f8b90acb2cc.css">
    <script>var zpPageRequestId = "1814d644e9ec4d0a9a4fe14bf71d08c1-" + (new Date()).valueOf() + "-" + parseInt(Math.random() * 1000000)</script>
    <script src="https://common-bucket.zhaopin.cn/js/zpfe-widget-sdk/zpfe-widget-sdk-latest.js"></script>
  </head>
  <body>
    <div id="root">
      <div class="app" data-v-1b633777><div class="m-header" data-v-1b633777 data-v-f43cb900><header class="z-header px-safe-area" data-v-f43cb900 data-v-59376d56><div class="z-header__warp px-safe-area" style="background:url(https://ask-image.zhaopin.cn/discover_images/1718266835293.jpg) no-repeat top center/100%;" data-v-59376d56><button class="z-header__warp-btn" data-v-59376d56><!--[--><div class="m-header-btn" data-v-f43cb900 data-v-59376d56-s><div class="m-header-btn__back" data-v-f43cb900 data-v-59376d56-s></div></div><!--]--></button><div class="z-header__warp-title" data-v-59376d56><!--[--><div class="m-header-title" data-v-f43cb900 data-v-59376d56-s> 求职快人一步 </div><!--]--></div><button class="z-header__warp-btn" data-v-59376d56><div data-v-59376d56><!--[--><div class="m-header-other" data-v-f43cb900 data-v-59376d56-s><div class="m-header-other-container" data-v-f43cb900 data-v-59376d56-s><div class="m-header-other-item" data-v-f43cb900 data-v-59376d56-s></div><div class="m-header-other-item" data-v-f43cb900 data-v-59376d56-s></div></div></div><!--]--></div></button></div></header></div><div class="m-info" data-v-1b633777 data-v-3f501854><div class="m-info__common" data-v-3f501854><p class="m-info__common-title" data-v-3f501854></p><div class="m-info__common-shadow" data-v-3f501854></div></div></div><!----><!--[--><div class="m-services" data-v-1b633777 data-v-0c7b17cc><div id="m-services__scroll" data-v-0c7b17cc><ul class="m-services__list" data-v-0c7b17cc><!--[--><!--]--></ul></div><!----></div><!----><div class="m-intro" data-v-1b633777 data-v-748e76cd><div class="m-title" data-v-748e76cd data-v-d8ecdb1a><img class="m-title__icon" src="https://ask-image.zhaopin.cn/discover_images/1718280109423.jpg" data-v-d8ecdb1a></div><div id="m-intro__scroll" data-v-748e76cd><ul class="m-intro__list" data-v-748e76cd><!--[--><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card selected" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718676922341075831/ic_%E5%8F%91%E7%AE%80%E5%8E%86%404x.png?w=112&amp;h=112&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>简历置顶</div><div style="" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677097356581367/%E5%AE%B9%E5%99%A8%2047%404x.png?w=112&amp;h=112&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>投递必回</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677670937798814/ic_%E5%85%AC%E5%8F%B8%E5%B7%A5%E5%95%86%E4%BF%A1%E6%81%AF_24_b1%E4%BB%BD%404x.png?w=116&amp;h=118&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>简历刷新</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677766593001493/ic_%E7%AE%80%E5%8E%86%E6%A8%A1%E6%9D%BF.png?w=112&amp;h=112&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>简历模板</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677820540803119/%E5%AE%B9%E5%99%A8%2048%404x.png?w=112&amp;h=114&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>尊享标识</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677883820905024/ic_%E5%AE%A2%E6%88%B7%E6%9C%8D%E5%8A%A1%202%404x.png?w=112&amp;h=112&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>专属客服</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><li class="m-intro__list-item" data-v-748e76cd><div class="intro-card" data-v-748e76cd data-v-75a5cf1a><img class="intro-card__icon" src="https://storage-public.zhaopin.cn/zhiq/1718677950240906943/ic_%E5%8F%91%E7%AE%80%E5%8E%86.png?w=112&amp;h=112&amp;r=3" data-v-75a5cf1a><div class="intro-card__name" data-v-75a5cf1a>简历助手</div><div style="display:none;" class="intro-card__select" data-v-75a5cf1a></div></div></li><!--]--></ul></div><img class="m-intro__picture" src="https://storage-public.zhaopin.cn/zhiq/1718958791292467143/%E7%AE%80%E5%8E%86%E7%BD%AE%E9%A1%B6%404x.png?w=1341&amp;h=896&amp;r=3" data-v-748e76cd></div><div class="m-agreement" data-v-1b633777 data-v-8631d974><p class="m-agreement__protocol" data-v-8631d974>支付即视为同意<span class="blue" data-v-8631d974>《》</span></p></div><!--]--><div class="m-footer" data-v-1b633777 data-v-513cc509><!----><div class="m-footer__wrap" data-v-513cc509><div class="m-footer__wrap-left" data-v-513cc509><div class="m-footer__wrap-left_price" data-v-513cc509> ¥0</div><div class="m-footer__wrap-left_old-price" data-v-513cc509> ¥0</div><div class="m-footer__wrap-left_name" data-v-513cc509></div></div><div class="m-footer__wrap-right" data-v-513cc509><div class="m-footer__wrap-right_button" data-v-513cc509>立即购买</div></div></div><!----><!----></div><!----><!----><div data-v-1b633777></div></div>
    </div>
    <script>
  var zpStatConfig = {
    page: {
      appid: "A22",
      zq_page_name: "",
      zq_from_page: "",
      pagecode: "5543",
      refcode: "5073",
      referrer_entry: "VIP_minecenter_68test"
    },
    sa:{
      callback_timeout: 600,
      use_app_track: true
    }
  }
</script>
<script src="//common-bucket.zhaopin.cn/js/zpfe-stat-sdk/zpfe-stat-sdk-latest.js"></script>
  <script src="https://img09.zhaopin.com/2012/other/mobile/app/web/ve_js_SDK.js"></script>


    <script>
      window.__INITIAL_DATA__ = {"main":{"commonStoreUserDetail":{"age":28,"birthday":"1996-7","cityDistrictId":4844,"cityId":843,"cityName":"丽江","countryId":489,"createTime":1568873520726,"currentStatus":"1","currentStatusTranslationCN":"正在找工作","currentStatusTranslationEN":"Looking for a job","eduDisplay":"本科","eduDisplayEn":"Bachelor","eduLevel":4,"email":"24****55@qq.com","emailVerified":"1","enName":"","extId":"JI506057621","headImg":"http://mypics.zhaopin.cn//avatar/2020/3/1/c873f718-0c3a-4841-8f09-01339d9542fb.jpeg","headImgType":1,"homeAddress":"","homeLatitude":0,"homeLongitude":0,"hukouCity":843,"hukouProvince":554,"id":1050605762,"industryJobTypeConfirmType":"1","isBinding":1,"isBindingSuishoupin":"0","isTalk":true,"jobSeekerIdentity":"3","maritalStatus":0,"mobilePhone":"139****8932","name":"姚金龙","over30Day":false,"phone":"139****8932","photoIsReal":"","politicalAffiliation":"5","provinceId":554,"regType":1,"resumes":[{"cnCompleted":11088,"cnFirstCompletedDate":1572614122255,"confidentialStatus":2,"createDate":"2019-09-19","createTimeLong":1568873520952,"defaultType":1,"disclosureLevel":2,"id":"366736914","integrity":88,"integrityEng":14,"language":"1","name":"在线简历","number":"C22D15F73FEF881F0A5C7D512240253B83375BE4E2E7FC9BB7623E4D6FE2E9B802ABC158A27DD7B696DD46F59D5C5443_A0001","postStatus":1,"publishStatus":1,"resumeFlag":3,"resumeSourceId":"3301","resumeType":0,"updateDate":"2024-07-26","version":"1"}],"sex":"男","sexType":1,"startWorking":"2020-11","talk":false,"unifiedPurposeIsShow":"","userIdentify":"-1","weChatName":"13940448932","workYears":4},"commonStoreTitle":"VIP","commonStoreIsApp":true,"commonStoreIsLogin":true,"commonStoreIsHideWebNavigation":false,"commonStoreCtxQuery":{"hideNavigationBar":"1","hideStatusBar":"true","couponSign":"59e75aca4061497585732f664d21ac66","referrerEntry":"VIP_minecenter_68test","refcode":"5073","os_version":"17.0","version":"8.11.24","isApp":"true","utm_source":"app","channel":"apple","veh5container":"1","anonymous":"0","rt":"45055a3341b746ef858a4acfe1694d52","platform":"5","userRole":"0","appplat":"5","fromsystem":"24","v":"8.11.24","at":"a45efffc85f54673a459d5779e55c13a","deviceid":"A26A40EE-1664-4C28-95EE-CDFE3D6CE3E7","ZPBridge":"1","d":"A26A40EE-1664-4C28-95EE-CDFE3D6CE3E7","identity":"2","newContainer":"1"},"commonStoreBrowserType":{"system":"ios","engine":"webkit","supporter":"unknow","supporterVs":"unknow","shell":"zhaopinapp","shellVs":"8.11.24"},"commonStoreCoupons":[],"commonStoreCouponSign":"","commonStoreIsCheckAgreement":false,"commonStoreHelperStatus":0,"commonStoreIsShowHelperPopup":false,"commonStoreIsShowWechatPopup":false,"currSelectedProductIndex":0,"products":[],"isShowTeacherWechat":false,"isShowSaveMoneyPopup":false,"userDeliveryUseInfo":{"useCount":0,"repliedCount":0,"noReplyCount":0,"waitReplyCount":0},"vipPaymentABTest":false,"resumeTopExposureEffectInfo":{},"templateList":[],"vipPowerList":[{"desc":"简历置顶30天","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718676922341075831/ic_%E5%8F%91%E7%AE%80%E5%8E%86%404x.png?w=112&h=112&r=3","id":113,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718958791292467143/%E7%AE%80%E5%8E%86%E7%BD%AE%E9%A1%B6%404x.png?w=1341&h=896&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"简历置顶","weight":7},{"desc":"投递必回2次","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677097356581367/%E5%AE%B9%E5%99%A8%2047%404x.png?w=112&h=112&r=3","id":114,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718677105491781611/%E6%8A%95%E9%80%92%E5%BF%85%E5%9B%9E%403x.png?w=1005&h=672&r=3","privilegeGiveInfoData":{"giveCount":2,"giveTime":0,"giveType":1,"name":"2次","vipGiveCouponInfoDataList":[]},"showName":"投递必回","weight":6},{"desc":"简历刷新","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677670937798814/ic_%E5%85%AC%E5%8F%B8%E5%B7%A5%E5%95%86%E4%BF%A1%E6%81%AF_24_b1%E4%BB%BD%404x.png?w=116&h=118&r=3","id":115,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718677683883699142/%E7%AE%80%E5%8E%86%E5%88%B7%E6%96%B0%403x.png?w=1005&h=672&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"简历刷新","weight":5},{"desc":"简历模板","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677766593001493/ic_%E7%AE%80%E5%8E%86%E6%A8%A1%E6%9D%BF.png?w=112&h=112&r=3","id":116,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718778490524963163/%E7%AE%80%E5%8E%86%E6%A8%A1%E6%9D%BF%403x.png?w=1005&h=672&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"简历模板","weight":4},{"desc":"尊享标识","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677820540803119/%E5%AE%B9%E5%99%A8%2048%404x.png?w=112&h=114&r=3","id":117,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718958808496667527/%E7%BB%84%20213861%404x.png?w=1340&h=896&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"尊享标识","weight":3},{"desc":"专属客服","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677883820905024/ic_%E5%AE%A2%E6%88%B7%E6%9C%8D%E5%8A%A1%202%404x.png?w=112&h=112&r=3","id":118,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718958816684867792/%E4%B8%93%E5%B1%9E%E5%AE%A2%E6%9C%8D%404x.png?w=1340&h=896&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"专属客服","weight":2},{"desc":"简历助手","iconUrl":"https://storage-public.zhaopin.cn/zhiq/1718677950240906943/ic_%E5%8F%91%E7%AE%80%E5%8E%86.png?w=112&h=112&r=3","id":119,"pictureUrl":"https://storage-public.zhaopin.cn/zhiq/1718677978550407818/%E7%BB%84%20213859%403x.png?w=1005&h=672&r=3","privilegeGiveInfoData":{"giveCount":null,"giveTime":2592000000,"giveType":2,"name":"30天","vipGiveCouponInfoDataList":[]},"showName":"简历助手","weight":1}],"vipExpireTime":4092599349,"beenVip":true,"vipPayPoint":"06aa3ab431b14179a8c83b228818ac22","isShowFooter":false,"userAllPrivilegeInfo":{"deliveryReplySurplusCount":9999,"deliveryReplyUseCount":9999,"resumeRefreshSurplusDays":9999,"resumeRefreshUseDays":9999,"resumeTopSurplusDays":9999,"resumeTopUseDays":9999}}}
    </script>
    <script src="//fecdn3.zhaopin.cn/m_zhaopin_com/business/vip.v3.web.c4d114c1510619217d6b12da5b83ec30.js"></script>
  </body>
</html>
`;

     // 返回修改后的响应体
    $done({
        body: newhtml
    });
})();


