const A = {
    template: '<div>AAA</div>',
}
const B = {
    template: '<div>BBB</div>',
    created() {
        console.log('B-created')
    },
    mounted() {
        console.log('B-mounted')
    }
}
const Bottom = {
    template: '<div>底部</div>',
    created() {
        console.log('C-created')
    },
    mounted() {
        console.log('C-mounted')
    }
}
const C = {
    template: '<div>CCCC</div>',
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        next()
    }
}

const router = VueRouter.createRouter({
    // history: VueRouter.createWebHashHistory(),
    history: VueRouter.createWebHistory(),
    routes: [
        { path: '/a', name: 'a', component: A },
        {
            path: '/b',
            name: 'b',
            components: {
                default: B,
                two: Bottom
            }
        },
        {
            path: '/c',
            redirect: '/b',
            component: C,
            children: [
                {
                    path: 'd',
                    component: A,
                    // alias: ['', '/f']
                    alias: '/f'
                }
            ]
        }
    ]
    /**
     *   一、命名路由：即带有name属性的配置路由地址
     *   this.$router.push({ name: 'a' })
     *   <router-link :to="{ name: 'a' }"></router-link>
     * 
     *   优点：
     *   1. 没有硬编码的URL
     *   2. params 的自动编码/解码
     *   3. 防止你在 url 中出现打字错误
     *   4. 绕过路径排序（如显示一个）[命名路由可以基于别名建立映射，从而更高效的进行路径匹配]
     * 
     *   二、命名视图：想同时 (同级) 展示多个视图，而不是嵌套展示
     *   可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口
     *   如果 router-view 没有设置名字，那么默认为 default
     *   component 配置 改成 components 里面为对象，多个组件对应多个router-view
     *   如果找不到对应视图就不渲染呗
     * 
     *   视图渲染顺序测试所得，一般来说，不完全：
     *   router-view前面的 先 created 后面的 created ；然后 前面的 mounted 后面的 mounted
     *   
     *   三、重定向
     *   routes配置：redirect: '/a'
     *   routes = [
     *       { path: '/a', redirect: '/b' }
     *   ]
     *   
     *   - 导航守卫并没有应用在跳转路由上，而仅仅应用在'其目标上'
     *     在上面的例子中，在 /a 路由中添加 beforeEnter 守卫不会有任何效果。
         - 在写 redirect 的时候，可以省略 component 配置，因为它从来没有被直接访问过，所以没有组件要渲染
         - 唯一的例外是嵌套路由：如果一个路由记录有 children 和 redirect 属性，它也应该有 component 属性

         * 会使 component 关联的组件导航守卫失效，因为 component 会被忽略
         * 有 children 时, 如果是单纯跳转到父路由, 则同上; 如果是跳转到子路由, 则会忽略 父路由配置的 redirect, 直接进入子路由里面 看配置！！！
     *   
     *   A. 直接路由地址  redirect: '/a'
     *   B. 命名路由   redirect: { name: 'a' }
     *   C. 方法, 动态返回路由  redirect: to => return { path: '/search', query: { q: to.params.searchText } } 
     *                to: 接收目标路由作为参数
     *   D. 相对重定向, 方法动态返回的路由地址没有'/'
     * 
     *   四、别名
     *    { path: '/b', alias: '/a' }
     *   当用户访问 /b 时，URL 将会被替换成 /a，然后匹配路由为 /a （重定向）
     *   当用户访问 /a 时，URL 仍然是 /a , 但会匹配路由为 /b（别名）
     *   【不会被替换？经测试。别名只是通过别名可以访问当前这个路由地址而已。】
     * 
     *   * “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构
     *   * 可以提供多个别名, 数组作为参数【当多个别名是, URL不会被替换！！！】
     * 
     *   {
     *      path: '/user/:id',
     *      children: [
     *          path: 'profile',
     *          alias: ['/:id', '']
     *      ]
     *   }
     * 
     */
})

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
