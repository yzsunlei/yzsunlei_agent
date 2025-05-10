import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://agent-sls.yzsunlei.com",
  // baseURL: 'http://agent-sls.yzsunlei.com',
  timeout: 60000
})

export const postTokenApi = async ({ agent, platform }) => {
  try {
    const res = await instance.post('/api/postToken', { agent, platform });
    console.log("postTokenApi", res);
    return res;
  } catch (error) {
    console.error('获取数据失败:', error)
  }
};

export const postAnswerApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  try {
    const res = await instance.post('/api/postAnswer', { question, agent, access_token, platform });
    // console.log("postAnswerApi", res);
    return res;
  } catch (error) {
    console.error('获取数据失败:', error)
  }
};

export const postConversationApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  try {
    const res = await instance.post('/api/postConversation', { question, agent, access_token, platform }, { responseType: 'stream' });
    console.log("postConversationApi", res);
    return res.data;
  } catch (error) {
    console.error('获取数据失败:', error)
  }
};
