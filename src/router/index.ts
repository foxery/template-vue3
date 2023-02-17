import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */'@/views/Home/index.vue'),//// 路由懒加载 通过webpackChunkName设置分割后代码块的名字
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