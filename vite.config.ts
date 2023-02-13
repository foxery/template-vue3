import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// vant自动按需引入插件
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  envPrefix: ['VUE_APP'],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      {
        find: '@stores',
        replacement: '/src/stores',
      },
    ],
  },
  //全局引入
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/sass/variable.module.scss";@import "@/assets/sass/function.module.scss";',
      }
    }
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
