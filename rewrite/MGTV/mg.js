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
    // 修改 `pay_info` 中的 `components` 的 `text`
    obj.msg = "SVIP尊享内容";
    function updateTextFields(item) {
    if (Array.isArray(item)) {
        item.forEach(subItem => updateTextFields(subItem));
    } else if (typeof item === 'object') {
        for (const key in item) {
            if (key === 'text') {
                item[key] = "尊敬的SVIP会员,您正在观看SVIP尊享内容";
            } else if (typeof item[key] === 'object') {
                updateTextFields(item[key]);
               }
          }
      }
  }

/*
// 函数：将所有 needPay 设置为 0
function setNeedPayToZero(item) {
    if (Array.isArray(item)) {
        item.forEach(subItem => setNeedPayToZero(subItem));
    } else if (typeof item === 'object') {
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (key === 'needPay') {
                    item[key] = 0;
                } else if (typeof item[key] === 'object') {
                    setNeedPayToZero(item[key]);
                }
            }
        }
    }
}

// 执行更新
if (obj.authInfo && obj.authInfo.pay_info) {
    updateTextFields(obj.authInfo.pay_info);
}
setNeedPayToZero(obj);


    // 更新 `previewconfig` 中的 `et` 为 `videoSources` 中的 `ftime`
    if (obj.data && Array.isArray(obj.data.videoSources) && obj.data.videoSources.length > 0) {
        const videoEndTime = obj.data.videoSources[0].ftime; // 获取视频结束时间
        if (videoEndTime && obj.data.preview && obj.data.preview.previewConfig) {
            obj.data.preview.previewConfig[0].et = videoEndTime; // 设置为视频结束时间
        }
    }

*/
    if (obj.preview) {
        obj.preview.playPreviewType = 0; // 预览
        obj.preview.isPreview = 0;
    }
}

// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});
