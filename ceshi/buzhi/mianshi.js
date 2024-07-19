/**
 [rewrite_local]

^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=67 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/mianshi.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl = 'http://api.yaotia.cn/api/v2/goods/lesson?goods_id=67';

// 需要添加到 data 数组中的字段
const newFields = [
    {
      "second" : 2099,
      "title" : "面试的目的与类别",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05afbde9c8256691217ed95eb1_1",
      "cover" : "",
      "course_name" : "面试筑基",
      "course_id" : 144
    },
    {
      "second" : 1884,
      "title" : "结构化面试的流程",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af2bd3369782308c5ead92b6_1",
      "cover" : "",
      "course_name" : "面试筑基",
      "course_id" : 144
    },
    {
      "second" : 1486,
      "title" : "结构化面试的常见题型",
      "teacher_name" : "北楚",
      "polyv_id" : "1e6eaa05af73f805765717a6c266102c_1",
      "cover" : "",
      "course_name" : "面试筑基",
      "course_id" : 144
    },
  {
    "second": 914,
    "title": "1.1.1 课程介绍",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af72ce7ca81037c10c6222e7_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 972,
    "title": "1.1.2 申论和面试的关系",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05afbde9c8256691217ed95eb1_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 2099,
    "title": "1.1.3 面试的目的与类别",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af4a17c2e20c75c0a0528f90_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 1884,
    "title": "1.1.4 结构化面试的流程",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af2bd3369782308c5ead92b6_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 1486,
    "title": "1.1.5 结构化面试的常见题型",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af73f805765717a6c266102c_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 1246,
    "title": "1.1.6 结构化面试的考情考务",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05affc2a7ec3211a7c58c707e9_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 1174,
    "title": "1.1.7 结构化面试的评分标准",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af13a939cc652e714242d1ef_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 864,
    "title": "1.1.8 结构化面试的静态礼仪",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af551350abf8ced473774563_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 987,
    "title": "1.1.9 结构化面试的动态礼仪",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05afb1c74d69dbd7b89011441e_1",
    "cover": "",
    "course_name": "第一章：面试备考策略",
    "course_id": 144
  },
  {
    "second": 932,
    "title": "1.2.1 适用申论逻辑的题型",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af6d2554b83814e7ba948f2a_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 2161,
    "title": "1.2.2 面试中的方案",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af017b094d6dbe5b31bab43b_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 749,
    "title": "1.2.3 怎么办与怎么看",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05afa81b4ab5ca0ac084eb85b6_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 701,
    "title": "1.2.4 在申论中挖掘面试素材",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af2bb83ed6c452b909cb80b7_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 2019,
    "title": "1.2.5 （综合分析）面试中的评价题——现象",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af75d6f98ce469c9910612ee_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 1470,
    "title": "1.2.6 （综合分析）面试中的评价题——观点",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05afd331820c0973989bd4e42f_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 1606,
    "title": "1.2.7 （综合分析）面试里的理解题",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af3def2f479e33ff09a8247b_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 1791,
    "title": "1.2.8 （综合分析）面试里的对策题",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af2c3cd1c17e0dddc60ef31c_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
  {
    "second": 975,
    "title": "1.2.9 （综合分析）面试里的概括题",
    "teacher_name": "未知",
    "polyv_id": "1e6eaa05af2d42b5f48b8a4bbe944611_1",
    "cover": "",
    "course_name": "第二章：申论逻辑应用",
    "course_id": 144
  },
    {
        "second": 2321,
        "title": "2.1.1 人际沟通题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afa3fa96c7e88b3ecb55a515_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 573,
        "title": "2.1.2 漫画题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af8c2f21b4d67cdef6d12e6f_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 1859,
        "title": "2.1.3 应急应变题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af23e4810a94e47e6855814c_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 1062,
        "title": "2.1.4 情景模拟题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afddb85c9f58b031203cfd24_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 1557,
        "title": "2.1.5 自我认知题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af5af9423f2fbbe9bd17b014_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 1044,
        "title": "2.1.6 演讲题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afb04da53fee5916c10934a6_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 566,
        "title": "2.1.7 联想题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afd5f25fb7c3f50016ccf0ef_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 735,
        "title": "2.1.8 串词编故事题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af0a477cd29bf499d3d39286_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 626,
        "title": "2.1.9 如何解决思想意识问题",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af4d728c169c145b927d7930_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 153
    },
    {
        "second": 2496,
        "title": "3.1.1 村民不让建基站怎么办？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af58baf36a33b2083fe8e713_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
    {
        "second": 1343,
        "title": "3.1.2 新进单位该不该大胆干事？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af3a891a63572501c2d18388_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
    {
        "second": 1510,
        "title": "3.2.1 无人机坠落怎么办？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af57a28486e0d2914cd07d78_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
    {
        "second": 1170,
        "title": "3.2.2 农村小孩烫伤怎么办？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af6304b878f9f27d53dcf186_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
   {
        "second": 2489,
        "title": "3.3.1 节约粮食宣传怎么组织？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afbcb96e2e381644e102f639_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
    {
        "second": 1553,
        "title": "3.3.2 制定村规民约要注意什么？",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af9ac423e7cf82b5818b49f4_1",
        "cover": "",
        "course_name": "面试题型",
        "course_id": 150
    },
    {
        "second": 5251,
        "title": "4.1.1 #01 2024新年贺词（1）",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afedb17121d78ad9ea1b10b1_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 4482,
        "title": "4.1.2 #02 2024新年贺词（2）",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af2d8a87955de08f45aec48e_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 4580,
        "title": "4.1.3 #03 反向打卡和文旅营销",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afb295de18849ea6e85c832d_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 5749,
        "title": "4.1.4 #04 机场禁止网约车运营和大学家长群",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af0a2337ad8b78cf16a1a901_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 4734,
        "title": "4.1.5 #05 春节启示",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af477f85402ce5aaa76e00d7_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 3677,
        "title": "4.1.6 #06 淀粉肠事件",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af9d740ed4325772d1c523b5_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 3502,
        "title": "4.1.7 #07 打工人盼望的胖东来",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af558c99b0d59d2eaebe52a0_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 2689,
        "title": "4.1.8 #08 校园霸凌",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af475fd3e8b3c190617a417f_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 3699,
        "title": "4.1.9 #09 AI焦虑",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05af281d4271edeb9db43bea65_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151
    },
    {
        "second": 3430,
        "title": "4.1.10 #10 中国航天",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afe1af2490db59b9dd8ca61b_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151,
        "teaching_materials": "https://img.yaotia.com/2024/06-14/1718345446779.pdf"
    },
    {
        "second": 3845,
        "title": "4.1.11 #11 中国航空",
        "teacher_name": "北楚",
        "polyv_id": "1e6eaa05afcb95662b350e25fe8abf36_1",
        "cover": "",
        "course_name": "申面素材库",
        "course_id": 151,
    },
  {
    "second": 3299,
    "title": "4.1.12 #12 中国影视剧",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af6d9454a7237e18bacd30f1_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4781,
    "title": "4.1.13 #13 乡村振兴",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afda8058ca1db42dc3b6d3da_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4702,
    "title": "4.1.14 #14 中央一号文件（1）—千万工程和粮食安全",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2a24e71cd1b4cc0a9d3194_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4196,
    "title": "4.1.15 #15 中央一号文件（2）—提升乡村建设和治理水平",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af2c797bef01cfc52a2f1c4f_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4883,
    "title": "4.1.16 #16 中国式现代化",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afa87a6c2d7996b916cff8c6_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4875,
    "title": "4.1.17 #17 城市治理",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afc0ecc413131f6362b65488_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4104,
    "title": "4.1.18 #18 中国教育",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05af52cd083069a46131a7256f_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },
  {
    "second": 4136,
    "title": "4.1.19 #19 传统文化和精神文明建设",
    "teacher_name": "北楚",
    "polyv_id": "1e6eaa05afee91b69d0f9d5e34601232_1",
    "cover": "",
    "course_name": "申面素材库",
    "course_id": 151
  },








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
