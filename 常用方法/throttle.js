/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-11-14 13:39:31
 * Description: 节流函数
 * 每间隔一段时间才会触发一次, 而不管一段时间内触发多少次
 * （在一段时间内, 不管触发多少次, 至少至多触发一次）[在时间后执行]
 * （而防抖是以最后一次触发为准, 会延长触发）
 *  当某个操作是连续性执行的时候, 我们通过某种方式, 降低该操作的执行频率, 这就是节流 
*************************************************************/
// 比如我们在拖动一个物体的时候，会监听物体的坐标
// 一般情况下，只要一拖动，坐标就会实时返回，会返回很多次
// 这其实没有必要的，如果我们有需求是需要记录这些坐标的话，就会产生很多没有必要的数据
// 这个时候，如果做了节流处理的话，就能大大降低执行的次数，避免很多不必要的数据记录

/**
 *  两种写法：
 *  1. 一种是通过定时器来指定时间后执行, 频繁触发也只会在指定时间执行一次
 *  2. 一种是通过判断当前时间与开始触发时间的间隔是否大于指定时间, 大于则执行
 */
const throttle = function () {
    let timer = null
    return (callback, time) => {
        if (timer) return
        timer = setTimeout(() => {
            callback()
            timer = null
        }, time)
    }
}

const throttle2 = function () {
    let timer = 0
    return function (callback, time) {
        const currentTime = +new Date()
        if (currentTime - timer > time) {
            callback()
            timer = currentTime
        }
    }
}
