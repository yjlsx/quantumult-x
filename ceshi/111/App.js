# 名称：自用脚本
# 功能：仅供自用，滥用造成脚本冲突，后果自负！
# 作者：GitHub-yjlsx
# 重写地址：https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/App.js

# > 主机名合并
hostname =docer.wps.cn, docer-api.wps.cn, tiance.wps.cn, softbus-device.wps.cn, pay.wps.cn, vipos.kugou.com, gateway.kugou.com, gateway3.kugou.com, vip.kugou.com, vipuser.kygou.com, login.user.kugou.com, userinfoservice.kugou.com, richapi.yestiku.com, sxbapi.xuesai.net, keapi.fenbi.com, ke.fenbi.com, proxyweb.yiwenjy.com, m.zhaopin.com, app.thwlqy.com, appss.baomingding.com, apis.lifeweek.com.cn, app.yinxiang.com, appss.rhinoxlab.com, appss.rhinoxlab.com, 39.107.159.85, dynamicentry.kugou.com, cupid.51jobapp.com, cupid.51job.com, m.zhaopin.com, ask.zhaopin.com,  gatewayretry.kugou.com, drive*.quark.cn, api-wanda.liepin.com, api-ac.liepin.com, api-c.liepin.com, coral2.quark.cn, order-api.sm.cn

# >>>>>>>>>>>>>>> ✅ A ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ B ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ C ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ D ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ E ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ F ✅ <<<<<<<<<<<<<<
#粉笔

# >>>>>>>>>>>>>>> ✅ G ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ H ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ I ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ J ✅ <<<<<<<<<<<<<<
#军队文职备考题库
^http://richapi.yestiku.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/jdwzbk.js
#51job
^https:\/\/cupid\.51jobapp\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
^https:\/\/cupid\.51job\.com\/open\/product\/monthly-card\/rec url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/51job.js
# >>>>>>>>>>>>>>> ✅ K ✅ <<<<<<<<<<<<<<
# Kugou Music Rewrite Rules

#开屏广告
^http://dynamicentry\.kugou\.com/api/v1/entry/index url reject
#夸克
^https:\/\/drive.*\.quark\.cn\/.+\/clouddrive\/(member.+|distribute\/detail.+|capacity\/growth\/info.+|activ\/manage\/coupon\/available.+|act\/growth\/reward) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js
^https:\/\/coral2\.quark\.cn\/quark\/v2\/(queryMemberInfo|getMemberMessage|home) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js
^https:\/\/order-api\.sm\.cn\/api\/(payorder\/v1\/precreate|member\/v1\/lotteryDraw|member\/v1\/center) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js

# >>>>>>>>>>>>>>> ✅ L ✅ <<<<<<<<<<<<<<
#猎聘
^https://api-wanda\.liepin\.com/api/com.liepin.cbp.baizhong.op.v2-show-4app url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-ac\.liepin\.com/api/.+$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
^https://api-c\.liepin\.com/api/.+$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/liepin.js
# >>>>>>>>>>>>>>> ✅ M ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ N ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ O ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ P ✅ <<<<<<<<<<<<<<
# >pdf转换助手-智能pdf处理编辑软件（永久会员）
^https?:\/\/pdfnew-api.shoujicad.com.+\/api\/user url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/pdf.js


# >>>>>>>>>>>>>>> ✅ Q ✅ <<<<<<<<<<<<<<
# > 千亦视界 解锁永久vip
^https?:\/\/app.thwlqy.com\/(login\/login\/sign|login\/login\/veifys).html.*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/qysj.js
# >>>>>>>>>>>>>>> ✅ R ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ S ✅ <<<<<<<<<<<<<<
#上学吧 文职题库
 ^https:\/\/sxbapi\.xuesai\.net url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/sxb.js
# >试卷扫描-拍照清除笔迹，还原空白试卷，错题标记重组（永久会员）
^https?:\/\/appss.baomingding.com\/\/app\/account\/getAccountInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/sjsm.js
# > 三联中读,知识会员+数字刊会员
^https?:\/\/apis\.lifeweek\.com\.cn\/(vip\/loadMyVipV2\?|index\/home.do\?).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/slzd.js
# >扫描宝（永久会员）
^https?:\/\/app.yinxiang.com\/third\/scanner\/scanner\/app\/userInfo\/get url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/smb.js

# >>>>>>>>>>>>>>> ✅ T ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ U ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ V ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ W ✅ <<<<<<<<<<<<<<
#wps积分
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/account\.wps\.cn\/api\/v3\/islogin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/softbus-device\.wps\.cn\/api\/v1\/device\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
# > WallpaperTree
# hostname = buy.itunes.apple.com
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes/WallpaperTree.js

# >>>>>>>>>>>>>>> ✅ X ✅ <<<<<<<<<<<<<<

# >>>>>>>>>>>>>>> ✅ Y ✅ <<<<<<<<<<<<<<
# 羿文教育
^https://proxyweb\.yiwenjy\.com url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/ywjy.js

# >>>>>>>>>>>>>>> ✅ Z ✅ <<<<<<<<<<<<<<
#智联招聘（未生效就直接购买，不会扣费）
^https://m\.zhaopin\.com/bapi/products?at=1a31460223c04d00b888142d700fad43&rt=0f9afb358f85429ba54f4de4e041612a&platform=7&channel=&utmsource=&_v=0.97495892 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/wap\/gray\/config url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/template\/user-vip-status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/m\.zhaopin\.com\/bapi\/raise\/coin\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https:\/\/ask\.zhaopin\.com\/plat-zqa-server\/user\/0\.1\.0\/whoIAm url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https://m\.zhaopin\.com/bapi/resume/top/order/info/v3 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https://m\.zhaopin\.com/bapi/vip/privilege/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/zhilian.js
^https://m\.zhaopin\.com/business/vip/v3 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhilianvip.js
# >证件照相馆-美颜证件照&一寸证件照相机（永久会员）
^https?:\/\/appss.rhinoxlab.com\/app\/account\/getAccountInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/zjzxg.js
# >作业批改-家长辅导作业工具（永久会员）
https?:\/\/appss.rhinoxlab.com\/app\/account\/getAccountInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/zypg.js

