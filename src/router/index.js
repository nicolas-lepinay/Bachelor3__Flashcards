import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/:categoryId', component: () => import('../views/Themes.vue') },
    { path: '/:categoryId/:themeId', component: () => import('../views/Cards.vue') },
    { path: '/settings', component: () => import('../views/Settings.vue') },
    { path: '/settings/:categoryId', component: () => import('../views/Settings.vue') },
    { path: '/settings/:categoryId/:themeId', component: () => import('../views/Settings.vue') },
    { path: '/settings/:categoryId/:themeId/:cardId', component: () => import('../views/Settings.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router;
