/* 
芒果TV 2024.7.16
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/cnftp.snippet

[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv0.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
^https:\/\/nuc\.api\.mgtv\.com\/(MobileCodeLogin|GetUserInfo\?_support) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from=vip_growth url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv2.js
#港区
^https://mobile.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/MGTV.js
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
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/vipcenter\/themecard\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info?ticket url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?(fe_version|invoker) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_info\?(invoker|cxid) url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/order_status url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/order\/orderCreate url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/coin.js
^https:\/\/oiiccdn\.yydsii\.com\/api\/v1\/client\/subscribe url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/messpro\.hnwzinfo\.com\/api\/heartbeat\/v1 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/vipact3\.api\.mgtv\.com\/api\/v1\/act\/viptype url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_from url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtvjf.js
^https:\/\/as\.mgtv\.com\/client\/user\/user_vip_coin\?version url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv3.js

[mitm] 
hostname = *.mgtv.com, pad.api.mgtv.com, pcc.api.mgtv.com, vip.bz.mgtv.com, vipact3.api.mgtv.com, as.mgtv.com, messpro.hnwzinfo.com, nuc.api.mgtv.com, mobile-stream.api.mgtv.com, mobile-thor.api.mgtv.com, crash.data.v2.mgtv.com

*/




var _0xodd='jsjiami.com.v7';var _0x3409a4=_0x211e;function _0x211e(_0xabbea,_0x4aaf32){var _0x374cd8=_0x374c();return _0x211e=function(_0x211eb1,_0x52fd3c){_0x211eb1=_0x211eb1-0x7b;var _0x5a182d=_0x374cd8[_0x211eb1];if(_0x211e['bFScdE']===undefined){var _0x211c35=function(_0x53b70d){var _0x1a5007='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x501792='',_0x56a5c0='';for(var _0x4a87f2=0x0,_0x1ed5e3,_0x97ccc4,_0x203fd2=0x0;_0x97ccc4=_0x53b70d['charAt'](_0x203fd2++);~_0x97ccc4&&(_0x1ed5e3=_0x4a87f2%0x4?_0x1ed5e3*0x40+_0x97ccc4:_0x97ccc4,_0x4a87f2++%0x4)?_0x501792+=String['fromCharCode'](0xff&_0x1ed5e3>>(-0x2*_0x4a87f2&0x6)):0x0){_0x97ccc4=_0x1a5007['indexOf'](_0x97ccc4);}for(var _0x2a45fb=0x0,_0x2b28ab=_0x501792['length'];_0x2a45fb<_0x2b28ab;_0x2a45fb++){_0x56a5c0+='%'+('00'+_0x501792['charCodeAt'](_0x2a45fb)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x56a5c0);};_0x211e['efmBHb']=_0x211c35,_0xabbea=arguments,_0x211e['bFScdE']=!![];}var _0x418fdb=_0x374cd8[0x0],_0x35697b=_0x211eb1+_0x418fdb,_0x451485=_0xabbea[_0x35697b];return!_0x451485?(_0x5a182d=_0x211e['efmBHb'](_0x5a182d),_0xabbea[_0x35697b]=_0x5a182d):_0x5a182d=_0x451485,_0x5a182d;},_0x211e(_0xabbea,_0x4aaf32);}function _0x374c(){var _0x8e5165=(function(){return[_0xodd,'TxbRjQsJrjwiaqRmUi.YWcTdPomRC.QkvT7VDAkq==','mJqXotuXnMDNA3jNAa','mZe0ntK1mgrXu01PuG','ndm2mZq5mxvjCwDNEa'].concat((function(){return['nZK4mdq4rgHsDu1n','jdeMDgLJA2v0ptffnZeXruuXndK0nZm4mtm4q0zgn0u5renbrKjbreeXjdm','mtG3otK5mdbWqKjYEhq','DxjS','nJqYntK4mff2tfz3tq'].concat((function(){return['odu1nZe4oevXsNvgtG','CMvWBgfJzq'];}()));}()));}());_0x374c=function(){return _0x8e5165;};return _0x374c();};(function(_0x35ea7a,_0x4e5407,_0x1adb71,_0x399a7d,_0x3100cb,_0x30a7f8,_0x242b8e){return _0x35ea7a=_0x35ea7a>>0x2,_0x30a7f8='hs',_0x242b8e='hs',function(_0x81206f,_0x2298c3,_0x2c8578,_0x38ce46,_0x8207a7){var _0x3ff067=_0x211e;_0x38ce46='tfi',_0x30a7f8=_0x38ce46+_0x30a7f8,_0x8207a7='up',_0x242b8e+=_0x8207a7,_0x30a7f8=_0x2c8578(_0x30a7f8),_0x242b8e=_0x2c8578(_0x242b8e),_0x2c8578=0x0;var _0x131c61=_0x81206f();while(!![]&&--_0x399a7d+_0x2298c3){try{_0x38ce46=-parseInt(_0x3ff067(0x83))/0x1+parseInt(_0x3ff067(0x80))/0x2+parseInt(_0x3ff067(0x82))/0x3+-parseInt(_0x3ff067(0x7d))/0x4+-parseInt(_0x3ff067(0x81))/0x5+-parseInt(_0x3ff067(0x7e))/0x6+parseInt(_0x3ff067(0x7b))/0x7;}catch(_0x346fec){_0x38ce46=_0x2c8578;}finally{_0x8207a7=_0x131c61[_0x30a7f8]();if(_0x35ea7a<=_0x399a7d)_0x2c8578?_0x3100cb?_0x38ce46=_0x8207a7:_0x3100cb=_0x8207a7:_0x2c8578=_0x8207a7;else{if(_0x2c8578==_0x3100cb['replace'](/[TqAwbJxkQURDVdPrYWC=]/g,'')){if(_0x38ce46===_0x2298c3){_0x131c61['un'+_0x30a7f8](_0x8207a7);break;}_0x131c61[_0x242b8e](_0x8207a7);}}}}}(_0x1adb71,_0x4e5407,function(_0x440562,_0x63230a,_0x54c82d,_0xc90878,_0x4ac1b3,_0x2e8033,_0x202e72){return _0x63230a='\x73\x70\x6c\x69\x74',_0x440562=arguments[0x0],_0x440562=_0x440562[_0x63230a](''),_0x54c82d='\x72\x65\x76\x65\x72\x73\x65',_0x440562=_0x440562[_0x54c82d]('\x76'),_0xc90878='\x6a\x6f\x69\x6e',(0x17901b,_0x440562[_0xc90878](''));});}(0x300,0xd94a8,_0x374c,0xc2),_0x374c)&&(_0xodd=0x1bda);var modifiedUrl=$request[_0x3409a4(0x7c)][_0x3409a4(0x7f)](/^(https:\/\/mobile.*\.api\.mgtv\.com\/v\d\/video\/.+ource.+)(&ticket=\w{32})(.*)/,_0x3409a4(0x84));$done({'url':modifiedUrl});var version_ = 'jsjiami.com.v7';