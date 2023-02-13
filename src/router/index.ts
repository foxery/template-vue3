import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/auth',
    name: 'LoginAuth',
    meta: {
      title: '授权登录',
    },
    component: () => import('@/views/Login/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/'),//createWebHashHistory
  routes,
});

export default router;