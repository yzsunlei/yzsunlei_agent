<template>
  <el-card class="chat-card">
    <el-input v-model="userInput" type="textarea" rows="5" placeholder="请输入您的问题" @keyup.enter="sendMessage" clearable />
    <el-button type="primary" @click="sendMessage">发送</el-button>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('');

const sendMessage = () => {
  console.log('发送消息：', userInput.value);
};
</script>

<style scoped>
.chat-card {
  width: 100%;
  margin: 0 auto;
  padding: 20px;

  .el-input {
    margin-top: 8px;
  }
}
</style>
