<template>
  <div class="chat-messages">
    <div v-for="(message, index) in messages" :key="index" class="message">
      <strong>{{ message.sender }}:</strong> {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.chat-messages {
  margin-top: 20px;

  .message {
    margin-bottom: 10px;
  }
}
</style>
