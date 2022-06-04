<script lang="ts" setup>
import type { Task } from '@/constant';

defineProps<{
  modelValue?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', value: Omit<Task, 'taskID' | 'position'>): void;
}>();

const task: Omit<Task, 'taskID' | 'position'> = reactive({
  title: '',
  start: '',
  duration: 20,
});
const timeRange = ref<'min' | 'helf_hour' | string>('min');
const durationLimit = computed(() => {
  if (timeRange.value === 'min') return { step: 2, min: 2, max: 60 };
  else return { step: 30, min: 30, max: 8 * 60 };
});
watch(timeRange, value => {
  switch (value) {
    case 'min':
      if (task.duration > durationLimit.value.max) task.duration = durationLimit.value.max;
      break;
    case 'helf_hour':
      if (task.duration < durationLimit.value.min) task.duration = durationLimit.value.min;
      break;
  }
});

function handleClose() {
  emit('update:modelValue', false);
}
function handleSubmit() {
  emit('submit', task);
  //
}
</script>
<template>
  <Teleport to="body">
    <Transition name="_fade">
      <div
        v-if="modelValue"
        class="fixed bg:#00000099 inset:0 flex flex:col justify-content:center align-items:center"
        @click.stop.self="handleClose"
      >
        <div class="rel">
          <LBtn icon="close" class="abs right:8 top:8" @click="handleClose" />

          <form @submit.prevent class="p:12 r:8 bg:white flex flex:col gap-y:12">
            <h3>{{ $t('add_task.dialog_title') }}</h3>
            <div class="my:12 flex gap-x:16 align-items:center">
              <label for="add_title">{{ $t('add_task.title') }}</label>
              <input v-model="task.title" class="bg:gray-10 b:1;solid;gray-30 p:4 r:4" id="add_title" type="text" />
            </div>
            <div>
              <label for="add_start_time">{{ $t('add_task.start_time') }}:</label>
              <input v-model="task.start" id="add_start_time" type="time" />
            </div>
            <div>
              <div class="flex gap:16 justify-content:end align-items:center">
                <!-- <input v-model="timeRange" id="add_range_min" value="min" type="radio" /> -->
                <p>{{ $t('add_task.minimum_time_unit') }}:</p>
                <label for="add_range_min">{{ $t('add_task.range_min') }}</label>
                <input
                  :checked="timeRange === 'min'"
                  value="min"
                  id="add_range_min"
                  type="radio"
                  @change="timeRange = ($event.target as HTMLInputElement).value"
                />
                <label for="add_range_half_hour">{{ $t('add_task.range_half_hour') }}</label>
                <input
                  :checked="timeRange === 'helf_hour'"
                  value="helf_hour"
                  id="add_range_half_hour"
                  type="radio"
                  @change="timeRange = ($event.target as HTMLInputElement).value"
                />
              </div>
            </div>
            <div>
              <label for="add_duration"
                >{{ $t('add_task.duration') }}:
                {{ timeRange === 'min' ? task.duration : Math.round((task.duration / 60) * 10) / 10 }}
                {{ timeRange === 'min' ? $t('add_task.unit_min') : $t('add_task.unit_hour') }}</label
              >
              <input
                v-model="task.duration"
                class="w:full mt:8"
                id="add_duration"
                type="range"
                :step="durationLimit.step"
                :min="durationLimit.min"
                :max="durationLimit.max"
              />
            </div>
            <div class="flex justify-content:end">
              <LBtn class="py:8 px:16 r:4 bg:blue-50 f:white" type="button" @click="handleSubmit">
                {{ $t('add_task.add') }}
              </LBtn>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style>
._fade-leave-active,
._fade-enter-active {
  transition: opacity 200ms;
}
._fade-leave-to,
._fade-enter-from {
  opacity: 0;
}
._fade-leave-from,
._fade-enter-to {
  opacity: 1;
}
</style>
