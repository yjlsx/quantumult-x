#
hostname = api-cs.intsig.net, docer.wps.cn, docer-api.wps.cn, tiance.wps.cn, softbus-device.wps.cn, pay.wps.cn 


#全能扫描积分
^https:\/\/api-cs\.intsig\.net\/purchase\/cs\/query_property\?app_type=CamScanner_IP_FREE&client_app=CamScanner_IP_FREE.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quannengsaomiao.js
#wps积分
^https:\/\/docer\.wps\.cn\/v3\.php\/api\/ios\/mobile\/v1\/coupon\?status=unused url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/docer-api\.wps\.cn\/proxy\/docer\/v3\.php\/api\/ios\/mobile\/v1\/coupon url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/pay\.wps\.cn\/api\/pay\/notify\/couponpay url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/vip\.wps\.cn\/pay_config\/v1\/config\/member\?csource=ios_coupons_doc_translate&payconfig=doc_translate_ios&struct_type=type url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/tiance\.wps\.cn\/dce\/exec\/api\/market\/activity url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/account\.wps\.cn\/api\/v3\/islogin url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js
^https:\/\/softbus-device\.wps\.cn\/api\/v1\/device\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/wps.js

