### chrome.storage

- 一种特定于扩展程序的方法来保留用户数据和状态
- 需要在扩展程序清单中声明 { "permissions": ["storage"] } 权限
- 所有扩展程序上下文可以访问 Storage API
- 可序列化的`JSON值`存储为对象属性
- 即使用户清除缓存和浏览记录，这些数据`仍会保留`
- 即使在无痕模式拆分后，存储的设置`也会保留`

#### 储存区域

- storage.local
    - `常用`储存区域, 储存大小`10M`
    - 存储区域中的内容是每台机器的本地内容
    - 移除扩展程序时才会清除
    - 建议使用 storage.local 存储大量数据
- storage.managed
    - 代管式存储空间是供政策安装的扩展程序的只读存储空间
    - 由系统管理员使用开发者定义的架构和企业政策进行管理
- storage session
    - 在浏览器会话期间将数据保留在内存中, 储存大小`10M`
    - 默认情况下，它不会向内容脚本公开, 但可以通过设置 chrome.storage.session.setAccessLevel()
- storage sync
    - 可以同步用户登录任何Chrome浏览器的设置
    - 如果停用则等同于 local
    - 建议使用 storage.sync 来保留已同步的浏览器的用户设置

#### chrome.storage.sync.set(items: object, callback?: function)

- 设置对象属性为Key的对象
- sync可以换成不同区域的储存

#### chrome.storage.sync.get(keys?: string|string[]|object, callback?: function)

- 通过set函数里面对象的属性key获取对应数据
- 获得一个或多个键的列表
- 不传参数获得所有数据
- 返回一个Pormise

```javascript
const data = await chrome.storage.sync.get('options')
console.log(data.options)
```

#### chrome.storage.sync.remove(keys?: string|string[], callback?: function)

- 从储存空间移除一项或多项数据
- 返回一个Pormise

#### chrome.storage.sync.clear(callback?: function)

- 从储存空间清除所有内容
- 返回一个Pormise

#### chrome.storage.onChanged.addListener(callback)

- 跟踪对存储空间所做的更改, 当存储发生任何变化时, 就会触发该事件

```javascript
chrome.storage.onChanged.addListener((changes: object, namespace: string) => {
    // changes: { key: { oldValue, newValue }, key: { oldValue, newValue } }
    console.log(changes, namespace)
})
```
