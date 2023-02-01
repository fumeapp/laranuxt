<script lang="ts" setup>
const { setCrumbs } = useCrumbs()
const api = useApi()
const sessions = ref<api.SessionResults | undefined>(undefined)
const get = async () => sessions.value = (await api.index<api.SessionResults>('/session')).data
get()
setCrumbs([
  { name: 'Home', to: '/' },
  { name: 'Sessions', to: '/sessions', icon: 'mdi-devices' },
])
</script>

<template>
  <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
    <session-list
      :sessions="sessions"
      @refresh="get"
    />
  </div>
</template>
