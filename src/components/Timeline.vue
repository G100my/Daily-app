<script setup>
import Time from '@/utils/time.js';

const props = defineProps({
  timeGap: {
    type: Number,
    default: 5,
  },
  start: {
    type: String,
    default: '17:00',
    validator() {
      return true;
    },
  },
  end: {
    type: String,
    default: '22:00',
  },
});

const timelineAmount = computed(() => Math.floor(Time.getMinsBetween(props.start, props.end) / props.timeGap));
const timelineLabel = computed(() =>
  Array(timelineAmount.value)
    .fill(null)
    .map((_i, index) => new Time(props.start).plus(props.timeGap * index).getString()),
);
</script>
<template>
  <div class="rel max-h:full p:8 bg:fade-20 overflow-y:auto">
    <div class="rel d:flex my:12 w:full align-items:center gap-x:4 pl:26" v-for="label in timelineLabel" :key="label">
      <label class="abs t:12 transform:scale(0.8);translateX(100%) right:100%">{{ label }}</label>
      <div class="flex:1 h:1 bg:black" />
    </div>

    <Task class="abs" />
  </div>
</template>
