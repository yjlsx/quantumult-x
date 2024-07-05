
/** 
 * @fileoverview Quantumult X 脚本，用于重写 OpenAI ChatGPT 的账户和限制信息。 
 *  
 */ 
/* 
[rewrite_local] 
# 重写 OpenAI ChatGPT 响应，取消限制
^https:\/\/ios\.chat\.openai\.com\/backend-api\/conversation\/init url script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/chatgpt.js

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

// 修改账户信息和限制信息
if (obj.accounts) {
    for (const accountId in obj.accounts) {
        if (obj.accounts.hasOwnProperty(accountId)) {
            let account = obj.accounts[accountId].account;

            // 修改账户信息
            account.plan_type = "plus";
            account.has_previously_paid_subscription = true;
            account.is_eligible_for_yearly_plus_subscription = true;
            account.entitlement.subscription_plan = "chatgptplusplan";
            account.entitlement.has_active_subscription = true;
            account.entitlement.subscription_id = "e6f15a04-e647-4576-9695-e74ae36dbd47";
            account.entitlement.expires_at = "2099-12-31T23:59:59.715158+00:00"; // 设置为未来的一个日期

            // 修改限制信息
            let rateLimits = obj.accounts[accountId].rate_limits;
            rateLimits.forEach(limit => {
                switch (limit.limit_details.type) {
                    case "model_limit":
                        limit.limit_exceeded = false;
                        limit.resets_after_formatted = "1 秒后";
                        break;
                    case "feature_limit":
                        switch (limit.limit_details.feature_limit_name) {
                            case "gizmo":
                                limit.limit_exceeded = false;
                                limit.resets_after_formatted = "1 秒后";
                                break;
                            case "file_upload":
                                limit.limit_exceeded = false;
                                limit.resets_after_formatted = "1 秒后";
                                limit.call_to_action = "get_plus";
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    }
}

// 将 JSON 对象转换回字符串
body = JSON.stringify(obj);

// 返回修改后的响应
$done({ body });

