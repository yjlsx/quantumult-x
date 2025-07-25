/*
[rewrite_local]
^https:\/\/gateway\.kugou\.com\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/tracker\/v5\/url\?album_audio_id url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js
^https:\/\/gateway\.kugou\.com\/vipcenter\/ios url script-request-header https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/kg1.js

[mitm]
hostname = gateway.kugou.com, m.kugou.com
*/

const url = $request.url;
const headers = $request.headers;

console.log("🧭 当前请求 URL：" + url);

// 处理 /v5/url 和 /tracker/v5/url 请求重写
if (url.includes("/v5/url?") || url.includes("/tracker/v5/url?")) {
    const hashMatch = url.match(/hash=([0-9a-fA-F]{32})/);
    const hash = hashMatch ? hashMatch[1] : '';

    console.log("🔍 检测 hash 参数：" + (hash || "未找到"));

    if (hash) {
        const newUrl = `https://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
        headers['x-router'] = 'm.kugou.com';

        console.log("✅ 请求重写成功！");
        console.log("🎯 新 URL：" + newUrl);

        $done({
            url: newUrl,
            headers: headers
        });
    } else {
        console.log("❌ 未检测到合法 hash，跳过重写。");
        $done({});
    }
    return;
}

// 处理 /vipcenter/ios 请求头修改
if (url.includes("/vipcenter/ios")) {
  const 截取长度 = 112; // 你给的浏览器抓包的 user_label 长度
  let match = url.match(/user_label=([^&]*)/);
  if (match) {
    let userLabelEncoded = match[1];
    if (userLabelEncoded.length > 截取长度) {
      let newUserLabelEncoded = userLabelEncoded.substring(0, 截取长度);
      let newUrl = url.replace(/user_label=[^&]*/, `user_label=${newUserLabelEncoded}`);
      
      console.log("重写后 user_label 长度: " + newUserLabelEncoded.length);
      console.log("重写新 URL: " + newUrl);
      
      $done({
        url: newUrl,
        headers: headers,
        body: $request.body
      });
      return;
    }
  }
}

// 未命中重写逻辑
console.log("ℹ️ 非目标请求，无需处理");
$done({});
