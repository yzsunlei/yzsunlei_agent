import dotenv from 'dotenv';
dotenv.config();

import { 
  postAnswerApi, 
  postConversationApi, 
  postTokenApi 
} from './services/index.js';

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser());

router.get("/", async (ctx) => {
  ctx.body = "Hello World";
});

router.post("/api/postToken", async (ctx) => {
  console.log('postTokenApi 接收到请求');
  try {
    const { agent, platform } = ctx.request.body;
    const response = await postTokenApi({ agent, platform });
    ctx.body = response;
  } catch (error) {
    console.error('postTokenApi 失败:', error);
    ctx.status = 500;
    ctx.body = { error: 'postTokenApi 失败' };
  }
});

router.post("/api/postConversation", async (ctx) => {
  try {
    const { question, agent, platform, access_token } = ctx.request.body;
    const response = await postConversationApi({ question, agent, platform, access_token });
    ctx.body = response;
  } catch (error) {
    console.error('postConversationApi 失败:', error);
    ctx.status = 500;
    ctx.body = { error: 'postConversationApi 失败' };
  }
});

router.post("/api/postAnswer", async (ctx) => {
  try {
    const { question, agent, platform, access_token } = ctx.request.body;
    const response = await postAnswerApi({ question, agent, platform, access_token });
    ctx.body = response;
  } catch (error) {
    console.error('postAnswerApi 失败:', error);
    ctx.status = 500;
    ctx.body = { error: 'postAnswerApi 失败' };
  }
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    ctx.set('Content-Type', 'text/html;charset=utf-8');
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// 路由
app.use(router.routes());

// 404
app.use(ctx => {
  ctx.status = 404;
  ctx.body = 'Not Found';
});

app.listen(3000);