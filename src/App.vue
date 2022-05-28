<script lang="ts" setup>
import { useTaskStore } from './stores/useTaskStore';
import { localKey } from './utils/constant';

const store = useTaskStore();
const record = localStorage.getItem(localKey.TASK_STORE);
if (record) {
  store.$state = JSON.parse(record);
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem(localKey.TASK_STORE, JSON.stringify(store.$state));
});
</script>
<template>
  <router-view />
</template>
