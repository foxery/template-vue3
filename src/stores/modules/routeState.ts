import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteStateStore = defineStore('routeState', () => {
  const lastRoute = ref('');
  function setLastRoute(val: string) {
    lastRoute.value = val;
  }

  return { lastRoute, setLastRoute };
});

export const useEntryUrlStateStore = defineStore('entryUrlState', () => {
  const entryUrl = ref('');
  function setEntryUrl(val: string) {
    entryUrl.value = val;
  }

  return { entryUrl, setEntryUrl };
});