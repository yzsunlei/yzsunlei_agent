import axios from 'axios';

// 创建一个 Axios 实例
const wenxinClient = axios.create({
  baseURL: 'https://agentapi.baidu.com', // 文心智能体的实际 API 地址
  headers: {
    'Content-Type': 'application/json',
  }
});

// 获取 access_token
export const getWenxinAccessToken = async (clientId, clientSecret) => {
  try {
    const response = await axios.get('https://openapi.baidu.com/oauth/2.0/token', {
      params: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('获取文心 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getWenxinChatResponse = async (message, appId, secretKey) => {
  try {
    const response = await wenxinClient.post('/assistant/getAnswer', {
      message: {
        content: {
          type: 'text',
          value: {
            showText: message
          }
        }
      },
      source: 'openapi',
      from: 'openapi',
      openId: 'your_open_id' // 替换为实际的 openId
    }, {
      params: {
        appId,
        secretKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('文心 API 请求失败:', error);
    throw error;
  }
}; 