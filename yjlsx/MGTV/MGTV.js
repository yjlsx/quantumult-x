/* 
mangguo tv
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/cnftp.snippet

[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv0.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/MGTV5.js
^https:\/\/nuc\.api\.mgtv\.com\/(MobileCodeLogin|GetUserInfo\?_support) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv1.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=vip_growth url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv1.js
#港区
^https://mobile.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/MGTV.js
#处理支付
^https:\/\/club\.mgtv\.com\/act\/pay_return_page_2019 reject-200
#播放页开通提示移除
http://crash.data.v2.mgtv.com/dispatcher.do url reject
http://vip.bz.mgtv.com/client/dynamic_entry url reject
https://pcc.api.mgtv.com/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/MGTV.js
https://pad.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/MGTV.js
#补充
^https:\/\/mobile-thor\.api\.mgtv\.com\/v1\/vod\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv1.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/assets\/idxnum url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^http:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/user\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/vip\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/app\/vip\/center\/theme\/card url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/vipcenter\/themecard url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?ticket=[^&]+ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/homepage\.bz\.mgtv\.com\/v3\/user\/userInfo url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?(fe_version|invoker) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?(invoker|cxid) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/coin.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/viptype url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=mgtv_cashier url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/(user_vip_coin\?version|renew_records) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/(?:app\/vip\/benefits\/award\/recv|act\/vipbenefits\/detail) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/store\/v4\/products url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/idx url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/mgtv1.js

[mitm] 
hostname = *.mgtv.com, pad.api.mgtv.com, pcc.api.mgtv.com, vip.bz.mgtv.com, vipact3.api.mgtv.com, as.mgtv.com, messpro.hnwzinfo.com, nuc.api.mgtv.com, mobile-stream.api.mgtv.com, mobile-thor.api.mgtv.com, crash.data.v2.mgtv.com, club.mgtv.com, homepage.bz.mgtv.com

*/




var iｉl='jsjiami.com.v7';var i1ll=iii1II;if(function(i1l1l1,IlI1I,II11Ii,II11Il,IlI11,iIIIIl,II1Il){return i1l1l1=i1l1l1>>0x9,iIIIIl='hs',II1Il='hs',function(lilIlI,iIIIIi,iii1I1,II1Ii,i1ii){var IliI11=iii1II;II1Ii='tfi',iIIIIl=II1Ii+iIIIIl,i1ii='up',II1Il+=i1ii,iIIIIl=iii1I1(iIIIIl),II1Il=iii1I1(II1Il),iii1I1=0x0;var I1iIl1=lilIlI();while(!![]&&--II11Il+iIIIIi){try{II1Ii=-parseInt(IliI11(0x174))/0x1+parseInt(IliI11(0x16a))/0x2*(parseInt(IliI11(0x16b))/0x3)+parseInt(IliI11(0x178))/0x4+-parseInt(IliI11(0x170))/0x5*(-parseInt(IliI11(0x172))/0x6)+parseInt(IliI11(0x179))/0x7+-parseInt(IliI11(0x173))/0x8+parseInt(IliI11(0x176))/0x9*(parseInt(IliI11(0x175))/0xa);}catch(i1il){II1Ii=iii1I1;}finally{i1ii=I1iIl1[iIIIIl]();if(i1l1l1<=II11Il)iii1I1?IlI11?II1Ii=i1ii:IlI11=i1ii:iii1I1=i1ii;else{if(iii1I1==IlI11['replace'](/[EQgypkJwHWqrDePYxKnI=]/g,'')){if(II1Ii===iIIIIi){I1iIl1['un'+iIIIIl](i1ii);break;}I1iIl1[II1Il](i1ii);}}}}}(II11Ii,IlI1I,function(lI1Il1,lilIi1,IiilII,IliI1I,lI1Iii,i1li,li1II){return lilIi1='\x73\x70\x6c\x69\x74',lI1Il1=arguments[0x0],lI1Il1=lI1Il1[lilIi1](''),IiilII='\x72\x65\x76\x65\x72\x73\x65',lI1Il1=lI1Il1[IiilII]('\x76'),IliI1I='\x6a\x6f\x69\x6e',(0x17b7de,lI1Il1[IliI1I](''));});}(0x18600,0x6d884,Iii11l,0xc5),Iii11l){}var url=$request[i1ll(0x16e)],updatedUrl=url;if(url[i1ll(0x171)](i1ll(0x16f)))updatedUrl=url[i1ll(0x16c)](/([?&]ticket=)\w{32}/,i1ll(0x177));else url[i1ll(0x171)](i1ll(0x16d))&&(updatedUrl=url[i1ll(0x16c)](/([?&]ticket=)\w{32}/,i1ll(0x177)));function iii1II(_0x2668e4,_0x172fa5){var _0x9237ac=Iii11l();return iii1II=function(_0x372636,_0x183bd8){_0x372636=_0x372636-0x16a;var _0x1f09bc=_0x9237ac[_0x372636];if(iii1II['dftPzl']===undefined){var _0x4ce1ec=function(_0x24f311){var _0x14d457='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x563f5f='',_0x353068='';for(var _0x432b68=0x0,_0x41ba83,_0x6dcff5,_0x176ef5=0x0;_0x6dcff5=_0x24f311['charAt'](_0x176ef5++);~_0x6dcff5&&(_0x41ba83=_0x432b68%0x4?_0x41ba83*0x40+_0x6dcff5:_0x6dcff5,_0x432b68++%0x4)?_0x563f5f+=String['fromCharCode'](0xff&_0x41ba83>>(-0x2*_0x432b68&0x6)):0x0){_0x6dcff5=_0x14d457['indexOf'](_0x6dcff5);}for(var _0x49e867=0x0,_0x40c121=_0x563f5f['length'];_0x49e867<_0x40c121;_0x49e867++){_0x353068+='%'+('00'+_0x563f5f['charCodeAt'](_0x49e867)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x353068);};iii1II['zrsQQa']=_0x4ce1ec,_0x2668e4=arguments,iii1II['dftPzl']=!![];}var _0x5ea84c=_0x9237ac[0x0],_0x533b4a=_0x372636+_0x5ea84c,_0x338dc8=_0x2668e4[_0x533b4a];return!_0x338dc8?(_0x1f09bc=iii1II['zrsQQa'](_0x1f09bc),_0x2668e4[_0x533b4a]=_0x1f09bc):_0x1f09bc=_0x338dc8,_0x1f09bc;},iii1II(_0x2668e4,_0x172fa5);}$done({'url':updatedUrl});function Iii11l(){var i1l1lI=(function(){return[iｉl,'wkjrDKswJIjnHniaWmeiQ.qIcEoIpmx.Pvxy7xYg==','Aw5JBhvKzxm','mtj6ENH1sM8','nJe0nJq0me9UtvHdCG','nta1ndCWq0fSCeHP','mtbsww5pteu'].concat((function(){return['mty4nda2mMDPvMzYAa','jde0rJaZndjdnZq0odKZqKm1qKuYruu3qKvgrKiWrefgra','nde0mdCYALPkzLHU','mJm3nJuYmw5HDfjZza','nKXltLDQEa','nZi1nJu4vhjvzxrp','CMvWBgfJzq'].concat((function(){return['DMLKzw8VC291CMnL','DxjS','DMLKzw8Vz2v0u291CMnL','ote2ntu1Dg5Wq3zs'];}()));}()));}());Iii11l=function(){return i1l1lI;};return Iii11l();};var version_ = 'jsjiami.com.v7';