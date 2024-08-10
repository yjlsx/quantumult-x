/*
[rewrite local]
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_support url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
^https:\/\/mobile-stream\.api\.mgtv\.com\/v1\/video\/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
*
[mitm]
hostname = nuc.api.mgtv.com, mobile-stream.api.mgtv.com
*/


// 获取响应体
let body = $response.body;
let obj = JSON.parse(body);

// 根据 URL 进行不同的处理
if ($request.url.indexOf('GetUserInfo?_support') !== -1) {
    obj.data.isVip = 1;
    obj.data.vipExpiretime = 410244480090000;
    obj.data.vipplatform = "mpp_svip";
    obj.data.vipinfo.isvip = 1;
    obj.data.vipinfo.vip_end_time = "2099-12-31 00:00:00";
    obj.data.vipinfo.type = "2";
    obj.data.vipinfo.platform = "mpp_svip";
    obj.data.vipinfo.growth.level = 9;
    obj.data.vipinfo.growth.score = 99999;
}

if ($request.url.indexOf('/v1/video/source') !== -1) {
     obj.code = 200;
    if(obj.data.authInfo.pay_info) {
    // 更新components中的text字段
    const componentsPaths = [
        obj.data.authInfo.pay_info.preview_end?.components,
        obj.data.authInfo.pay_info.preview_starting?.components,
        obj.data.authInfo.pay_info.preview_playing?.components,
    ];

    componentsPaths.forEach(components => {
        if (components) { // 检查是否为 undefined 或 null
            components.forEach(component => {
                if (component.text !== undefined) {
                    component.text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
                }
            });
        }
    });
}

    if(obj.data.authInfo.interests_info) {  
    const suites = [
        obj.data.authInfo.interests_info.def_tips?.suites,
    ];
    suites.forEach(suites => {
        if (suites) { // 检查是否为 undefined 或 null
            suites.forEach(suites => {
                if (suites.text !== undefined) {
                    suites.finish_text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
                    suites.icon = "https://vipcdn.mgtv.com/assets/icon/svip.png";
                    suites.entry_text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
                }
            });
        }
    });
        obj.data.authInfo.interests_info.play_tips.text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
        obj.data.authInfo.interests_info.play_tips.icon = "https://vipcdn.mgtv.com/assets/icon/svip.png"; 
}

    // 将previewConfig中的et值更新为videoSources中的ftime
    const ftime = obj.data.videoSources[0]?.ftime;
    if (ftime !== undefined) {
        obj.data.preview.previewConfig.forEach(config => {
            config.et = ftime;
        });
    }


    // 更新playPreviewType和isPreview
    obj.data.preview.playPreviewType = 2;
    obj.data.preview.isPreview = 0;
    obj.data.info.mediaPrimaryType = 2;
    obj.data.info.video.vipProtect = 0;
    obj.data.info.hdcp = 0;
    // 将videoSources中的needPay字段设为0
    obj.data.videoSources.forEach(videoSource => {
        videoSource.needPay = 0;
    });

    // 将speed数组中每个对象的needPay字段设为0
    if (obj.data.config.speed && Array.isArray(obj.data.config.speed)) {
        obj.data.config.speed.forEach(item => {
            if (item.needPay !== undefined) {
                item.needPay = 0;
            }
        });
    }
}

// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});
