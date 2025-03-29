import axios from 'axios';
import { SSE } from 'sse.js';

// 创建一个 Axios 实例
const zhipuClient = axios.create({
  baseURL: 'https://chatglm.cn',
  headers: {
    'Content-Type': 'application/json',
  }
});

// 获取 token
export const postZhipuToken = async () => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/get_token', 
      {
        api_key: import.meta.env.VITE_ZHIPU_CLIENT_ID,
        api_secret: import.meta.env.VITE_ZHIPU_CLIENT_SECRET
      }
    );
    return response.data.result.access_token;
  } catch (error) {
    console.error('获取智谱 token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getZhipuChatResponse = async (message, access_token) => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/stream_sync', {
      assistant_id: import.meta.env.VITE_ZHIPU_ASSISTANT_ID,
      prompt: message
    }, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (error) {
    console.error('智谱 API 请求失败:', error);
    throw error;
  }
};

// 获取流式对话响应
export const postZhipuConversationResponse = async (message, access_token) => {
  try {
    const url = `https://chatglm.cn/chatglm/assistant-api/v1/stream?appId=${import.meta.env.VITE_WENXIN_CLIENT_ID}&secretKey=${import.meta.env.VITE_WENXIN_CLIENT_SECRET}`;
    const payload = JSON.stringify({
      assistant_id: import.meta.env.VITE_ZHIPU_ASSISTANT_ID,
      prompt: message
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
    console.error('智谱 API 请求失败:', error);
    throw error;
  }
}; 