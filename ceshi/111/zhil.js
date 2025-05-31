/*
[rewrite_local]
# 统一处理脚本
^https:\/\/m\.zhaopin\.com\/bapi\/order\/creation url script-request-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/zhil.js

*
[mitm]
hostname = m.zhaopin.com, ask.zhaopin.com
*/



// zhaopin_order_patch.js
/*
 * @supported 4310B28D64CC
 * 智联招聘下单请求增强：修复 referrerEntry + pageUrl + useCoinAmount
 */

if ($request.body) {
  let body = $request.body;

  try {
    let parsed = JSON.parse(body);

    if (parsed.remark && typeof parsed.remark === 'string') {
      let remarkArray = JSON.parse(parsed.remark);

      for (let item of remarkArray) {
        // 替换 referrerEntry 内容
        if (item.contentType === "referrerEntry") {
          console.log(`原 referrerEntry: ${item.content}`);
          item.content = "VipV4.0_VIPCard";
          console.log(`新 referrerEntry: ${item.content}`);
        }

        // 替换 pageUrl 中的 referrerEntry 参数
        if (item.contentType === "pageUrl") {
          const original = item.content;
          const updated = original.replace(/referrerEntry=[^&]*/, "referrerEntry=VipV4.0_VIPCard");
          if (original !== updated) {
            console.log("pageUrl 中 referrerEntry 已替换");
            item.content = updated;
          }
        }

        // 将 useCoinAmount 金额改为 0
        if (item.contentType === "useCoinAmount") {
          console.log(`原 useCoinAmount: ${item.content}`);
          item.content = 0;
          console.log(`useCoinAmount 设置为 0`);
        }
      }

      parsed.remark = JSON.stringify(remarkArray);
      body = JSON.stringify(parsed);
    }

    $done({ body });

  } catch (err) {
    console.log("解析或处理失败: " + err);
    $done({});
  }
} else {
  $done({});
}
