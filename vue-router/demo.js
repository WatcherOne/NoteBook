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
    ]
})

const app = Vue.createApp({})

app.use(router)
app.mount('#box')
