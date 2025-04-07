import { 
  getAnswerApi, 
  postConversationApi, 
  postTokenApi 
} from './services/index.js';

import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();

router.post("/api/postTokenApi", async (ctx) => {
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

router.post("/api/postConversationApi", async (ctx) => {
  try {
    const { question, agent, platform } = ctx.request.body;
    const response = await postConversationApi({ question, agent, platform });
    ctx.body = response;
  } catch (error) {
    console.error('postConversationApi 失败:', error);
    ctx.status = 500;
    ctx.body = { error: 'postConversationApi 失败' };
  }
});

router.get("/api/getAnswerApi", async (ctx) => {
  try {
    const { question, agent, platform } = ctx.request.body;
    const response = await getAnswerApi({ question, agent, platform });
    ctx.body = response;
  } catch (error) {
    console.error('getAnswerApi 失败:', error);
    ctx.status = 500;
    ctx.body = { error: 'getAnswerApi 失败' };
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

app.listen(9000);