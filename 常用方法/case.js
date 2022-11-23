/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-11-21 09:13:14
 * Description: 大小写的切换
 * 不会转换字符串中的非字母字符
 * toLowerCase() 将字符串中所有字符转换为小写
 * toLocaleLowerCase(locale) 方法按照本地方式把字符串转换为小写
 * 
 * 只有几种语言（如土耳其语）具有地方特有的大小写映射, 所有该方法的返回值通常与 toLowerCase() 一样
 * 在 土耳其 中： i 与 İ 成对（小大写） ı 与 I 成对（小大写）
 * [即 小写i 与 大写I 在土耳其中是另外匹配的！！！]
 * [A. 在浏览器中设置语言为'土耳其' / 或使用参数配置的宿主环境当前区域语言环境 ('tr' // 土耳其) ('en-US' // 美国) ('zh-CN' // 中文简体) ('zh-TW' // 中文繁体)]
 * [B. 使用 toLocaleLowerCase()才会采用土耳其大小写规则]
 * 
 * 特殊符号
 * 【顺着过去, 因为前面那个符号特殊, 所有不管哪个地方, 哪种方法都会转换成对应后面的字母】
 * 转大写  ı --> I  ſ --> S
 * 转小写  İ --> i  K --> k (前面那个不是大写的K哈!)
 *
 *
 * A-Z 和 a-z 的 ASCLL编码的十进制刚好相差 32
*************************************************************/

/**************************************************************
 * type：可根据传参区分大小写切换规则
 * 1：全部小写
 * 2：全部大写
 * 3：大小切换
*************************************************************/
function caseSwitch (value, type = 1) {
    if (!value) return ''
    if (value.constructor === Number || value.constructor === String) {
        const str = value.toString().trim()
        if (!str) return ''
        if (type === 1) {
            return str.toLowerCase()
        }
        if (type === 2) {
            return str.toUpperCase()
        }
        if (type === 3) {
            console.log(changeCase1(str))
            return changeCase(str)
        }
    } else {
        throw new TypeError('parameter type is error')
    }
}

function changeCase (str) {
    let result = ''
    const UP_MIN_CODE = 'A'.charCodeAt()
    const UP_MAX_CODE = 'Z'.charCodeAt()
    const LOW_MIN_CODE = 'a'.charCodeAt()
    const LOW_MAX_CODE = 'z'.charCodeAt()
    for (let i of str) {
        const code = i.charCodeAt()
        // 可换成正则判断
        // /[A-Z]/.test(i) 为大写
        // /[a-z]/.test(i) 为小写
        if (code >= UP_MIN_CODE && code <= UP_MAX_CODE) {
            result += String.fromCharCode(code + 32)
        } else if (code >= LOW_MIN_CODE && code <= LOW_MAX_CODE) {
            result += String.fromCharCode(code - 32)
        } else {
            result += i
        }
    }
    return result
}

function changeCase1 (str) {
    let result = ''
    for (let i of str) {
        const code = i.charCodeAt()
        if (/[A-Z]/.test(i)) {
            result += String.fromCharCode(code + 32)
        } else if (/[a-z]/.test(i)) {
            result += String.fromCharCode(code - 32)
        } else {
            result += i
        }
    }
    return result
}

console.log(caseSwitch('dadGADWQ$@12311.DQwewe', 3))
