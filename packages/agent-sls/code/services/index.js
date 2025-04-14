import { getKouziAccessToken, getKouziChatResponse, postKouziConversationResponse } from './kouzi.js';
import { getYuanqiAccessToken, getYuanqiChatResponse, postYuanqiConversationResponse } from './yuanqi.js';
import { postZhipuToken, getZhipuChatResponse, postZhipuConversationResponse } from './zhipu.js';
import { getWenxinAccessToken, getWenxinChatResponse, postWenxinConversationResponse } from './wenxin.js';

export const postTokenApi = async ({ agent, platform }) => {
  switch (platform.type) {
    case 'kouzi':
      return await getKouziAccessToken();
    case 'yuanqi':
      return await getYuanqiAccessToken();
    case 'zhipu':
      return await postZhipuToken();
    case 'wenxin':
      return await getWenxinAccessToken();
    default:
      throw new Error('Unsupported platform type');
  }
};

export const getAnswerApi = async ({ question, agent, platform, access_token }) => {
  switch (platform.type) {
    case 'kouzi':
      return await getKouziChatResponse(question, access_token, platform);
    case 'yuanqi':
      return await getYuanqiChatResponse(question, access_token, platform);
    case 'zhipu':
      return await getZhipuChatResponse(question, access_token, platform);
    case 'wenxin':
      return await getWenxinChatResponse(question, access_token, platform);
    default:
      throw new Error('Unsupported platform type');
  }
};

export const postConversationApi = async ({ question, agent, platform, access_token }) => {
  switch (platform.type) {
    case 'kouzi':
      return await postKouziConversationResponse(question, access_token, platform);
    case 'yuanqi':
      return await postYuanqiConversationResponse(question, access_token, platform);
    case 'zhipu':
      return await postZhipuConversationResponse(question, access_token, platform);
    case 'wenxin':
      return await postWenxinConversationResponse(question, access_token, platform);
    default:
      throw new Error('Unsupported platform type');
  }
};
