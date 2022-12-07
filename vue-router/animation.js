const A = {
    template: '<transition name="slide"><div>AAA</div></transition>',
}
const B = {
    template: '<div>BBB</div>',
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/a', component: A },
        { path: '/b', component: B }
    ]
})
/**
 *   过渡效果：就是用提供的内置组件
 *   <transition></transition>
 *   <router-view> 是基本的动态组件, 用 transition 组件给前面的动态组件添加一些过渡效果
 * 
 *   1. 单个路由过渡
 *      <transition>
 *          <div></div>
 *      </transition>
 * 
 *   2. 基于路由的动态过渡（给所有路由设置过渡效果）
 *      <transition>
 *          <router-view></router-view>
 *      </transition>
 * 
 * 
 *   v4.0+ 已经不推荐上面的写法了
 * 
 *      <router-view v-slot="{ Component, route }">
 *          <!-- 使用任何自定义过渡和回退到 `fade` -->
 *          <transition :name="route.meta.transitionName || 'fade'">
 *              <component :is="Component" />
 *          </transition>
 *      </router-view>
 *      
 * 
 *   1. 单个路由动态过渡：则在路由表中配置元信息来动态设置不同路由的过渡效果
 *   2. 基于路由动态过渡：可以在 afterEach 钩子中, 根据 to、from 路径的深度动态添加信息到 meta 字段
 *              - 然后在动态过渡的时候拿到 钩子中设置后的值
 *              - afterEach 是在 router-view 前！
 *              - afterEach:: 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
 *   3. Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡
 *          通过给 component 组件设置 key 来强制过渡
 * 
 * 
 *   滚动行为
 *   *** 这个功能只在支持 history.pushState 的浏览器中可用
 * 
 *   1. VueRouter.createRouter({
 *          scrollBehavior: (to, from, savedPosition) => return ({...})
 *      })
 *   2. 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
 *   3. scrollBehavior方法返回：
 *      A. { x: number, y: number }
 *      B. { selector: string, { x: number, y: number } } 【后面的x,y对象可有可无】
 *   
 *   - return { x: 0, y: 0 } 表示对于所有路由导航让页面滚动到顶部
 *   - return savedPosition 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样【要做savedPosition是否存在，不存在就会报错】
 *   - return { selector: '#id' } 滚动到某个锚点处
 *   
 *   1. 异步滚动：返回一个Promise对象
 *      return new Promise((resolve, reject) => {
 *          setTimeout(() => {
 *              resolve({ x: 0, y: 0 })
 *          }, 500)
 *      })
 *   2. 平滑滚动：将 behavior 添加到返回对象中
 *      return { selector: to.hash, behavior: 'smooth' }
 *  
 *   v4.0+ 返回对象已经不同了
 * 
 *   - return { top: number, left: number, behavior: 'auto/smooth' }
 *   - return { el: '#main', top: number, left: number } 后面top/left可有可无
 *        - '#main' 也可以 document.getElementById('main')
 *        - 或 锚点 el: to.hash
 *   - return sacedPosition 同上
 *   - return { ..., behavior: 'smooth' } // 同上 平滑滚动
 * 
 *   1. 异步滚动：延迟滚动 - 同上
 *       - 有时候，我们需要在页面中滚动之前稍作等待
 *       - 例如，当处理过渡时，我们希望等待过渡结束后再滚动。要做到这一点
 *
 *   --***  返回一个 falsy 值 或 空对象，则不会发生滚动
 *   
 */

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
