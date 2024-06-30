/*
APP：酷我音乐
版本：10.6.6
作者：yjlsx

脚本功能：看广告，获取更多的免费听歌时间！

操作：看一个广告后等提示再看浏览一个广告并点击获取到Cookie!获取完后关掉重写，避免不必要的MITM


注意⚠️：当前脚本只测试Loon，其他自测！
可配合其他酷我音乐会员脚本去掉部分广告（没时间搞广告）

没事儿别退出登录，容易掉接口（虽然还可以刷，一旦Cookies到期，就会找不到入口）
新号可能没有这个免费听歌的入口，暂时不清楚具体原因


使用声明：⚠️⚠️⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

[Script]
http-request ^https:\/\/wapi\.kuwo\.cn\/openapi\/v1\/user\/freemium\/h5\/switches\? script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/Kuwomusic.js, requires-body=true, timeout=10, enabled=true, tag=酷我音乐刷时长获取Cookie, img-url=https://raw.githubusercontent.com/LovedGM/Quantumult-X-TuBiao/main/zishi-cs/zs23.png


[Task]
cron "* / 3 6-8 * * * script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/Kuwomusic.js, timeout=10, tag=酷我音乐刷时长, img-url=https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Bebo.png


[MITM]
hostname = wapi.kuwo.cn

*/
const $ = new Env('酷我音乐');
let status;

status = (status = ($.getval("Kuwomusicstatus") || "1")) > 1 ? `${status}` : "";

const KuwomusicurlArr = [], KuwomusichdArr = [], KuwomusicbodyArr = [], Kuwomusiccount = ''

let Kuwomusicurl = $.getdata('Kuwomusicurl')
let Kuwomusichd = $.getdata('Kuwomusichd')
let Kuwomusicbody = $.getdata('Kuwomusicbody')

let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const logs =0;//0为关闭日志，1为开启
var message = ''



!(async () => {
    if (typeof $request !== "undefined") {

        Kuwomusicck()

    } else {
        KuwomusicurlArr.push($.getdata('Kuwomusicurl'))
        KuwomusichdArr.push($.getdata('Kuwomusichd'))
        KuwomusicbodyArr.push($.getdata('Kuwomusicbody'))

        let Kuwomusiccount = ($.getval('Kuwomusiccount') || '1');

        for (let i = 2; i <= Kuwomusiccount; i++) {

            KuwomusicurlArr.push($.getdata(`Kuwomusicurl${i}`))
            KuwomusichdArr.push($.getdata(`Kuwomusichd${i}`))
            KuwomusicbodyArr.push($.getdata(`Kuwomusicbody${i}`))

        }

        $.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);

        for (let i = 0; i < KuwomusichdArr.length; i++) {

            if (KuwomusichdArr[i]) {

                Kuwomusicurl = KuwomusicurlArr[i];
                Kuwomusichd = KuwomusichdArr[i];
                Kuwomusicbody = KuwomusicbodyArr[i];

             //  $.index = i + 1;
                $.log(`\n\n开始【酷我音乐】看广告视频 `)
                //循环运行
                for (let c = 0; c < 100; c++) {
                    $.index = c + 1
                    $.log(`正在执行第${$.index}次任务`)
                    if ($.index === 100) {
       message = `当前是最后第${$.index}次任务`; // 更新message为当前任务结果
        
    }

    // 更新message变量，仅保留最后一次任务的结果


                
                    await Task()//你要执行的版块  
                    await $.wait(3000)//你要延迟的时间  1000=1秒
                    await showmsg();
                          
              
                    

                }
            }
        }
    }
})()


    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取Cookie
function Kuwomusicck() {
    if ($request.url.indexOf("freemium/h5/switches") > -1) {
        const Kuwomusicurl = $request.url
        if (Kuwomusicurl) $.setdata(Kuwomusicurl, `Kuwomusicurl${status}`)
        $.log(Kuwomusicurl)

        const Kuwomusichd = JSON.stringify($request.headers)
        if (Kuwomusichd) $.setdata(Kuwomusichd, `Kuwomusichd${status}`)
        $.log(Kuwomusichd)

        const Kuwomusicbody = $request.body
        if (Kuwomusicbody) $.setdata(Kuwomusicbody, `Kuwomusicbody${status}`)
        $.log(Kuwomusicbody)

        $.msg($.name, "", `酷我音乐广告视频${status}获取Cookies成功`)

    }
}




//看广告
function Task(timeout = 0) {
    return new Promise((resolve) => {
			
        let url = {
            url: `https://wapi.kuwo.cn/openapi/v1/user/freemium/h5/switches?`,
            headers: JSON.parse(Kuwomusichd),
            body: Kuwomusicbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 200) 
                { 	
                
               let endTime = data.data.endTime
 let date = new Date(Number(endTime))
 let dateString = date.toLocaleString();
		    
  console.log('酷我音乐看广告 : ' + data.msg + '!💥\n' +
        '获得免费时长 : ' + data.data.singleTime + '分钟\n' +
        '到期时长 : ' + dateString
    );   
    message += '酷我音乐看广告 : ' + data.msg + '!💥\n' +
        '获得免费时长 : ' + data.data.singleTime + '分钟\n' +
        '到期时长 : ' + dateString + '\n';
        
} else if (data.code === -1) {
    console.log('酷我音乐看广告 : ' + data.msg + '！等明天吧！☀️');
    message += '酷我音乐看广告 : ' + data.msg + '！等明天吧！☀️\n';
    
} else {
    console.log('酷我音乐看广告 : ' + data.msg + '八成Cookie掉了🌝');
    message += '酷我音乐看广告 : ' + data.msg + '八成Cookie掉了🌝\n';
}


                
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

async function showmsg(){
   if(tz == 1){
   if ($.isNode()){
       await notify.sendNotify($.name,message)
   }else if ($.index ===2)
   {
       $.msg($.name,'',message)
   }
  }else{
       console.log(message)
   }
 }

// https://github.com/chavyleung/scripts/blob/master/Env.min.js
/*********************************** API *************************************/
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
/*****************************************************************************/