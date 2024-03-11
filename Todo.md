### Attribute 绑定

> v-bind:attr="value"

- 如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除

1. **简写** 

- 简写去掉 v-bind `:attr="value"`
- 同名简写: 当属性名称与绑定的变量值相同时（只是在vue3.4及以上版本可用特性）
    - `:id` === `v-bind:id` === `:id="id"`

2. **布尔型Attribute**

- 布尔型 Attribute 依据 true / false 值来决定 Attribute 是否应该存在于该元素上
- 当属性值为`真值`(Truthy: 即 if 逻辑判断为真的值)时 或 一个`空字符串`，元素会`包含`这个属性
- 当属性值为`假值`(Flasy: 即 if 逻辑判断为假的值)时，属性会被忽略

3. **动态绑定多个值**

```javascript
const className = 'text-10px'
// v-bind 传入一个包含多个 attr 的 JS对象
// 对象属性对应元素属性，对象属性值对应元素属性值
const objectOfAttrs = {
  id: 'container',
  class: className
}
<div v-bind="objectOfAttrs"></div>
```

4. **JavaScript表达式**

- 在数据绑定中都支持模板字符串（`文本插值中 (双大括号)` 或 `任何 Vue 指令 (以 v- 开头的特殊 attribute) attribute 的值中`）
- 每个绑定仅支持`单一表达式`
- 绑定表达式还可以使用一个组件暴露的`方法`
    - 方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用
- 会暴露常用的内置全局对象如 Math/Date，没有显式包含在列表中的全局对象不能在表达式中使用，可以通过全局配置`app.config.globalProperties`上显式地添加它们




