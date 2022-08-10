<template>
  <ul v-if="sessions" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li
      v-for="session in sessions"
      :key="session.token"
      class="col-span-1"
    >
      <session-device :session="session" @refresh="emit('refresh')" />
    </li>
  </ul>
  <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li
      v-for="i in 6"
      :key="i"
      class="col-span-1"
    >
      <session-device-skeleton />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import SessionDeviceSkeleton from '@/components/session/SessionDeviceSkeleton.vue'
import SessionDevice from '~/components/session/SessionDevice.vue'
defineProps({
  sessions: Array as PropType<api.Sessions>,
})
const emit = defineEmits(['refresh'])
</script>
