/*global chrome*/
import { apiRequest } from '@/api'
// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
    // 默认先禁止Page Action。如果不加这一句，则无法生效下面的规则
    chrome.action.disable()
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        // 设置规则
        let rule = {
            // 运行插件运行的页面URL规则
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        // 适配所有域名以"www."开头的网页
                        // hostPrefix: 'www.'
                        // 适配所有域名以".element-plus.org"结尾的网页
                        // hostSuffix: '.element-plus.org',
                        // 适配域名为"element-plus.org"的网页
                        // hostEquals: 'waoooapp.com',
                        // 适用于所有http和https网页
                        pageUrl: { schemes: ['http', 'https'] }
                    },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowAction()],
        }
        // 整合所有规则
        const rules = [rule]
        // 执行规则
        chrome.declarativeContent.onPageChanged.addRules(rules)
    })

    // 创建右键菜单
    chrome.contextMenus.create({
        id: "openExtension",
        title: "打开agent-crx",
        contexts: ["all"]
    });
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 接收来自content script的消息，requset里不允许传递function和file类型的参数
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const { contentRequest } = request
        // 接收来自content的api请求
        if (contentRequest === 'apiRequest') {
            let { config } = request
            // API请求成功的回调
            config.success = (data) => {
                data.result = 'succ'
                sendResponse(data)
            }
            // API请求失败的回调
            config.fail = (msg) => {
                sendResponse({
                    result: 'fail',
                    msg,
                })
            }
            // 发起请求
            apiRequest(config)
        }
    })
    return true
})

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('index.html')  // 指向你想打开的页面
    });
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openExtension") {
        chrome.tabs.create({
            url: chrome.runtime.getURL('index.html')  // 指向你想打开的页面
        });
    }
});
