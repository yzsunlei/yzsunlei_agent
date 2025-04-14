import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 10000
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

export const getAnswerApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  try {
    const res = await instance.post('/api/getAnswer', { question, agent, access_token, platform });
    // console.log("getAnswerApi", res);
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
