import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'

const router = createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MyHome
        },
        {
            path: '/assets',
            component: () => import('../views/MyAssets.vue')
        },
        {
            path: '/accessories',
            component: () => import('../views/MyAccessories.vue')
        },
        {
            path: '/components',
            component: () => import('../views/MyComponents.vue')
        },
        {
            path: '/consumables',
            component: () => import('../views/MyConsumables.vue')
        },

    ]
})
export default router