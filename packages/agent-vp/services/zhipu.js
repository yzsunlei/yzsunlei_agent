import axios from 'axios';

// 创建一个 Axios 实例
const zhipuClient = axios.create({
  baseURL: 'https://chatglm.cn',
  headers: {
    'Content-Type': 'application/json',
  }
});

// 获取 token
export const getZhipuToken = async () => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/get_token');
    return response.data.token;
  } catch (error) {
    console.error('获取智谱 token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getZhipuChatResponse = async (message, token) => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/chat', {
      message: message
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('智谱 API 请求失败:', error);
    throw error;
  }
}; 