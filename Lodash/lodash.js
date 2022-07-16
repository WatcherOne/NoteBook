/***********************************************
 *  lodash - 模拟
 ************************************************/
const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e+308

function chunk (array, size) {
    size = Math.max(toInteger(size), 0)
    // 判断array的类型, 为 undefined、null、0、'' 都为0
    const length = array == null ? 0 : array.length
    // 去掉 array.length 不存在的情况，如 数值
    if (!length || size < 1) {
        return []
    }
    if (length <= size) {
        result.push(array)
        return result
    }
    let result = []
    const copies = Math.ceil(length / size)
    for (let i = 0; i < copies; i++) {
        // slice 截取数组效率 与 一个个取出来塞入要低（无法实质证明） 
        // 效率高的原因是： 需要减少原生方法的使用, 再者是个工具库肯定尽可能不用原生方法
        result.push(baseSlice(array, i * size, (i + 1) * size))
    }
    return result
}

function compact (array) {
    if (typeof array !== 'object') {
        return array
    }
    if (array instanceof Array) {
        return array.filter(Boolean)
    } else {
        return array
    }
}

function difference (array, values) {
    if (!isArray(array)) {
        return array
    }
    return array.filter(value => {
        return !values.includes(value)
    })
}

function isArray (array) {
    return Array.isArray(array)
}

// 代替 Array.slice() 是保证能够正确的返回, 做了很多类型判断处理
function baseSlice (array, start, end) {
    let length = array.length
    if (start < 0) {
        start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
        end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    let index = -1
    const result = Array(length)
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}

function toInteger (value) {
    const result = toFinite(value)
    // 取出整数位
    // 取出整数位的其它方法
    // 1. parseInt()
    // 2. Math.trunc() es6 提供
    // 3. value | 0  位操作符, 只能作用于 32 位的数值
    const remainder = result % 1
    // result === result 过滤掉 NaN, NaN !== NaN
    // isNaN() 全局属性也可以判断NaN，但是是判断所有不可以转化为Number类型的，如 '2sa'
    // Number.isNaN() es6 对上的完善！
    return result === result ? (remainder ? result - remainder : result) : 0
}

// 获取一个有限数字的（可以把一个无穷的数字变为一个有限数字）
function toFinite (value) {
    // 不传value 直接返回 0 / -0
    if (!value) {
        // 这样写 是为了 更好地 返回 -0 的情况（自测）
        return value === 0 ? value : 0
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        const sign = (value < 0 ? -1 : 1)
        return sign * MAX_INTEGER
    }
    // 过滤 NaN
    return value === value ? value : 0
}

// 转化为 Number - 各种类型的判断很严谨
function toNumber (value) {
    if (typeof value === 'number') {
        return value
    }
    // 需要判断Symbol， 因为Symbol类型 +() 转会报错
    // todo
    return value === 0 ? value : +value
}

function add (a, b) {
    return a + b
}

window.lodash = {
    chunk: { argumentlen: 2, fn: chunk, describe: '...' },
    compact: { argumentlen: 1, fn: compact, describe: '...' },
    difference: { argumentlen: 2, fn: difference, describe: '...' },
    add: { argumentlen: 2, fn: add, describe: '...' },
}
