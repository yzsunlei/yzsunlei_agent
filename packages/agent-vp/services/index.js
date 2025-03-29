import { getWenxinAccessToken, getWenxinChatResponse, postWenxinConversationResponse } from './wenxin';
import { postZhipuToken, getZhipuChatResponse } from './zhipu';
import { getKouziAccessToken, getKouziChatResponse } from './kouzi';

export const postTokenApi = async ({ agent, platform }) => {
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinAccessToken();
    case 'zhipu':
      return await postZhipuToken();
    case 'kouzi':
      // 假设需要一个授权码来获取访问令牌
      const code = 'your_authorization_code'; // 需要替换为实际的授权码
      return await getKouziAccessToken(code);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const getAnswerApi = async ({ question, agent, platform }) => {
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinChatResponse(question);
    case 'zhipu':
      const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
      return await getZhipuChatResponse(question, access_token);
    case 'kouzi':
      const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
      return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const postConversationApi = async ({ question, agent, platform }) => {
    switch (platform.type) {
        case 'wenxin':
          return await postWenxinConversationResponse(question);
        case 'zhipu':
          const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
          return await postZhipuConversationResponse(question, access_token);
        case 'kouzi':
          const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
          return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
        default:
          throw new Error('Unsupported platform type');
      }
};

export const normalizeResponse = (response, platform) => {
  // console.log('normalizeResponse', response, platform);
  switch (platform.type) {
    case 'wenxin':
      return response?.data?.message?.content?.map(it => ({ text: it?.data?.text, dataType: it?.dataType, type: it?.data?.showType }));
    case 'zhipu':
      return [response.message.content]?.filter(Boolean)?.map(it => ({ text: it.text, dataType: it.type, type: "replace" }));
    case 'kouzi':
      return response.data.content;
    default:
      throw new Error('Unsupported platform type');
  }
};