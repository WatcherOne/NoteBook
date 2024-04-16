### omnibox

- 多功能框
- 可以让您在`chrome地址栏`注册关键字
- 当输入关键字`按Tab`后可以进行一系列自定义的建议结果
- 使得用户能够更加高效地浏览网页和获取信息
- 甚至可以用于直接执行简单的计算或单位换算, 无需打开任何网页

### 配置 omnibox

- 需要在清单中先配置`关键词`
- 然后在chrome地址栏输入关键词后, `按Tab`才能进去插件的omnibox
- 只能设置`一个`关键词
- 所有多个插件的omnibox的关键词重复了, 则后面的插件会`覆盖`前面的

```json
{
    "omnibox": {
        "keyword": "watcher"
    }
}
```

### 相关API

> 一般都配置在一直运行在后台的`background.js`中

#### chrome.omnibox.setDefaultSuggestion(suggestion, callback?: function)

- 进入搜索建议界面以后, `需要输入一个字符才会开始显示`
- 显示在网址栏下方第一个建议行的文本, 以后输入任何字符都会默认显示在第一个建议行
- 可以为默认建议设置说明和样式, 但只能设置`一条`默认建议
- 用于样式设置的 XML 样式标记, 好像有些不生效

```javascript
chrome.omnibox.setDefaultSuggestion({
    description: '<match>加粗字体</match><url href="http://www.baidu.com">百度链接</url>'
})
```

![1.gif]

#### chrome.omnibox.onInputStarted.addListener(callback: function)

- 用户已通过输入该扩展程序的关键字启动了关键字输入会话
- 保证在每个输入会话之前且在任何 onInputChanged 事件之前仅发送一次
- 可以理解为每次聚焦到搜索建议界面时, 都会先进去该事件

#### chrome.omnibox.onInputChanged.addListener(text: string, suggest: function)

- 用户更改了多功能框中的输入内容时
- 根据用户输入的内容返回`suggest`建议结果
- suggest参数是 SuggestResult[]
- content: 是放置在网址栏中的文本, 当用户选择此条目时, 系统会将该文本发送到扩展程序
- description: 网址下拉菜单中显示的文字
- deletable: 是否可以将建议条目删除

```javascript
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    if (!text) return ''
    if (text === '学科') {
        suggest([
            { content: '语言', description: '你要学习中文吗？', deletable: true },
            { content: '数学', description: '1 + 1 = ?' },
            { content: '体育', description: '走, 我们一起去泡澡' },
            { content: '电脑', description: '让我们写一个bug吧!' }
        ])
    }
})
```

![2.gif]

#### chrome.omnibox.onInputEntered.addListener(text: string, disposition: OnInputEnteredDisposition)

- 用户已接受在多功能框中输入的内容
- text: 选择的建议里的`content`
- disposition: 多功能框查询的窗口处置方式
- 一般是根据选择的建议进行页面的跳转或新开标签页
- 只有选择`建议里的才启作用`

```javascript
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log(text)
    let href = ''
    if (text.includes('查询')) {
        href = `https://www.baidu.com/s?ie=UTF-8&wd=${text}`
    }
    openUrlCurrentTab(href)
    openUrlNewTab(href)
})
```

#### chrome.omnibox.onDeleteSuggestion.addListener(callback: function(text))

- 当用户删除了给出的建议时的回调函数
- 只有通过配置 suggest 里面的 `deletable` 时才启作用
- 回调函数的参数 text 是 `description`

#### chrome.omnibox.onInputCancelled.addListener(callback: function)

- 当用户已结束关键字输入会话框时触发
- 只有`输入值改变后的失焦`才会触发
- 即不断聚焦失焦也不会触发(第一次会), 当聚焦变化了输入值再失焦就会触发

### 应用实例

1. 可以根据输入的运算公式进行计算结果的展示
2. 可以根据输入的数字进行单位换算
3. 可以根据输入的中文外调接口进行百度翻译
4. 任何可以查询出结果的内容都可以进行二次封装并在建议列表中展示
5. 还有很多有趣的待自己去发现
