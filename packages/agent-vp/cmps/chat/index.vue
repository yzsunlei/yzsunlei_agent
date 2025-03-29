<template>
  <el-card class="chat-card">
    <div class="chat-header">
      <div class="chat-agent-list" v-if="!currentAgent.name">
        <el-tag type="primary" v-for="it in agentList" @click="setCurrentAgent(it)">{{ it.name }}</el-tag>
      </div>
      <div class="chat-current" v-if="currentAgent.name">
        <span><i @click="setCurrentAgent({})">&lt;</i> {{ currentAgent.name }}</span>
        <el-select v-model="currentPlatform" :value-key="'type'" size="medium" style="width: 120px"
          @change="changePlatform">
          <el-option :key="it.type" :label="it.name" :value="it" v-for="it in currentAgent.platforms" />
        </el-select>
      </div>
    </div>
    <div class="chat-body">
      <el-input v-model="userInput" type="textarea" rows="2" placeholder="请输入您的问题" @keyup.enter="sendMessage"
        clearable />
    </div>
    <div class="chat-footer">
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import agents from "/agents.json";
import { getAnswerApi, postConversationApi, postTokenApi, normalizeAnswerResponse, normalizeConversationResponse } from "/services/index";

const agentList = ref(agents || []);
const defaultAgent = agentList.value?.[0];
const defaultPlatform = agentList.value?.[0]?.platforms?.[0];
const currentAgent = ref(agentList.value?.[0]);
const currentPlatform = ref(agentList.value?.[0]?.platforms?.[0]);
const userInput = ref('');

const emit = defineEmits(['send-message', 'get-answer', 'post-conversation']);

const setCurrentAgent = (it) => {
  currentAgent.value = it;
  currentPlatform.value = it.platforms?.[0];
  postToken();
};

const changePlatform = (platform) => {
  console.log('changePlatform', platform);
  currentPlatform.value = platform;
  postToken();
};

const sendMessage = async () => {
  if (!userInput.value) return;
  console.log('sendMessage：', userInput.value);
  emit('send-message', userInput.value)
  // getAnswer(userInput.value);
  postConversation(userInput.value);
  userInput.value = "";
};

const postToken = async () => {
  try {
    const res = await postTokenApi({
      agent: currentAgent.value || defaultAgent,
      platform: currentPlatform.value || defaultPlatform,
    });
    // console.log('postTokenApi', res);
    localStorage.setItem(`AGENT_${currentPlatform.value?.type}_TOKEN`, res);
  } catch (error) {
    console.log('postTokenApi error', error);
  }
};

const getAnswer = async (question) => {
  try {
    const res = await getAnswerApi({
      question: question,
      agent: currentAgent.value || defaultAgent,
      platform: currentPlatform.value || defaultPlatform
    });
    emit('get-answer', normalizeAnswerResponse(res, currentPlatform.value || defaultPlatform));
    // console.log('getAnswerApi', res);
  } catch (error) {
    console.log('getAnswerApi error', error);
  }
};

const postConversation = async (question) => {
  try {
    const source = await postConversationApi({
      question: question,
      agent: currentAgent.value || defaultAgent,
      platform: currentPlatform.value || defaultPlatform
    });
    const eventName = currentPlatform.value?.type === 'kouzi' ? 'conversation.message.delta' : 'message';
    source.addEventListener(eventName, function (e) {
      try {
        var data = JSON.parse(e.data);
        // console.log(data);
        emit('post-conversation', normalizeConversationResponse(data, currentPlatform.value || defaultPlatform));
      } catch (error) {
        console.log('postConversationApi parse error', error);
      }
    });
    console.log('postConversationApi', source);
  } catch (error) {
    console.log('postConversationApi error', error);
  }
};

onMounted(() => {
  setCurrentAgent(defaultAgent);
});
</script>

<style scoped>
.chat-card {
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 0px;

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
