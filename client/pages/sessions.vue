<script lang="ts" setup>
const { setCrumbs } = useCrumbs()
const sessions = ref<api.SessionResults | undefined>(undefined)
const get = async () => sessions.value = (await useApi().index<api.SessionResults>('/session')).data
setCrumbs([
  { name: 'Home', to: '/' },
  { name: 'Sessions', to: '/sessions', icon: 'mdi-devices' },
])

get()
</script>

<template>
  <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
    <session-list
      :sessions="sessions"
      @refresh="get"
    />
  </div>
</template>
