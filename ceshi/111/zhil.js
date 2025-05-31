/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js

*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/

if ($request.body) {
  let body = $request.body;

  try {
    let parsed = JSON.parse(body);

    if (parsed.remark && typeof parsed.remark === 'string') {
      let remarkArray = JSON.parse(parsed.remark);

      for (let item of remarkArray) {
        if (item.contentType === "referrerEntry") {
          console.log(`原 referrerEntry: ${item.content}`);
          item.content = "VipV4.0_VIPCard";
          console.log(`新 referrerEntry: ${item.content}`);
        }
      }

      parsed.remark = JSON.stringify(remarkArray);
      body = JSON.stringify(parsed);
    }

    $done({ body });

  } catch (e) {
    console.log("解析或替换失败: " + e);
    $done({});
  }
} else {
  $done({});
}
