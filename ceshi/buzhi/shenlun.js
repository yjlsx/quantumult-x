/**
 [rewrite_local]

^http://api\.yaotia\.cn/api/v2/goods/lesson\?goods_id=66 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/shenlun.js
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl2 = 'http://api.yaotia.cn/api/v2/goods/lesson?goods_id=66';

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
