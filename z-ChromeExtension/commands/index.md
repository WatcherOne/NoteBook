## chrome extension commands

- 使用 commands 可在扩展程序中触发操作的键盘快捷键
- 用于打开浏览器操作或向扩展程序发送命令的操作

### **在清单中配置快捷键**

```json
"commands": {
    "commands-key": {
        "suggested_key": {
            "default": "Ctrl+Shift+Y",
            "mac": "Command+Shift+Y"
        },
        "description": "Run \"foo\" on the current page."
    }
}
```

1. "commands-key": 属性键作为命令的名称, 自定义名称
2。 "suggested_key": 可选属性, 设置声明命令的默认键盘快捷键, 如果省略: 该命令将解除绑定, [组合键要求](#user-content-suggestedKey)
3. "description": 用于为用户提供命令用途的简短说明的字符串, 此字符串会显示在扩展程序键盘快捷键管理界面中

- 扩展程序最多可以建`4个`键盘快捷键
- 可以通过`chrome://extensions/shortcuts`对话框手动添加更多快捷方式

![1.png]

### <span id="suggestedKey">**设置快捷键要求**</span>

1. 可以设置字符串的组合键
2. 也可以设置对象值,  每一个对象表示不同平台的自定义快捷键
3. 对象属性包括
- `default`
- `chromeos`
- `linux`
- `mac`
- `windows`

```json
// 字符串
"commands": {
    "color-copy": {
        "suggested_key": "Ctrl + Shift + Y"
    }
}
// 对象值
"commands": {
    "color-copy": {
        "suggested_key": {
            "default": "Ctrl + Shift + Y",
            "mac": "Command + Shift + Y"
        }
    }
}
```

- 虽然键定义`区分大小写`, 但是好像`只能用大写`
- 扩展程序命令快捷键必须包含 Ctrl 或 Alt
    - 但不允许使用涉及 Ctrl+Alt 的按键组合
    - 修饰符不能与媒体键结合使用
- macOS 上, Ctrl 会自动转换为 Command
- 如需在 macOS 上使用 Ctrl 键, 请在定义 "mac" 快捷方式时将 Ctrl 替换为 MacCtrl
- 在其他平台中组合使用 MacCtrl 将会导致验证错误，并阻止该扩展程序安装
- Shift 在所有平台上都是可选的修饰符
- 某些操作系统和 Chrome 快捷键（例如窗口管理）`始终优先于扩展程序命令快捷键`, 并且无法被覆盖

### **处理快捷指令命令**

- 在 Service_worker 中通过`chrome.commands.onCommand.addListener`处理程序绑定到清单中定义的每个命令

```javascript
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`)
})
```
