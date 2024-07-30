/**
 * @fileoverview Quantumult X 脚本
 *
[rewrite]
^https:\/\/ke\.fenbi\.com\/iphone\/jdwz\/v3\/my\/lectures\/visible url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/fenbi1.js

*
[mitm]
hostname = keapi.fenbi.com, ke.fenbi.com,
*/
const url = $request.url;
const obj = JSON.parse($response.body);

// 确保数据对象存在
if (!Array.isArray(obj.datas)) {
  obj.datas = [];
}

if (url.includes("/jdwz/v3/my/lectures/visible")) { 
  // 将新数据合并到现有的 data.datas 数组中
  const newData = {
      "contentType": 0,
      "id": 655114,
      "catIds": [
          ],
      "discounts": [
      ],
      "priceDisplayType": 0,
      "dealPlanId": 12,
      "hasExercise": false,
      "hasImGroup": false,
      "grouponRule": null,
      "explanation": "",
      "title": "2025军队文职新大纲系统班图书大礼包：公共科目5期",
      "classHours": 468,
      "status": 1,
      "studentCount": 72,
      "examSeason": null,
      "contentHighlights": [
      ],
      "type": 0,
      "promotionPrice": 580,
      "lectureStat": {
        "classMinutes": 14374,
        "classStopTime": 1729602475000,
        "updateTime": 1721012562224,
        "playProgress": 0.5,
        "freeAddedStudentCount": 0,
        "classStartTime": 1724670475000,
        "lectureId": 655114,
        "playStatus": 1
      },
      "buyLimit": null,
      "tradeUnit": 0,
      "hasAddress": true,
      "distributionId": -1,
      "price": 580,
      "teachChannel": 1,
      "topPrice": 580,
      "classEndTime": 1729602475000,
        "teachers" : [
          {
            "userId" : 39636188,
            "brief" : "公共基础知识主讲",
            "avatar" : "18f4d1beba6ea99.jpg",
            "id" : 2375,
            "teacherStat" : {
              "avgScore" : 9.8218750957150238,
              "fiveGradeAvgScore" : 4.9100000000000001,
              "updateTime" : 1722312495693,
              "episodeCount" : 475,
              "teacherId" : 2375,
              "scoreCount" : 163245
            },
            "auditionEpisode" : null,
            "memberOfCPC" : false,
            "tags" : null,
            "name" : "孙艺玮",
            "desc" : "粉笔事业单位教研负责人。重点大学硕士毕业，10年公考事业编授课经验，累计授课时长1w+，对事业单位考情有深入研究，授课逻辑清晰，深入浅出，擅长化繁为简，实战性强，深受学员喜爱。"
          },
          {
            "userId" : 123241256,
            "brief" : "公共基础知识讲师",
            "avatar" : "1711b428a076f4e.jpg",
            "id" : 5895,
            "teacherStat" : {
              "avgScore" : 9.7927536386643368,
              "fiveGradeAvgScore" : 4.9000000000000004,
              "updateTime" : 1722310358716,
              "episodeCount" : 512,
              "teacherId" : 5895,
              "scoreCount" : 93647
            },
            "auditionEpisode" : null,
            "memberOfCPC" : false,
            "tags" : null,
            "name" : "苏格",
            "desc" : "粉笔公共基础知识科目优质讲师。985院校硕士毕业，8年公考行业授课经验。专业知识扎实，授课经验丰富，思路清晰，重点突出，考点明确，通过归纳总结化繁为简让学员快速掌握考试内容。"
          },
          {
            "userId" : 70310813,
            "brief" : "判断推理、面试科目主讲",
            "avatar" : "18bae45bbdb515e.jpg",
            "id" : 11522,
            "teacherStat" : {
              "avgScore" : 9.7409810537243704,
              "fiveGradeAvgScore" : 4.8700000000000001,
              "updateTime" : 1722311261728,
              "episodeCount" : 690,
              "teacherId" : 11522,
              "scoreCount" : 30824
            },
            "auditionEpisode" : null,
            "memberOfCPC" : false,
            "tags" : null,
            "name" : "杨九",
            "desc" : "粉笔公考判断推理、面试科目优质教师。专业知识扎实，授课幽默风趣。课程体系严密，考点讲解透彻，教学过程循循善诱，凝练有力，善于把握重点和难点，为学员真正着想，帮助学员们上岸。"
          }
        ],
        "floorPrice" = 580,
        "needAgreement" : false,
        "brief" : "2025军队文职新大纲系统班图书大礼包：公共科目5期",
        "studentLimit" : 0,
        "hasLiveEpisodes" : false,
        "examType" : 0,
        "bestDiscount" : null
        "hasQQGroup" : true,
        "apeCourseId" : 1,
        "hasAudition" : true,
        "hasClassPeriod" : true,
        "hasUserExamInfo" : false,
        "hasUserFormBeforeOrder" : false,
        "salesStatus" : 0,
        "salesText" : "火热销售中",
        "hasUserContentInfo" : false,
        "productType" : {
          "type" : 4,
          "name" : "系统班"
        },
        "hasUserContentInfo" : false,
        "hidden" : false,
        "promotionDesc" : "",
        "hasUserFormAfterOrder" : false,
        "hasPosition" : false,
        "courseId" : 22,
        "specialIdentities" : [
        ],
        "typeFlags" : {
          "writtenLecture" : false,
          "systemLecture" : false,
          "writtenSmallClassLecture" : false,
          "smallClassLecture" : false,
          "interviewLecture" : false,
          "writtenOfflineLecture" : false
        },
        "hasRedirectInstructor" : false,
        "kePrefix" : "jdwz",
        "stopSaleTime" : 1724666400000,
        "saleStatus" : 0,
        "classStartTime" : 1724670475000,
        "startSaleTime" : 1721642400000
      }

  // 添加新数据到 datas 数组中
  obj.datas.push(newData.data);
  
  // 返回修改后的响应
  $response.body = JSON.stringify(obj);
}
    