# VueUse

- VueUse 是一款基于组合式 API 的`函数集合`
- v5.0 `@vueuse/components`提供了可组合函数的无渲染组件版本
- [官方文档地址](https://vueuse.org/guide/)
- [中文文档地址](https://www.vueusejs.com/)

----

安装
```shell
npm i @vueuse/core
```

使用
```javascript
import { useXXFn } from '@vueuse/core' 
```

----

## 常用的一些函数

> ### State

[useStorage](#usestorage)<br>
[useLocalStorage](#uselocalstoragekey-initialvalue-options)<br>
[useSessionStorage](#usesessionstoragekey-initialvalue-options)<br>
[useStorageAsync](#usestorageasync)<br>
[useRefHistory](#userefhistorysource-options)<br>

----
1. #### useStorage(key, defaults, storage, options = {})

  - 参数说明
    ```javascript
    function useStorage(
        key: string,
        defaults,   // 默认值
        storage: window.localStorage | window.sessionStorage,
        options: object  // 一些配置说明
    )
    // return 的是 shallow / ref (defaults) === data
    ```

  - 通过 useStorage 设置的 key-value 不能通过 F12 控制台手动删除!
  - 直到删除 useStorage 的代码才可以删除 或者 通过下面的方式

    ```javascript
    const data = useStorage('test', 3)
    console.log(data.value) // 3
    state.value = null  // 当且仅当 `null` 即可删除对于 storage 中的 key-value
    ```

  - 至少传递两个参数, 第三个参数默认取 localStorage

    ```javascript
    const data = useStorage('test1', { a: 1, b: 2 })  // ref<object>
    const data = useStorage('test2', true)            // ref<boolean>
    const data = useStorage('test3', 2)               // ref<number>
    const data = useStorage('test4', '2')             // ref<string>
    console.log(data.value)
    ```
    
  - 当设置的 key 已存在 localStorage 时, 使用存在的

    ```javascript
    localStorage.setItem('test', '5')
    const state = useStorage('test', '8')
    console.log(state.value)  // '5'
    ```

  - 通过下面的方式可以合并两个地方的data

    ```javascript
    localStorage.setItem('test-store', '{ a: 1, b: 2 }')
    const state = useStorage('test-store', { a: 2, b: 3, c: 4 }, localStorage, {
        mergeDefaults: true  // 配置merge参数为true
    })
    console.log(state.value) // { a: 1, b: 2, c: 4 }
    // 以 原存储值 为主 进行合并
    const state1 = useStorage('test-store', { a: 2, b: 3, c: 4 }, localStorage, {
        mergeDefaults: (storageValue, defaults) => {
            return { ...storageValue, ...defaults }
        }
    })
    // 通过传递一个函数来改变 storage 存储的值, 这里是改变 merge 的方法
    ```

----
2. #### useLocalStorage(key, initialValue, options = {})

  - 使用 localStorage 进行存储数据
  - 实质上调用 useStorage 内部使用
  - useStorage(key, initialValue, window == null ? void 0 : window.localStorage, options)

----
3. #### useSessionStorage(key, initialValue, options = {})

  - 使用 seesionStorage 进行存储数据
  - 实质上调用 useStorage 内部使用
  - useStorage(key, initialValue, window == null ? void 0 : window.sessionStorage, options)

----
4. #### useStorageAsync()

  - useStorage：用于同步本地存储, 它会立即返回存储值
  - useStorageAsync：用于处理异步存储值。它会返回一个 Ref 对象，并且可以确保在异步操作完成后更新这个 Ref 对象的值

----
5. #### useRefHistory(source, options = {})

  - 跟踪 ref 的更改历史, 提供撤消和重做功能
  - 返回一系列属性, 方法如下图

  ![4.png]

  - 通过 ref<history> 来查看更新历史记录

    ```javascript
    const counter = ref(0)
    const { history, undo, redo } = useRefHistory(counter)

    counter.value += 5
    await nextTick()
    console.log(history.value)
    /*
    [
        { snapshot: 1, timestamp: 1601912898062 },
        { snapshot: 0, timestamp: 1601912898061 }
    ] 
    */
    console.log(counter.value)  // 5
    ```

  - 通过 undo 来撤销操作, redo 来前进操作

    ```javascript
    console.log(counter.value)  // 5
    undo()
    console.log(counter.value)  // 0
    redo()
    console.log(counter.value)  // 5
    ```

  - 配置 deep 来深度监听属性值

    ```javascript
    const { history, undo. redo } = useRefHistory(state, {
        deep: true
    })
    ```
  
  - 设置记录容器容量, 然后可以调用 clear 清除历史记录

    ```javascript
    const { clear } = useRefHistory(state, {
        capacity: 15  // 只能保留15条记录
    })
    clear()  // 清除所有的记录
    ```

----
6. #### useThrottledRefHistory(source, options = {})

  - 带节流过滤器的 useRefHistory 的简写
  - 该函数在计数器的值被更改后立即获取第一个快照，第二个快照会延迟1000ms

    ```javascript
    import { ref } from 'vue'
    import { useThrottledRefHistory } from '@vueuse/core'

    const counter = ref(0)
    const { history, undo, redo } = useThrottledRefHistory(counter, { deep: true, throttle: 1000 })
    // 延迟1s后才会记录第二个快照
    ```
