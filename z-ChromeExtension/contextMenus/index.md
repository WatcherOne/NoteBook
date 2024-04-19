### contextMenus

- 可以向插件中增加上下文菜单添加项（右键菜单）
- 可以选择要在上下文菜单中添加的对象的类型（图片/链接/页面）
- 可以根据需要创建任意数量的上下文菜单项
- 可以嵌套展示菜单项

#### 清单配置权限

```json
{
    "permissions": ["contextMenus"]
}
```

#### 创建 ContextMenus

- 需要使用`chrome.contextMenus.create(contextMenus, { parentId })`创建上下文菜单项
- 参数如下

```ts
// contextMenus
const contextMenus = {
    id: string,
    parentId: string,
    title: string,
    visible: boolean,
    enabled: boolean,
    itemType: 'normal',
    checked: boolen,
    contexts: ['selection'],
    documentUrlPatterns: string[]
}
```

- *id*
    - 要分配给此项的唯一ID, 必须为活动页面提供
- *parentId*
    - 父菜单项的ID, 这会使该项成为先前添加的项的子项
- *title*
    - 要在项中显示的文本
    - 一般是必填选项
    - 当上下文为 selection 时，在字符串中使用 %s 以显示所选文本
- *visible*
    - 在菜单项中是否显示
- *enabled*
    - 此上下文菜单项处于启用还是停用状态, 默认为true
- *itemType*
    - 菜单项的类型
    - 默认`normal`, 可选 radio
    - radio也只是点击, 并不会用radio的样式效果
- *checked*
    - 单选或复选框的初始状态
    - true: 选中 false: 未选中
- *contexts*
    - 将出现此菜单项的上下文列表, 默认为['page']
    - 指定“all”相当于除“launcher”之外的所有其他上下文的组合
    - 用于向在启动器/任务栏/Dock 等位置点击应用图标时显示的菜单项添加菜单项
    - `page`      // 'page': 表示页面右键就会有
    - `selection` // 右键点击选中文字时显示, 表示选中才会有
    - `audio`
    - `launcher`    
    - `browser_action`    
    - `page_action`    
    - `action`
- *documentUrlPatterns*
    - 将项目限制为仅适用于网址与给定格式之一匹配的文档或框架
    - ['<all_urls>']

#### 监听处理上下文事件

- 使用`chrome.contextMenus.onClicked.addListener`来监听

```javascript
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const {
        parentMenuItemId,    // 父级Id
        menuItemId,          // 当前上下文选项Id
        selectionText        // 选中的文本
    } = info
})
```
