import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 预检请求缓存时间（秒）
}));
dotenv.config();

import { 
  postTokenApi,
  postAnswerApi, 
  postConversationApi
} from './services/index.js';

app.post("/api/postToken", async (req, res) => {
  console.log('postTokenApi 接收到请求');
  try {
    const { agent, platform } = req.body;
    const response = await postTokenApi({ agent, platform });
    res.send(response);
  } catch (error) {
    console.error('postTokenApi 失败:', error);
    res.status(500).send({ error: 'postTokenApi 失败' });
  }
});

app.post("/api/postAnswer", async (req, res) => {
  try {
    const { question, agent, platform, access_token } = req.body;
    const response = await postAnswerApi({ question, agent, platform, access_token });
    res.send(response);
  } catch (error) {
    console.error('postAnswerApi 失败:', error);
    res.status(500).send({ error: 'postAnswerApi 失败' });
  }
});

app.post("/api/postConversation", async (req, res) => {
  try {
    const { question, agent, platform, access_token } = req.body;
    const response = await postConversationApi({ question, agent, platform, access_token });
    console.log('postConversationApi 接收到请求', response.data);
    // 设置响应头
    res.setHeader('Content-Type', response.headers['content-type']);
    // 将axios的响应流直接管道到express响应
    response.data.pipe(res);
  } catch (error) {
    console.error('postConversationApi 失败:', error);
    res.status(500).send({ error: 'postConversationApi 失败' });
  }
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", (req, res) => {
  res.send({ msg: "Hello World!" });
});

app.all("/*", (req, res) => {
  const requestId = req.headers["x-fc-request-id"];
  console.log("FC Invoke Start RequestId: " + requestId);

  res.send(
    JSON.stringify({
      msg: "Hello, World! ",
      request: {
        query: req.query,
        path: req.originalUrl,
        data: req.body,
        clientIp: req.headers["x-forwarded-for"],
      },
    })
  );

  console.log("FC Invoke End RequestId: " + requestId);
});

app.listen(9000, () => {
  console.log("Express started on port 9000");
});
