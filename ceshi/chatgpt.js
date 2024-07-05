/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

[rewrite_local]
^https:\/\/ios\.chat\.openai\.com\/backend-api\/accounts\/check\/v4-2023-04-27$ script-response-body https://raw.githubusercontent.com/yjlsx/quantumult-x/master/ceshi/rewrite.js

[mitm]
hostname = ios.chat.openai.com


// Quantumult X Rewrite Script
let body = $response.body;
let obj = JSON.parse(body);

// Modify the JSON response for the default account
obj.accounts.default.account.plan_type = "plus";
obj.accounts.default.account.has_previously_paid_subscription = true;
obj.accounts.default.is_eligible_for_yearly_plus_subscription = true;
obj.accounts.default.entitlement.subscription_plan = "chatgptplusplan";
obj.accounts.default.entitlement.has_active_subscription = true;
obj.accounts.default.entitlement.expires_at = "2099-12-31T23:59:59Z";  // Setting a far future expiry date

// Convert JSON object back to string
body = JSON.stringify(obj);

// Return the modified response
$done({ body });

