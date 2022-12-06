const A = {
    template: '<div>AAA</div>',
    props: ['id'],
    created() {
        console.log('A', this.id)
    }
}
const B = {
    template: '<div>BBB</div>',
    props: ['id'],
    created() {
        console.log('B', this.id)
    }
}
const C = {
    template: '<div>CCC</div>',
    props: ['id', 'test'],
    created() {
        console.log('C', this.id, this.test)
    }
}
const D = {
    template: '<div>DDD{{this.resultId}}</div>',
    props: ['resultId'],
    created() {
        console.log('D', this.resultId)
    }
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/a/:id', component: A, props: true },
        {
            path: '/b/:id',
            components: {
                default: B,
                other: C
            },
            props: {
                default: true,
                other: false
            }
        },
        { path: '/', component: C, props: { test: '测试' } },
        {
            path: '/d/:id',
            component: D,
            props: route => {
                return { resultId: `contractId-${route.params.id}` }
            }
        }
    ]
    /**
     *   在组件中使用 $route 会使之与其对应路由形成高度耦合, 从而使组件只能在某些特定的 URL 上使用
     * 
     *   1. 使用 props: true / false
     *   - 对于包含命名视图的路由, 你必须分别为每个命名视图添加 `props` 选项
     * 
     *   2. 使用 props: { newProps: '...' } 对象模式
     *   - 在组件内获得 按原样设置为组件属性, 当 props 为静态时有用, 区别与1 的 :id 这种形式
     * 
     *   3. 使用 props: route => ({ query: route.query.q })  函数模式
     *   - 创建一个函数返回 props. 将静态值与基于路由的值结合等等
     *   - 请尽可能保持 props 函数为无状态的, 因为它只会在 '路由发生变化' 时起作用【即不要在里面定义一些 state 状态，否则无法响应】
     *   - 如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应
     */
})

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
