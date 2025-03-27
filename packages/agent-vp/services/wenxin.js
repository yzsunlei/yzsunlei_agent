import axios from 'axios';
import { SSE } from "sse.js";

// 创建一个 Axios 实例
const wenxinClient = axios.create({
  baseURL: 'https://agentapi.baidu.com', // 文心智能体的实际 API 地址
  headers: {
    'Content-Type': 'application/json',
  }
});

// 获取 access_token
export const getWenxinAccessToken = async () => {
  try {
    const response = await axios.get('https://openapi.baidu.com/oauth/2.0/token', {
      params: {
        grant_type: 'client_credentials',
        client_id: import.meta.env.VITE_WENXIN_CLIENT_ID,
        client_secret: import.meta.env.VITE_WENXIN_CLIENT_SECRET
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('获取文心 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getWenxinChatResponse = async (message) => {
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
      source: import.meta.env.VITE_WENXIN_CLIENT_ID,
      from: 'openapi',
      openId: 'your_open_id' // 替换为实际的 openId
    }, {
      params: {
        appId: import.meta.env.VITE_WENXIN_CLIENT_ID,
        secretKey: import.meta.env.VITE_WENXIN_CLIENT_SECRET
      }
    });
    return response.data;
  } catch (error) {
    console.error('文心 API 请求失败:', error);
    throw error;
  }
};

// 获取流式对话响应
export const postWenxinConversationResponse = async (message) => {
  try {
    const url = `https://agentapi.baidu.com/assistant/conversation?appId=${import.meta.env.VITE_WENXIN_CLIENT_ID}&secretKey=${import.meta.env.VITE_WENXIN_CLIENT_SECRET}`;
    const payload = JSON.stringify({
      message: {
        content: {
          type: 'text',
          value: {
            showText: message
          }
        }
      },
      source: import.meta.env.VITE_WENXIN_CLIENT_ID,
      from: 'openapi',
      openId: 'your_open_id' // 替换为实际的 openId
    });
    const source = new SSE(url,
      {
        headers: { 'Content-Type': 'application/json' },
        method: "post",
        payload: payload
      }
    );
    return source;
  } catch (error) {
    console.error('文心 API 请求失败:', error);
    throw error;
  }
};

