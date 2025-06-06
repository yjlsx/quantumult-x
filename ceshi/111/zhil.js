/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js



*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/

if (typeof $request !== 'undefined') {
  if ($request.body) {
    try {
      let body = $request.body;
      let parsed = JSON.parse(body);

      if (parsed.remark && typeof parsed.remark === 'string') {
        let remarkArray = JSON.parse(parsed.remark);

        for (let item of remarkArray) {
          if (item.contentType === "referrerEntry") {
            item.content = "VipV4.0_VIPCard";
          }
          if (item.contentType === "pageUrl" && item.content.includes("referrerEntry=Me5.0_VipUser")) {
            item.content = item.content.replace("referrerEntry=Me5.0_VipUser", "referrerEntry=VipV4.0_VIPCard");
          }
/*
          if (item.contentType === "useCoinAmount") {
            item.content = 0;
          }
*/
        }

        parsed.remark = JSON.stringify(remarkArray);
        body = JSON.stringify(parsed);
      }

      $done({ body });

    } catch (e) {
      console.log("请求体处理失败: " + e);
      $done({ body: $request.body });
    }
  } else {
    console.log("请求体为空，跳过处理");
    $done({});
  }
}
