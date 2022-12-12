const A = {
    template: '<div>AAA</div>',
}
const B = {
    template: '<div>BBB</div>',
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/a', component: A },
        { path: '/b', component: B }
        /**
         *   RouteRecordRaw
         *   
         *   1. path
         *   2. name
         *   3. redirect
         *   4. children
         *   5. alias
         *   6. beforeEnter
         *   7. props
         *   8. meta
         *   9. sensitive: Boolean   // 使路由匹配区分大小写，默认为false
         *  10. strict: Boolean  // 严格检查路径末尾是否有尾部斜线（/） 默认为 false,意味着默认情况下,路由 /users 同时匹配 /users 和 /users/; 注意这也可以在路由级别上设置
         * 
         *   RouteRecordNormalized   // 路由记录的标准化版本
         *   1. components   // 命名视图的字典，如果没有，包含一个键为 default 的对象
         *   2. aliasOf      // 定义此记录是否是另一个记录的别名,如果该记录是原始记录，则此属性为 undefined
         *   3... 同上
         */
    ]
    /**
     *   RouterOptions配置属性
     *   
     *   1. history: RouterHistory         // 用于路由实现历史记录
     *   2. linkActiveClass?: string       // 用于激活的 RouterLink 的默认类 [router-link-active]
     *   3. linkExactActiveClass?: string  // 用于精准激活的 RouterLink 的默认类 [router-link-exact-active]
     *   4. routes: RouteRecordRaw[]       // 应该添加到路由的初始路由列表
     *   5. scrollBehavior?: RouterScrollBehavior  // 在页面之间导航时控制滚动的函数。可以返回一个 Promise 来延迟滚动
     *   6. parseQuery - stringifyQuery    // 解析url上参数问题
     * 
     */
})

/***
 *   常用 API
 *  
 *   1. createRouter(RouterOptions): Router   // 用来初始化 router
 *   2. createWebHistory(base)     // base参数, 基础地址参数
 *   3. createWebHashHistory(base)
 *   4. createMemoryHistory(base)  // 创建一个基于内存的历史记录,这个历史记录的主要目的是处理 SSR
 *   
 *   5. useLink(props: RouterLinkOptions)
 *   6. useRoute()   // 返回当前路由地址
 *   7. useRouter()  // 返回 Router 实例
 * 
 *   Router 属性：
 *   1. .currentRoute  // 当前路由地址, 只读
 *   2. .options       // 创建 Router 时传递的原始配置对象
 *   Router 方法
 *   1. .addRoute(parentName: string | symbol, route: RouteRecordRaw)  // 添加一条新的路由记录到路由
 *   1. .removeRoute(name: string | symbol)  // 通过名称删除现有路由
 *   2. .beforeEach()    // 导航前置守卫
 *   3. .beforeResolve() // 导航解析守卫 [在导航即将解析之前执行。在这个状态下，所有的组件都已经被获取，并且其他导航守卫也已经成功。返回一个删除已注册守卫的函数]
 *   4. .afterEach()     // 导航后置钩子
 *   5. .getRoutes()     // 获取所有 路由记录的完整列表
 *   6. .hasRoute(name: string | symbol)   // 确认是否存在指定名称的路由
 *   7. .onError(handler)  // 添加一个错误处理程序，在导航期间每次发生未捕获的错误时都会调用该处理程序。这包括同步和异步抛出的错误、在任何导航守卫中返回或传递给 next 的错误，以及在试图解析渲染路由所需的异步组件时发生的错误
 *   8. .push(to: RouteLocationRaw)     //  跳转到某一个路由地址
 *   9. .replace(to: RouteLocationRaw)  //  替换并导航到一个新的 URL
 *  10. .reslove(to: RouteLocationRaw)  //  返回路由地址的标准化版本
 * 
 * 
 *   RouteLocationNormalized   // 标准化的路由地址, 在导航守卫中，to 和 from 总是属于这种类型
 *   1. fullPath: string  // URL 编码与路由地址有关。包括 path、 query 和 hash
 *   2. path: string      // 编码 URL 的 pathname 部分，与路由地址有关
 *   3. name:             // 路由记录的名称。如果什么都没提供，则为 undefined
 *   4. params            // 从 path 中提取的已解码参数字典
 *   5. query             // 从 URL 的 search 部分提取的已解码查询参数的字典
 *   6. hash: string      // 已解码 URL 的 hash 部分。总是以 #开头。如果 URL 中没有 hash，则为空字符串
 *   7. meta: RouteMeta   // 附加到从父级到子级合并（非递归）的所有匹配记录的任意数据
 *   8. matched: []       // 与给定路由地址匹配的标准化的路由记录数组
 *   9. redirectedFrom    // 重定向之前的路由地址，如果没有重定向，则为 undefined
 * 
 * 
 * 
 *   V4.0 new - compare 【rfcs, RFC】
 * 
 *   - RFC代表征求意见。现在在各种环境中可能都有RFC
 *   - Internet上的RFC是指由工程师和计算机科学家编写的出版物
 *   - rfc是讨论的起点，或者人们用来实现实际软件的协议实现细节
 *   - Request for Comments
 *   
 *   1. 通配符替换 - /:pathMatch(.*)*
 *   2. 将 onReady 改为 isReady, 不接收任何参数并返回一个Promise
 *   3. 所有的导航现在都是异步的
 *   4. router-view 将内容传递给路由组件的 <slot>  
 *      - 必须使用 v-slot API 将其传递给 <component>
 *      - <router-view v-slot="{ Component, Route }">
 *          <component :is="Component">
 *              <div>内容用<slot></slot>装的</div>
 *          </component>
 *        </router-view>
 *   5. 新功能：动态路由，组合式API
 *      A. setup() {} 中
 *         - const router = useRouter()
 *         - const route = useRoute()
 *         -* route 对象是一个响应式对象，所以它的任何属性都可以被监听，但你应该避免监听整个 route 对象
 *         -* 在大多数情况下，你应该直接监听你期望改变的参数
 *      B. onBeforeRouteLeave - onBeforeRouteUpdate 代替
 *         取消了 beforeRouteEnter
 *      C. useLink
 * 
 */

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
