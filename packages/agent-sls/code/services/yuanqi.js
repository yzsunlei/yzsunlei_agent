import axios from 'axios';
import { SSE } from "sse.js";

// 创建一个 Axios 实例
const yuanqiClient = axios.create({
  baseURL: 'https://yuanqi.tencent.com/', // 文心智能体的实际 API 地址
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// 获取 access_token
export const getYuanqiAccessToken = async () => {
  try {
    return await process.env.VITE_YUANQI_CLIENT_SECRET;
  } catch (error) {
    console.error('获取元器 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getYuanqiChatResponse = async (message, access_token, platform) => {
  try {
    const response = await yuanqiClient.post('/openapi/v1/agent/chat/completions', {
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: message
            }
          ]
        }
      ],
      assistant_id: platform.id,
      user_id: ''
    }, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error('元器 API 请求失败:', error);
    throw error;
  }
};

// 获取流式对话响应
export const postYuanqiConversationResponse = async (message, access_token, platform) => {
  console.log('postYuanqiConversationResponse', message, access_token, platform);
  try {
    const url = `https://yuanqi.tencent.com/openapi/v1/agent/chat/completions`;
    const payload = JSON.stringify({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: message
            }
          ]
        }
      ],
      assistant_id: platform.id,
      user_id: '',
      stream: true
    });
    const source = new SSE(url,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
        method: "post",
        payload: payload
      }
    );
    return source;
  } catch (error) {
    console.error('元器 API 请求失败:', error);
    throw error;
  }
};

