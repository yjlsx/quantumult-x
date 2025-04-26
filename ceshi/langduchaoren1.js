/*
[rewrite_local]
^https:\/\/phototalk\.ivsapi\.com\/api\/chat\/parameters\/v3\/$ url script-request-body phototalk_change_https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/langduchaoren1.js

*
[mitm]
hostname = phototalk.ivsapi.com

*/

const newBody = {
  "invitationcode": "D42476",
  "user_id": "_5f8789a82656d528c315379063b0d40f",
  "voiceType": "microsoft",
  "speechCount": 1,
  "chattype": "tts",
  "messagetypes": []
};

$done({ body: newBody });
