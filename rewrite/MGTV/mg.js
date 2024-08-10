/*
[rewrite local]
^https:\/\/mobile-stream\.api\.mgtv\.com\/v1\/video\/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mg.js
*
[mitm]
hostname = nuc.api.mgtv.com, mobile-stream.api.mgtv.com
*/


// 获取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/v1/video/source') !== -1) {
     // 更新components中的text字段
    const componentsPaths = [
        obj.data.authInfo.pay_info.preview_end.components,
        obj.data.authInfo.pay_info.preview_starting.components,
        obj.data.authInfo.pay_info.preview_playing.components
    ];

    componentsPaths.forEach(components => {
        components.forEach(component => {
            if (component.text !== undefined) {
                component.text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
            }
        });
    });

    // 将previewConfig中的et值更新为videoSources中的ftime
    const ftime = obj.data.videoSources[0].ftime;
    obj.data.preview.previewConfig.forEach(config => {
        config.et = ftime;
    });

    // 更新playPreviewType和isPreview
    obj.data.preview.playPreviewType = 0;
    obj.data.preview.isPreview = 0;

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

// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});
