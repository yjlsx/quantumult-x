/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */
/*
[rewrite_local]
^https:\/\/ios\.chat\.openai\.com\/backend-api\/accounts\/check\/v4-2023-04-27$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/rewrite.js
^https:\/\/ios\.chat\.openai\.com\/backend-api\/me\?include_groups=true$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/rewrite.js
[mitm]
hostname = ios.chat.openai.com

[rewrite_local] 
# 重写 OpenAI ChatGPT 响应，取消限制
^https:\\//ios\.chat\.opena\i.com\/backend-api\/conversation\/init url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/chatgpt.js

# 重写账户检查响应
^https:\/\/ios\.chat\.openai\.com\/backend-api\/accounts\/check\/v4-2023-04-27$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/chatgpt.js
# 重写用户信息响应
^https:\/\/ios\.chat\.openai\.com\/backend-api\/me\?include_groups=true$ url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/chatgpt.js

[mitm] 
hostname = ios.chat.openai.com 
*/ 

// Quantumult X Rewrite Script 
let body = $response.body; 
let obj = JSON.parse(body); 

// 重写 OpenAI ChatGPT 响应，取消限制
if ($request.url.includes('/backend-api/conversation/init')) {
    // 清空 blocked_features 列表
    obj.blocked_features = [];

    // 设置所有限制为未超过
    if (obj.rate_limits) {
        obj.rate_limits.forEach(limit => {
            limit.limit_exceeded = false;
        });
    }

    // 设置所有模型限制为未超过
    if (obj.model_limits) {
        obj.model_limits.forEach(limit => {
            limit.limit_exceeded = false;
        });
    }

    // 更新 banner_info 的描述
    if (obj.banner_info) {
        obj.banner_info.description = "您现在可以无限制地使用 GPT-4o。";
    }
} else if ($request.url.includes('/backend-api/accounts/check/v4-2023-04-27')) {
    // 修改 /backend-api/accounts/check/v4-2023-04-27 响应体
    const modifyAccountCheck = (account) => {
        account.plan_type = "plus";
        account.rate_limits.limit_exceeded = false;
        account.rate_limits.resets_after = "2024-06-03T13:29:09.715158+00:00";
        account.rate_limits.display_description.description = "无限额";
        account.rate_limits.display_description.markdown_description = "无限额";
        account.rate_limits.resets_after_formatted = "1 秒后";
        account.purchase_origin_platform = "web";
        account.has_previously_paid_subscription = true;
        account.is_eligible_for_yearly_plus_subscription = true;
        account.entitlement.subscription_plan = "chatgptplusplan";
        account.entitlement.has_active_subscription = true;
        account.entitlement.subscription_id = "e6f15a04-e647-4576-9695-e74ae36dbd47";
        account.entitlement.expires_at = "2099-12-31T23:59:59.715158+00:00"; // 设置为未来的一个日期
    };

    modifyAccountCheck(obj.accounts.default.account);
    for (const accountId in obj.accounts) {
        if (obj.accounts.hasOwnProperty(accountId)) {
            modifyAccountCheck(obj.accounts[accountId].account);
        }
    }
} else if ($request.url.includes('/backend-api/me')) {
    // 修改 /backend-api/me 响应体
    const modifyMeResponse = (user) => {
        user.has_payg_project_spend_limit = false;
    };

    modifyMeResponse(obj);
}

// 将 JSON 对象转换回字符串
body = JSON.stringify(obj);

// 返回修改后的响应
$done({ body });
