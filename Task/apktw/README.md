# APK.TW

> 调整获取会话正则 (使用账号密码登录获取)

## 配置 (Surge)

```properties
[MITM]
apk.tw

[Script]
http-request ^https://apk.tw\/member.php(.*?)action=login script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/apktw/apktw.cookie.js,requires-body=true
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/yjlsx/quantumult-x/master/Task/apktw/apktw.js
```

## 配置 (QuanX)

```properties
[MITM]
apk.tw

[rewrite_local]
^https://apk.tw\/member.php(.*?)action=login url script-request-body apktw.cookie.js

[task_local]
1 0 * * * apktw.js
```

## 说明

1. 访问: `https://apk.tw/` (如果你已经登录, 请先注销)
2. 使用账号密码登录
3. 系统提示: `获取会话: 成功` (以登录成功后弹出的通知为准!)

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:00:10`执行一次.

## 常见问题

1. 无法写入 Cookie

   - 检查 Surge 系统通知权限放开了没
   - 如果你用的是 Safari, 请尝试在浏览地址栏`手动输入网址`(不要用复制粘贴)

2. 写入 Cookie 成功, 但签到不成功

   - 看看是不是在登录前就写入 Cookie 了
   - 如果是，请确保在登录成功后，再尝试写入 Cookie

3. 为什么有时成功有时失败

   - 很正常，网络问题，哪怕你是手工签到也可能失败（凌晨签到容易拥堵就容易失败）
   - 暂时不考虑代码级的重试机制，但咱有配置级的（暴力美学）：

   - `Surge`配置:

     ```properties
     # 没有什么是一顿饭解决不了的:
     cron "10 0 0 * * *" script-path=xxx.js # 每天00:00:10执行一次
     # 如果有，那就两顿:
     cron "20 0 0 * * *" script-path=xxx.js # 每天00:00:20执行一次
     # 实在不行，三顿也能接受:
     cron "30 0 0 * * *" script-path=xxx.js # 每天00:00:30执行一次

     # 再粗暴点，直接:
     cron "* */60 * * * *" script-path=xxx.js # 每60分执行一次
     ```

   - `QuanX`配置:

     ```properties
     [task_local]
     1 0 * * * xxx.js # 每天00:01执行一次
     2 0 * * * xxx.js # 每天00:02执行一次
     3 0 * * * xxx.js # 每天00:03执行一次

     */60 * * * * xxx.js # 每60分执行一次
     ```