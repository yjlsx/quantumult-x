/*
[rewrite]
^http:\/\/at\.kwedxef\.pro\/api\/v1\/sms\/user\/information url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^http:\/\/at\.kwedxef\.pro\/api\/v1\/sms\/rent\/store url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^https:\/\/api\.smsvirtual\.app\/profile\/me url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^https:\/\/api\.smsvirtual\.app\/services\/go_0\/activate\/v2 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^https:\/\/api\.pingmelite\.com\/app\/queryBalance url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^https:\/\/api\.pingmelite\.com\/app\/queryBalanceAndBonus url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js
^http:\/\/at-sms\.wesdipda\.com\/api\/v1\/sms-v2\/user\/information url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/yunhaoma.js


*
[mitm]
hostname =at.kwedxef.pro, api.smsvirtual.app, api.pingmelite.com, at-sms.wesdipda.com

*/


(function() {
  const url = $request.url;
  let body = $response.body;

  if (url.includes("/user/information")) {
    try {
      const obj = JSON.parse(body);
      if (obj && obj.data && typeof obj.data.coin !== 'undefined') {
        obj.data.coin = 999999; // 伪造金币数
      }
      body = JSON.stringify(obj);
    } catch (e) {}
  } else if (url.includes("/api/v1/sms/rent/store")) {
    body = JSON.stringify({
      status: 1,
      data: "successs",
      code: 200
    });
  } else if (url.includes("/profile/me")) {
    try {
      const obj = JSON.parse(body);
      if (obj) {
        obj.is_subscriber = true;
        obj.subscriptions = [
          {
            "plan": "unlimited",
            "status": "active",
            "expiry_date": "2099-12-31T23:59:59Z"
          }
        ];
        obj.s_score = 999999;
        obj.subscription_balance = 999999;
        obj.balance = 999999;
      }
      body = JSON.stringify(obj);
    } catch (e) {}
  } else if (url.includes("/services/go_0/activate/v2")) {
    try {
      const obj = JSON.parse(body);
      if (obj) {
        obj.detail = "success";
        obj.code = 200;
             }
      body = JSON.stringify(obj);
    } catch (e) {}
  } else if (url.includes("/app/queryBalance")) {
    try {
      const obj = JSON.parse(body);
      if (obj) {
        obj.result.balance = 999999;
             }
      body = JSON.stringify(obj);
    } catch (e) {}
  } else if (url.includes("/app/queryBalanceAndBonus")) {
  try {
    const obj = JSON.parse(body);
    if (obj && obj.result) {
      const r = obj.result;

      r.balance = 999999;
      r.points = 99999;
      r.totalVideoBonus = 999999;
      r.inviteBonus = 9999;
      r.checkinbonus = 9999;
      r.videobonus = 9999;
      r.tapjoyBonus = 9999;
      r.totalCheckInBonus = 9999;

      r.membershipBenefits = "尊享无限会员特权，去除广告，专属服务，永久有效！";
      r.membershipExpireDate = "2099-12-31T23:59:59Z";

      r.isallowcheckin = true;
      r.canSetInviter = true;
      r.voicemailStatus = 1;
      r.canInvite = true;
      r.enableEsimPopup = true;
      r.enableVirtualNumberPopup = true;
      r.notallowvideobonusreason = "";
      r.notallowcheckinreason = "";

      r.setInviterTip = "";

      if (Array.isArray(r.watchVideoOrder)) {
        r.watchVideoOrder.forEach(item => item.isAllow = true);
      }

      if (Array.isArray(r.checkInOrder)) {
        r.checkInOrder.forEach(item => item.isAllow = true);
      }
    }
    body = JSON.stringify(obj);
  } catch (e) {}
}






  $done({ body });
})();
