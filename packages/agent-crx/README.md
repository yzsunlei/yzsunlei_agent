# agent-crx

## 安装项目
执行：
```
npm install
```
或
```
yarn
```

## 使用方法：开发环境

> ※注：为方便演示接口请求，本Demo使用了mock.js，也配置了反向代理。
> mock.js便于直接调试，使用前请修改src/api/index.js，将import '@/mock'前的注释去掉，保证mock.js的正确引入。
> 如使用反向代理，需要自行在本地搭建API服务，接口返回数据可参考src/mock.js中的数据。

执行：
```
npm run dev
```
或
```
yarn dev
```

## 使用方法：build项目

> ※注：
> 1. 执行build前一定检查是否取消mock.js，即确认src/api/index.js中，将import '@/mock'注释掉。这是因为mock.js使用window变量，而运行background script的Service Worker不支持window，将导致插件运行失败。
> 2. 执行build前一定检查src/popup/popup.vue代码中，注释掉import '@/content'。这段代码是用于方便在开发环境调试content script的，否则content script会被集成到popup页面中。

执行：
```
npm run build
```
或
```
yarn build
```

build完成后，打开Chrome浏览器，地址栏输入：
```
chrome://extensions/
```
进入扩展程序界面。

1. 开启右上角的“开发者模式”。
2. 点击左上角的“加载已解压的扩展程序”。
3. 选择项目工程中刚生成的build目录。

## 关于真实API请求（非mock.js模拟请求）

本Demo不包含后端API服务。如在开发环境使用反向代理请求API，或者在build后的正式插件中请求API，请自行搭建后端API服务，返回的数据可参照src/mock.js或教程中相应章节的截图。
