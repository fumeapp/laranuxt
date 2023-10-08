<script setup lang="ts">
const { setCrumbs } = useCrumbs()
setCrumbs([{ name: 'List of Users', to: '/', icon: 'i-mdi-account-group' }])

const loading = ref(false)

const users = ref<models.UserResults>()
const get = async () => {
  loading.value = true
  users.value = undefined
  users.value = await useApi().index<models.UserResults>('/example', { count: 9 }) as models.UserResults
  loading.value = false
}

const error = async () => await useApi().index('/error')

const start = () => {
  useNuxtApp().callHook('page:start').catch(() => { })
}

const finish = () => {
  useNuxtApp().callHook('page:finish').catch(() => { })
}

onMounted(get)
</script>

<template>
  <div class="mx-auto container p-2 lg:p-8 flex flex-col">
    <ul v-if="!users" class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card-skeleton v-for="i in 9" :key="`user-${i}`" />
    </ul>
    <ul v-else class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card v-for="(user, index) in users.data" :key="index" :user="user" />
    </ul>
    <div class="text-center mt-4">
      <span>provided by endpoint</span><span>&nbsp;</span>
      <a class="text-blue-400" target="_new" href="http://localhost:8000/example?count=9">/example</a>
      <span>&nbsp;</span>
      <span class="text-sm">(1 second delay)</span>
      <div class="mt-4 flex justify-center space-x-2">
        <u-button @click="get" :loading="loading" icon="i-mdi-refresh" labe="get()" />
        <u-button @click="start" label="start" />
        <u-button @click="finish" label="finish" />
        <u-button @click="error" color="red" icon="i-mdi-error" label="Force PHP Error" />
      </div>
    </div>
  </div>
</template>
