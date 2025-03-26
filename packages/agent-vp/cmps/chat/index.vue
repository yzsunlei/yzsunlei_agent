<template>
  <el-card class="chat-card">
    <div class="chat-header">
      <div class="chat-agent-list" v-if="!currentAgent.name">
        <el-tag type="primary" v-for="it in agentList" @click="setCurrentAgent(it)">{{ it.name }}</el-tag>
      </div>
      <div class="chat-current" v-if="currentAgent.name">
        <span><i @click="setCurrentAgent({})"><</i> {{ currentAgent.name }}</span>
        <el-select v-model="currentPlatform" size="medium" style="width: 120px" @change="changePlatform">
          <el-option :label="it.name" :value="it.name" v-for="it in currentAgent.platforms" />
        </el-select>
      </div>
    </div>
    <div class="chat-body">
      <el-input v-model="userInput" type="textarea" rows="5" placeholder="请输入您的问题" @keyup.enter="sendMessage" clearable />
    </div>
    <div class="chat-footer">
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import agents from "/agents.json";

const agentList = ref(agents || []);
const currentAgent = ref({});
const currentPlatform = ref("");
const userInput = ref('');

const setCurrentAgent = (it) => {
  currentAgent.value = it;
  currentPlatform.value = it.platforms?.[0]?.name;
};

const changePlatform = (platform) => {
  currentPlatform.value = platform;
};

const sendMessage = () => {
  console.log('发送消息：', userInput.value);
};
</script>

<style scoped>
.chat-card {
  width: 100%;
  margin: 0 auto;
  padding: 20px;

  .chat-header {
    margin-bottom: 8px;
    .chat-agent-list {
      .el-tag {
        margin-right: 8px;
        cursor: pointer;
      }
    }
    .chat-current {
      display: flex;
      justify-content: space-between;
      align-items: center;

      i {
        cursor: pointer;
      }
    }
   }

   .chat-body {
    .el-input {
      margin-top: 8px;
    }
   }
   .chat-footer {
    margin-top: 8px;
    text-align: right;
   }
}
</style>
