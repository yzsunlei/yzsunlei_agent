import axios from 'axios';

// 创建一个 Axios 实例
const zhipuClient = axios.create({
  baseURL: 'https://chatglm.cn',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// 获取 token
export const postZhipuToken = async () => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/get_token', 
      {
        api_key: process.env.VITE_ZHIPU_CLIENT_ID,
        api_secret: process.env.VITE_ZHIPU_CLIENT_SECRET
      }
    );
    return response.data.result.access_token;
  } catch (error) {
    console.error('获取智谱 token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getZhipuChatResponse = async (message, access_token, platform) => {
  try {
    const response = await zhipuClient.post('/chatglm/assistant-api/v1/stream_sync', {
      assistant_id: platform.id,
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
export const postZhipuConversationResponse = async (message, access_token, platform) => {
  try {
    const url = `https://chatglm.cn/chatglm/assistant-api/v1/stream?appId=${process.env.VITE_WENXIN_CLIENT_ID}&secretKey=${process.env.VITE_WENXIN_CLIENT_SECRET}`;
    const payload = JSON.stringify({
      assistant_id: platform.id,
      prompt: message
    });
    const response = await axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      },
      data: JSON.parse(payload),
      responseType: 'stream'
    });
    return response;
  } catch (error) {
    console.error('智谱 API 请求失败:', error);
    throw error;
  }
}; 