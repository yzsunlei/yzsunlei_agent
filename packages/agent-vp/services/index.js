import axios from 'axios';
import { SSE } from 'sse.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://agent-sls.yzsunlei.com",
  // baseURL: 'http://agent-sls.yzsunlei.com',
  timeout: 60000
})

export const postTokenApi = async ({ agent, platform }) => {
  try {
    const res = await instance.post('/api/postToken', { agent, platform });
    // console.log("postTokenApi", res);
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

export const postConversationApi = ({ question, agent, platform }, onMessage) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  const url = new URL('/api/postConversation', import.meta.env.VITE_API_BASE_URL || 'http://agent-sls.yzsunlei.com');

  const body = {
    question,
    agent,
    platform,
    access_token,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  // 创建 sse 实例
  const source = new SSE(url.toString(), {
    method: 'POST',
    headers: headers,
    payload: JSON.stringify(body),
    // heartbeatTimeout: 60000, // 可选：心跳超时时间
  });

  return source;
};
