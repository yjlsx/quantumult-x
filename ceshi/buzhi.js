/**
 [rewrite_local]
^http://api\.yaotia\.cn/api/v1/course/sprintInfo\?course_id=76 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi.js
^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=52 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl1 = 'http://api.yaotia.cn/api/v1/course/sprintInfo?course_id=76'; 
const requestUrl2 = 'http://api.yaotia.cn/api/v2/goods/lesson?goods_id=52';

// 需要添加到 data 数组中的字段
const newFields = [
   {
      "second" : 853,
      "title" : "第一板斧：“差分法“快速比较大小",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05af99fc68f01a17cc1c6ab1e4_1",
      "cover" : "",
      "course_name" : "技法提速",
      "course_id" : 76
    },
    {
      "second" : 924,
      "title" : "第一板斧：属性规律之对称性",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05af66a40bd7fa90384042e346_1",
      "cover" : "",
      "course_name" : "技法提速",
      "course_id" : 76
    },
    {
      "second" : 1342,
      "title" : "第一板斧：细节理解之细节一一找照应",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05af1d4e8075311bf9e1bc5a69_1",
      "cover" : "",
      "course_name" : "技法提速",
      "course_id" : 76
    },
    {
      "second" : 1402,
      "title" : "第二板斧：表格法破解朴素逻辑",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05af0f0aea5c4e206b2bfa500d_1",
      "cover" : "",
      "course_name" : "技法提速",
      "course_id" : 76
    },
    {
      "second" : 1084,
      "title" : "第二板斧：必备提速技巧：数字特性法",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05afb6b1135b2ebfcf45073cfc_1",
      "cover" : "",
      "course_name" : "技法提速",
      "course_id" : 76
    },
    {
      "second" : 6101,
      "title" : "第三板斧：2023年国考行政执法卷带练（1）",
      "teacher_name" : "风暴羚羊",
      "polyv_id" : "1e6eaa05af2675c48ca20bfccb2d71e8_1",
      "cover" : "https://img.yaotia.com/2023/10-11/1697012702975.png?size=1621X859",
      "course_name" : "整卷冲刺",
      "course_id" : 78
    },
  {
    "second": 1655,
    "title": "2.1 002卷：如何正确阅读材料（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc3757f316558e95016f444_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1111,
    "title": "2.2 003卷：如何正确判断选项（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afaed9fce49785ad828ddff0_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1451,
    "title": "2.3 004卷：“削峰填谷”速算加减题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05affe64120bcc7d6d6a9e6cf3_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1283,
    "title": "2.4 005卷：“分数特性法“快速比较分数（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff4edf936cd2a40f87d0ffb_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }
];

if ($request.url.includes(requestUrl1) || $request.url.includes(requestUrl2)) {
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
