const A = {
    template: '<div>AAA</div>',
    created() {
        console.log('A-created')
    }
}
const B = {
    template: '<div>BBB</div>',
    beforeRouteEnter(to, from, next) {
        console.log('b-beforeRouteEnter')
        next(vm => {
            console.log('b-beforeRouteEnter-next')
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log('b-beforeRouteUpdate')
        next()
    },
    beforeRouteLeave(to, from, next) {
        console.log('b-beforeRouteLeave')
        next()
    }
}
const C = {
    template: '<div>CCC-{{id}}</div>',
    props: ['id'],
    beforeRouteEnter(to, from, next) {
        console.log('c-beforeRouteEnter')
        next(vm => {
            console.log('c-beforeRouteEnter-next')
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log('c-beforeRouteUpdate')
        next()
    },
    beforeRouteLeave(to, from, next) {
        console.log('c-beforeRouteLeave')
        next()
    }
}
const D = {
    template: '<div>DDD</div>',
    beforeRouteEnter(to, from, next) {
        console.log('d-beforeRouteEnter')
        next(vm => {
            console.log('d-beforeRouteEnter-next')
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log('d-beforeRouteUpdate')
        next()
    },
    beforeRouteLeave(to, from, next) {
        console.log('d-beforeRouteLeave')
        next()
    }
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: A
        },
        {
            path: '/a',
            component: A,
            beforeEnter: (to, from, next) => {
                console.log('a-beforeEnter', to, from)
                next()
            }
        },
        {
            path: '/b',
            component: B,
            beforeEnter: (to, from, next) => {
                console.log('b-beforeEnter', to, from)
                next()
            }
        },
        {
            path: '/c/:id',
            component: C,
            props: true,
            beforeEnter: (to, from, next) => {
                console.log('c-beforeEnter', to, from)
                next()
            }
        },
        {
            path: '/d',
            components: {
                default: C,
                other: D
            },
            props: {
                default: true,
                other: false
            },
            beforeEnter: (to, from, next) => {
                console.log('d-beforeEnter', to, from)
                next()
            }
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', to, from)
//     next()
//     console.log('beforeEach-after')
// })
router.beforeResolve((to, from, next) => {
    console.log('beforeResolve', to, from)
    next()
})
router.afterEach((to, from) => {
    console.log('afterEach', to, from)
})

/**
 *   “导航” 表示路由正在发生改变
 *   导航守卫主要用来通过跳转或取消的方式守卫导航
 *   参数或查询的改变并不会触发 进入/离开 的导航守卫 (即只会进入全局的与组件内的beforeRouteUpdate如下解释)
 *   [params 与 query 的改变 并不会触发 某些导航守卫]
 * 
 *   一、 全局
 *     1. 前置守卫：router.beforeEach((to, from, next) => {...})
 *        - 任何情况下都会进入
 *        - 当一个导航触发时, 全局前置守卫按照创建顺序调用
 *        - 守卫是异步解析执行, 此时导航在所有守卫 resolve 完之前一直处于 等待中
 *        - to, from (即将要进入的目标路由，正要离开的路由)
 *        - next: 一定要调用该方法来 resolve 这个钩子
 *       A. next()       //  进入管道的下一个钩子
 *       B. next(false)  //  中断当前导航, 如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
 *       C. next('/')    //  跳转到一个不同的地址
 *       C. next({ path: '/' }) 
 *       D. next(error)  // 传入 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
 *        
 *        *** next() 函数后 依然可以执行，故应保证next被严格调用一次  
 * 
 *       --- v4.x后，第三个参数 next 是可选的了，采用下列方式
 *       --- 以下所有导航守卫的 next 都是可选的！！！！
 *         A. 通过 return undefined / true 调用下一个导航守卫
 *         B. 通过 return [path] 通用一个路由地址跳转到对应地址 【 return { path: '/a' } 】
 *         C. 通过 return false 取消当前导航
 *   
 *     2. 解析守卫：router.beforeResolve((to, from, next) => {...})
 *        - 与 router.beforeEach 类似（需 next()）
 *        - 区别是在导航被确认之前, 同时在所有组件内守卫和异步路由组件被解析之后, 解析守卫就被调用
 *        - 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置
 * 
 * 
 *     3. 后置钩子：router.afterEach((to, from) => {...})
 *        - 与守卫不同的是，这些钩子不会接受 next 函数，也不会改变导航本身
 *        - 基本最后进入
 *        *- 而且跳转相同路由时也会进入
 *        - 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
 * 
 *     4. 路由独享守卫：beforeEnter: (to, from, next) => {...}
 *        - 在路由配置时配置
 *        - 在前置守卫 router.beforeEach 之后, 解析守卫 router.beforeResolve 之前
 *          因为解析守卫是在所有组件内守卫与异步路由组件被解析后才被调用
 *        *** beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发
 *          (只跟路由配置处的走向有关，跟组件是否复用无关！)
 *        * v4.x: 可以将一个函数数组传递给 beforeEnter, 函数本身返回 路由地址对象。
 * 
 *     5. 组件内的守卫：
 *        A. beforeRouteEnter
 *        B. beforeRouteUpdate（2.2+）
 *        C. beforeRouteLeave
 * 
 *        beforeRouteEnter(to, from, next) {
 *          // 在渲染该组件的对应路由被 confirm 前调用
 *          // 因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建
 *          // 不！能！获取组件实例 `this`, 因为当守卫执行前, 组件实例还没被创建
 *          // 可以通过传一个回调给 next来访问组件实例, 在导航被确认的时候执行回调
 *          // 被确认了 则还在 全局后置守卫（router.afterEach） 后面！！
 *          next(vm => {...}) // vm 访问组件实例
 *          // beforeRouteEnter 是支持给 next 传递回调的唯一守卫
 *        }
 * 
 *        beforeRouteUpdate(to, from, next) {
 *          // 在当前路由改变，但是该组件被复用时调用（只query与params与hash改变时）
 *          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
 *          // 可以访问组件实例 `this`
 *          // - 当复用时, 就不会进入另外两个了！
 *          // - 即，参数或查询的改变并不会触发 进入/离开 的导航守卫
 *          // 当有进入这个时，不会进入另外两个 和 路由配置里的 beforeEnter
 *        }
 * 
 *        beforeRouteLeave(to, from, next) {
 *          // 导航离开该组件的对应路由时调用
 *          // 可以访问组件实例 `this`
 *          // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
 *          // v4.x+ 中 通过 return false 取消离开
 *        }
 * 
 *    完整导航过程
 *    1. 导航触发开始
 *    2. 在失活的组件里调用 【beforeRouteLeave】 守卫
 *    3. 调用全局的【beforeEach】守卫
 *    4. 调用路由配置里的【beforeEnter】[如果是复用了组件, 则不进入]
 *       - 解析异步路由组件
 *    5. 被激活的组件里调用【beforeRouteEnter】[如果是复用了组件, 则不进入]
 *    6. 在重用的组件里调用【beforeRouteUpdate(2.2+)】[则4，5不会进入了！, 相互切换时组件里的离开守卫也不会进入]
 *    7. 调用全局的【beforeResolve】 守卫
 *    8. 导航被确认！
 *    9. 调用全局的【afterEach】钩子（导航已经确认,不能阻止了！）
 *   10. 触发DOM更新
 *   11. 调用激活组件里的【beforeRouteEnter】守卫中传给 next 的回调函数, 创建好的组件实例会作为回调函数的参数传入
 *    
 * 
 *   - 当多个命名视图时，导航顺序整体不变，只是组件里面的导航顺序问题，一般按谁在前谁先进入
 *   - 其实 params与query与hash 的改变（是复用组件问题）但：实际上路由配置处的路由匹配并没有发生变化
 *     故 beforeEnter 不会进去，组件内的导航守卫只有 beforeRouteUpdate 会回调
 * 
 * 
 *   - 1. router-view 渲染的组件才有导航守卫, 对应组件内的子组件是没有的
 *   - 2. 对于 router-view 的 key 来说, 只是不复用组件是 vue 范畴, 但还是相当与 至于 params 的 改变时
 *        *- 路由的导航还是会 只进入组件内的导航守卫 beforeRouteUpdate
 *        - 跟组件复用不复用没有关系
 *   - 3. push()的promise回调是 在 router.beforeResolve 导航被确认之后, 组件内 created() 之后, mounted() 之前！
 *        - 导航方法都会返回一个 Promise, 让我们可以等到导航完成后才知道是成功还是失败
 *        - 常用于故障检测
 * 
 *   故障检测
 *   const { NavigationFailureType } = VueRouter
 *   -. redirected: 在导航守卫中调用了 next(newLocation) 重定位到了其他地方 [v4.0无]
 *   1. aborted：在导航守卫中调用了 next(false) 中断了本次导航
 *   2. cancelled：在当前导航还没有完成之前又有了一个新的导航；比如，在等待导航守卫的过程中又调用了 router.push。
 *   3. duplicated：导航被阻止，因为我们已经在目标位置了
 *  
 *   重定向的检测不同：router.currentRoute.value.redirectedFrom === turth
 *     - 重定向不会阻止导航，而是创建一个新的导航
 *  
 *   不要在路由中使用异步组件；异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的
 *   router.hasRoute()：检查路由是否存在。
 *   router.getRoutes()：获取一个包含所有路由记录的数组。  
 * 
 */

const app = Vue.createApp({
    methods: {
        link() {
            this.$router.push('/a').then(() => {
                console.log('ok-结束')
            })
        }
    }
})

app.use(router)
app.mount('#box')
