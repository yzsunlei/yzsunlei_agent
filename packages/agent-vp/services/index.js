import { getWenxinAccessToken, getWenxinChatResponse, postWenxinConversationResponse } from './wenxin';
import { postZhipuToken, getZhipuChatResponse, postZhipuConversationResponse } from './zhipu';
import { getYuanqiAccessToken, getYuanqiChatResponse, postYuanqiConversationResponse } from './yuanqi';
import { getKouziAccessToken, getKouziChatResponse } from './kouzi';

export const postTokenApi = async ({ agent, platform }) => {
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinAccessToken();
    case 'zhipu':
      return await postZhipuToken();
    case 'yuanqi':
      return await getYuanqiAccessToken();
    case 'kouzi':
      // 假设需要一个授权码来获取访问令牌
      const code = 'your_authorization_code'; // 需要替换为实际的授权码
      return await getKouziAccessToken(code);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const getAnswerApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinChatResponse(question);
    case 'zhipu':
      return await getZhipuChatResponse(question, access_token);
    case 'yuanqi':
      return await getYuanqiChatResponse(question, access_token);
    case 'kouzi':
      const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
      return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const postConversationApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
  switch (platform.type) {
    case 'wenxin':
      return await postWenxinConversationResponse(question);
    case 'zhipu':
      return await postZhipuConversationResponse(question, access_token);
    case 'yuanqi':
      return await postYuanqiConversationResponse(question, access_token);
    case 'kouzi':
      const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
      return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const normalizeAnswerResponse = (response, platform) => {
  // console.log('normalizeAnswerResponse', response, platform);
  switch (platform.type) {
    case 'wenxin':
      return response?.data?.content?.map(it => ({ text: it?.data, dataType: it?.dataType, type: "replace" }));
    case 'zhipu':
      return response?.result?.output?.[0]?.content?.map(it => ({ text: it.text, dataType: it.type, type: "replace" }));
    case 'yuanqi':
      return [response?.choices?.[0]?.message]?.map(it => ({ text: it.content, dataType: "text", type: "replace" }));
    case 'kouzi':
      return response.data.content;
    default:
      throw new Error('Unsupported platform type');
  }
};

export const normalizeConversationResponse = (response, platform) => {
  // console.log('normalizeConversationResponse', response, platform);
  switch (platform.type) {
    case 'wenxin':
      return response?.data?.message?.content?.map(it => ({ text: it?.data?.text, dataType: it?.dataType, type: it?.data?.showType }));
    case 'zhipu':
      return [response.message.content]?.filter(Boolean)?.map(it => ({ text: it.text, dataType: it.type, type: "replace" }));
    case 'yuanqi':
      return response.choices?.map(it => ({ text: it.delta.content, dataType: "text", type: "append" }));
    case 'kouzi':
      return response.data.content;
    default:
      throw new Error('Unsupported platform type');
  }
};