/**
 [rewrite_local]

^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=52 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/fbly.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl = 'http://api.yaotia.cn/api/v2/goods/lesson?goods_id=52';

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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
    },
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
    },
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
    },
    {
        "second": 1349,
        "title": "1.1 国考行测分析",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af6d71c9d4bd44faff7a57b1_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1057,
        "title": "1.13 云南省考行测分析",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5b9bbb6724feb7e6c399fc_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 2152,
        "title": "2.1 资料分析速算·刻意训练册（练前说明）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af4b997aee0954cbecf0a305_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 963,
        "title": "2.2 “22分组”快速判断基期差",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5aafb8c32ceb894c5ad41c_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1185,
        "title": "2.3 巧用“放缩思维”直接看选项",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbacfeab53f9b86927a2693_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 587,
        "title": "2.4 快速判断“增速与n%”的大小（上）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbf5b528ee7459ffecc4bd6_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1375,
        "title": "2.5 快速判断“增速与n%”的大小（下）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbe90eda991583b17087591_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 721,
        "title": "2.6 加减法的2个加速操作",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af27b6b9a455338c3a759907_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 982,
        "title": "2.7 “化除为乘”的2种运用",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5481c4ce674166d59aa173_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1796,
        "title": "2.8 妙用百化分的两个模型",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afffc7a2573a98ff7d1a011f_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1392,
        "title": "2.9 快速比较分数的5个方法（上）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa14de72096682a5dbd5254_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1011,
        "title": "2.10 快速比较分数的5个方法（下）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af6b066bee676fc8fca6abf1_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 982,
        "title": "2.11 “截位直除”要怎么截位",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af4103c944da0456dbf5a5c8_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 2262,
        "title": "2.12 “拆分思维”到底怎么拆",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afda949710ec04d63feb862a_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1773,
        "title": "2.13 “假设思维”求增量、基期（上）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afdf9f725e48342014e1668c_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1571,
        "title": "2.14 “假设思维”求增量、基期（下）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af2a09e0e0aa034a183298e7_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1688,
        "title": "2.15 套口诀破题·快速比较增量",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbd01924d4c707297238c3a_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 906,
        "title": "2.16 套口诀破题·快速比较两期比重",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af694176e9c69387b9c1790f_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1022,
        "title": "2.17 套口诀破题·快速判断混合增速（上）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc006ad31f70d8cd579ac5d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1479,
        "title": "2.18 套口诀破题·快速判断混合增速（下）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af9b44c4d5f3b14738c9a4bd_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 700,
        "title": "3.1 类比推理——知晓出题人考什么",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afb34d9ef1eed859a82a006e_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 868,
        "title": "3.2 善用造句法速解类比推理",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af2bd985d77bcac4e4454c64_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1105,
        "title": "3.3 二级辨析——选出最优选项",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc4cee2a8157fe8defe4bf1_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1126,
        "title": "3.4 选项对比法提速定义判断",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af93a0e59954cd47803f267d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1321,
        "title": "3.5 图形推理——知晓出题人考什么",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af15ba83073741c5769519d3_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 747,
        "title": "3.6 黑白圆的5个破题点（图形特征）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af0bb0733e63a6bddc5b2769_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1523,
        "title": "3.7 黑白圆的5个破题点（实战运用）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05affe4906e065d0d5b3024282_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1354,
        "title": "3.8 面的4个升级考法（图形特征）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af8501a03e3e19d8dc494dca_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1030,
        "title": "3.9 面的4个升级考法（真题演练）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af22e0bd8a1eb9e6114eb8f2_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1138,
        "title": "3.10 逻辑判断——知晓出题人考什么",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5ac32500836cea44a7cb39_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1225,
        "title": "3.11 速解“前提假设”的2个方法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af4e9d7d285c2e89a7dcd5ad_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1413,
        "title": "3.12 原因解释题的识别与破题",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af998e082ef83e88aa752c1e_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1402,
        "title": "3.13 表格法破解朴素逻辑",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af0f0aea5c4e206b2bfa500d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1622,
        "title": "4.1 理性阅读",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af565748ab0ef17760c304dc_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1400,
        "title": "4.2 速找主旨句的两种方法（文段结构）上",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af3a9c0e84c26e175900c80d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1014,
        "title": "4.3 速找主旨句的两种方法（文段结构）下",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af278f596a207ec428b05cb6_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1039,
        "title": "4.4 速找主旨句的两种方法（删除功能句）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afe5f19d3e8998ff750c0502_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 837,
        "title": "4.5 巧用“因此”快速定位主旨句",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af32b2e96522d67550662d7f_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 855,
        "title": "4.6 主旨：选项对比择优",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa5aea91a60184ea5506d7c_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 718,
        "title": "4.7 主旨题的特别问法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af571359fb2fcdaca22aa8e5_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1108,
        "title": "4.8 避开细节理解的“三类坑",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af794438addbcc80336385a3_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 683,
        "title": "4.9 细节理解的“同义替换”",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af65c3e0af127d91a14fd0d2_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 755,
        "title": "4.10 标题添加的两个提速妙招",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af7a9252e1938a4a12b94322_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1042,
        "title": "4.11 语句理解题的两类考法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af548b225f1950ffc49a0276_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1118,
        "title": "4.12 态度观点题的两类考法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa4569f191e9262d1fb9d78_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
{
        "second": 1354,
        "title": "4.13 巧用“搭配”快速解题（逻辑填空）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af3844dd9898b057e5578e7d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1405,
        "title": "4.14 训练“词汇辨析力”（逻辑填空）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afac04c0ed8d823bf23c2fd1_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 947,
        "title": "4.15 “选项布局法”秒排错误选项（逻辑填空）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afce60abb3eb38e7eecc3354_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1176,
        "title": "5.1 工程问题：完工时间型",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af7faf0a51817c07d3f30d42_1",
        "cover": "https://img.yaotia.com/2022/09-06/1662435814983.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1049,
        "title": "5.2 工程问题：效率比和具体值型",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afb3fefe07b13d5a8182a916_1",
        "cover": "https://img.yaotia.com/2022/09-06/1662456526365.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1063,
        "title": "5.3 行程问题：基本考法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af25a9a2e1a4d86d18e3d82b_1",
        "cover": "http://img.yaotia.com/2022/10-09/1665303711820.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1150,
        "title": "5.4 平面几何：边长、周长、面积",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afd0ef503225ca55d62e764a_1",
        "cover": "https://img.yaotia.com/2022/09-06/1662456721624.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1205,
        "title": "5.5 经济利润：基本考法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc66033e30f905ca1782d88_1",
        "cover": "https://img.yaotia.com/2022/09-06/1662456997843.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },

    {
        "second": 1057,
        "title": "5.6 排列组合：基本考法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af60d9b1d327a323e466701d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1106,
        "title": "5.7 排列组合·基本运用",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af0ba91c7ab00dad06028e04_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1643,
        "title": "5.8 排列组合：4种模型",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbdd0d430e6be40c69473b5_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 985,
        "title": "5.9 统筹规划：最优方案",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afaee1cba86db0fac0a4ac73_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1209,
        "title": "5.10 必备提速思维：代入排除",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af8749ffee7197d173b57826_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1084,
        "title": "5.11 必备提速技巧：数字特性法",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5a15ab6451454229c1b435_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 864,
        "title": "5.12 数字特性法：实战运用",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af9d4ad2f474a2761221578e_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1200,
        "title": "5.13 必会技巧：巧妙且正确“赋值”",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af3efeafe7872ff14b720547_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1199,
        "title": "5.14 必会技巧：善用“比例思想”",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af54c278b96a25180e836343_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1292,
        "title": "6.1 认识数推的5类基础规律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc2754075b6df44b7554258_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1353,
        "title": "6.2 认识数列的5类形式规律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af6413384e6a5843433dc0bc_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
 {
    "second": 651,
    "title": "6.3 可辨析的“幂次数列”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af26d3395f89df319e2d03ba_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 623,
    "title": "6.4 多重数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb90600999cbae1837ba17c_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 957,
    "title": "6.5 分数数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc10245958e85397571611c_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 1076,
    "title": "6.6 机械数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af653af0946236fd1523e4b3_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 755,
    "title": "6.7 多级数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af3a86a3b685e0f358f68a29_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 880,
    "title": "6.8 递推数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af06835075936d623a3e2cd9_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 920,
    "title": "6.9 图形数列",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af61529753faef34f1c888a3_1",
    "cover": "",
    "course_name": "数字推理",
    "course_id": 76
  },
  {
    "second": 1610,
    "title": "7.1 光的传播和反射",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb1bc33160766af8fda487f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 149
  },
  {
    "second": 1462,
    "title": "7.2 光的折射和色散",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc965b7dbdf19b449429c92_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 149
  },
  {
    "second": 2273,
    "title": "7.3 力学（上）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af255dfc7279952d60072d18_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 149
  },
  {
    "second": 2320,
    "title": "7.4 力学（下）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af8f021f72e3faf142763289_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 149
  },
  {
    "second": 1723,
    "title": "7.5 功与机械能",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afff0574826b2bb9aa305655_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1142,
    "title": "7.6 简单机械-杠杆",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af2e3561c9c81d528162262f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1003,
    "title": "7.7 声学",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbdefdb9fd397ff1366dfd2_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1356,
    "title": "7.8 电学的基本概念",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd30930f51321fd98a09c8a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 2298,
    "title": "7.9 电学-欧姆定律",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0f246057095f1bd3880a3e_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1270,
    "title": "7.10 电学-电功率",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af4499df21d3b987ce4a080e_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1632,
    "title": "7.11 运动学-直线运动",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af955d7764cd5ebc8e56ecdd_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 634,
    "title": "7.12 运动学-圆周运动",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afae37ab8a4a4b6fdbfee9ee_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1146,
    "title": "8.1 公式复盘：增长的4类公式",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd476f45e5f2cd68c9e1a8b_1",
    "cover": "https://img.yaotia.com/2022/09-22/1663814180891.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1106,
    "title": "8.2 公式复盘：比重的3个公式",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1c943cc4e512fa6f395a3f_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454473431.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 672,
    "title": "8.3 公式复盘：平均数的4个公式",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd1d4b92f2f591cea2173de_1",
    "cover": "https://img.yaotia.com/2023/07-05/1688543362798.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1139,
    "title": "8.4 口诀复盘：套模型的3个口诀",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff1004acb9397c5f24b7d23_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454533979.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 884,
    "title": "8.5 计算“现期量”的3类考法",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0e8315726186d7e1f75f7c_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454694222.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 992,
    "title": "8.6 如何巧算“基期量”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff4a4fa673dd6928d25cf11_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454703574.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1090,
    "title": "8.7 如何快速计算并比较“增长量”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af5843cce979f17642433749_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454710891.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 871,
    "title": "8.8 如何快速计算并比较“增长率”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb0b98733ace045712be8b6_1",
    "cover": "https://img.yaotia.com/2022/09-22/1663808609645.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 700,
    "title": "8.9 速度升级：套公式速解“间隔增长”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1ffad5206ccaa27c6bd96d_1",
    "cover": "https://img.yaotia.com/2022/09-06/1662454722714.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1079,
    "title": "8.10 难度升级：用口诀+方法快速破解“混合增速”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af613c6112d25ecad3770ee1_1",
    "cover": "https://img.yaotia.com/2022/10-09/1665302825793.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
 {
    "second" : 1161,
    "title" : "8.11 难度升级：如何快速计算“年均增长率”",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05afabf3efafd6fba42c150b14_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 958,
    "title" : "8.12 拿下“现期比重”的3类考法",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af508746314b64a7b763c919_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 1191,
    "title" : "8.13 如何巧算“基期比重”",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af958c5878956f242b5c6272_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 1084,
    "title" : "8.14 速度升级：套公式速解“两期比重比较”",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05afb824ce6200bb5ab789b4fe_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 949,
    "title" : "8.15 快速算出“平均数”题",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05afece5fdad448d1887e40fcb_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 1133,
    "title" : "8.16 速度升级：套公式速解“平均数增长”",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05afa0bb555ef1c2aa52295dbe_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 1090,
    "title" : "8.17 长见识：“倍数计算”也能套公式解题",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af98dd9d5259e4792c6c8974_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 492,
    "title" : "9.1 言语理解与表达概述",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af454bc223e70c990f454608_1",
    "cover" : "",
    "course_name" : "言语基础思维",
    "course_id" : 76
  },
  {
    "second" : 305,
    "title" : "10.1 逻辑填空概述",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05afd046b0eb6485fce80945a9_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 866,
    "title" : "10.2 如何利用“选项设置思维”破题（上）",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af753dce0b65d5b1c77c167a_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second" : 949,
    "title" : "10.3 如何利用“选项设置思维”破题（下）",
    "teacher_name" : "",
    "polyv_id" : "1e6eaa05af8de6b67498f14828978d9c_1",
    "cover" : "",
    "course_name": "技法提速",
    "course_id" : 76
  },
  {
    "second": 951,
    "title": "10.4 如何利用关键词破题（关联词）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb72fd9891c9d3efd7ebdf4_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 984,
    "title": "10.5 如何利用关键词破题（重点词）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af48aefe04d5e8973015539d_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 487,
    "title": "10.6 如何借助“标点符号”破题（冒号+破折号）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af1425fac4f171985bf46363_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 455,
    "title": "10.7 如何借助“标点符号”破题（顿号和分号）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af05cb6284dbb913dd47645b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 668,
    "title": "10.8 如何借助“标点符号”破题（引号）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af784dcad8dc6b80c507074b_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 801,
    "title": "10.9 如何破“2选1”纠结思维（逻辑填空）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af83615e5472e91c6b2a99dc_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1031,
    "title": "10.10 遇到题目“无头绪”,如何破解（逻辑填空）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd3e9c304073d342b2f3937_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
 {
    "second": 508,
    "title": "11.1 片段阅读概述",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc242c62619ed95aa872ba8_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1191,
    "title": "11.2 如何通过文段结构找重点（上）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af331f18f9bc6cbe306db3a8_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1048,
    "title": "11.3 如何通过文段结构找重点（下）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afca1486c159d519e55217b3_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1024,
    "title": "11.4 如何借助关键词破题（转、因、并）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6bf44d19f0e288483941ec_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 887,
    "title": "11.5 如何借助“关键词”破题（递、程、对）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af716254cc9230349c2233f0_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
    {
        "second": 717,
        "title": "11.6 如何运用“主题词”破题",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af75bd8010febef79135976c_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 899,
        "title": "11.7 如何对比“选项”择优（主旨意图题）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afcbd7b4784fe1f028e4a514_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 976,
        "title": "11.8 细节理解题的“解题思维”",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afab90769bac09831aebc603_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1075,
        "title": "11.9 利用行文逻辑破解排序题",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af4f5694c983980e65dc31f3_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 923,
        "title": "11.10 利用“关键词”思维破解排序题",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af87998dfe65b63e3f9a7226_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1193,
        "title": "11.11 如何找话题落脚点（下文推断题）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af2f08f2abe6f631c5c8ade4_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 817,
        "title": "11.12 语句填空题的解题思维",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af6f29899afef26de105d6d6_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 688,
        "title": "11.13 标题选用题如何定选项",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afec90f0d99f13e82bcc1080_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 761,
        "title": "11.14 如何破解词句理解题（词）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af09071ca94285203e6b7dd3_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 404,
        "title": "11.15 如何破解词句理解题（句）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af8b0c08f85a4acf4dfdb72d_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
 {
        "second": 365,
        "title": "12.1 篇章阅读（考情及题型介绍）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa8a2da6bd726728bf22d80_1",
        "cover": "",
        "course_name": "篇章阅读",
        "course_id": 76
    },
    {
        "second": 392,
        "title": "12.2 篇章阅读（如何阅读）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af3f98d9a97a9f6dc1dad49d_1",
        "cover": "",
        "course_name": "篇章阅读",
        "course_id": 76
    },
    {
        "second": 1010,
        "title": "12.3 篇章阅读（如何做题）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af7371a830c190cf8e48aac8_1",
        "cover": "",
        "course_name": "篇章阅读",
        "course_id": 76
    },
    {
        "second": 978,
        "title": "13.1 图推到底应该怎么学",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af26c5af4f2db6743abc3c0f_1",
        "cover": "https://img.yaotia.com/2022/10-09/1665303042135.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1363,
        "title": "13.2 位置规律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af2ccef448ac1a721971815b_1",
        "cover": "https://img.yaotia.com/2022/10-09/1665302250926.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1190,
        "title": "13.3 样式规律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05affe2203c5b0339d4ff1a7dc_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302238826.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1006,
        "title": "13.4 属性规律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa0c7564d35213be2405552_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302257933.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
  {
    "second": 1188,
    "title": "13.5 轴对称的非常规考法",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af76e2f45ef1d9226d318a33_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1052,
    "title": "13.6 数量规律",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afc74559ce44e2ae29b84ab2_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1053,
    "title": "13.7 几笔画完这个图",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0a66ff09805df216479725_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1256,
    "title": "13.8 数量的特殊规律上",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af7bc3232a675ba45d61f05a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1183,
    "title": "13.9 数量的特殊规律中",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa9fb55918d319dd6b42ecd_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1173,
    "title": "13.10 数量的特殊规律下",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afda78b0868b78529d76b6a2_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 917,
    "title": "13.11 多规律综合解题",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe0c07e5ea6c9ba43b90451_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1176,
    "title": "13.12 带你了解“折纸盒”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af463c29bd7881ec79818720_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 984,
    "title": "13.13 三大方法解决“折纸盒”上",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af25119aaf2672cef84ec6c4_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 972,
    "title": "13.14 三大方法解决“折纸盒”下",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa2fb8edb2737d75c250a14_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665388582787.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 943,
    "title": "13.15 四面体“折纸盒”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af21ea39161fe42ced4dfb4a_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665389661649.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 576,
    "title": "13.16 多面体“折纸盒”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afef45f657fc445992025873_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665389668055.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 943,
    "title": "13.17 图推中的“七巧板”上",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af19f28c1293235d39f3a640_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665389729071.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 950,
    "title": "13.18 图推中的“七巧板”下",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0a601245fc8383856fa9ba_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665389735454.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1339,
    "title": "13.19 立体拼合如何解题",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afdcfb3cd2b719a4dbb505f2_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665389792350.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1496,
    "title": "13.20 如何切好“蛋糕”",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af97167581ac5ab792289244_1",
    "cover": "https://img.yaotia.com/2022/10-10/1665388568170.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1318,
    "title": "13.21 六方看图",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0b623e76b47631488c740f_1",
    "cover": "https://img.yaotia.com/2024/01-09/1704778007796.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
    {
        "second": 377,
        "title": "14.1 定义判断如何解题",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afff0e94eee3da67f8f82b70_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 800,
        "title": "14.2 定义判断“要点”分析",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afc61dcd57f48191e2b9c240_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 870,
        "title": "14.3 如何“浓缩”长定义",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af60aa80d37a4572eaa44874_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
 {
        "second": 382,
        "title": "15.1 类比推理正确解题思维",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa0c6d482227ce10b3bd0a6_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665391837108.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 395,
        "title": "15.2 类比推理“重点”梳理",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af8477f5c5c8efad3828ecf8_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302283682.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 763,
        "title": "15.3 概念外延之全同关系和交叉关系",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af1760dd2ae3ce7dded8c02e_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302293981.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 568,
        "title": "15.4 如何区分种属关系和组成关系",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af402bc09574e82bf847ee0d_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665391852982.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 709,
        "title": "15.5 什么是全异关系",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af51189ade5cdb03264c812c_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665391859819.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 720,
        "title": "15.6 逻辑关系",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af0af0ae72e4fdbefb3f0ce4_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302342706.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 827,
        "title": "15.7 常考的对应关系（上）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af576cf185302d3a43f477ed_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302349329.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1116,
        "title": "15.8 常考的对应关系（下）",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af2cad617ab07e3e6ada5fce_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302355561.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 942,
        "title": "15.9 语义关系",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afa266e628794dfa8c61c78f_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665302361945.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 751,
        "title": "15.10 语法关系的辨析",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afbb16a54fa79211a0bfc09e_1",
        "cover": "https://img.yaotia.com/2022/10-10/1665391870748.pdf",
        "course_name": "技法提速",
        "course_id": 76
    },
  {
    "second": 629,
    "title": "16.1 可能性推理概述",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af55ac7209c27f12e8af84e5_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1171,
    "title": "16.2 基础论证的削弱方式及力度比较",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa49b5e7d93d3bc8015eab6_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 944,
    "title": "16.3 因果论证的削弱方式及力度比较",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0749d6d9796b00a03b3735_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1096,
    "title": "16.4 基础论证的加强方式及力度比较",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af9b09e970007b099ce215d6_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1054,
    "title": "16.5 因果论证的加强方式及力度比较",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af14e219b49d79b163f14765_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 610,
    "title": "16.6 加强题的特殊变化形式——原因解释",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbe9e698389dcdd720ec379_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1087,
    "title": "16.7 加强题的特殊变化形式——前提假设",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af3b2dff752c663738f0a9a9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1000,
    "title": "16.8 日常推理题常见错误思路",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff0bd97b3c2be4835ed0af1_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 912,
    "title": "16.9 可能性推理中的形式比较怎么考",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afdb6f81c95d12a50da24c70_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 344,
    "title": "16.10 可能性推理全考点梳理回顾",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af189bc707a76c27417bc316_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 407,
    "title": "16.11 直言命题的2组推出关系",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af754f054ace39e9606cf6cd_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1104,
    "title": "16.12 直言命题的3对矛盾和2组反对",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbe1e910fa420c71e618207_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 503,
    "title": "16.13 联言命题“且”的N种考法",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af2cd2965ff06c37418f6226_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 899,
    "title": "16.14 选言命题“或”与“要么”的实战辨析",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af340b6cfe503164eda60c50_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 805,
    "title": "16.15 联言与选言命题的综合考查",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afbc63505cbd6b2a31c1c100_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 569,
    "title": "16.16 三段论的判别方法和速解技巧",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa30dc29036f618a393ea91_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1132,
    "title": "16.17 条件命题的翻译推理与变形剖析",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afdeec4ae4717c0da190e862_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 752,
    "title": "16.18 条件命题的矛盾与等价命题破解",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afaeff66eb316ec99b7eed62_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1189,
    "title": "16.19 代入排除法与假设法巧解朴素逻辑",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afa68338a7ea909bc7ec5b27_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 656,
    "title": "16.20 图表法破解多信息朴素逻辑",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0f0b5be22979b045a869a9_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1432,
    "title": "16.21 朴素逻辑一拖N如何破题",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af97839cabbbdfcd22811add_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1011,
    "title": "16.22 必然性推理中的形式比较怎么考",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6946a83ebfc1974f5b4aef_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 431,
    "title": "16.23 必然性推理全考点梳理回顾",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afb989cd969a481b87273d03_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1495,
    "title": "17.1 环保知识",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af428b2b89ef7f4ccc8af24a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1499,
    "title": "17.2 航天知识",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afe0f9fe681c64d2def2d970_1",
    "cover": "https://img.yaotia.com/2023/06-17/1686972841551.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1477,
    "title": "17.3 诸子百家",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af45930e01495903f3c1376a_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1449,
    "title": "17.4 中国地理（一）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05aff0d1d362a3bbc00f7c9f01_1",
    "cover": "https://img.yaotia.com/2023/06-17/1686971967851.pdf",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1497,
    "title": "17.5 中国地理（二）",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af131352c712c2c2a173f53f_1",
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1319,
    "title": "18.1 光学-光沿直线传播与光的反射",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af2ded712fa0d4e16fc59a51_1",
    "cover": "https://img.yaotia.com/2022/10-25/1666659852974.pdf",
   "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1320,
    "title": "18.2 光学-光的折射与凹凸镜",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af899800f358973743a4d8c4_1",
    "cover": "https://img.yaotia.com/2022/10-25/1666659844209.pdf",
   "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1081,
    "title": "18.3 声学",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6aff363e36a5f70377d185_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1231,
    "title": "18.4 力学-牛顿三大定律",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afca9d4567b2c10598e5ba53_1", 
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1951,
    "title": "18.5 力学-常见力与受力分析",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af441667fa6aa607283e496d_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 826,
    "title": "18.6 压力与压强-固体的压力与压强",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afdd4cfe7a908cbc3ad404c5_1", 
    "cover": "",
    "course_name": "技法提速",
    "course_id": 18
  },
  {
    "second": 1092,
    "title": "18.7 压力与压强-浮力",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05afd8ccbbaf7629d1cf666013_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 997,
    "title": "18.8 简单机械-杠杆",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af0f10fbfc64522487171cf4_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1434,
    "title": "18.9 简单机械-滑轮",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af01bb04b20f88ea2a29f030_1", 
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 1430,
    "title": "18.10 运动学-直线运动",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6162cec995ceb606ff97f2_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
    "second": 864,
    "title": "18.11 运动学-圆周运动",
    "teacher_name": "风暴羚羊",
    "polyv_id": "1e6eaa05af6a47ac426cecb74668e25b_1",  
    "cover": "",
    "course_name": "技法提速",
    "course_id": 76
  },
  {
        "second": 1161,
        "title": "18.12 功与机械能",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af5d33906b08a322cbf8244e_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1113,
        "title": "18.13 电学-电学基础知识",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05afb272976f49a545bc59fbcd_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1464,
        "title": "18.14 电学-欧姆定律",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af3995c0361280953f0fb1f1_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
    {
        "second": 1419,
        "title": "18.15 电学-电功率",
        "teacher_name": "风暴羚羊",
        "polyv_id": "1e6eaa05af87b6b56ba5ddce826c9500_1",
        "cover": "",
        "course_name": "技法提速",
        "course_id": 76
    },
  {
    "second": 5025,
    "title": "1.1 2023海南省考（资料分析）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af3999525fe2b0e26f16675c_1",
    "cover": "",
    "course_name": "2023海南省考",
    "course_id": 78
  },
  {
    "second": 6947,
    "title": "1.2 2023海南省考（判断推理）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af4b3cdfc7211e09843a9db1_1",
    "cover": "",
    "course_name": "2023海南省考",
    "course_id": 78
  },
  {
    "second": 5813,
    "title": "1.3 2023海南省考（言语理解）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af36931c3d348b3dcdc562b7_1",
    "cover": "",
    "course_name": "2023海南省考",
    "course_id": 78
  },
  {
    "second": 5617,
    "title": "1.4 2023海南省考（数学运算和常识）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af2379019e46e21cbd80bae4_1",
    "cover": "",
    "course_name": "2023海南省考",
    "course_id": 78
  },
  {
    "second": 6779,
    "title": "1.5 2024四川省考（资料分析）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af8d10e94aebedc9a433b6ca_1",
    "cover": "",
    "course_name": "2024四川省考",
    "course_id": 78
  },
  {
    "second": 6805,
    "title": "1.6 2024四川省考（判断推理）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af7b8db2e6d505d47f9c4d4f_1",
    "cover": "",
    "course_name": "2024四川省考",
    "course_id": 78
  },
  {
    "second": 5826,
    "title": "1.7 2024四川省考（言语理解）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05afb8cca9bff044fea997b2a3_1",
    "cover": "",
    "course_name": "2024四川省考",
    "course_id": 78
  },
  {
    "second": 6621,
    "title": "1.8 2024四川省考（数学+常识）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05afb55cc15840e4e6f4585a5c_1",
    "cover": "",
    "course_name": "2024四川省考",
    "course_id": 78
  },
  {
    "second": 3306,
    "title": "1.9 2023国考行政执法卷（1）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af268c73bcd0477c8abed909_1",
    "cover": "",
    "course_name": "国考行政执法",
    "course_id": 78
  },
  {
    "second": 5750,
    "title": "1.10 2023国考行政执法卷（2）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05afcae0bdb94e82b7ab9608a8_1",
    "cover": "",
    "course_name": "国考行政执法",
    "course_id": 78
  },
  {
    "second": 3623,
    "title": "1.11 2023国考行政执法卷（3）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af7dee54308dc81a995e808b_1",
    "cover": "",
    "course_name": "国考行政执法",
    "course_id": 78
  },
  {
    "second": 5960,
    "title": "1.12 2023国考行政执法卷（4）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af29dc1d69309fbe12e4aa10_1",
    "cover": "",
    "course_name": "国考行政执法",
    "course_id": 78
  },
  {
    "second": 5273,
    "title": "1.13 2023安徽省考（1）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05afd0de68ea41cfac24970f3a_1",
    "cover": "",
    "course_name": "安徽省考",
    "course_id": 78
  },
  {
    "second": 6459,
    "title": "1.14 2023安徽省考（2）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05afedab3c6e667480566910f9_1",
    "cover": "",
    "course_name": "安徽省考",
    "course_id": 78
  },
  {
    "second": 5989,
    "title": "1.15 2023安徽省考（3）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af97b13819d435497a63eaea_1",
    "cover": "",
    "course_name": "安徽省考",
    "course_id": 78
  },
  {
    "second": 3947,
    "title": "1.16 2023安徽省考（4）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05af671b930ab770dea0836e2f_1",
    "cover": "",
    "course_name": "安徽省考",
    "course_id": 78
  },
  {
    "second": 4591,
    "title": "1.17 2023广东县级（1）",
    "teacher_name": "",
    "polyv_id": "1e6eaa05aff67344564e7170f95f9163_1",
    "cover": "",
    "course_name": "广东县级",
    "course_id": 78
  },
    {
        "second": 5070,
        "title": "1.18 2023广东县级（2）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05affcb6d5f1ce8e00c6f07e20_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 4986,
        "title": "1.19 2023广东县级（3）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af417c7b77f89364c72dd770_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 1390,
        "title": "1.20 2023山东省考（数量关系）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af829c89e026b0a3bb4ad9f7_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 2609,
        "title": "1.21 2023山东省考（言语和常识）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af46d9fc71b2482c7499b59a_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 2029,
        "title": "1.22 2023山东省考（判断推理）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af332e9e57fc1cae8dabe2a7_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 2496,
        "title": "1.23 2023山东省考（资料分析）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af42d5693a751694dc2e3c41_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 4562,
        "title": "1.24 2023浙江省考C卷（1）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af2eee65113626f1b3e996a5_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 4437,
        "title": "1.25 2023浙江省考C卷（2）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05afbe7f64a4d8af4c4778fd29_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 5492,
        "title": "1.26 2023浙江省考C卷（3）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af0e7bab2c4cba69545c7af2_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 5218,
        "title": "1.27 2023浙江省考C卷（4）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af0173b480c49b521ff9a4bd_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 6272,
        "title": "1.28 2023四川上半年整卷（上）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af6390277ca1c1a13adc9561_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
    },
    {
        "second": 8749,
        "title": "1.29 2023四川上半年整卷（下）",
        "teacher_name": "",
        "polyv_id": "1e6eaa05af0039df647dbc7c43d347c7_1",
        "cover": "",
        "course_name": "整卷带练",
        "course_id": 78
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
