<template>
  <client-only>
    <Icon
      :icon="props.icon"
      :class="props.class"
    />
    <template #fallback>
      <div :class="props.class" />
    </template>
  </client-only>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  icon: String,
  class: String,
})
</script>
