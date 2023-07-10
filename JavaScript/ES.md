##### ES7（ES2016）

1. Array.prototype.includes
> 用来判断一个【数组】和【字符串】中是否包含一个指定值（全等于）

```javascript
arr.includes(valueToFind, fromIndex)
// fromIndex
// 1. 从指定索引位置开始查询(包括当前位置)
// 2. 大于数组长度：返回false
// 3. 负数时, 数组长度+fromIndex = 新的fromIndex：
//    即倒着找位置：-1表示从最后一个, -2表示从倒数第二个...
//    直到回来最开始位置之后不能往前了则搜索整个数组！
```

2. Exponentiation Operator（幂运算）
> 幂运算符：**，相当于 Math.pow()

```javascript
5 ** 2  === Math.pow(5, 2)  === 5 * 5    // 25
```

* 位运算
* 将一个整数的二进制格式进行运算
* 首先将其转换为一个整数，并按照32位的整数二进制排列（第一位表示符号位，0为正数、1为负数）
* 位运算符： &  |  ~ （且，或，非）
* [!] 计算机不能做减法，只能做加法！
* [!] 计算机存储的都是补码
* [!] 真码 反码 补码（只针对负数，正数在计算机中，反码补码相同）
* 真码：就是看起来正常表示的数：如 -1 > 1000 0000 0000 0000 0000 0000 0000 0001 (符号位1表示负数,最后一位表示1)
* 反码：将真码符号位不变，其余全部取反： 1111 1111 1111 1111 1111 1111 1111 1110
* 补码：将反码+1就得到负数的补码：      1111 1111 1111 1111 1111 1111 1111 1111
* ~X = -X - 1

* ~~按位取反两次
* 位运算的操作值要求是整数, 所以结果也是整数
* ~~会将后面的运算操作数转成Int类型
* ~~作用就是【取整数】！

* 交换两个变量
```javascript
let a = 3;
let b = 4;
// 方法一
let temp = a;
a = b;
b = temp;

// 方法二
b = a + b;
a = b - a;
b = b - a;

// 方法三
a = a ^ b;
b = a ^ b;
a = a ^ b;

// 方法四
[b, a] = [a, b]
// 定义b=4后面的分号一定要用，否则解构赋值为出现问题
// 会将 b=4 [b, a] 作为一个整体！
```

* 位移运算（将数字二进制数位移，除符号位，0补全）
* << 左位移！（还是针对整数）
* X << 3  表示  X * Math.pow(2, 3)
* X << 1  表示  数字 X 扩大两倍
* >> 右位移！(可能会丢失精度，慎用！)
* X >> 3  表示  X / Math.pow(2, 3)
* 取整数部分


##### ES8（ES2017）

1. Async 异步函数（promise 的语法糖）

2. Object.values()
> 返回一个给定对象自身可枚举属性值的数组

3. Object.entries()
> 返回一个给定对象自身可枚举属性的键值对数组

```javascript
Object.entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
```

4. Object.getOwnPropertyDescriptors(obj)
> 用来获取一个对象的所有自身属性的描述符

```javascript
Object.getOwnPropertyDescriptors({ a: 1 })
// [a: { configurable: true, enumerable: true, value: 1, writable: true }]
```

5. String.prototype.padStart()
> 用一个字符串填充当前字符串

```javascript
str.padStart(maxlength, padString)
// 1. maxlength: 需要填充到结果的总长度（如果小于等于当前字符串长度，怎返回当前字符串而本身）
// 2. padString: 填充的字符串，若填充的字符串太多拼接后超过最大长度参数，则取填充字符串开始位置起
'abc'.padStart(6, '123456')  //  '123abc'
```

6. String.prototype.padEnd()
> 用一个字符串填充当前字符串

```javascript
str.padEnd(maxlength, padString)
// 1. 填充字符串结尾，直到达到目标长度
// 2. maxlength: 如果小于等于当前字符串长度，则返回当前字符串本身
// 3. padString: 填充的字符串，若填充的字符串太多拼接后超过最大长度参数，则取填充字符串开始位置起
'abc'.padEnd(6, '123456')   //  'abc123'
```


##### ES9（ES2018）

1. Async iterators 异步迭代器
>  iterator.next().then(({value, done}) => {})

2. Object rest properties 剩余属性
>  ...

```javascript
let { a, b, ...rest } = obj
// 1. 扩展运算符只能放在解构的最后面
// 2. null 不能使用扩展运算符 let { a, ...rest } = null
```

3. Object spread properties 解构赋值

```javascript
let rest = { b: 2, c: 3 }
let result = { a: 1, ...rest }
```

4. Promise.prototype.finally
> 在 Promise 结束时，不管结果是 resolved 还是 rejected，都会调用 finaly 中的方法


##### ES10（ES2019）

1. Array.prototype.{flat, flatMap} 扁平化嵌套数组
> flat(depth) 会按照一个可指定的深度遍历递归数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
> depth: 数组遍历的深度，默认为1
> 返回一个新数组，不会改变旧数组

