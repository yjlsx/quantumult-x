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
          console.log(`替换为: ${item.content}`);
        }

        if (item.contentType === "pageUrl") {
          if (item.content.includes("referrerEntry=Me5.0_VipUser")) {
            console.log(`原 pageUrl: ${item.content}`);
            item.content = item.content.replace("referrerEntry=Me5.0_VipUser", "referrerEntry=VipV4.0_VIPCard");
            console.log(`更新后 pageUrl: ${item.content}`);
          }
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
