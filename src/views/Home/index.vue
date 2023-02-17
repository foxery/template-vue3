<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GetWxConfigInfo } from '@/services/api';
// import TopNav from '@/myComponents/TopNav/TopNav.vue';
const TopNav = () => import(/* webpackChunkName: "TopNav" */ '@/components/TopNav/TopNav.vue');//组件懒加载

onMounted(()=>{
  GetWxConfigInfo('');
});

</script>

<template>
  <TopNav />
  <div>
    home
  </div>
</template>

<style>
</style>