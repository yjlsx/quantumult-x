/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */
[Script]
http-response ^http:\/\/50843\.activity-42\.m\.duiba\.com\.cn\/signactivity\/doSign script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/1905cookie.js, requires-body=true, timeout=60, tag=1905

[MITM]
hostname = 50843.activity-42.m.duiba.com.cn

const cookieName = '1905电影'
const tokenurlKey = 'chavy_tokenurl_1905'
const tokenheaderKey = 'chavy_tokenheader_1905'
const signurlKey = 'chavy_signurl_1905'
const signheaderKey = 'chavy_signheader_1905'
const signbodyKey = 'chavy_signbody_1905'
const chavy = init()

const requrl = $request.url
if ($request && $request.method != 'GET' && requrl.match(/\/signactivity\/doSign/)) {
  const signurlVal = requrl
  const signheaderVal = JSON.stringify($request.headers)
  const signbodyVal = $request.body
  if (signurlVal) chavy.setdata(signurlVal, signurlKey)
  if (signheaderVal) chavy.setdata(signheaderVal, signheaderKey)
  if (signbodyVal) chavy.setdata(signbodyVal, signbodyKey)
  chavy.msg(cookieName, `获取Cookie: 成功`, ``)
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()
