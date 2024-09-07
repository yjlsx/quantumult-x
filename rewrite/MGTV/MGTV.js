/* 
mangguo tv
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/cnftp.snippet

[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv0.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
^https:\/\/nuc\.api\.mgtv\.com\/(MobileCodeLogin|GetUserInfo\?_support) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=vip_growth url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
#港区
^https://mobile.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
#处理支付
^https:\/\/club\.mgtv\.com\/act\/pay_return_page_2019 reject-200
#播放页开通提示移除
http://crash.data.v2.mgtv.com/dispatcher.do url reject
http://vip.bz.mgtv.com/client/dynamic_entry url reject
https://pcc.api.mgtv.com/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
https://pad.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
#补充
^https:\/\/mobile-thor\.api\.mgtv\.com\/v1\/vod\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^http:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/user\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/theme\/card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/vipcenter\/themecard url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?ticket=[^&]+ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/homepage\.bz\.mgtv\.com\/v3\/user\/userInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?(fe_version|invoker) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?(invoker|cxid) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/coin.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/viptype url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=mgtv_cashier url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?version url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/(?:app\/vip\/benefits\/award\/recv|act\/vipbenefits\/detail) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/store\/v4\/products url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js

[mitm] 
hostname = *.mgtv.com, pad.api.mgtv.com, pcc.api.mgtv.com, vip.bz.mgtv.com, vipact3.api.mgtv.com, as.mgtv.com, messpro.hnwzinfo.com, nuc.api.mgtv.com, mobile-stream.api.mgtv.com, mobile-thor.api.mgtv.com, crash.data.v2.mgtv.com, club.mgtv.com, homepage.bz.mgtv.com

*/




var url = $request.url,
  updatedUrl = url;
if (url.includes("video/getSource")) updatedUrl = url.replace(/([?&]ticket=)\w{32}/, "$AF1FEA58193736728B7146096D5E786A");else url.includes("video/source") && (updatedUrl = url.replace(/([?&]ticket=)\w{32}/, "$AF1FEA58193736728B7146096D5E786A"));
$done({
  "url": updatedUrl
});
