<script lang="ts" setup>
const props = defineProps({
  duration: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'tmp',
    validator(value) {
      if (value !== 'tmp' && value !== 'schedule') return false;
      else return true;
    },
  },
});
</script>
<template>
  <div class="h-40">task</div>
</template>
