import { getWenxinAccessToken, getWenxinChatResponse, postWenxinConversationResponse } from './wenxin';
import { getKouziAccessToken, getKouziChatResponse } from './kouzi';
// import { getZhipuToken, getZhipuChatResponse } from './zhipu'; // 如果需要支持智谱清言

export const postTokenApi = async ({ agent, platform }) => {
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinAccessToken();
    case 'kouzi':
      // 假设需要一个授权码来获取访问令牌
      const code = 'your_authorization_code'; // 需要替换为实际的授权码
      return await getKouziAccessToken(code);
    // case 'zhipu':
    //   return await getZhipuToken();
    default:
      throw new Error('Unsupported platform type');
  }
};

export const getAnswerApi = async ({ question, agent, platform }) => {
  switch (platform.type) {
    case 'wenxin':
      return await getWenxinChatResponse(question);
    case 'kouzi':
      const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
      return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
    // case 'zhipu':
    //   const token = 'your_token'; // 需要替换为实际的 token
    //   return await getZhipuChatResponse(question, token);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const postConversationApi = async ({ question, agent, platform }) => {
    switch (platform.type) {
        case 'wenxin':
          return await postWenxinConversationResponse(question);
        case 'kouzi':
          const accessToken = 'your_access_token'; // 需要替换为实际的访问令牌
          return await getKouziChatResponse(question, agent.botId, agent.userId, accessToken);
        // case 'zhipu':
        //   const token = 'your_token'; // 需要替换为实际的 token
        //   return await getZhipuChatResponse(question, token);
        default:
          throw new Error('Unsupported platform type');
      }
};
