/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-11-14 09:22:23
 * Description: 防抖函数
 * 在一段时间内只执行一次, 多次触发只会执行一次触发事件！
 * （多次触发会以最后一次为准, 延长触发时间）
 * （在事件被触发n秒后再执行回调, 如果在这n秒内又被触发, 则重新计时）
 * （用户触发时间过于频繁, 只要最后一次请求的操作）
 * *** 
 * 防抖就是只执行最后一次, 节流就是控制事件触发的次数
*************************************************************/

// 自执行形成一个单例模式
const debounce = (function () {
    // 防止timer全部变量污染环境, 用闭包来封装
    // 设置一个计时器变量, 用闭包保存, 保证不会被内存释放
    // 形成闭包, 使timer存在于内存中, 以保存上一次的值
    let timer = null
    return (callback, time = 500) => {
        timer && clearTimeout(timer)
        timer = setTimeout(callback, time)
    }
})()

const debounce2 = (function () {
    let timer = null
    // immediate 是否立即执行
    return (callback, time = 500, immediate = true) => {
        timer && clearTimeout(timer)
        if (immediate) {
            if (!timer) callback()
            timer = setTimeout(() => {
                timer = null
            }, time)
        } else {
            timer = setTimeout(callback, time)
        }
    }
})()

const debounce3 = function (callback, time = 500) {
    console.log(333)
    let timer = null
    return function () {
        timer && clearTimeout(timer)
        // 如果没有那么多箭头函数, 可能需要用 call 来切换 this 指向
        // 如果有箭头会使 this 指向 window
        timer = setTimeout(() => {
            callback.call(this)
        }, time)
    }
}
// addEventListener('type', 回调函数)
// 如果回调函数为 debounce3(fn, 500) 表示得到的回调函数是 debounce3 执行后的返回函数
// 故 事件绑定回调函数实际上是 执行 debounce3 执行后的函数, 故 debounce3 在 return 前的代码只执行一次
