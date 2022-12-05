const A = {
    template: '<div>foo</div>',
    created() {
        console.log('A-created')
    },
    beforeRouteUpdate(to, from, next) {
        console.log(777)
        next()
    }
}
const B = {
    template: '<div>bar</div>',
    created() {
        console.log('B-created')
    }
}
const C = {
    template: '<div>cccc</div>'
}

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现, 这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    linkActiveClass: 'test',
    routes: [
        { path: '/a/:id', component: A },
        // { path: '/a/1', component: A },
        // { path: '/a/2', component: A },
        { path: '/aa', component: A },
        { path: '/b', component: B }
    ]
    /**
     *   1. 动态路由
     *    ':id' --- $route.params.id
     *    ':userId/edit/:id --- $route.params = { userId: '', id: '' }
     *    当路由切换时, 组件同一个, 则原来的组件实例会被复用！
     *     A. 用 watch: { $route(to, from) {} }
     *        如下：跳转不同地址, 引用同一个组件会被复用【任何一种情况的只要跳转、引用同一个组件即会复用】
     *        --- 针对动态参数不同、query参数不同 下面的周期函数组件才会进入！！！
     *        如：{ path: '/a/:id', component: A }
     *     B. beforeRouteUpdate (to, from, next) { next() }
     */
})

const app = Vue.createApp({
    computed: {
        path() {
            return this.$route.path
        }
    },
    methods: {
        testClick () {}
    }
})

app.use(router)
app.mount('#box')
