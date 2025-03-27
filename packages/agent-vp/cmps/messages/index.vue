<template>
  <div class="chat-messages">
    <div v-for="(message, index) in messages" :key="index" class="message" :class="message.sender">
      <strong>{{ message.sender }}:</strong>
      <template v-if="message.type === 'txt'">
        <div class="word" v-html="markdown(message.message)"></div>
      </template>
      <template v-if="message.type === 'markdown'">
        <div class="word" v-html="markdown(message.message)"></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
});

const markdown = (text) => {
  // return text;
  return marked.parse(text || "");
};
</script>

<style lang="less" scoped>
.chat-messages {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;

  .message {
    margin-bottom: 10px;

    &.user {
      text-align: right;
    }

    &.agent {
      text-align: left;
    }
  }
}
</style>
