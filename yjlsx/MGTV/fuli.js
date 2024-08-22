/*
[rewrite local]
^https:\/\/mgecoupon\.api\.mgtv\.com\/coupon\/my\/list url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/fuli.js
^https:\/\/mgecom\.api\.mgtv\.com\/user\/voucher\/nums url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/fuli.js
^https:\/\/mobile-thor\.api\.mgtv\.com\/v1\/vod\/info url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/yjlsx/MGTV/fuli.js


*
[mitm]
hostname = nuc.api.mgtv.com, mobile-stream.api.mgtv.com, mobile-thor.api.mgtv.com, mgecom.api.mgtv.com, mgecoupon.api.mgtv.com
*/


// 获取响应体
let body = $response.body;
let obj = JSON.parse(body);

 if ($request.url.indexOf('/coupon/my/list') !== -1) {
        if (obj.data) {
            obj.data.data = [
      {
        "usable" : 1,
        "corner_bg" : "",
        "max_cut_price" : 0,
        "bg_img" : "",
        "coupon_type" : 0,
        "cut_price_text" : "￥100",
        "time_desc" : "12月31日23时59分失效",
        "cut_desc" : "1、不与其他券叠加2、仅限部分自营商品使用，付款后取消订单将不会退还优惠券3、商品数量有限，先到先得",
        "cut_price_title" : "￥100",
        "remain_effective_time" : 11344103,
        "cut_price_abbr_title" : "￥100",
        "coupon_code_id" : 849369246,
        "coupon_name" : "芒果TVsvip100元券",
        "store_name" : "芒果自营",
        "cut_price_abbr_subtitle" : "",
        "min_use_price" : 0,
        "is_discount_price_show" : 0,
        "goods_id" : 0,
        "discount_percent" : 0,
        "cut_price" : 10000,
        "corner_color" : "",
        "coupon_cut_type" : 0,
        "is_limit_buy" : 0,
        "coupon_id" : 37498,
        "store_id" : 0,
        "not_use" : 0,
        "corner_text" : "",
        "coupon_type_name" : "平台",
        "coupon_code_id_str" : "849369246",
        "cut_price_subtitle" : "满100.01可用",
        "jump_url" : "",
        "exchange_type" : 0,
        "not_use_jump_url" : "",
        "is_top_coupon" : 0
      },
      {
        "usable" : 1,
        "corner_bg" : "",
        "max_cut_price" : 0,
        "bg_img" : "",
        "coupon_type" : 0,
        "cut_price_text" : "￥20",
        "time_desc" : "9月21日16时49分失效",
        "cut_desc" : "1、不与其他券叠加2、仅限部分自营商品使用，付款后取消订单将不会退还优惠券3、商品数量有限，先到先得",
        "cut_price_title" : "￥20",
        "remain_effective_time" : 2591871,
        "cut_price_abbr_title" : "￥20",
        "coupon_code_id" : 849368159,
        "coupon_name" : "会员专享20元优惠券",
        "store_name" : "芒果自营",
        "cut_price_abbr_subtitle" : "",
        "min_use_price" : 0,
        "is_discount_price_show" : 0,
        "goods_id" : 0,
        "discount_percent" : 0,
        "cut_price" : 2000,
        "corner_color" : "",
        "coupon_cut_type" : 0,
        "is_limit_buy" : 0,
        "coupon_id" : 32069,
        "store_id" : 0,
        "not_use" : 0,
        "corner_text" : "",
        "coupon_type_name" : "平台",
        "coupon_code_id_str" : "849368159",
        "cut_price_subtitle" : "满20可用",
        "jump_url" : "",
        "exchange_type" : 0,
        "not_use_jump_url" : "",
        "is_top_coupon" : 0
      },
      {
        "usable" : 1,
        "corner_bg" : "",
        "max_cut_price" : 0,
        "bg_img" : "",
        "coupon_type" : 0,
        "cut_price_text" : "￥28",
        "time_desc" : "12月31日23时59分失效",
        "cut_desc" : "1、不与其他券叠加2、仅限部分自营商品使用，付款后取消订单将不会退还优惠券3、商品数量有限，先到先得",
        "cut_price_title" : "￥28",
        "remain_effective_time" : 11344103,
        "cut_price_abbr_title" : "￥28",
        "coupon_code_id" : 849368150,
        "coupon_name" : "芒果TVsvip28元券",
        "store_name" : "芒果自营",
        "cut_price_abbr_subtitle" : "",
        "min_use_price" : 2801,
        "is_discount_price_show" : 0,
        "goods_id" : 0,
        "discount_percent" : 0,
        "cut_price" : 2800,
        "corner_color" : "",
        "coupon_cut_type" : 0,
        "is_limit_buy" : 0,
        "coupon_id" : 37497,
        "store_id" : 0,
        "not_use" : 0,
        "corner_text" : "",
        "coupon_type_name" : "平台",
        "coupon_code_id_str" : "849368150",
        "cut_price_subtitle" : "满28.01可用",
        "jump_url" : "",
        "exchange_type" : 0,
        "not_use_jump_url" : "",
        "is_top_coupon" : 0
      }
    ];
   obj.data.total = 3;

        }
 }

 if ($request.url.indexOf('/user/voucher/nums') !== -1) {
    obj.data.plat_coupon = "3张";
}


// 打印调试信息
console.log(JSON.stringify(obj));

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});