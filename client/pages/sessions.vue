<template>
  <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
    <session-list :sessions="sessions" />
  </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app'
import { ref } from '@vue/reactivity'
import { useAuthMiddleware } from '~/composables/useAuthMiddleware'
import SessionList from '~/components/session/SessionList.vue'
const { $api } = useNuxtApp()

useAuthMiddleware()
const sessions = ref<api.Sessions|undefined>(undefined)

onMounted(async () => {
  // sessions.value = await $api.index<api.Sessions>('/session').data
})

</script>
