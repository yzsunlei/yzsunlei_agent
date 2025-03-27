---
layout: doc
aside: false
---

# AI Agent 对话

欢迎使用我的 AI 对话应用！在这里，你可以与多个平台的智能体进行对话。

<Messages :messages="messages" id="messages" />

<Chat @send-message="onSendMessage" @get-answer="onGetAnswer" @post-conversation="onPostConversation" />

<script setup>
import { ref } from 'vue';
import Chat from '../cmps/chat/index.vue';
import Messages from '../cmps/messages/index.vue';

const chatMessages = ref();
const messages = ref([
  {  message: '你好！你是谁？', sender: 'user', type: 'txt' },
  {  message: '我是Agent-vp，一个集成百度-文心、清华-智谱、字节-扣子等多家智能体平台的Agent工具，我可以调用多平台的Agent调用，并支持解析Markdown、表格、图表、PPT等多种格式内容。如果你有任何问题或需要帮助，尽管问我吧！', sender: 'agent', type: 'txt' }
]);

const onSendMessage = (message) => {
  messages.value.push({
    sender: 'user',
    type: 'txt',
    message: message
  })
};

const onGetAnswer = (answer) => {
  const contents = answer?.data?.content;
  messages.value.push({
    sender: 'agent',
    type: contents?.[0]?.dataType || 'txt',
    message: contents?.[0]?.data
  })
}

const onPostConversation = (answer) => {
  const contents = answer?.data?.message?.content;
  const lastMessage = messages.value[messages.value.length - 1];
  if (lastMessage.sender === 'user') {
      messages.value.push({
        sender: 'agent',
        type: contents?.[0]?.dataType || 'txt',
        message: contents?.[0]?.data?.text || ''
      })
  } else {
    lastMessage.message += contents?.[0]?.data?.text || '';
  }
  setTimeout(() => {
    scrollMessageToBottom();   
  }, 1000);
}

const scrollMessageToBottom = () => {
  const container = document.getElementById('messages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}
</script>

<style lang="less">
.VPDoc {
  .content {
    padding-bottom: 0px !important;
  }
}
</style>
