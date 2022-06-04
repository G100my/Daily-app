<script lang="ts" setup>
// please make sure only use one of 'primary', 'secondary', 'icon'
defineProps<{
  primary?: boolean;
  secondary?: boolean;
  dangerous?: boolean;
  icon?: string | boolean;
  label?: string;
  round?: boolean;
  disabled?: boolean;
}>();
</script>
<template>
  <button
    type="button"
    :class="{
      _btn_primary: primary,
      _btn_secondary: secondary,
      _btn_dangerous: secondary,
      _btn_icon: typeof icon === 'string',
      'rounded-full': round,
    }"
    :disabled="disabled"
  >
    <span v-if="$slots.head" class="_btn_head">
      <slot name="head" />
    </span>
    <slot>
      <template v-if="typeof icon === 'string'">
        <span class="material-icons">{{ icon }}</span>
      </template>
      <template v-else>{{ label }}</template>
    </slot>
    <span v-if="$slots.tail" class="_btn_tail">
      <slot name="tail" />
    </span>
  </button>
</template>
<style>
._btn_head {
  /* todo */
}
._btn_tail {
  /* todo */
}
._btn_primary {
  /* todo */
}
._btn_secondary {
  /* todo */
}
._btn_dangerous {
  /* todo */
}
._btn_icon {
  /* todo */
}
</style>
