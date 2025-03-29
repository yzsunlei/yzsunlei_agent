import { getKouziAccessToken, getKouziChatResponse, postKouziConversationResponse } from './kouzi';
import { getYuanqiAccessToken, getYuanqiChatResponse, postYuanqiConversationResponse } from './yuanqi';
import { postZhipuToken, getZhipuChatResponse, postZhipuConversationResponse } from './zhipu';
import { getWenxinAccessToken, getWenxinChatResponse, postWenxinConversationResponse } from './wenxin';

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

export const getAnswerApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
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

export const postConversationApi = async ({ question, agent, platform }) => {
  const access_token = localStorage.getItem(`AGENT_${platform?.type}_TOKEN`);
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

export const normalizeAnswerResponse = (response, platform) => {
  // console.log('normalizeAnswerResponse', response, platform);
  switch (platform.type) {
    case 'kouzi':
      return [{ text: response?.content, dataType: response.content_type, type: "replace" }];
    case 'yuanqi':
      return [response?.choices?.[0]?.message]?.map(it => ({ text: it.content, dataType: "text", type: "replace" }));
    case 'zhipu':
      return response?.result?.output?.[0]?.content?.map(it => ({ text: it.text, dataType: it.type, type: "replace" }));
    case 'wenxin':
      return response?.data?.content?.map(it => ({ text: it?.data, dataType: it?.dataType, type: "replace" }));
    default:
      throw new Error('Unsupported platform type');
  }
};

export const normalizeConversationResponse = (response, platform) => {
  // console.log('normalizeConversationResponse', response, platform);
  switch (platform.type) {
    case 'kouzi':
      return [{ text: response?.content, dataType: response.content_type, type: "append" }];
    case 'yuanqi':
      return response.choices?.map(it => ({ text: it.delta.content, dataType: "text", type: "append" }));
    case 'zhipu':
      return [response.message.content]?.filter(Boolean)?.map(it => ({ text: it.text, dataType: it.type, type: "replace" }));
    case 'wenxin':
      return response?.data?.message?.content?.map(it => ({ text: it?.data?.text, dataType: it?.dataType, type: it?.data?.showType }));
    default:
      throw new Error('Unsupported platform type');
  }
};