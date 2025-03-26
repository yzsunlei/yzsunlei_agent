import axios from 'axios';

// 创建一个 Axios 实例
const kouziClient = axios.create({
  baseURL: 'https://api.coze.cn',
  headers: {
    'Content-Type': 'application/json',
  }
});

// 获取访问令牌
export const getKouziAccessToken = async (clientId, clientSecret, code) => {
  try {
    const response = await axios.post('https://api.coze.cn/api/permission/oauth2/token', {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: 'https://www.coze.cn/open/oauth/apps',
      code
    }, {
      headers: {
        'Authorization': `Bearer ${clientSecret}`
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('获取扣子 access_token 失败:', error);
    throw error;
  }
};

// 获取对话响应
export const getKouziChatResponse = async (message, botId, userId, accessToken) => {
  try {
    const response = await kouziClient.post('/v3/chat', {
      bot_id: botId,
      user_id: userId,
      stream: false,
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: message,
          content_type: 'text'
        }
      ]
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