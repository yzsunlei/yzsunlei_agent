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