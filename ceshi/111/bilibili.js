/***********************************************
> 应用名称：
> 脚本作者：@yjlsx
> 微信账号：墨鱼手记
> 更新时间：2024-05-10
> 特别提醒：如需转载请注明出处，谢谢合作！
*
[rewrite local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\?access_key url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/bilibili.js
^https:\/\/api\.bilibili\.com\/x\/vip\/window\/list?csrf url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/bilibili.js
^https:\/\/api\.bilibili\.com\/x\/vip\/price\/panel\/lexi?access_key url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/bilibili.js



*
[mitm]
hostname = app.bilibili.com, api.bilibili.com

***********************************************/

// Quantumult X Rewrite Script
// @rewrite 

// 读取响应体
let body = $response.body;
let obj = JSON.parse(body);

if ($request.url.indexOf('/x/v2/account/myinfo?access_key') !== -1) {
  obj.data.vip.tv_due_date = 4102358400;
  obj.data.vip.tv_vip_status = 1;
  obj.data.vip.due_date = 4102358400;
}

if ($request.url.indexOf('/x/vip/window/list?csrf') !== -1) {
     obj?.data?.list?.forEach(item => {
  if (item?.track_params?.hasOwnProperty("vip_type")) {
    item.track_params.vip_type = "2";
    item.track_params.vip_status = "1";
      }
   });
}

if ($request.url.indexOf('/x/vip/price/panel/lexi?access_key') !== -1) {
   if(obj && obj.data) {
      obj.data.base.user_info.vip_status = 1;
      obj.data.base.user_info.vip_type = 2;
      obj.data.base.user_info.overdue_time = 2;
      obj.data.base.user_info.overdue_time = 4102358400;
      obj.data.base.user_info.tv_vip_overdue_time = 4102358400;
      obj.data.base.user_info.tv_vip_status = 1;
    }
}




// 将修改后的对象转换回 JSON 字符串
body = JSON.stringify(obj);

// 输出修改后的响应体
$done({ body });