```javascript
arr.flat()   // 默认为1
arr.flat(2)  // 扁平化到第二级
arr.flat(-1) // 不会进行任何扁平化，返回相同原数组
arr.flat(Infinity)  // 全部扁平化
[1, , ,3].flat()    // 会移除数组中的空项 // [1, 3] 
```

> flatMap(callback) 首先使用映射函数映射数组（深度值为1）的每个元素，然后将结果压缩成一个新数组。
> 返回一个新数组，而且每个元素都是回调函数的结果

```javascript
let arr = ['My home', 'is', '', 'lisa']
arr.flatMap(cur => cur.split(' '))
// ['My', 'home', 'is', '', 'lisa']
```

2. Object.fromEntries()
> 会把键值对列表转换成一个对象
> Object.fromEntries(iterable) // itetable: Array/Map等可迭代对象

```javascript
let map = new Map([['a', 1], ['b', 2]])
Object.fromEntries(map)  // { a: 1, b: 2 }
```

3. String.prototype.{ trimStart, trimEnd }
> trimStart() 用来删除字符串开头空白字符 -- trimLeft() 别名
> trimEnd()   用来删除字符串结尾空白字符 -- trimRight() 别名
> 返回一个新的字符串

```javascript
let str = '  a b c   '
str.trimStart()  // 'a b c   '
str.trimEnd()    // '  a b c'
```

4. Symbol.prototype.description
> 只读属性，返回一个可选描述的字符串

```javascript
Symbol('myDescription').description   // myDescription
Symbol().description                  // undefined
Symbol.for('foo').description         // foo
```

5. Optional catch binding
> 可省略catch绑定参数

```javascript
// old
try {} catch(err) {}
// new
try {} catch {}
```


##### ES11（ES2020）

1. 空值合并运算符
> ?? 是一个逻辑操作符, 当左边操作数为null或undefined时, 返回右侧操作数, 否则返回左侧操作数

```javascript
undefined ?? 'foo'  // 'foo'
null ?? 'foo'       // 'foo'
'foo' ?? 'bar'      // 'foo'
```

> || 或逻辑操作符, 当左侧为【假值】时返回右侧操作数，否则返回左侧操作数

```javascript
0 || 'foo'   // 'foo'
0 ?? 'foo'   // 0
'' || 'foo'  // 'foo'
'' ?? 'foo'  // ''
```

> 不可以将 ?? 与 && || 一起使用，否则会报错

2. 可选链
> ?. 允许读取位于连接对象链深处的属性值，而不必明确验证链中的每个引用都是否有效
> 类似于 . 不同在于 引用为 null 或 undefined 时不会报错

```javascript
const street = user && user.address && user.address.street
const street2 = user ?. address ?. street
```

3. globalThis
> 在 Web 中，可以通过window、self取到全局对象，在node中必须使用 global
> globalThis 提供一个标准方式来获取不同环境下的全局对象自身值

4. BigInt
> 一种内置对象，用于创建更大的整数，可以用来表示任意大的整数

5. String.prototype.matchAll()
> 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器

```javascript
const regexp = /t(e)(st(d?))/g
const str = 'test1test2'

const array = [...str.matchAll(regexp)]
console.log(array[0])  // ["test1", "e", "st1", "1"]
console.log(array[1])  // ["test2", "e", "st2", "2"]
```

6. Promise.allSettled()
> 返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise
> 并带有一个对象数组，每个对象表示对应的 promise 结果

```javascript
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values))

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

7. Dynamic import (按需加载)
> import 可以在需要的时候，再加载某个模块


##### ES12（ES2021）

1. 逻辑运算符和赋值表达式

> &&=
> x &&= y 等价于 x && (x=y)：当 x 为真时, x=y

```javascript
let a = 1
let b = 0

a &&= 2    // a = 2
b &&= 3    // b = 0
```

> ||=
> x ||= y 等价于 x || (x=y): 当 x 为falsy时, x=y

```javascript
let a = 1
let b = 0

a &&= 10   // a = 1
b &&= 3    // b = 2
```

> ??=
> x ??= y 等价于 x ?? (x=y): 当 x 为null或undefined时, x=y

```javascript
let a = 1
let b

a &&= 10   // a = 1
b &&= 3    // b = 3
```

2. String.prototype.relaceAll(pattern, replacement)

>  返回一个新字符串
>  字符串中所有满足 pattern 的部分都会被 replacement 替换掉
>  原字符串保持不变
>  pattern 可以是一个字符串或RegExp
>  replacement 可以是一个字符串或一个再每次被匹配被调用的函数

```javascript
'aabbcc'.replaceAll('b', '.')   // 'aa..cc'
'aabbcc'.replaceAll(/b/g, '.')  // 'aa..cc'
// 使用正则表达式时, 必须加上 /g 否则会报错
```

3. 数字分隔符

> 允许 JavaScript 的数值使用下划线（_）作为分隔符，但是没有规定间隔的位数
> 123_00  // 12300
> 0.1_23  // 0.123

```javascript
// 1. 不能放在数值的最前面和最后面 _3
// 2. 不能将两个及两个以上的分隔符连在一起 2__3
// 3. 小数点的前后不能有分隔符  52_._3
// 4. 科学记数法里，e 或 E 前后不能有分隔符
```

