// Quantumult X rewrite script
/*
[rewrite_local]
^https:\/\/api-cs\.intsig\.net\/purchase\/cs\/query_property\?app_type=CamScanner_IP_FREE&client_app=CamScanner_IP_FREE.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quannengsaomiao.js
# 修改 PDF 转 Word 任务状态为成功
#^https:\/\/cs8\.intsig\.net\/sync\/bigfile\/pdf2office\/status\?file_id=.*$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/111/quannengsaomiao.js

[mitm]
hostname = api-cs.intsig.net, cs8.intsig.net
*/

let body = $response.body;
let obj = JSON.parse(body);

// 获取请求 URL
let url = $request.url;
if (url.includes('/query_property?app_type')) {
     obj.data.points = "999999";
     obj.data.pdfword_balance = "999999";
/*
     obj.data.points_exchange_cfgrs.CamScanner_ID_Card_Credit = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Pdf2ppt = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Sign = 0;
     obj.data.points_exchange_cfgrs.CamScanner_ID_Card_Authenticity = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Excel = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Watermarks = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Profile_Card_Format = 0;
     obj.data.points_exchange_cfgrs.CamScanner_CertMode = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Pdf2excel = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Pdfword = 0;
     obj.data.points_exchange_cfgrs.CamScanner_CloudCap_1G = 0;
     obj.data.points_exchange_cfgrs.CamScanner_CloudOCR = 0;
     obj.data.points_exchange_cfgrs.CamScanner_Translation = 0;
     obj.data.points_exchange_cfgrs.CamScanner_AlbumImport = 0;
*/
}

body = JSON.stringify(obj);
$done({body});


