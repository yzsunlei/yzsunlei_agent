
# AI 对话页面

欢迎使用 AI 对话应用！在这里，你可以与多个智能体进行对话。

<Messages :messages="messages" />

<Chat />

<script setup>
import { ref } from 'vue';
import Chat from '../cmps/chat/index.vue';
import Messages from '../cmps/messages/index.vue';

const messages = ref([
  { sender: 'User', text: 'Hello!' },
  { sender: 'Agent', text: 'Hi there! How can I assist you today?' }
]);
</script>

