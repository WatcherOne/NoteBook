## 常用的 Chrome API 归纳

### **chrome.runtime**

#### chrome.runtime.openOptionsPage(callback?: function)

- 打开扩展程序的选项页面
- 选项页面指得就是配置的<options.html>页面

#### chrome.runtime.getUrl(path: string)

- 将应用/扩展程序安装目录中的相对路径转换为完全限定网址
- 如上面的API不可用时, 可手动设置 options.html 路径来打开

#### <span id="runtimeSendMessage">chrome.runtime.sendMessage(extensionId?: string, message: any, options?: object, callback?: function)</span>

- 向扩展程序或其他扩展程序/应用中的事件监听器发送一条消息
- 它发送的消息可以被扩展的任一部分接收到，包括`background`, `action popup`, `side panel`, `options page`,`devtools`等等，除了`content_scripts`!!!
- 它还可以向别的扩展程序发送消息

#### chrome.runtime.onMessage.addListener(callback: function)

- 当消息从扩展程序进程（通过 runtime.sendMessage）或内容脚本（通过 tabs.sendMessage）发送时触发
- 就是接收消息的API, 通信手段之一

```javascript
chrome.runtime.onMessage.addListener((message: any, sender: MessageSender, sendResponse: function) => {
    // messgae: 传来的消息
    // sender: 扩展程序信息
})
```

----
----

### **chrome.extension**

- 很多API已经弃用了, 一般采用 runtime 中的API

----
----

### **chrome.tabs**

- 标签API
- 可以获得所有标签页以及指定的标签页
- 可以设置标签页静音
- 可以移动标签页顺序
- 向标签页的内容脚本传递信息, 即通信web的方式
- 指的是标签页, `不是web网页`!

#### chrome.tabs.get(tabId: number, callback?: function)

- 获得指定标签页的相关详细信息
- tabId `必填`

#### chrome.tabs.getCurrent(callback?: function)

- 获取发出此脚本调用的标签页
- 如果从非标签页上下文（例如，后台网页或弹出视图）调用, 则返回 undefined
- 则方法没用, 请求下面的 chrome.tabs.query 方法

#### <span id="tabsQuery">chrome.tabs.query(queryInfo: object, callback?: function)</span>

- 获得具有指定属性的所有标签页, 如果未指定属性, 获得所有标签页
- 是关于标签的一些属性, 而`不是web网页`!!!

```javascript
// queryInfo 参数
// 必填, 即使不指定属性也需要填写空对象
{
    "active": boolean,            // 标签页是否在其窗口中处于活动状态(即是否是当前标签页)
    "currentWindow": boolean,     // 标签页是否在当前窗口中
    "index": number,              // 标签页在窗口中的位置
    "lastFocusedWindow": boolean, // 标签页是否位于上次聚焦的窗口中
    "windowId": number            // 父窗口的ID, 相当于当前窗口
    // .... 
}

// 如获取当前窗口的当前标签页面则
chrome.tabs.query({ currentWindow: true, lastFocusedWindow: true, active: true }, (tab) => {
    console.log('tab: ', tab[0])
})
// 能狗获取标签相关信息, 如 title, url, favIconUrl, windowId, id, groupId 等等
```

#### chrome.tabs.goBack(tabId?: number, callback?: function)

- 跳转到上一页(如果有)

#### chrome.tabs.goForward(tabId?: number, callback?: function)

- 跳转到下一页(如果有)

#### chrome.tabs.remove(tabIds: number|number[], callback?: function)

- 关闭一个或多个标签

#### <span id="tabsSendMessage">chrome.tabs.sendMessage(tabId: number, message: any, options?: object, callback?: function)</span>

- 向指定标签页中的内容脚本发送一条消息
- 在当前扩展程序的指定标签页中运行的每个内容脚本中都会触发`runtime.onMessage`事件

----
----

### **chrome.windows**

- 窗口API, 与浏览器窗口交互的API
- 可以在浏览器中创建、修改和重新排列窗口
- 指的是窗口, 不是标签页!

```javascript
chrome.windows.getAll(queryOptions?: QueryOptions, callback?: function)  // 获得所有窗口
chrome.windows.getCurrent(queryOptions?: QueryOptions, callback?: function)  // 获得当前窗口
chrome.windows.getLastFocused(queryOptions?: QueryOptions, callback?: function)  // 获得最近获得焦点的窗口, 通常位于顶部的窗口
chrome.windows.remove(windowId: number, callback?: function)  // 移除（关闭）窗口以及其中的所有标签页

// 获得当前浏览器窗口相关属性（如: 宽度, 高度）- 不包含web网页
chrome.windows.getCurrent((tab) => {
    console.log('tab: ', tab, tab.id)
})
```

----
----

### 通信问题

- [chrome.runtime.sendMessage](#user-content-runtimeSendMessage)
- [chrome.tabs.sendMessage](#user-content-tabsSendMessage)

1. 第一个API可以向扩展程序的任何部分发送消息, 除了`content_scripts`
2. 第二个API专门用来给 content_scripts 发消息的, 而且必须指定`tabId`

- chrome.runtime.onMessage.addListener

1. 接收消息的方法
2. 不仅扩展程序任何部分都用这个接收, content_scripts 也可以使用

下图展示了各模块之间的通信规则
![1.png]

- 如何从 content_script 向 扩展程序发送 消息

```javascript
// content_script.js
chrome.runtime.onMessage.addListener((message, sender, sendReponse) => {
    sendReponse({ result: '接收到了' })
})
// popup.js
chrome.tabs.sendMessage(tab.id, { message: 'hello' }, (response) => {
    console.log(response) // { result: '接收到了' }
})
```

- 但总是会报错: Unchecked runtime.lastError: The message port closed before a response was received.

> 虽然不能使用 chrome.runtime.sendMessage 向 content_scripts 发送消息

> 但是可以在 content_scripts 中用它 来向 扩展程序发送消息!

