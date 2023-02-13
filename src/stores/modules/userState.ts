import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserInfo } from './userState.d';

export const useUserStateStore = defineStore('userState', () => {
  const { identity } = useIdentityStore();
  const localUserInfoStr = identity == 'doctor' ? localStorage.getItem('doctor_info') : localStorage.getItem('_wxinfo');
  let localUserInfo = {};
  if (localUserInfoStr) {
    localUserInfo = JSON.parse(localUserInfoStr || '{}');
    localUserInfo.identity = identity;
  }
  const userInfo = ref<UserInfo>(localUserInfo);
  function setUserInfo(val: UserInfo) {
    userInfo.value = val;
  }

  return { userInfo, setUserInfo };
});


export const useIdentityStore = defineStore('identityState', () => {
  const identity = ref('doctor');//doctor  user
  function setIdentity(val: string) {
    identity.value = val;
  }

  return { identity, setIdentity };
});