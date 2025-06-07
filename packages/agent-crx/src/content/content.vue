<script setup>
import {ref} from 'vue'

// 对话框显示状态
const isShowMainDialog = ref(false)

// 新页面打开插件内容
const openContent = () => {
    window.open("http://www.yzsunlei.com/agent_vp/pages/agent-home.html?utm_source=agent-crx", '_blank')
}

</script>

<template>
    <el-config-provider namespace="wao-el">
        <div class="wao-content" title="单击侧边打开，双击新窗口打开">
            <div class="content-entry" @click="isShowMainDialog = true" @dblclick="openContent"></div>
        </div>
    </el-config-provider>
</template>

<style scoped lang="stylus">
.wao-content
    .content-entry
        position: fixed
        z-index: 9999
        bottom: 100px
        right: 30px
        width: 40px
        height: 40px
        background: url('images/content-icon.png')
        background-size: 100% 100%
        cursor: pointer
</style>
