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
  },
  {
    "second":1651,
    "title": "3.2.7 分析小吴的变化（17/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af394247d49abe2ce0bde46f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1776,
    "title": "3.2.8 谈多肉强县的做法（18/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4287083eec75659dcaf993_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1721,
    "title": "3.2.9 谈背二歌的变化（19/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af9d8ca6b761bdce88116568_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2313,
    "title": "3.2.10 分析T县热议的原因（20/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afcd4b98526597c84749d6eb_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2745,
    "title": "3.3.1 谈对塑新貌、塑新人的理解（21/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4c464b17e3c357dd9ff67d_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1963,
    "title": "3.3.2 谈谈“错位”又“对位”的理解（22/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af0bf3bf6e0498408d8c396f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1753,
    "title": "3.3.3 谈谈40年巨变的理解（23/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af764fb2a2a8b8f196a241b7_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2120,
    "title": "3.3.4 谈谈40年民生改善的理解（24/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afa98e3001479135558ab690_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1843,
    "title": "3.3.5 谈新技术是毁灭力量的理解（25/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af6848df38cb93f9b2dbd6fd_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2717,
    "title": "3.3.6 谈城市建设的理解（26/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff3044dc5a7544a1f34ab39_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2434,
    "title": "3.3.7 谈有居民方有民居的理解（27/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af7f86ae9e35d7f1264f4353_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1793,
    "title": "3.3.8 谈城市水系像指纹的意思（28/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affcc6664f31fc15777f255d_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2556,
    "title": "3.3.9 谈预先失败的含义（29/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff89c85af593cc3db0174ea_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1703,
    "title": "3.3.10 谈儒之柔的理解（30/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af11695f2898a919170f4e60_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2297,
    "title": "3.4.1 评价ISO9000质量管理体系（31/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affb6fbc983b23e20509f345_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2325,
    "title": "3.4.2 评价火车站广场晒谷（32/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2600b9fc63a789c6fa4e81_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2610,
    "title": "3.4.3 评价快递员参与治理的做法（33/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afa8bd89f89926db39fc867e_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2247,
    "title": "3.4.4 评价微领队（34/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af5d7bd40b76aeb87adab41a_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2743,
    "title": "3.4.5 谈京剧商业化的看法（35/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af54ea89670046b5d31acdf2_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":1970,
    "title": "3.4.6 谈新技术能否突破屏障（36/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afcbf9b1272dcefdcfbf856e_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second":2571,
    "title": "3.4.7 评价网红观点（37/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af105e93691dcbbe6b6f5e11_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
{
    "second": 1099,
    "title": "3.4.8 评析执法方式的变化（38/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af63ae8e8b3f17c5427bbc91_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.4.9 分析丑比美更深刻（39/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afabe42f3689e13bb2ba107c_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.4.10 谈谈建议适用性的看法（40/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af3ef9c8e0458b90d9073539_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.1 解决信用体系建设问题（41/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af6fbf44987eabdccc87ed89_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.2 给大学生创业提建议（42/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af24cb5e3ada28dcd3def629_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.3 推广谐乐剧组建议（43/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2860cc3e4e88ae40c107e0_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.4 解决互联网协同消费问题（44/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af953f0ade3cf8db7cc41934_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.5 T市出行建议（45/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af8ecf5ef6a899f67822f9a4_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.6 解决老字号困境（46/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afebdee48aeac9dfef2f880f_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 1099,
    "title": "3.5.7 解决C镇难题（47/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af77809a44e1f0134b0c2c25_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 0,
    "title": "3.5.8 论坛工作思路（48/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af016bf661517a63e9b95297_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 0,
    "title": "3.5.9 解决黑加工点问题（49/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af608306ace69898930ddfb1_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 0,
    "title": "3.5.10 新时代工人问题（50/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afdbbd4584b3e3b1a907c549_1",
    "cover": "",
    "course_name": "对策解万难",
    "course_id": 149
  },
  {
    "second": 0,
    "title": "3.6.1 火红绸带倡议书（51/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af99f11b467a24eefbec0932_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.2 妈祖文化讲解稿（52/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afdd124a12e2ee03905e5b9b_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.3 地下管廊建设讲解稿（53/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff87b3dbf7e75ff7d6fa9b4_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.4 心理健康节发言稿（54/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afa5a9a33ca47219c4d68443_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.5 网络新一代时评（55/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afd1b588dec52b37317ff7ca_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.6 山岔村调研提纲（56/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afe83b0aa3e5730f6ce48ab3_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.7 Q县情况通报（57/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afaaafaf3e9d651f4642718d_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.8 社会新风尚新闻稿（58/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af1a239e54cd2e42ce14e9e1_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },
  {
    "second": 0,
    "title": "3.6.9 S省推介讲话稿（59/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af209524e6570d31ba335990_1",
    "cover": "",
    "course_name": "应用达下情",
    "course_id": 138
  },

  {
    "second": 1710399535,
    "title": "3.6.10 莱康村推荐材料（60/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05aff01694a29fca2b200164b0_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1707030931,
    "title": "3.7.1 众筹：金钱之外的价值（61/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af47db5d40a40ad36b195fa0_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1708587053,
    "title": "3.7.2 议论文之慢生活（62/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af08c78040b10cfcc6617b63_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1709262685,
    "title": "3.7.3 议论文之岁月失语（63/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afd7f98ff26b967f7af8a11f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1709537976,
    "title": "3.7.4 议论文之创新驱动发展（64/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af0ce9d0d304e84a439cf589_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1710746606,
    "title": "3.7.5 议论文之变与不变（65/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af036af541c0abfc4c8f18bd_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1711180414,
    "title": "3.7.6 议论文之动与静（66/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4b299f69d710742f8fb7b7_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1716013790,
    "title": "3.7.7 议论文之让...大放异彩（67/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af384e9fb25e3b5b24791b4a_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1718155994,
    "title": "3.7.8 议论文之试谈有与无（68/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af83112614e01df9a9adb1c5_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1718415088,
    "title": "3.7.9 议论文之科技生命化（69/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af4dc964b0689aacf1baecd1_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1718674839,
    "title": "3.7.10 议论文之想象力的源泉（70/80）",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affe68618ef8883e0a82c840_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.1 第一套（第一题）——如何利用GFP实现产品价值",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af13f98cd33f1b7b71da35c8_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.2 第一套（第二题）——“无人经济”发言提纲",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af9517191e066d51dc215606_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.3 第一套（第三题）——汇报文字整治思路提纲",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af76ce28de9bf5bad8ccea40_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.4 第一套（第四题）——知识产权案例摘要",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af162dbac0ba08268e1be68d_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.5 第一套（第五题）——议论文之追求长期价值",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afe778e97bdb6a8232baee6c_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.6 第二套（第一题）——谈交通旅游融合发展亮点",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afb83df1da67150a06f62d7f_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.7 第二套（第二题）——给公路养护管理工作提建议",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af81c2de98149b16a15b0377_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.8 第二套（第三题）——融合育人的编者按",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af3d77323dee3ed72c9b06bc_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.9 第二套（第四题）——分析黄总有信心的原因",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05affd9d4c33fdb39cd2033313_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
  {
    "second": 1099,
    "title": "3.8.10 第二套（第五题）——议论文之融和融活",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af852006a89022c41cd4636a_1",
    "cover": "",
    "course_name": "套题试身手",
    "course_id": 138
  },
    {
        "second" : 1959,
        "title" : "3.9.1 第一套（副省）—第一题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afba6e0c614aa5636f4a05d4_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1356,
        "title" : "3.9.2 第一套（副省）—第二题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afaa47307ed2ff49373c4dab_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 2220,
        "title" : "3.9.3 第一套（副省）—第三题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af630b8732a01f31b4588d8b_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1983,
        "title" : "3.9.4 第一套（副省）—第四题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af10590e4c4b2ff61cb370b6_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1288,
        "title" : "3.9.5 第一套（副省）—第五题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afb1856cce5297a045804d95_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1372,
        "title" : "3.9.6 第二套（地市）—第一题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afc04f0d3bfc7e8ce6ef28c8_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1195,
        "title" : "3.9.7 第二套（地市）—第二题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af5e6da705019c2a294442fd_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1636,
        "title" : "3.9.8 第二套（地市）—第三题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af07e4001df0454c037e1057_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1666,
        "title" : "3.9.9 第二套（地市）—第四题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af4a4f025a64938e9b2d68c9_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1393,
        "title" : "3.9.10 第二套（地市）—第五题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af7b86d3a2200ba9106cdeb6_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1217,
        "title" : "3.9.11 第三套（执法）—第一题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af812f18c9a26320b7b53bc5_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1112,
        "title" : "3.9.12 第三套（执法）—第二题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af5efb20a15e59123a9aca56_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1074,
        "title" : "3.9.13 第三套（执法）—第三题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afb0302e7f2c5741bb7db338_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1161,
        "title" : "3.9.14 第三套（执法）—第四题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05afae8995b8f0cdff775b35e4_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second" : 1509,
        "title" : "3.9.15 第三套（执法）—第五题",
        "teacher_name" : "",
        "polyv_id" : "1e6eaa05af580d6bce60c010ec3c7976_1",
        "cover" : "",
        "course_name" : "申论实战",
        "course_id" : 138
    },
    {
        "second": 5251,
        "title": "4.1.1 #01 2024新年贺词（1）",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afedb17121d78ad9ea1b10b1_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 4482,
        "title": "4.1.2 #02 2024新年贺词（2）",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af2d8a87955de08f45aec48e_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 4580,
        "title": "4.1.3 #03 反向打卡和文旅营销",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afb295de18849ea6e85c832d_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 5749,
        "title": "4.1.4 #04 机场禁止网约车运营和大学家长群",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af0a2337ad8b78cf16a1a901_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 4734,
        "title": "4.1.5 #05 春节启示",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af477f85402ce5aaa76e00d7_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 3677,
        "title": "4.1.6 #06 淀粉肠事件",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af9d740ed4325772d1c523b5_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 3502,
        "title": "4.1.7 #07 打工人盼望的胖东来",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af558c99b0d59d2eaebe52a0_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 2689,
        "title": "4.1.8 #08 校园霸凌",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af475fd3e8b3c190617a417f_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 3699,
        "title": "4.1.9 #09 AI焦虑",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af281d4271edeb9db43bea65_1",
        "cover": "",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 3430,
        "title": "4.1.10 #10 中国航天",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afe1af2490db59b9dd8ca61b_1",
        "cover": "https://img.yaotia.com/2024/06-14/1718345446779.pdf",
        "course_name": "申论实战", 
        "course_id": 151
    },
    {
        "second": 3845,
        "title": "4.1.11 #11 中国航空",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afcb95662b350e25fe8abf36_1",
        "cover": "https://img.yaotia.com/2024/06-14/1718345445697.pdf",
        "course_name": "申论实战", 
        "course_id": 151
    },

  {
    "second": 3299,
    "title": "4.1.12 #12 中国影视剧",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af6d9454a7237e18bacd30f1_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4781,
    "title": "4.1.13 #13 乡村振兴",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afda8058ca1db42dc3b6d3da_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4702,
    "title": "4.1.14 #14 中央一号文件（1）—千万工程和粮食安全",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2a24e71cd1b4cc0a9d3194_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4196,
    "title": "4.1.15 #15 中央一号文件（2）—提升乡村建设和治理水平",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2c797bef01cfc52a2f1c4f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4883,
    "title": "4.1.16 #16 中国式现代化",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afa87a6c2d7996b916cff8c6_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4875,
    "title": "4.1.17 #17 城市治理",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afc0ecc413131f6362b65488_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4104,
    "title": "4.1.18 #18 中国教育",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af52cd083069a46131a7256f_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
  },
  {
    "second": 4136,
    "title": "4.1.19 #19 传统文化和精神文明建设",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afee91b69d0f9d5e34601232_1",
    "cover": "",
    "course_name": "申论实战",
    "course_id": 151
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
  // URL 不匹配时,返回原始响应体
  $done();
}