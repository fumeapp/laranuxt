<template>
  <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
    <session-list
      :sessions="sessions"
      @refresh="get"
    />
  </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app'
const { $api, $crumbs } = useNuxtApp()

const sessions = ref(undefined)
const get = async () => sessions.value = (await $api.index<api.Sessions>('/session'))?.data
get()

$crumbs.set([
  { name: 'Home', to: '/' },
  { name: 'Sessions', to: '/sessions', icon: 'mdi-devices' },
])

</script>
