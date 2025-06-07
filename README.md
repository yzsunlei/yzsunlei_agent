# yzsunlei_agent 项目

这是一个基于 Vue 3 和阿里云函数计算的 AI Agent 平台展示项目，包含多个智能体平台的集成。项目分为前端和后端两部分，前端使用 Vue 3 和 Vite 构建，后端采用 Express 框架并通过阿里云函数计算进行 Serverless 部署。

## 技术栈

- **前端**：Vue 3、Vite、Pinia、Element Plus
- **后端**：Express、Node.js
- **部署**：阿里云函数计算（Serverless Devs 工具）
- **构建工具**：Vite、Webpack（通过 Vite 插件支持）

## 功能亮点

1. **多 AI 平台集成**：支持多种 AI 智能体平台的接入和展示。
2. **Serverless 部署**：后端服务通过阿里云函数计算实现无服务器部署，降低运维成本。
3. **响应式设计**：前端采用 Vue 3 和 Element Plus 实现响应式布局，提供良好的用户体验。
4. **模块化架构**：前后端分离，代码结构清晰，易于扩展和维护。

## 部署步骤

### 前端部署

1. 进入 `agent-vp` 目录：
```bash
   cd packages/agent-vp
```
2.  安装依赖：
```bash
  npm install
```
3. 启动开发服务器：
```
  npm run dev
```
4. 构建项目：
```
  npm run build
```

### 后端部署
1. 进入 agent-sls 目录：
```
  cd packages/agent-sls
```
2. 安装依赖：
```
  npm install
```
3. 部署到阿里云函数计算：
```
 s deploy
```
4. 配置函数计算环境变量：
