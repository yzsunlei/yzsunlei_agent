
# AI Agent 对话

欢迎使用 AI 对话应用！在这里，你可以与多个智能体进行对话。

<Messages :messages="messages" />

<Chat @send-message="onSendMessage" @get-answer="onGetAnswer" @post-conversation="onPostConversation" />

<script setup>
import { ref } from 'vue';
import Chat from '../cmps/chat/index.vue';
import Messages from '../cmps/messages/index.vue';

const messages = ref([]);

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
</script>

