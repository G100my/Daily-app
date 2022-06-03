useDailyStore
<script lang="ts" setup>
import { useDailyStore } from './stores/useDailyStore';
import { LocalKey } from './constant';

const store = useDailyStore();
const record = localStorage.getItem(LocalKey.TASK_STORE);
if (record) {
  store.$state = JSON.parse(record);
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem(LocalKey.TASK_STORE, JSON.stringify(store.$state));
});
</script>
<template>
  <router-view />
</template>
