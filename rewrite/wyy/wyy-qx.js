#name=网易云

[policy]

[general]
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 127.0.0.1/32, localhost

[rewrite_local]
# 播放器会员皮肤
^https:\/\/interface3?\.music\.163\.com\/eapi\/playermode\/ url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 搜索结果会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 播放器会员歌曲1
^https:\/\/interface3?\.music\.163\.com\/eapi\/v3\/song\/detail url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 播放器会员歌曲2
^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 播放器会员歌曲3
^https:\/\/interface3?\.music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 侧边栏会员等级
^https:\/\/interface3?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 首页歌单会员歌曲
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

# 会员认证
^https?:\/\/interface3?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://raw.githubusercontent.com/anyehttp/quantumult-x/main/headers/wyy.js

[mitm]
hostname = %APPEND% *.music.163.com
