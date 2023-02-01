<script setup lang="ts">
import { PushButton } from 'tailvue'
const api = useApi()
const { setCrumbs } = useCrumbs()
setCrumbs([{ name: 'Home', to: '/' }])

const users = ref<models.UserResults>(undefined)
const get = async () => users.value = await api.index<models.UserResults>('/example', { count: 9 })
const error = async (): Promise<api.MetApiResponse> => await api.get('/error')
get()
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
        <PushButton @click="get">
          <icon icon="mdi:refresh" class="w-6 h-6 text-green-600 mr-2.5" />
          get()
        </PushButton>
        <PushButton @click="error">
          <icon icon="mdi:error" class="w-6 h-6 text-red-600 mr-2.5" />
          Force PHP Error
        </PushButton>
      </div>
    </div>
  </div>
</template>
