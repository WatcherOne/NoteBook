## 响应式状态

### ref()

- ref()接收参数，并将其包裹在一个带有 `.value` 属性的 ref 对象中返回
- 在模板中使用 ref 时，我们不需要附加 .value，当在模板中使用时，ref 会自动解包
    - 在模板渲染上下文中，只有顶级的 ref 属性才会被解包
    ```javascript
    const count = ref(0)
    const object = { id: ref(1) }
    <span>{{ count + 1 }}</span>     // 1
    <span>{{ object.id + 1 }}</span> // [object Object]1
    // 因为在计算表达式时 object.id 没有被解包，仍然是一个 ref 对象
    const { id } = object   // 可以将 id 解构为一个顶级属性
    ```
- Ref 会使它的值具有`深层响应性`。这意味着即使改变嵌套对象或数组时，变化也会被检测到
- 通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况

- 当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。
- 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API

### reactive

- reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的
- 只有代理对象是响应式的，更改原始对象不会触发更新
- 为保证访问代理的一致性，对同一个原始对象调用 reactive() 会总是返回同样的代理对象
- 对一个已存在的代理对象调用 reactive() 会返回其本身
- reactive 只能用于对象类型, 不能作用于原始类型
- 对解构操作不友好
    ```javascript
    const state = reactive({ count: 0 })

    // 当解构时，count 已经与 state.count 断开连接
    let { count } = state
    // 不会影响原始的 state
    count++

    // 该函数接收到的是一个普通的数字
    // 并且无法追踪 state.count 的变化
    // 我们必须传入整个对象以保持响应性
    callSomeFunction(state.count)
    ```

### ref的额外解包细节

- Todo --- Just Look
- 包含各种 reactive 嵌套着 ref 等情况

### computed

- computed() 方法期望接收一个 getter 函数，返回值为一个计算属性 ref
- 跟一般 ref 类似，可以通过 `.value` 访问计算结果，在模板中也会自动解包
- 计算属性值会基于其响应式依赖被缓存，仅会在其响应式依赖更新时才重新计算
- 计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告
```javascript
const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```
> 最佳实践
-  getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记
    - 举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM
- 避免直接修改计算属性值

### 样式绑定

> 绑定对象

```html
<div :class="{ active: isActive }"></div>
<!-- active 是否存在取决于数据属性 isActive 的真假值 -->
```
- :class 指令也可以和一般的 class attribute 共存
```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```
- 可以直接绑定一个对象
```javascript
const classObject = reactive({
  active: true,
  'text-danger': false
})
<div :class="classObject"></div>
```

> 绑定数组

```javascript
const activeClass = ref('active')
const errorClass = ref('text-danger')
<div :class="[activeClass, errorClass]"></div>
```
```javascript
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```
```javascript
<div :class="[{ active: isActive }, errorClass]"></div>
```

> 组件上使用

- 对于只有一个根元素的组件，当你使用了 class attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并。
```javascript
<!-- 子组件模板 -->
<p class="foo bar">Hi!</p>
<!-- 在使用组件时 -->
<MyComponent class="baz boo" />
<p class="foo bar baz boo">Hi!</p>
```
- 如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs 属性来实现指定
```javascript
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
<MyComponent class="baz" />
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

- Todo: https://cn.vuejs.org/guide/components/attrs.html


### 绑定内联样式

> 绑定 JavaScript 对象

- 推荐使用 camelCase, 但也支持 kebab-cased 形式的 CSS 属性 key

```javascript
const activeColor = ref('red')
const fontSize = ref(30)
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
// 也支持 kebab-cased 形式属性
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

- 直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁

```javascript
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
<div :style="styleObject"></div>
```

> 绑定数组

- 可以给 :style 绑定一个包含多个样式对象的数组

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

- 当你在 :style 中使用了需要浏览器特殊前缀的 CSS 属性时，Vue 会自动为他们加上相应的前缀。Vue 是在运行时检查该属性是否支持在当前浏览器中使用
- 如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的

### 列表渲染

- v-for(... in ...)，可以用 of 代替 更符合迭代器语法
- 可以接收整数值，v-for="n in 10" n `从1开始而非0`
- 可以作用在 template 上
- 可以来遍历一个对象的所有属性，遍历的顺序会基于对该对象调用 Object.keys() 的返回值来决定
- Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染
- 使用 `key` 来跟踪每个节点的标识，从而重用和重新排序现有的元素
- 当你使用 <template v-for> 时，key 应该被放置在这个 <template> 容器上
- 推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能


- Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
- filter()，concat() 和 slice()，这些都不会更改原数组，而总是返回一个新数组

### 监听事件 

- 方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 event.target.tagName 访问到该 DOM 元素

> 在内联事件处理器中访问事件参数

- 有时我们需要在内联事件处理器中访问原生 DOM 事件。你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数
```javascript
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

> 事件修饰符
.stop
.prevent
.self
.capture
.once
.passive
```javascript
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```
- 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的
- 因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为，而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为。

```javascript
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```
- .passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能
- 请勿同时使用 .passive 和 .prevent，因为 .passive 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 .prevent 会被忽略，并且浏览器会抛出警告。

### 表单绑定输入

- 对于需要使用 IME 的语言 (中文，日文和韩文等)，你会发现 v-model 不会在 IME 输入还在拼字阶段时触发更新。如果你的确想在拼字阶段也触发更新，请直接使用自己的 input 事件监听器和 value 绑定而不要使用 v-model。


