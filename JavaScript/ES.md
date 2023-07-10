##### ES7（2016）

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


##### ES8（2017）

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
