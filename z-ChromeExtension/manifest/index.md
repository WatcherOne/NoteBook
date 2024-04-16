# manifest.json 文档说明

如果需要更具体的说明, 参考[官方文档](https://developer.chrome.com/docs/extensions?hl=zh-cn)<br>

### 清单配置 

```json
{
    "manifest_version": 3,   
    "name": "xxxx",
    "version": "1.0.0",
    "version_name": "build rc2",
    "description": "desc",
    "default_locale": "en",
    "icons": {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
    },
    "author": "xxxx",
    "homepage_url": "http://xxxx",
    "action": {},
    "background": {},
    // 定义所选 Chrome 设置的替换项, 即替换 Chrome 的一些配置, 参考官方文档
    "chrome_settings_overrides": {},
    // 定义默认 Chrome 网页的替换值, 修改点击相应动作时返回的页面链接, 只支持bookmarks、history、newtab三个页面
    // 返回HTML文档来覆盖网页
    "chrome_url_overrides": {},
    "content_scripts": {},
    "permissions": [],
    "commands": {},
    "options_page": "",
    "options_ui": {},
    "omnibox": {},
    "host_permissions": [],
    "devtools_page": "",
    "web_accessible_resources": []
}
```

- [manifest_version](#user-content-manifestVersion)
- [name](#user-content-name)
- [version](#user-content-version)
- [version_name](#user-content-versionName)
- [description](#user-content-description)
- [default_locale](#user-content-defaultLocale)
- [icons](#user-content-icons)
- [author](#user-content-author)
- [homepage_url](user-content-homepageUrl)
- [action](#user-content-action)
- [background](#user-content-background)
- [content_scripts](#user-content-contentScripts): 向网页注入脚本的一种形式
- [permissions](#user-content-permissions)
- [commands](#user-content-commands)
- [options_page](#user-content-optionsPage)
- [options_ui](#user-content-optionsUi)
- [omnibox](#user-content-omnibox)
- [host_permissions](#user-content-hostPermissions)
- [devtools_page](#user-content-devtoolsPage)
- [web_accessible_resources](#user-content-webAccessibleResources)

### 最小清单（即下面的是必填字段, 其它非必填）

```json
{
    "manifest_version": 3,   
    "name": "xxxx",
    "version": "1.0.0",
    "description": "desc",
    "icons": {
        "16": "images/icon-16.png",
        "48": "images/icon-48.png",
        "128": "images/icon-128.png"
    }
}
```

### 文档参数说明详细

#### <span id="manifestVersion">**manifest_version**</span>

- 一个整数, 唯一支持的值是 `3`
- 用于指定扩展程序使用的清单文件格式版本（规定<manifest>JSON文件的属性有哪些）

----

#### <span id="name">**name**</span>

- 一个字符串, 长度上限为75个字符
- 插件名称, 用于Chrome应用商店/扩展程序页面等的标识

----

#### <span id="version">**version**</span>

- 一个字符串, [版本规则](https://developer.chrome.com/docs/extensions/reference/manifest/version?hl=zh-cn)
- 用于标识扩展程序版本号

----

#### <span id="versionName">**version_name**</span>

- 版本字符串
- 设置描述性的版本字符串, 用于显示目的

----

#### <span id="description">**description**</span>

- 一个字符串, 长度上限为132个字符
- 用于应用商店和用户扩展程序管理页面上的扩展程序描述

----

#### <span id="defaultLocale">**default_locale**</span>

- 一个字符串, 定义扩展程序的默认语言
- 'en' 是默认语言, 本地化扩展程序必须提供此字段
- "zh_CN"

----

#### <span id="icons">**icons**</span>

- 一个对象
- 代表扩展程序的一个或多个图标, 推荐采用`PNG`格式
- `128*128` 供应用商店使用（应始终提供）
- `16*16` 供扩展程序页面的网站使用
- `48*48` 供扩展程序管理页面使用

----

#### <span id="author">**author**</span>

- 一个字符串或对象
- 用于指定创建扩展程序的帐号的电子邮件地址
- 此字符串必须与用于发布扩展程序的帐号的电子邮件地址相匹配

```json
"author": {
    "email": "user@example.com"
}
// 
"author": "user@example.com"
```

----

#### <span id="homepageUrl">**homepage_url**</span>

- 扩展程序主页网址
- 如果没有设置, 默认是为扩展程序的 Chrome 应用商店页面
- 可以安利免费的广告位

----

#### <span id="action">**action**</span>

- 一个对象
- 定义扩展程序图标在 Google 工具栏中的外观和行为
- 默认情况下, 每个标签页上的工具栏操作都处于启用状态（可点击）
- 您可以使用 action.enable() 和 action.disable() 方法控制此行为
- 生命周期很短, 需要长时间运行的代码不要写在popup中

```json
"action": {
    "default_icon": {  
        "16": "images/icon16.png",  
        "24": "images/icon24.png", 
        "32": "images/icon32.png"
    },
    "default_title": "Hover Me",
    "default_popup": "popup.html"
}
```

- *default_icon*
    - 扩展程序工具栏中的主图片, 最好`PNG`格式
    - 旨在设置静态图片, 请勿为图标使用动画图片

- *default_title*
    - 用户将鼠标指针悬停在工具栏中的扩展程序图标上时, 系统会显示提示或标题
    - 也可以通过调用`action.setTitle()`以编程方式进行设置

- *default_popup*
    - 弹出式窗口: 用户点击工具栏中的扩展程序的操作按钮时，系统会显示操作的弹出式窗口
    - 指向任何HTML内容文档的目录中的相对路径, 并且会根据其内容自动调整大小
    - 弹出式窗口的尺寸必须介于 25x25 到 800x600 像素之间

----

#### <span id="background">**background**</span>

- 浏览器后台的脚本, 常驻页面 (其实有一个html文档的, 但是永远也打不开的)
- 生命周期最长, 随着浏览器的打开而打开, 关闭而关闭
- background的权限非常高, 几乎可以调用所有的Chrome扩展API（除了devtools）
- 而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置​
- 指定包含扩展程序 `Service Worker` 的 `JavaScript` 文件
- 该 Service Worker 充当事件处理脚本
- [参考文档] // Todo - 一些常用API说明, 通信问题

```json
"background": {
    "service_worker": "service_worker.js",
    "type": "module"   // 指定‘module’, 可以正常使用 import, 不支持导入断言
}
```

----

#### <span id="contentScripts">**content_scripts**</span>

- 指定一个静态加载的 JavaScript 或 CSS 文件, 以供每次用户打开符合特定网址格式的网页时使用
- 通过使用标准文档对象模型 (DOM), 用户能够读取浏览器所访问网页的详细信息
- 可以配置哪些网站能注入, 哪些不能注入
- [参考文档](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts?hl=zh-cn)
- **就相当于在网页中插入JS文件, 正常操作 document 等即可**
- 如果需要动态注入脚本则需要在 background -> service_worker: 配置中
- 通过 chrome.scripting.registerContentScripts 此<API>注入
- 作用: 广告屏蔽, 页面CSS定制

```json
"content_scripts": [
    {
        "matches": ["<all_urls>"],
        "css": ["content.css"],
        "js": ["content.js"],
        "run_at": "document_idle"
    }
]
```

- *matches*
    - 必需, 字符串数组, 指定要将此内容脚本注入哪些网页, 上面表示所有网页

- *css*
    - 可选, 字符串数组, 要注入到匹配页面的 CSS 文件列表
    - 会按照它们在此数组中出现的顺序进行注入，然后再为网页构建或显示任何 DOM

- *js*
    - 可选, 字符串数组, 要注入到匹配页面的 JS 文件列表
    - 系统会按照文件在此数组中出现的顺序注入文件

- *run_at*
    - 可选, 指定何时应将脚本注入到网页中
    - 默认值为 document_idle
    - document_idle: 浏览器会选择一个时间, 在'document_end'之间以及 window.onload 事件触发后立即注入脚本, 它们一定会在 DOM 完成后运行
    - document_start: 在 css 中的任何文件之后、构建任何其他 DOM 或运行任何其他脚本之前注入脚本
    - document_end: 在 DOM 完成之后，在图片和框架等子资源加载之前立即注入脚本

> content-scripts 和原始页面`共享DOM`, 不共享JS, 如果要访问页面JS变量, 只能通过 injected js

> content-scripts 不能访问绝大部分的 chrome.xxx.api, 但是可以`通信background`来帮助调用

- **内容脚本可访问的API**
    - dom
    - i18n
    - storage
    - runtime.connect()
    - runtime.getManifest()
    - runtime.getURL()
    - runtime.id
    - runtime.onConnect
    - runtime.onMessage
    - runtime.sendMessage()

----

#### <span id="permissions">**permissions**</span>

- 字符串数组
- 用于申请扩展程序可使用的权限

```json
"permissions": [
    "tabs",          // 标签
    "contextMenus",  // 右键菜单
    "notifications", // 通知
    "webRequest",    // web请求
    "storage"        // 本地储存
]
```

----

#### <span id="commands">**commands**</span>

- 添加可在扩展程序中触发操作的键盘快捷键
- 用于在 service-worker.js 中去处理快捷命令

----

#### <span id="optionsPage">**options_page**</span>

- 注册的HTML文件路径
- 为用户提供选项配置, 在新标签打开一个`对扩展程序进行自定义`的选项配置页面
- 可以通过`直接链接`或`导航链接`打开
- 可以在 options.html 中引入 js文件 通过 chrome.storage 存入选项配置

```javascript
// 导航链接打开配置选项
if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
} else {
    window.open(chrome.runtime.getURL('options.html'))
}
```

----

#### <span id="optionsUi">**options_ui**</span>

- 同上作用, 但此为嵌入式弹窗, 即不会新打开标签

```json
"options_ui": {
    "page": "options.html",
    "open_in_tab": false
}
```

----

#### <span id="omnibox">**omnibox**</span>

- 允许在 Google Chrome 的地址栏（也称为多功能框）中注册关键字
- 用户输入扩展程序的关键字后，该用户开始仅与您的扩展程序互动
- 每次按键都会发送到您的扩展程序，您可以在响应中提供建议
- 在background.js中注册监听事件

```json
"omnibox": { "keyword": "go" }
```
```javascript
// 监听输入词，给出建议
chrome.omnibox.onInputChange.addListener((text, suggest) => {})
// 根据接收点击的建议触发事件
chrome.omnibox.onInputEntered.addListener((text) => {})
```

----

#### <span id="hostPermissions">**host_permissions**</span>

- 列出允许您的扩展程序与之互动的网页，使用网址匹配模式定义
- 系统会在安装应用时请求这些网站的用户权限
- 对于需要调用外部接口时, 很有用的, 需要配置对应API的权限

```json
{
    "host_permissions": ["*://*/*"]  // 允许所有网页
}
```

----

#### <span id="devtoolsPage">**devtools_page**</span>

- 指向一个html文档, 但真正起作用的是 devtools.js 文件
- 定义 devTools 页面入口（就是一个调试窗口, 暂时没有什么用）

```json
"devtools_page": "devtools.html"
```

----

#### <span id="webAccessibleResources">**web_accessible_resources**</span>

- 字符串数组
- 指扩展程序内可供网页或其他扩展程序访问的文件

```json
"web_accessible_resources": [
    {
        "resources": ["test.png"],
        "matches": ["<all_urls>"]
    }
]
```

----
