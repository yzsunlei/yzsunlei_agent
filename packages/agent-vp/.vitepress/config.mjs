import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Agent-vp",
  description: "My helpful ai agent sets",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Agent 使用', link: '/pages/agent-home' },
      { text: 'Agent 介绍', link: '/pages/agent-desc' },
      { text: 'Agent 平台', link: '/pages/agent-platform' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yzsunlei/yzsunlei_agent' },
      { icon: 'gitee', link: 'https://gitee.com/yzsunlei/yzsunlei_agent' },
    ],

    footer: {
      copyright: "Copyright © 2016-2025 <a href='https://www.yzsunlei.com/' target='_blank'>yzsunlei.com</a> ｜ <a href='https://beian.miit.gov.cn/' target='_blank'>鄂ICP备14015590号-8</a>",
    }
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // 这里可以添加 Less 的全局变量或其他配置
        }
      }
    }
  }
})
