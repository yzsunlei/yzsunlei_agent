import axios from 'axios';

// 创建一个 Axios 实例
const kouziClient = axios.create({
  baseURL: 'https://api.coze.cn',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// 获取访问令牌
export const getKouziAccessToken = async (code) => {
  try {
    return await process.env.VITE_KOUZI_CLIENT_SECRET;
  } catch (error) {
    console.error('获取扣子 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getKouziChatResponse = async (message, accessToken, platform) => {
  try {
    const response = await kouziClient.post('/v3/chat', {
      bot_id: platform.id,
      user_id: "12345678",
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ],
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('扣子 API 请求失败:', error);
    throw error;
  }
};

// 获取流式对话响应
export const postKouziConversationResponse = async (message, access_token, platform) => {
  try {
    const url = `https://api.coze.cn/v3/chat`;
    const payload = JSON.stringify({
      bot_id: platform.id,
      user_id: "123456",
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ],
      stream: true
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
    console.error('扣子 API 请求失败:', error);
    throw error;
  }
};
