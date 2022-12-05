const A = {
    template: '<div>AA<router-view></router-view></div>'
}
const B = {
    template: '<div>BB</div>',
    created() {
        console.log('b-created')
    }
}

const routes = [
    {
        path: '/a',
        name: 'a',
        component: A,
        children: [
            {
                path: 'a',
                name: 'AA',
                component: A
            },
            {
                path: '',
                name: 'AB',
                component: B
            }
        ]
    },
    { path: '/b', component: B },
]
/**
 *  要注意，以 / 开头的嵌套路径会被当作根路径
 *  这让你充分的使用嵌套组件而无须设置嵌套的路径
 * 
 *  当路径未匹配到子路由时, 则渲染父组件, 而父组件里面的 router-view 则是空的
 * 
 *  嵌套的命名路由, 通常会给子路由命名, 通过编程式导航可以直接命名路由导航过去
 *  - 命名父路由或命名子路由都有时, 当你希望导航到命名路由而不是嵌套路由上
 *  即只渲染父路由的组件 而 非子路由的组件！！！
 *  但请注意重新加载页面将始终显示嵌套的子路由，因为它被视为指向路径/users/:id 的导航，而不是命名路由
 *  如上 this.$router.push({ name: 'a' })
 * 
 *  ***** 可以通过命名路由来跳转 会出现只渲染父组件 而没有组件的问题
 * 
 */


const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现, 这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({})

app.use(router)
app.mount('#box')