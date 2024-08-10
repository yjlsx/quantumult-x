/*
[rewrite local]
^https:\/\/nuc\.api\.mgtv\.com\/GetUserInfo\?_support url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/rewrite/MGTV/mgtv1.js
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
    // 修改 `pay_info` 中的 `components` 的 `text`
       obj.msg = "SVIP尊享内容";
    const payInfo = obj.authInfo.pay_info;
    if (payInfo) {
        payInfo.preview_end.components.forEach(component => {
            if (component.text) {
                component.text = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
            }
        });
    }
    // 设置所有 `needPay` 为 0
    function setNeedPayToZero(item) {
        if (Array.isArray(item)) {
            item.forEach(subItem => setNeedPayToZero(subItem));
        } else if (typeof item === 'object') {
            for (const key in item) {
                if (key === 'needPay') {
                    item[key] = 0;
                } else if (typeof item[key] === 'object') {
                    setNeedPayToZero(item[key]);
                }
            }
        }
    }
    setNeedPayToZero(obj);

    // 更新 `previewconfig` 中的 `et` 为视频结束时间 `ftime`
    if (obj.authInfo && obj.authInfo.pay_info && obj.authInfo.pay_info.previewconfig) {
        const videoEndTime = obj.authInfo.pay_info.ftime; // 获取视频结束时间
        if (videoEndTime) {
            obj.authInfo.pay_info.previewconfig.et = videoEndTime; // 设置为视频结束时间
        }
    }

    if (obj.preview) {
        obj.preview.playPreviewType = 1; // 预览
    }
}

// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});
