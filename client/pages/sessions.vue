<template>
  <pre>
    {{ sessions.data }}
  </pre>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp } from '#app'
import { Examples } from '~/pages/index.vue'
const { $api } = useNuxtApp()

useAuthMiddleware()

const { data: sessions } = await useAsyncData(
  'sessions', () => $api.index<api.Sessions>('/session'))

</script>
