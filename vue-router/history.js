const A = {
    template: '<div>AA</div>'
}
const B = {
    template: '<div>BB</div>'
}
const C = {
    template: '<div>CC</div>'
}
const D = {
    template: '<div>DD</div>',
    created() {
        console.log(this.$route.params)
    }
}

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现, 这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    // html5 模式 即 history 模式
    // history: VueRouter.createWebHistory(),
    /**
     *   1. hash
     *    - vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL
     *    - 其显示的网络路径中会有#号，这是最安全的模式，因为他兼容所有的浏览器和服务器
     *    - 这种工作方式最大的好处不会改变URL，同时也能产生历史记录，方便追溯历史
     *    - hash 模式，利用是网页锚点完成，该模式工作是需要依托于网页中的内容被加载
     *    - hash 虽然出现URL中，但不会被包含在HTTP请求中，对后端完全没有影响
     *      因此改变hash后刷新,  也不会有问题（刷新页面，不会把hash值发给服务器）
     *    - 优点：适用于静态页面，快速输出文本内容，具有页面位置导航效果
     *      缺点：不宜页面文件过大，否则需要搭配 ajax 方法来获取网页内容，以减少服务器压力
     *      不过，它在 SEO 中确实有不好的影响
     * 
     *   2. history
     *    - 美化后的hash模式，路径中会去掉#
     *    - 依赖于html5的history，pushState API，所以要担心IE9及以下的版本
     *    - 并且还包括back、forward、go三个方法
     *    - 缺点：怕刷新如果后端没有处理这个情况的时候前端刷新就是实实在在的请求服务器这样消耗的时间很多还很慢。
     *    - 由于改变了地址, 刷新时会按照修改后的地址请求后端
     *      需要后端配置处理, 将地址访问做映射, 否则会404（history模式中，路由是地址的一部分，刷新页面，会带给服务器）
     *      映射返回index.html文档即可
     *    - 因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件
     *      为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后再给出一个 404 页面
     * 
     *   3. abstract
     *    - 适用于所有JavaScript环境，例如服务器端使用Node.js。如果没有浏览器API，路由器将自动被强制进入此模式
     */
    routes: [
        { path: '/a', component: A },
        { path: '/b/:id?', component: C },
        { path: '/b/:id(\\d+)', name: 'b', component: B },
        { path: '/d/:id(\\d+)*', name: 'd', component: D },
        /**
         *   很多路由高级匹配方法 （同一个路径可以匹配多个路由, 越早越优先, routes 数组的顺序并不重要!）
         *   常见如下：
         * 
         *   1. '/user/:id/:foo'
         *   2. '/user/:id?'  (后面的参数可有可无，0个或1个！ 而 * 是0个或多个,可重复)
         *   3. '/user/:id(\\d+)' (可以在括号里跟正则，这里指只有id为数字的时候才匹配【\\是\的转义字符】)
         *   4. '/user/*' (匹配以/user开头的所有)
         *   5. '/user/(admin/)?/:id  (以括号选中并在后面一个?表示可选)
         *   6. '/user/:id+' (匹配一个或多个重复参数, /user/2/3, 命名路由时，需要传递一个数组)
         *      * this.$router.push({ name: 'user', params: { id: ['1', '2'] } })
         *   7. '/user/:id*' (同上, 匹配0个或多个参数)
         *      扩展上 '/user/:id(\\d+)+'  --> '/user/1' '/user/1/2'
         * 
         *
         *   * - 跳转路由时的一些参数优化
         *   * path 与 params 不能同时使用, 否则 params 会被忽略（同样适用与 router-link）
         *   * 必须使用 name 代替 path 或 带有完整参数的 path
         *     this.$router.push({ path: '/user', params: { id: 2 } }) // '/user'
         *  
         *   默认情况下, 路由部分不区分大小写！
         *    可通过 配置 sensitive 与 strict （新，扩展）
         * 
         *   ***** 路由转换成正则, 有一定的排名顺序, 如上说的越早越好不一定
         *   如: '/b/:id?'  /b/:id(\\d+)'  从前往后, 则对于 '/b/3' 肯定第一个先, 但 进入了第二个
         *       因为 Ranking results 的结果是 后面在前面
         *   查看规则顺序 https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJHOuQDsDE8AouGAJgAnI_CGOlSUUQOkAQLkC1CRSAAA.#
         *   网站有一定的问题
         * 
         */
    ]
    /***
     *  编程式导航  &  声明式导航（<router-link to=""></router-link>）
     * 
     *  一、this.$router.push(location, onComplete?, onAbort?)
     * 
     *  *. 使用 .push() 方法, 会向 history 栈添加一个新的记录。点击浏览器后退按钮时, 则回到之前的 URL
     *  *. 不管哪种方式的变化, 只要路由变了（不管params、query、hash都会添加一个新的记录）
     *  *. 你点击 <router-link> 时, 会在内部调用 .push()
     *  
     *  1. location 即路由地址配置对象（路由跳转url字符串 或 可配置对象）
     *  2. onComplete 回调函数 会在导航成功完成后, 即在所有的异步钩子被解析之后
     *  3. onAbort  回调函数 终止的时候, 即在导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由
     *  - 经测试没有什么用
     *  - push() 方法返回一个Promise对象（可能后面用Promise代替了两个参数）
     *  
     *  * router4 好像没有后面两个的回调参数, 只做返回Promise
     *  * - promise返回的 对象会比较复杂的处理导航故障问题 ****
     * 
     *  二、this.$router.replace(location, onComplete?, onAbort?)
     *  作用同上, 唯一的不同就是，它不会向 history 添加新记录
     *  声明式导航（<router-link to="" replace></router-link>）
     *  
     *  三、this.$router.go(n)
     *  参数是一个整数，意思是在 history 记录中向前或者后退多少步
     *  类似 window.history.go(n)
     *  -  如果 history 记录不够用，那就默默地失败（无效果的失败！）
     * 
     *  ** .push() .replace() .go()
     *  效仿 window.history.pushState() window.history.replaceState() window.history.go()
     *  
     *  window.history
     *  
     *  1. .length    // 返回当前history栈记录中的历史url长度
     *  1. .state     // 返回当前url的状态信息, 如果没有调用过pushState() / replaceState() 则返回默认值 null
     *  1. .scrollRestoration	// 利用浏览器特性，使我们在返回上一页或者下一页时，将页面滚动到之前浏览的位置，该属性有两个值
     *                          // 分别是 auto（表示滚动）与 manual（表示不滚动）
     *                          // 可以直接设置 = 'manual'
     *  2. .back()    // === .go(-1) router同
     *  3. .forward() // === .go(1) router同
     *  4. .go(n)     // router同
     *  5. .pushState(stateObject, title, url)  // 同 router.push()
     *     - history.pushState()方法可以‘无刷新’地向当前history插入一条历史状态 
     *     - 历史状态分为两种：
                A. 由传统的网页加载生成的历史状态，即向服务器请求新的页面
                B. 通过pushState()方法生成的历史状态，‘并不会向服务器请求新页面’
           - 注意：刷新不会产生历史状态

           - A. stateObject  // 传入的状态对象, 当前进（后退）到某一新的状态时，会触发popstate事件, 此事件对象event.state存储的就是这个stateObject的值
           - B. title        // 新状态的标题。（目前，大多数浏览器并不支持该参数，建议传null值）
           - C. url          // 状态对应的历史记录的地址
           * 跳转到不同url可能会跨域报错！（那就是不支持file://这样的协议，必须是http(s)://这样的协议，跨域也不行） 

     *  6. .replaceState(stateObject, title[, url])  // 同 router.replace()
           - 同上, 不同与router同

     *  - 浏览器提供了popState 事件用于捕获前进后退时切换到的状态
          window.onpopstate = function (event) {...}
            
     *  随着Ajax技术的普及，尤其是单页面应用的流行。网页对数据的加载更多的是通过无刷新的异步加载来完成。这样确实大大提升了用户体验，但也造成了一个困扰。
        要知道，Ajax加载数据并不会生成历史状态，前进后退按钮也就无法激活，那现在我要后退到上一次展示数据的状态
        答案很明显，就是在完成一次Ajax请求的同时，为浏览器创造一个历史状态
     * 
     */
})

const app = Vue.createApp({
    methods: {
        goto() {
            console.log(this.$router)
            this.$router.go(100)
            // console.log(9999)
            // this.$router.push('/a', () => {
            //     console.log('success')
            // }, () => {
            //     console.log('error')
            // }).then(() => {
            //     console.log(10000)
            // })
        }
    }
})

app.use(router)
app.mount('#box')
