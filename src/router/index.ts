import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: () => import('@/pages/test-pure-js.vue')

    },
    {
        path: '/test-pure-js',
        component: () => import('@/pages/test-pure-js.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router