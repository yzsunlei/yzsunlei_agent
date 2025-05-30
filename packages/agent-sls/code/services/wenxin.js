import axios from 'axios';

// 创建一个 Axios 实例
const wenxinClient = axios.create({
  baseURL: 'https://agentapi.baidu.com', // 文心智能体的实际 API 地址
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// 获取 access_token
export const getWenxinAccessToken = async () => {
  try {
    const response = await axios.get('https://openapi.baidu.com/oauth/2.0/token', {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.VITE_WENXIN_CLIENT_ID,
        client_secret: process.env.VITE_WENXIN_CLIENT_SECRET
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('获取文心 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getWenxinChatResponse = async (message, access_token, platform) => {
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
      source: platform.id,
      from: 'openapi',
      openId: 'your_open_id' // 替换为实际的 openId
    }, {
      params: {
        appId: process.env.VITE_WENXIN_CLIENT_ID,
        secretKey: process.env.VITE_WENXIN_CLIENT_SECRET
      }
    });
    return response.data;
  } catch (error) {
    console.error('文心 API 请求失败:', error);
    throw error;
  }
};

// 获取流式对话响应
export const postWenxinConversationResponse = async (message, access_token, platform) => {
  try {
    const url = `https://agentapi.baidu.com/assistant/conversation?appId=${process.env.VITE_WENXIN_CLIENT_ID}&secretKey=${process.env.VITE_WENXIN_CLIENT_SECRET}`;
    const payload = JSON.stringify({
      message: {
        content: {
          type: 'text',
          value: {
            showText: message
          }
        }
      },
      source: platform.id,
      from: 'openapi',
      openId: 'your_open_id' // 替换为实际的 openId
    });
    const response = await axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.parse(payload),
      responseType: 'stream'
    });
    return response;
  } catch (error) {
    console.error('文心 API 请求失败:', error);
    throw error;
  }
};