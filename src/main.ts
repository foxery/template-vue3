import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from '@/stores/index';

import router from './router';
import { WxConfig } from '@/utils/auth';

import './utils/rem';
import { useIdentityStore } from './stores/modules/userState';
import { Browser } from './utils/utils';
import { useEntryUrlStateStore } from './stores/modules/routeState';

// import 'lib-flexible/flexible';
// import VConsole from 'vconsole';
// let vConsole = new VConsole();
console.log("test");
const app = createApp(App);

// 挂载pinia store
setupStore(app);

router.afterEach((to, from) => {
  // 设置页面标题
  const selfWindow = window as any;
  selfWindow.document.title = to.meta.title;
  // 微信签名验证
  // 在单页spa方面vue的history在iOS中页面地址会始终为第一次进入的链接地址
  let urlTemp = '';
  const entryUrlStateStore = useEntryUrlStateStore();
  if (Browser().ios) {
    if (entryUrlStateStore.entryUrl) {
      urlTemp = entryUrlStateStore.entryUrl;
    } else {
      entryUrlStateStore.setEntryUrl(location.href.split('#')[0]);
      urlTemp = location.href.split('#')[0];
    }
  } else {
    urlTemp = location.href;
  }
  console.log('afterEach', urlTemp);
  WxConfig(urlTemp);
});

router.beforeEach((to, from, next) => {
  if (to.meta.identity) {
    const identityStore = useIdentityStore();
    identityStore.setIdentity(to.meta.identity as string);
  }
  next();
});

app.use(router).mount('#app');
