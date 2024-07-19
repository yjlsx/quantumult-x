/**
*正课，三板斧
 [rewrite_local]
^http://api\.yaotia\.cn/api/v1/course/sprintInfo\?course_id=76 url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/buzhi/sanbanfu.js
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
    "service_url": "http://fed.midasjoy.com/Public/act/2023act/sprintTeacher/index.html?cid=76",
    "is_service": 1,
    "stage_list": [
      {
        "id" : 0,
        "name" : "默认阶段",
        "des" : "",
        "chapter_list" : [
          {
            "id" : 59,
            "instruct" : "第一阶段",
            "chapter_name" : "花木君写作技巧梳理课",
            "video_num" : 1,
            "stage_id" : 0,
            "node_num" : 0,
            "desc" : "共1节课程",
            "node_list" : [
              {
                "equity" : [
                  {
                    "is_finish" : 0,
                    "channel_id" : 2,
                    "live_status" : 3,
                    "title" : "观看课程",
                    "live_id" : 0,
                    "is_vid_edited" : 1,
                    "video_id" : "1e6eaa05afba009bfacb0574931fb8c0_1",
                    "type" : 3,
                    "orientation" : 1,
                    "bl_channel_id" : 202958
                  }
                ],
                "teacher_avatar" : "https://img.yaotia.com/teacher/repGnzpy7bRbwSxD_0.png?size=180X180",
                "start_time" : "",
                "teacher_name" : "花木君",
                "node_id" : 735,
                "ti_type_name" : "",
                "node_name" : "花木君写作技巧",
                "ti_type" : 0
              }
            ]
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

