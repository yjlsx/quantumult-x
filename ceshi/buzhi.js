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
  }，
  {
    "second": 853,
    "title": "2.5 006卷：用“差分数”快速比较分数（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af99fc68f01a17cc1c6ab1e4_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1346,
    "title": "2.6 007卷：速算思维“截位直除法”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbe4cfc3fb353f64a3d42ed_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2185,
    "title": "2.7 008卷：速算思维“拆1思维”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af65f9c2da754f49f18e2ab5_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2118,
    "title": "2.8 009卷：速算思维“百化分”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd537357be4ebb3ef52ff0a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2245,
    "title": "2.9 010卷：增长率的基本计算（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0ea7e31a522a5d2c1bad52_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1920,
    "title": "2.10 011卷：快速判断“混合增速区间”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbed32f95d26894233ac504_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1917,
    "title": "2.11 012卷：2种特殊增长率-上（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc7c5bf3c0d5f76e1283cd6_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2148,
    "title": "2.12 012卷：2种特殊增长率-下（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff95a8cb3976ff2aeb9004d_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2031,
    "title": "2.13 013卷：增量的基本计算（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afadd2b27f376359104fbf81_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1180,
    "title": "2.14 014卷：现期、基期的基本计算（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af5d1791741a3f16fad3460d_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
  {
    "second": 1306,
    "title": "2.15 015卷：比重的基本计算（上）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa91464a443183384a940a9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1317,
    "title": "2.16 015卷：比重的基本计算（下）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af207676de1ce4ceff5cb5e4_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1808,
    "title": "2.17 016卷：快速比较“两期比重”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af40d746e2124508b208ffbf_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1365,
    "title": "2.18 017卷：平均数的基本计算（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af5fff0b13f552e499300205_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2144,
    "title": "2.19 018卷：快速比较“两期平均数”（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd76b98a439bf235130741c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
{
    "second": 1334,
    "title": "3.1 019卷：动态位置之平移（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb622b27718798b8964b41b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 572,
    "title": "3.2 020卷：动态位置之旋转（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afafcad2bae12b9378170056_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 778,
    "title": "3.3 021卷：动态位置之翻转（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af7d15df7ffa35c24b924f5a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 446,
    "title": "3.4 022卷：静态位置之功能元素（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af77fb80e8eaea5358ee9a28_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 934,
    "title": "3.5 023卷：静态位置之图形相对位置（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af48c5761d068bc96732ca07_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 976,
    "title": "3.6 024卷：叠加之完整叠加（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff63a0d2576689b57cfcbbf_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1355,
    "title": "3.7 025卷：叠加之去同存异（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af827b57ba0b8d8fd510c5dd_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 821,
    "title": "3.8 026卷：叠加之黑白叠加（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af60bbbca71c854032f86fb8_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 506,
    "title": "3.9 027卷：遍历之单元素遍历（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe7f9ed1fa0d8db8fbae537_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 387,
    "title": "3.10 028卷：遍历之整体遍历（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af4a4b1235b5e1e2b536005b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
  {
    "second": 924,
    "title": "3.11 029卷：属性规律之对称性（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af66a40bd7fa90384042e346_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 504,
    "title": "3.12 030卷：属性规律之曲直性（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af4e9ca94c20b6d60d0dbf26_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 527,
    "title": "3.13 031卷：属性规律之封闭性（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff7a24559733430cda4c877_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 865,
    "title": "3.14 032卷：数量规律之面（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af642cd28dd96591f816a22a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 780,
    "title": "3.15 033卷：数量规律之线（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc8e5f571f59dc8ba1885e9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 793,
    "title": "3.16 034卷：数量规律之点（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af361830d7812658dedd7bbc_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
{
    "second": 636,
    "title": "3.17 035卷：数量规律之角（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af11ed551fc4d3c623856dfc_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 742,
    "title": "3.18 036卷：数量规律之素（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc7cb73e82912a1c857a10b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 610,
    "title": "3.19 037卷：数量规律之部分数（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbe841b2df14cbed7f4d8ad_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1424,
    "title": "3.20 038卷：数量规律之笔画数（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe55c978e3306d068930cb3_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 884,
    "title": "3.21 039卷：平面拼合（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1eee842b847d82c69a8ed5_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 954,
    "title": "3.22 040卷：空间重构之相对面法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af387b3191dd3dd88640b7aa_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1528,
    "title": "3.23 041卷：空间重构之公共边法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af4879560c2aa02874114fb8_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1010,
    "title": "3.24 042卷：空间重构之箭头法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af9962dc615c37179cb2a452_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 827,
    "title": "3.25 043卷：立体拼合（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe7d5362abd00fa4227c20c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
  {
    "second": 956,
    "title": "3.26 044卷：视图（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05affd17b248fd005ec51c78e7_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1293,
    "title": "3.27 045卷：截面图（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6bf003e6fbea104a6a2c4c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1001,
    "title": "4.1 046卷：从“常识”入手（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afeb533cd3dcb1722c221340_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1356,
    "title": "4.2 047卷：定义要点法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1c56ebdf8e337888076e0b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 838,
    "title": "5.1 048卷：概念外延之全同关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afcf2cb55f46c26bb4a976b7_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 746,
    "title": "5.2 049卷：概念外延之并列关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af5249330e19e33609dba09f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
  {
    "second": 617,
    "title": "5.3 050卷：概念外延之交叉关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd27a96007ee2d1b624bea9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 522,
    "title": "5.4 051卷：概念外延之包含关系·种属（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afaadc256999d1a571be58dc_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 923,
    "title": "5.5 052卷：概念外延之包含关系·组成（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af10dd746a1103e0cec1f783_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 519,
    "title": "5.6 053卷：常考的因果关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff02bcdff597b0d80692be1_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 538,
    "title": "5.7 054卷：常考的顺承关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1d4931ad2175caa6a3b651_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 373,
    "title": "5.8 055卷：必会的原材料对应关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af7405343f781e5e2e72b26a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 466,
    "title": "5.9 056卷：必会的功能对应关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afeef2126679fcf747c757d7_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 501,
    "title": "5.10 057卷：必会的地点对应关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af345c7e5175b64bdbab1186_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 553,
    "title": "5.11 058卷：必会的方式目的对应关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af7b064c88421b6135e3bc62_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
  {
    "second": 620,
    "title": "5.12 059卷：语义关系之近、反义关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afab70468818ea0093836503_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 505,
    "title": "5.13 060卷：语义关系之比喻象征关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afca24d412685cce8b135574_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 966,
    "title": "5.14 061卷：语法关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbf2540e1a3605cc112efba_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2169,
    "title": "6.1 逻辑判断前导课",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc94ebf8594c244da9df47b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1273,
    "title": "6.2 062卷：直言命题的形式与推出关系（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd44a2d5db54b1fde9c861c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1707,
    "title": "6.3 063卷：直言命题的矛盾命题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af209711daaf1752f2fefe3d_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
{
    "second": 1684,
    "title": "6.4 064卷：“且”“或”“要么”的推理规则（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afae0413670ad568eb58adac_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1084,
    "title": "6.5 065卷：且、或、要么的矛盾命题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af876ddf33935a2f9db66d8e_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1149,
    "title": "6.6 066卷：条件命题的翻译（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc840592a58c1d06280baf1_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1397,
    "title": "6.7 067卷：条件命题的推理规则（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af65ad73f3bd2e3d9bae339c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1725,
    "title": "6.8 068卷：条件命题的矛盾命题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd036c1646c20562fffd54b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1889,
    "title": "6.9 069卷：代入法破解朴素逻辑（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af544d7b41e0376f19011ac9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1023,
    "title": "6.10 070卷：论证的概述（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1335378225096aaf183f66_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2129,
    "title": "6.11 071卷：基础论证的削弱（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af8e67709e14d94bab666834_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1019,
    "title": "6.12 072卷：基础论证的加强（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afea5c3cf57237c121f77aeb_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1855,
    "title": "6.13 073卷：因果论证的削弱（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afee09d89ea63196567b7d52_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1161,
    "title": "6.14 074卷：因果论证的加强（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af2ba944e404088854e1c04c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
 {
    "second": 1478,
    "title": "7.1 075卷：主旨意图之首尾讨巧可破题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1bb3c2520af2d6698548fe_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1164,
    "title": "7.2 076卷：主旨意图之对策首先圈起来（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af17559e56e3c627f9e3775f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1057,
    "title": "7.3 077卷：主旨意图之转折之后为重点（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af9bbf7cfd0919f7daf9ac56_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 777,
    "title": "7.4 078卷：主旨意图之递进也要看后面（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb3734d10ede2320e78932c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1126,
    "title": "7.5 079卷：主旨意图之因果关注结论词（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af8c50d799999f1638af75bc_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 968,
    "title": "7.6 080卷：主旨意图之并列关系看全面（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05affb01dcd71c5f84fa3b102c_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 904,
    "title": "7.7 081卷：标题选用之标题概括为首要（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af2f2a7cec8324b25ff34cab_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1172,
    "title": "7.8 082卷：细节理解之细节一一找照应（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6ebba29cb5c7ca7208aed9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1253,
    "title": "7.9 083卷：下文推断之下文重点看尾句（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa038f3e44ee501f90d7cc0_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1290,
    "title": "7.10 084卷：语句排序之选项首句要先看（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af9ea3cfd5d395feda5a3b9d_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1281,
    "title": "7.11 085卷：语句排序之选项对比可加速（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af19fb3b958fb57a08005cd0_1",
   "cover": "",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1392,
    "title": "7.12 086卷：语句填空之首尾重总结（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af44822505c4c90666ef9189_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
 {
    "second": 1085,
    "title": "7.13 087卷：语句填空之句中要承上启下（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af10a63392af602a8f3db971_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 382,
    "title": "7.14 088卷：语句填空之形式前后要一致（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af856a0e1a9de8b601f817a1_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2172,
    "title": "8.1 089卷：转折前后为相对（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af778dc5498fd02db1317578_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 793,
    "title": "8.2 090卷：并列关系为相近（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af06002ccea198b3771a8184_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 685,
    "title": "8.3 091卷：递进关系有轻重（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1502b5a08a5658cc256b4e_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
{
    "second": 881,
    "title": "8.4 092卷：标点符号是提示（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af86802df9abcd4d5b2875e5_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2228,
    "title": "9.1 093卷：代入排除法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af70f5836ef8c2abad90f6de_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2392,
    "title": "9.2 094卷：数字特性法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb6b6d74dd74c00f7dcca00_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1508,
    "title": "9.3 095卷：比例法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff7925441494e997271c35f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2446,
    "title": "9.4 096卷：赋值法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe072a0b31005bafeef85ff_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1590,
    "title": "9.5 097卷：十字交叉法（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af33ed7f39d2fc6da34edfc3_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 1248,
    "title": "9.6 098卷：盈亏思维（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0a23de78744e21ee3248d9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  },
  {
    "second": 2591,
    "title": "9.7 099卷：基本计算问题（新）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa8a3e94ba635d612a3a99b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 113
  }，
 {
        "second": 2053,
        "title": "9.8 100卷：经济利润问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af1182727d7094d4188cc35f_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 4127,
        "title": "9.9 101卷：工程问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc4535998cc00723d79c117_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 3564,
        "title": "9.10 102卷：行程问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af57079c4d67c8178a86ab36_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1842,
        "title": "9.11 103卷：排列组合问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af37d5fbc52c9f5c981f4182_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 2259,
        "title": "9.12 104卷：概率问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5c0102394d1b5c2d598d9e_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1579,
        "title": "9.13 105卷：最值问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af10ee0dc48538c81e6f73ee_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 2334,
        "title": "9.14 106卷：几何问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af7be5f997a6e4d579bebc53_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 2300,
        "title": "9.15 107卷：容斥原理（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af56ec8b023697c2875c0b10_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1831,
        "title": "9.16 108卷：日期问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa2f129ebbcafa904ab4a00_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1023,
        "title": "9.17 109卷：浓度问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af18313430ed64fe355ec951_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1313,
        "title": "9.18 110卷：鸡兔同笼问题（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afaa5e48cfa578d8d29fd433_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    }，
 {
        "second": 924,
        "title": "10.1 111卷：重要的历史事件（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afee4549cf0cd4153fb41c02_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 709,
        "title": "10.2 112卷：重要的文学成就（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af222f8e24161da1934ee603_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 605,
        "title": "10.3 113卷：基本的物理、化学常识（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af4a0130fff69b7b0865a2b7_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 800,
        "title": "10.4 114卷：基本的生物、地理常识（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af7d179d149525a451213ef9_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
{
        "second": 585,
        "title": "10.5 115卷：哲学常识（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af6a9010048e1f7417aeca76_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 741,
        "title": "10.6 116卷：经济常识（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af9fef5504fcd14423215cff_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 781,
        "title": "10.7 117卷：经济和管理学效应（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afabea2f351f5fba7eed9de3_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 573,
        "title": "10.8 118卷：宪法（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af43bb37239428203f960a7c_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1274,
        "title": "10.9 119卷：三大根本法（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5c5f9d365af0d70c3da60f_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 2333,
        "title": "11.1 120卷：5类基础规律（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af20b73a59b1bb87333f67be_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 2644,
        "title": "11.2 121卷：5类形式规律（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af9d4ee913bde61b0be51970_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    }，
    {
        "second": 1422,
        "title": "12.1 122卷：篇章阅读的阅读思维（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af1d0421d30690c53b6c0c1b_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 113
    },
    {
        "second": 1790,
        "title": "12.2 123卷：篇章阅读的3类考法（新）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af59fcd72bbdcebb6515dacf_1",
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
