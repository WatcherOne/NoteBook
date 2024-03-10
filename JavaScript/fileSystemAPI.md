# FileSystem API

- 一个 FileSystem 对象代表着一个文件系统
- 该特性是非标准的，请不要在生产环境使用

-------

> ### showDirectoryPicker

`window.showDirectoryPicker(options)`
- 该方法是一项实验性技术，兼容性不太好
- 方法用于显示一个目录选择器，以允许用户选择一个目录`
- 要求发生临时性用户活动，即只有用户同意访问才能选择目录
- 正确选择时会返回一个 `Promise` 对象，兑现一个 ` FileSystemDirectoryHandle` 对象
- 当用户直接关闭或选择目录敏感时将抛出 `AbortError`, 故做一个 try catch 的处理方式

```json
options对象参数, 可选
1. id: 通过指定 ID 给当前选择器, 当用该 ID 打开另一个目录选择器时, 选择器会打开相同的目录, 好像也没有什么用
2. mode: 字符串，默认为 'read'，可对目录进行只读访问。设为 'readwrite' 可对目录进行读写访问。测试了好像没效果，都能进行读写
3. startIn: 一个 FileSystemHandle 对象或者代表某个众所周知的目录的字符串(如："desktop"、"documents"、"downloads"、"music"、"pictures"、"videos"）;用于指定选择器的起始目录, 有用的。
```

-------

> ### showOpenFilePicker

`window.showOpenFilePicker(options)`
- 该方法是一项实验性技术，兼容性不太好
- 方法用于显示一个文件选择器，以允许用户选择一个或多个文件`
- 正确选择时会返回一个 `Promise` 对象，兑现一个包含 ` FileSystemFileHandle` 对象的 `数组`
- 当用户直接关闭或选择目录敏感时将抛出 `AbortError`, 故做一个 try catch 的处理方式

```json
options对象参数, 可选
1. multiple: 默认false, 是否可多选
2. excludeAcceptAllOption / types: 就是过滤文件类型的, 参考MDN
```

-------

> ### FileSystemDirectoryHandle

- 一个对象，指向一个文件系统目录的句柄
- 从父类 FileSystemHandle 继承而来

    > #### 方法

1. .getDirectoryHandle(name)
```
- 返回一个 Promise 对象, 兑现一个 FileSystemDiretoryHandle 对象
- name 参数必须, 没找到会 reject
- 选择该目录句柄下的指定名称的子目录文件夹（当前目录下, 不遍历往下找的）
```
2. .getFileHandle(name)
```
- 返回一个 Promise 对象, 兑现一个 FileSystemFileHandle 对象
- name 参数必须, 同上, 且文件名后缀也需要
- 选择该目录句柄下的指定名称的子文件（当前目录下, 不遍历往下找的）
```
3. .resolve(name)
```
- 返回一个 Promise 对象, 兑现一个数组。数组的最后一项是子条目的名称
- name 参数必须，且是 FileSystemFileHandle 对象
- 从当前目录向指定子条目查找, 所有中间目录的名称 + 子条目名称构成一个数组
- 如果没找到则返回 null
```
4. .entries()
```
- 返回一个新的迭代, FileSystemDirectoryHandle 对象内每个条目的键值对的异步迭代器
- 无参数
- 选择当前目录内所有条目，包含文件夹+文件+隐藏文件，返回一个异步迭代器（键值对数组)
- [名称, 对应类型句柄对象] ~只能在当前目录下的一级查找
- 查找当前目录下的所有需要递归查找
- 还有 .keys() / .values()
```

-------

> ### FileSystemFileHandle

- 一个对象，指向一个文件系统条目的句柄
- 从父类 FileSystemHandle 继承而来

    > #### 方法

1. .getFile()
```
- 返回一个 Promise 对象, 兑换一个 File 对象, 该对象表示句柄所代表的的条目在磁盘上的状态
- 无参数
```
2. .createWritable()
```
- 返回一个 Promise 对象, 兑现一个 FileSystemWritableFileStream 对象, 用于写入文件
```
```javascript
// 创建一个 FileSystemWritableFileStream 用来写入。
const writable = await fileHandle.createWritable()
// 将文件内容写入到流中。
await writable.write('csdsds')
// 关闭文件并将内容写入磁盘。
await writable.close()
```

-------

> ### FileSystemHandle

- 代表一个文件或一个目录的对象
- 一般不会用它, 而是用它的子接口: FileSystemDirectoryHandle, FileSystemFileHandle

    #### 属性

```
1. kind: 返回条目类型, 'file' / 'directory'
2. name: 返回条目的名称
```