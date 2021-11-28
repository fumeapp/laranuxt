<template>
  <button class="text-white flex items-center justify-center p-0.5" @click="toggleDark">
    <icon-client v-if="isDark" icon="carbon-moon" class="w-6 h-6" />
    <icon-client v-else icon="carbon-sun" class="w-6 h-6" />
  </button>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import IconClient from '~/components/IconClient.vue'
const isDark = useDark()
const toggleDark = useToggle((isDark))
</script>
