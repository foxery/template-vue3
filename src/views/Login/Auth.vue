<template>
  <div class="content">
    <div class="card login-auth-wrapper">
      <img src="/src/assets/images/common/logo_simple.png" alt="" class="logo">
      <div>授权登录，完成后续操作</div>
      <van-button class="btn-style-primary btn-size-default block mt1" @click="onAuth">授权登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, defineProps, computed, onMounted } from 'vue';
import { Browser } from '@/utils/utils';
import { ToDoctorWxAuth, ToUserWxAuth } from '@/utils/auth';
import { ToAppLogin } from '@/utils/appBridge';
import { useIdentityStore } from '@/stores/modules/userState';

export default defineComponent({
  data() {
    return {
      routeUrlTemp: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.routeUrlTemp = import.meta.env.VUE_APP_MY_PROJECT_URL + from.fullPath;
    });
  },
  methods: {
    onAuth() {
      if (Browser().weixin) {
        const identityStore = useIdentityStore();
        if (identityStore.identity == 'user') {
          ToUserWxAuth(this.routeUrlTemp);
        } else {
          ToDoctorWxAuth(this.routeUrlTemp);
        }
      } else {
        ToAppLogin();
      }
    }
  }
});
</script>

<style scoped lang="scss">
.content {
  padding: 16px;
  background-color: #f7f7f7;
  min-height: 100vh;

  .card {
    background-color: #fff;
    border-radius: 6px;
    line-height: normal;
    font-size: 0;
  }

  .login-auth-wrapper {
    padding: 80px 40px;
    text-align: center;
    color: $textColor;
    font-size: 14px;

    .logo {
      width: 80px;
      margin-bottom: 16px;
    }

    .mt1 {
      margin-top: 40px;
    }
  }
}
</style>
