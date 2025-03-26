## 智能体api文档

#### 百度文心

文档地址：https://agents.baidu.com/docs/develop/out-deployment/get_accessionToken/

说明：内测阶段每天可调用500次

##### 获取access_token

说明：
```
// getToken
GET https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
```

请求示例：
```
curl -X GET \
    'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=XXXXXXXID&client_secret=XXXXXXXXXXXXX&scope=smartapp_snsapi_base' \
```

##### 流式对话接口

说明：
```
// postConversation
POST https://agentapi.baidu.com/assistant/conversation?appId=xxx&secretKey=xxx
```

请求示例：
```
curl --location 'https://agentapi.baidu.com/assistant/conversation?appId=xxx&secretKey=xxx' \
--header 'Content-Type: application/json' \
--data '{
    "message": {
        "content": {
            "type": "text",
            "value": {
                "showText": "你好"
            }
        }
    },
    "source": "xxx",
    "from": "openapi",
    "openId": "xxx"
}'
```

#### 字节扣子

文档地址：https://www.coze.cn/open/docs/developer_guides/coze_api_overview

说明：扣子 API 的免费额度为每个账号 100 次 API 调用。

##### 获取访问令牌

说明：
```
curl --location --request GET 'https://www.coze.cn/api/permission/oauth2/authorize?response_type=code&client_id=8173420653665306615182245269****.app.coze&redirect_uri=https://www.coze.cn/open/oauth/apps&state=1294848'
```

请求示例：
```
curl --location --request POST 'https://api.coze.cn/api/permission/oauth2/token' \
--header 'Authorization: Bearer hDPU8gexPcwChkhMvmjvR14yQ1HWoaB42tCd0rjrc55G****' \
--header 'Content-Type: application/json' \
--data '{
    "grant_type": "authorization_code",
    "client_id": "8173420653665306615182245269****.app.coze",
    "redirect_uri": "https://www.coze.cn/open/oauth/apps",
    "code": "bfiqrhedxsdvnuivher****"
}'
```

##### 创建会话接口

说明：
```
// postCreateConversation
POST https://api.coze.cn/v1/conversation/create
```

请求示例：
```
curl --location --request POST 'https://api.coze.cn/v1/conversation/create' \
--header 'Authorization: Bearer pat_OYDacMzM3WyOWV3Dtj2bHRMymzxP****' \
--header 'Content-Type: application/json' \
```

##### 流式对话接口

说明：
```
// postConversation
POST https://api.coze.cn/v3/chat
```

请求示例：

```
curl --location --request POST 'https://api.coze.cn/v3/chat?conversation_id=7374752000116113452' \
--header 'Authorization: Bearer pat_OYDacMzM3WyOWV3Dtj2bHRMymzxP****' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bot_id": "734829333445931****",
    "user_id": "123456789",
    "stream": true,
    "auto_save_history":true,
    "additional_messages":[
        {
            "role":"user",
            "content":"2024年10月1日是星期几",
            "content_type":"text"
        }
    ]
}'
```

#### 智谱清言

##### 获取token

说明：
```
// getToken
POST https://chatglm.cn/chatglm/assistant-api/v1/get_token
```

请求示例：
```
// todo
```

#### 腾讯元器

文档地址：https://docs.qq.com/aio/p/scxmsn78nzsuj64?p=BVUAh9OGFvSEFA7CgBOyED4

说明：当前每个元器用户有1个亿的api token体验使用额度，当免费额度消耗完后，可绑定腾讯云账号进行付费使用。

##### 调用对话

说明：
```
POST https://open.hunyuan.tencent.com/openapi/v1/agent/chat/completions
```

请求示例：
```
import requests
import json

# 定义 API 的 URL
url = 'https://open.hunyuan.tencent.com/openapi/v1/agent/chat/completions'

# 定义请求头
headers = {
    'X-Source': 'openapi',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <元器用户的token>'
}

# 定义请求体
data = {
    "assistant_id": "I4aVQTHpsJro",
    "user_id": "username",
    "stream": False,
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "能创建一个穿着古装的头像吗？"
                }
            ]
        }
    ]
}

# 将请求体转换为 JSON 格式的字符串
json_data = json.dumps(data)

# 发送 POST 请求
response = requests.post(url, headers=headers, json=data)  # 使用 json 参数自动设置正确的 Content-Type
```