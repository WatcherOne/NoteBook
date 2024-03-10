## 迭代器

----

1. 迭代器对象, 一个用于`遍历任何[可迭代对象]`的接口/工具
2. 就是用来遍历各种可迭代的数据结构, 不关心数据内部的实现细节
3. 具有[next(str)]方法的对象, str可选

4. 通过 `数据结构[Symbol.iterator]()` 可返回一个迭代器对象
5. next 函数返回一个 值对象(value)和布尔值(done)
        - value: 表示当前迭代项的取值
        - done:  表示是否遍历结束
6. 当一个数据结构具有 [Symbol.iterator] 属性, 返回具有 next 的函数时, 就表示是一个可迭代对象

```javascript
const iteratorObj = {
    [Symbol.iterator]: function () {
    // 简写: [Symbol.iterator]() {}
        // 返回一个迭代器对象
        return {
            next: () => {
                return { value: 1, done: false }
                // return { value: undefined, done: true }
            }
        }
    }
}
```
----

> #### 原生具有Iterator接口的数据结构

- *Array*
- *String*
- *Map*
- *Set*
- *WeakMap*
- *WeakSet*
- *TypeArray*(类型化数组:Int8Array...)
- *NodeList*
- *HTMLCollection*
- *arguments*对象也可以迭代

----

> #### for...of

- for (let item of arr) 用于遍历具有迭代器接口的数据结构
- 当使用 for...of 循环遍历某种数据结构时, 该循环会自动去寻找 Iterator 接口
任何数据结构只要部署了Iterator接口, 就可以完成遍历操作
- 用 for...of 遍历生成器对象是最佳方式
```javascript
for (let value of generator()) {}
// generator 是一个生成器函数
// generator() 返回一个生成器对象, 生成器对象本身是实现了迭代器接口的
```

> #### 扩展运算符

- 扩展运算符会自动调用迭代器接口, 从而获取元素并将它们放入一个新数组中
- 只有当对象实现了迭代器接口时，扩展运算符才能够发挥作用
- 通常会使用`Array.from`方法来完成转换

