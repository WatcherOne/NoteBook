const A = {
    template: '<div>AAA</div><router-view></router-view>',
    created() {
        console.log('created', this.$route)
    }
}
const B = {
    template: '<div>BBB</div>',
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/a'
        },
        {
            path: '/a',
            component: A,
            meta: { requiredAuth: true },
            children: [
                {
                    path: '',
                    component: B,
                    meta: { test: '233' }
                }
            ]
        },
        { path: '/b', component: B }
    ]
})

router.beforeEach((to, from) => {
    console.log(to, to.matched)
})

/**
 *   配置路由时的元信息
 * 
 *   1. 首先, 我们称呼 routes 配置中的每个路由对象为 路由记录
 *      路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录
 *   2. 一个路由匹配到的所有路由记录会暴露为 $route 对象的 $route.matched 数组
 *      - 还有在导航守卫中的路由对象 to.matched
 *   3. 因此, 我们需要遍历 $route.matched 来检查路由记录中的 meta 字段
 * 
 *   --- A. 路由记录
 *       B. 嵌套时的多个路由记录
 *       C. $route.matched 获取的是路由记录数组
 *       D. $route.meta 可以直接获得, 是 合并了所有路由记录中的 meta 的方法
 *
 *       matched 数组中的对象 还跟 $route 还有点不一样,
 *       里面有额外的 aliasOf, children...
 * 
 *       // $route.matched // 而不是去检查每条路由记录
 *       $route.meta 方法, 它是一个非递归合并所有 meta 字段的（从父字段到子字段）的方法
 * 
 * 
 *   数据获取
 *   1. 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据
 *      - 在数据获取期间显示“加载中”之类的指示。
 *
 *   2. 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。
 *   
 *   从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种
 *
 */

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
