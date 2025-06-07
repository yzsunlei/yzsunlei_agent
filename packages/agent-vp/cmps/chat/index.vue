<template>
  <el-card class="chat-card">
    <div class="chat-header">
      <div class="chat-agent-list">
        <el-tag type="primary" v-for="it in agentList" @click="setCurrentAgent(it)">{{ it.name }}</el-tag>
      </div>
      <div class="chat-current" v-if="currentAgent.name">
        <div class="title"><el-icon><Place /></el-icon> <span>{{ currentAgent.name }}</span></div>
        <div class="platform">
          <el-tooltip content="点击去原平台看看" placement="top">
            <a :href="currentPlatform.url" target="_blank" style="margin-right: 8px">
              <el-icon><Connection /></el-icon>
            </a>
          </el-tooltip>
          <el-select v-model="currentPlatform" :value-key="'type'" size="medium" style="width: 120px"
            @change="changePlatform">
            <el-option :key="it.type" :label="it.name" :value="it" v-for="it in currentAgent.platforms" />
          </el-select>
        </div>
      </div>
    </div>
    <div class="chat-body">
      <el-input v-model="userInput" type="textarea" rows="3" placeholder="请输入您的问题" @keyup.enter="sendMessage"
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
import { postAnswerApi, postConversationApi, postTokenApi } from "/services/index";
import { normalizeAnswerResponse, normalizeConversationResponse } from "/utils/index";

const agentList = ref(agents || []);
const defaultAgent = agentList.value?.[0];
const defaultPlatform = agentList.value?.[0]?.platforms?.[0];
const currentAgent = ref(agentList.value?.[0]);
const currentPlatform = ref(agentList.value?.[0]?.platforms?.[0]);
const userInput = ref('');

const emit = defineEmits(['send-message', 'post-answer', 'post-conversation']);

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
  // postAnswer(userInput.value);
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
    localStorage.setItem(`AGENT_${currentPlatform.value?.type}_TOKEN`, res.data);
  } catch (error) {
    console.log('postTokenApi error', error);
  }
};

const postAnswer = async (question) => {
  try {
    const res = await postAnswerApi({
      question: question,
      agent: currentAgent.value || defaultAgent,
      platform: currentPlatform.value || defaultPlatform
    });
    emit('post-answer', normalizeAnswerResponse(res.data, currentPlatform.value || defaultPlatform));
    // console.log('postAnswerApi', res);
  } catch (error) {
    console.log('postAnswerApi error', error);
  }
};

const postConversation = async (question) => {
  try {
    const source = postConversationApi(
      {
        question,
        agent: currentAgent.value || defaultAgent,
        platform: currentPlatform.value || defaultPlatform
      }
    );

    // 监听消息
    const eventName = currentPlatform.value?.type === 'kouzi' ? 'conversation.message.delta' : 'message';
    source.addEventListener(eventName, (event) => {
      try {
        const data = JSON.parse(event.data);
        emit('post-conversation', normalizeConversationResponse(data, currentPlatform.value || defaultPlatform));
      } catch (e) {
        console.error('解析流数据失败:', event.data);
      }
    });

    // 监听连接打开
    source.addEventListener('open', () => {
      console.log('✅ SSE 连接已打开');
    });

    // 异常事件
    source.addEventListener('', (event) => {
      console.log('📢 收到未知类型事件:', event.type, event.data);
    });

    // 错误监听
    source.addEventListener('error', (err) => {
      console.error('SSE 连接异常:', err);
    });

  } catch (error) {
    console.error('postConversationApi error:', error);
  }
};

onMounted(() => {
  setCurrentAgent(defaultAgent);
});
</script>

<style lang="less" scoped>
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
      margin-top: 8px;

      .title, .platform {
        font-size: 14px;
        i,span {
          vertical-align: middle;
        }
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
