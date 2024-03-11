1. #### defineProps()

- 在组件中接收与 props 选项相同的值
- defineProps 是在 <script setup> 中才可用的编译宏命令，并不需要显式导入
- 声明的 props 会自动暴露给模板
- defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props

```javascript
// 不使用 setup
export default {
    props: ['title'],
    setup(props) {
        console.log(props.title)
    }
}
// 使用 setup
/* <script setup> */
defineProps(['title'])
// OR
const props = defineProps(['title'])
console.log(props.title)
// 然后在组件中可以直接使用 title
/* </script> */
```

> 运行时声明: 传递给 defineProps 的参数会作为运行时的 props 选项使用

```javascript
// <script setup lang="ts">
const props = defineProps({
    foo: string,
    bar: number
})
```

> 基于类型的声明: 译器会尽可能地尝试根据类型参数推导出等价的运行时选项

```typescript
// <script setup lang="ts">
// 泛型参数来定义 props 的类型，注意是 泛型 且 没有逗号！
const props = defineProps<{
    foo: string
    bar: number
}>()
// 通常会将 props 类型 移入一个单独接口中！！！
interface Props {
    foo: string
    bar: number
}
const props = defineProps<Props>()
// 可以解构 props
const { foo, bar } = defineProps<Props>()
```

2. #### withDefaults(defineProps<{...}>(), {...})

- 当基于类型的声明 props 时，我们失去了为 props 声明默认值的能力
- 此时通过 withDefaults 编译宏来设置组件的默认属性值
- 给 Props 变量赋值，通过 defineProps 定义组件的属性类型，并设置每个属性默认值

```typescript
// 
const props = withDefaults(defineProps<Props>(), {
    foo: 'name',
    bar: 123456
})
```

3. #### defineEmits()

- 在组件中接收与 emits 选项相同的值来声明需要抛出的事件
- defineEmits 是在 <script setup> 中才可用的编译宏命令

```typescript
// 不使用 setup
export default {
    emits: ['click'],
    setup(props, ctx) {  // ctx === { emit }
        ctx.emit('click', ...)
    }
}
// 使用 setup
/* <script setup> */
const emit = defineEmits(['click'])
emit('click', ...)
/* </script> */
```

> 运行时定义emits

```typescript
const emit = defineEmits(['click', 'change']) 
```

> 基于选项定义emits

```typescript
const emit = defineEmits({
    click: (id: number) => {
        // return 'true' 或 'false' 表明验证通过或失败
        // 函数实现不在这里，这里应该是一种判断方式
    },
    change: (value: string) => { return true }
})
```

> 基于类型定义emits

```typescript
const emit = defineEmits<{
    (e: 'click', id: number): void
    (e: 'change', value: string): void
}>()
// 或者更简洁的 3.3+
const emit = defineEmits<{
    click: [id: number]
    change: [value: string]
}>()
```


4. #### ref()

- 接受一个内部值，返回一个响应式的、可更改的 ref 对象
- 基本数据类型（也可以定义对象，内部会自动通过reactive转为代理对象）
- ref通过Object.defineProperty()的get和set来实现响应式
- 此对象只有一个指向其内部值的属性 .value
- 可更改的，是响应式的，它的值具有深层响应性
- 在模板中使用 ref 时，我们不需要附加 .value，ref 会自动解包
- ref类型的数据有 `isRef` 属性，底层自动会将 .value 加入
- 当大型数据太深层，不想深层响应则 也可以通过 `shallow ref` 来放弃深层响应性

> 标注类型: 为 ref 内的值指定一个更复杂的类型

```typescript
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')
year.value = 2020
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
// 或者通过 接口 来代替类型定义
interface Person {
    name: string
    age: number
}
const arr = ref<Person[]>([])
const student = ref<Person>({ name: '', age: 16 })
```

5. #### reactive()

- 另一种声明响应式状态的方式
- 只能用于对象类型, 不会添加指向内部值的属性 .value
- 返回对象的响应式副本
- 假如用一个新对象替换了原来的旧对象，那么原来的旧对象会失去响应性
- reactive通过Proxy来实现响应式，并通过Reflect操作源对象内部的数据


6. #### watch(arg1, arg2, arg3)

- 用于声明在数据更改时调用的侦听回调
- 可以监听一个或多个响应式数据源
- 对比一下其他 watch 钩子（如：watchEffect/watchPostEffect...）

> 第一个参数是：监听器的源
- 一个函数返回一个值
- 一个ref
- 一个响应式对象
- 由以上类型的值组成的数组

> 第二个参数是：发生变化时要调用的回调函数
- 回调函数接收三个参数（新值，旧值，回调函数）
- 内部的回调函数：用于注册副作用清理，会在副作用下一次重新执行前调用，如等待中的异步请求
- * 当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值

> 第三个参数是：一个对象，一些配置选项
- immediate: 是否立即触发回调，第一次调用时旧值是 undefined
- deep: 是否深度遍历监听
- flush: 调整回调函数的刷新机制 [保留]
- onTrack/onTrigger: 调试监听器的依赖 [保留]
- once: 回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止（3.4+）


7. #### computed()

- 用于声明要在组件实例上暴露的计算属性
- 计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value
- Vue 的计算属性会自动追踪响应式依赖，当依赖值改变后，也会更新
- 计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算
- getter不应有副作用：不要改变其他状态、在 getter 中做异步请求或者更改 DOM
- setter应避免直接修改计算属性值

```typescript
// 非 setup 时
export defalut {
    computed: {
        comA() {
            return this.a + 1
        },
        comB: {
            get() {
                return this.a * 2
            },
            set(val) {
                this.a = val
            }
        }
    }
}
// setup
const comA = computed(() => a.value + 1)
const comB = computed({
    get: () => a.value * 2,
    set: (val) => {
        a.value = val
    }
})
```


[1]: props 或 emits 定义的属性props或emits 在setup中都必须 props. 或 emits. 使用；在组件里面就可以直接使用

