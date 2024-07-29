/*
[rewrite_local]
^https://50843.activity-42.m.duiba.com.cn/hdtool/getOrderStatus\? url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/1905.js

[mitm]
hostname = 50843.activity-42.m.duiba.com.cn

*/

// Fixed prize configuration
const fixedPrize = {
  result: 2,
  success: true,
  xyFamily: false,
  lottery: {
    id: 169281, // ID for VIP月卡
    title: "VIP月卡",
    imgurl: "//yun.duiba.com.cn/images/202108/43ps40qcgd.png",
    link: "//50843.activity-42.m.duiba.com.cn/activity/takePrizeNew?recordId=7164223733&dbnewopen",
    type: "virtual"
  },
  element: {
    isCreditsTypeOpen: false,
    myCredits: "481",
    freeLimit: 2,
    needCredits: "20",
    status: 6,
    freeEmpty: true
  }
};

// Handle the response
function handleResponse(response) {
  // Return the fixed prize response
  return JSON.stringify(fixedPrize);
}

// Main function
(function() {
  if ($response) {
    $response.body = handleResponse($response);
    $done($response);
  } else {
    $done();
  }
})();
