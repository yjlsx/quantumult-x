/**
*正课，三板斧
 [rewrite_local]
^http://api\.yaotia\.cn/api/v1/course/sprintInfo\?course_id=76 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111.js
*
*
 [mitm]
 hostname = api.yaotia.cn
 */

const requestUrl = 'http://api.yaotia.cn/api/v1/course/sprintInfo?course_id=76';

const newResponse = {
  "code": 0,
  "message": "成功",
  "data": {
    "service_url": "http://fed.midasjoy.com/Public/act/2021act/sprintTeacher/index.html?cid=76",
    "is_service": 1,
    "stage_list": [
      {
        "id": 29,
        "instruct": "第一阶段",
        "chapter_name": "夯实基础：羚羊行测123卷带练课",
        "video_num": 2,
        "stage_id": 0,
        "node_num": 2,
        "desc": "共2节课程",
        "node_list": [
          {
            "equity": [
              {
                "is_finish": 0,
                "paper_id": "0",
                "desc": "课前作业在当节直播课前一天开放",
                "title": "课程训练",
                "ti_open": 0,
                "type": 0,
                "exam_id": 0,
                "ti_type": 1
              },
              {
                "is_finish": 0,
                "channel_id": 1,
                "live_status": 4,
                "title": "观看课程",
                "live_id": 0,
                "is_vid_edited": 1,
                "video_id": "1e6eaa05afc3757f316558e95016f444_1",
                "type": 4,
                "orientation": 1,
                "bl_channel_id": 202956
              }
            ],
            "teacher_avatar": "https://img.yaotia.com/teacher/dGpYrA8NeS5ScKtQ_0.png?size=180X180",
            "start_time": "",
            "teacher_name": "风暴羚羊",
            "node_id": 113,
            "ti_type_name": "行测",
            "node_name": "2.1 002卷：如何正确阅读材料（新）",
            "ti_type": 1
          },
          {
            "equity": [
              {
                "is_finish": 0,
                "paper_id": "0",
                "desc": "课前作业在当节直播课前一天开放",
                "title": "课程训练",
                "ti_open": 0,
                "type": 1,
                "exam_id": 0,
                "ti_type": 1
              },
              {
                "is_finish": 0,
                "channel_id": 1,
                "live_status": 4,
                "title": "观看课程",
                "live_id": 0,
                "is_vid_edited": 1,
                "video_id": "1e6eaa05afaed9fce49785ad828ddff0_1",
                "type": 4,
                "orientation": 1,
                "bl_channel_id": 202956
              }
            ],
            "teacher_avatar": "https://img.yaotia.com/teacher/dGpYrA8NeS5ScKtQ_0.png?size=180X180",
            "start_time": "",
            "teacher_name": "风暴羚羊",
            "node_id": 113,
            "ti_type_name": "行测",
            "node_name": "2.2 003卷：如何正确判断选项（新）",
            "ti_type": 1
          }
        ]
      }
    ],
    "course_type": 4,
    "is_resource": 0,
    "progress": {
      "std_show": 1,
      "work_show": 1,
      "std_progress": 0,
      "work_progress": 0
    },
    "course_name": "行测三板斧·风暴羚羊",
    "course_today": []
  },
  "request_id": "23920c30-2348-4486-b3a2-47ec3b11f1a2"
};

if ($request.url === requestUrl) {
  // 返回新的响应体
  $done({ body: JSON.stringify(newResponse) });
} else {
  // URL 不匹配时，返回原始响应体
  $done();
}

