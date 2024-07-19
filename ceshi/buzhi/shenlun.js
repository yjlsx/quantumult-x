/**
 [rewrite_local]

^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=66 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/shenlun.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl = 'http://api.yaotia.cn/api/v2/goods/lesson?goods_id=66';

// 需要添加到 data 数组中的字段
const newFields = [
    {
      "second" : 978,
      "title" : "课程介绍",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af951611a92cdc7bb2684637_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 138
    },
    {
      "second" : 1357,
      "title" : "概括理论回顾（上）",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af55bc9895700873c81217ad_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 138
    },
    {
      "second" : 1172,
      "title" : "概括理论回顾（下）",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af1fd9450bf3ef7e18daeac2_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 138
    },
    {
      "second" : 1204,
      "title" : "1.1.1 广东省考公告解读和报岗指导",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af62f12d40b542f1887c0aba_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 148
    },
    {
      "second" : 679,
      "title" : "1.1.2 2024联考省份报岗指导",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af89f59d84abe8a6134a0e12_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 148
    },
    {
      "second" : 870,
      "title" : "1.1.3 四川省考公告解读和报岗指导",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af05a710375d8bcb32397ea2_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 148
    },
    {
      "second" : 744,
      "title" : "1.1.4 深圳市考公告解读和报岗指导",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05aff4fc1d43a7b9827d2a0c5e_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 148
    },
    {
      "second" : 838,
      "title" : "1.1.5 浙江省考公告解读和报岗指导",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af815f025837678ebb42a028_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 148
    },
    {
      "second" : 1249,
      "title" : "2.1.1 课程介绍",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05afcf00ab982fb34483ca50b1_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1476,
      "title" : "2.1.2 申论的评分标准",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af2a1c2a7ac101f6987ad38c_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1357,
      "title" : "2.1.3 概括题：抓重点词句",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af55bc9895700873c81217ad_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1172,
      "title" : "2.1.4 概括题：外延核心概念",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af1fd9450bf3ef7e18daeac2_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1695,
      "title" : "2.1.5 例题热身—概括T县赞成反对的理由",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af47a8502bacaf9b0e4d6901_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1696,
      "title" : "2.1.6 归纳题：分类逻辑及答题方法",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05afa6422e28abfb44adb66549_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1254,
      "title" : "2.1.7 例题热身—归纳课后服务举措",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af849f66707a92649ba3b8b6_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 899,
      "title" : "2.1.8 综合分析题：单一要素分析技巧",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af9e0197c952a3560f60c63c_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 890,
      "title" : "2.1.9 例题热身—分析村支书压力大的原因",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05afd3760657298fadb1353f14_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1133,
      "title" : "2.1.10 综合分析题：谈理解的目的和解释的技巧",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05afaa3b11a7d561c40cbcf5f5_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
    {
      "second" : 1099,
      "title" : "2.1.11 例题热身—谈谈对“遮蔽”的理解",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af46ec779d32c1c49ddb901d_1",
      "cover" : "",
      "course_name" : "申论实战",
      "course_id" : 149
    },
  {
    "second": 1099,
    "title": "2.1.11 例题热身—谈谈对“遮蔽”的理解",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af46ec779d32c1c49ddb901d_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1326,
    "title": "2.1.12 综合分析题：评析的目的与技巧",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afe48977ba6f1c1a57cd1cdc_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1061,
    "title": "2.1.13 例题热身—评析“报复性熬夜”",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affaeaebbaa9259639539156_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 833,
    "title": "2.1.14 综合分析题：比较分析",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af23337c5e85eed3d7a5badb_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1127,
    "title": "2.1.15 综合分析题：分析A镇、B镇的不同之处",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af64e8e7e1158b5e61f3e9a3_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1262,
    "title": "2.1.16 对策题：目的及词义辨析",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af899587249bfe61988a5018_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1297,
    "title": "2.1.17 对策题：来源及答题结构",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afcb8706aeda41e412980921_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1819,
    "title": "2.1.18 例题热身—解决沙洲市场问题",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afbdf4088567d0a03907330d_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1305,
    "title": "2.1.19 应用文写作：本质与格式",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff79a3d1fed71dd7a7db489_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1478,
    "title": "2.1.20 应用文写作：内容与措辞",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af99844df883af70d823306c_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1289,
    "title": "2.1.21 应用文写作：常见文种分析",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af8b0c4d301f9817bd871ac6_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1025,
    "title": "2.1.22 例题热身—返乡就业邀请信",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af9dd98e7fbb34fa45b2c1fe_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1416,
    "title": "2.1.23 例题热身—人才交流宣传稿",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af73558df8a2e9796753dde8_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1535,
    "title": "2.1.24 议论文写作：内核与要求",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afd642da8a6a1f30d8e08a58_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1040,
    "title": "2.1.25 议论文写作：立论",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af34c430bdfa7aa6af7c50f1_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 849,
    "title": "2.1.26 议论文写作：本论（分论点）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af088d559bf11b18c959ed79_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1071,
    "title": "2.1.27 议论文写作：本论（理论论证）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afeef014c75d9c324ff98257_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1572,
    "title": "2.1.28 议论文写作：本论（事实论证）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affac0fd06a1d291e08a5217_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 774,
    "title": "2.1.29 议论文写作：本论（分析事实）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af99fbaecaf08263ac1963d7_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 738,
    "title": "2.1.30 议论文写作：结论",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af73e977d97c5576a4223d1c_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1054,
    "title": "2.1.31 议论文的速通攻略（小结）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af3e6ee824c34daeaf5fe58e_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2364,
    "title": "2.1.32 例题热身—好政策",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afc1d587d937e3e74c95900b_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 998,
    "title": "2.2.1 应用文番外—感谢信",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af851a033a05658a39561506_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 502,
    "title": "2.2.2 申论的材料要素",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af1a1228dd0908036a1eda92_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1936,
    "title": "3.1.1 概括能源利用现状（01/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afde7dcbf1d77e3283e984c5_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2525,
    "title": "3.1.2 概括美剧韩剧的经验（02/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af23d3ed2cd2d644fa09edf5_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2326,
    "title": "3.1.3 概括创客运动的效果（03/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af12aa88c7d4eab95540b9da_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2154,
    "title": "3.1.4 概括求快风气的原因（04/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af07e654e6df284f00188d5e_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2524,
    "title": "3.1.5 概括两会代表的问题建议（05/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af1d013c895e0050ca897c17_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1891,
    "title": "3.1.6 简述城市水系功能（06/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afdb3b564e1554045e4a3d4d_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 2167,
    "title": "3.1.7 归纳评选科技特派员的原因（07/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af23b1a9a74649bb1a3e27e1_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1964,
    "title": "3.1.8 归纳Y县古民居保护措施（08/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4b344f9a0aacd9527bc903_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2334,
    "title": "3.1.9 总结心理健康大事记（09/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af1b63eb535ed797c896cbf8_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1430,
    "title": "3.1.10 市长信箱流程与要求（10/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4393593993bf2f64128fd6_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":3733,
    "title": "3.2.1 谈谈龙台村的启示（11/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afc241291cb84e49e21c489f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":3748,
    "title": "3.2.2 分析幼儿教育发展问题（12/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af713fedf18f969bf648f40c_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2735,
    "title": "3.2.3 分析导致B村贫困的原因（13/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af9747b2003a6afdab94c8f2_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2031,
    "title": "3.2.4 分析基层干部落泪的原因（14/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff0107db9dc8f6e43069b0a_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2607,
    "title": "3.2.5 谈基层立法制度效果（15/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2b849ce31360ec09c3857f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1559,
    "title": "3.2.6 分析不担心就业原因（16/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af502524f0668892fb5bdbfb_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  }




];

if ($request.url.includes(requestUrl)) {
  // 获取原始的响应体
  let body = $response.body;
  let responseJson = JSON.parse(body);

  // 替换 data 数组
  responseJson.data = newFields;

  // 返回修改后的响应体
  $done({ body: JSON.stringify(responseJson) });
} else {
  // URL 不匹配时，返回原始响应体
  $done();
}