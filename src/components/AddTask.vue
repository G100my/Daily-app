<script lang="ts" setup>
defineProps<{
  modelValue?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function handleClose() {
  emit('update:modelValue', false);
}
const timeRange = ref<'min' | 'helf_hour'>('min');
</script>
<template>
  <Teleport to="body">
    <div class="fixed bg:#00000099 inset:0 flex flex:col justify-content:center align-items:center">
      <form @submit.prevent class="p:12 r:8 bg:white">
        <h3>{{ $t('add_task.dialog_title') }}</h3>
        <div>
          <label for="add_title">{{ $t('add_task.title') }}</label>
          <input id="add_title" type="text" />
        </div>
        <div>
          <div>
            <label for="add_range_min">{{ $t('add_task.range_min') }}</label>
            <input v-model="timeRange" id="add_range_min" value="min" type="radio" />
            <label for="add_range_half_hour">{{ $t('add_task.range_half_hour') }}</label>
            <input v-model="timeRange" id="add_range_half_hour" value="helf_hour" type="radio" />
          </div>
          <label for="add_duration">{{ $t('add_task.duration') }}</label>
          <input id="add_duration" type="range" />
        </div>
      </form>
    </div>
  </Teleport>
</template>
