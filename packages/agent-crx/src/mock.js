import Mock from 'mockjs'
import { mockFetch } from 'mockjs-fetch'
mockFetch(Mock)

// 模拟登录
Mock.mock(/login/, {
    code: 200,
    msg: 'OK',
    data: {
        nickname: '小磊哥er',
        accessToken: 'abc12-XYz34-PqR56-StUv7-WxYz8',
    }
})