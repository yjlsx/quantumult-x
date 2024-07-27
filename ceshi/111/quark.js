/*
 [rewrite_local]
# 统一处理脚本

^https://drive-m\.quark\.cn/1/clouddrive/member url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quark.js


 [mitm]
 hostname = drive-m.quark.cn
 */

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/1/clouddrive/member')) {
    obj.data.super_vip_exp_at = 4102014158000;
    obj.data.member_status.SUPER_VIP = "PAID";
    obj.data.member_status.VIP = "PAID";
    obj.data.member_status.MINI_VIP = "PAID";
    obj.data.member_status.Z_VIP = "PAID";
    obj.data.member_type = "SUPER_VIP";
    obj.data.member_info.file_save_to_remains = 9999;
    obj.data.member_info.video_save_to_remains = 9999;
    obj.data.member_info.video_save_to_uses = 9999;
    obj.data.member_info.offline_download_remains = 9999;
    obj.data.exp_svip_exp_at = 4102014158000;
    obj.data.acc_status = 1;
    obj.data.identity = obj.data.identity.map(item => ({
        ...item,
        user_identity_type: 5,  // 设置新的 user_identity_type
        expire_time: 4102014158000,
        expire_type: 2,  // 修正赋值语法
        extra: {
            ...item.extra,
            vip88_new: true,  // 更新 extra 字段
            source: "new_source_id"  // 更新 source 字段
        }
    }));
}

$done({ body: JSON.stringify(obj) });
