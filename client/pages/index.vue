<script setup lang="ts">
import { PushButton } from 'tailvue'
import { useAsyncData, useNuxtApp } from '#app'
import { Ref } from '@vue/reactivity'
import ContactCardSkeleton from '~/components/contact/ContactCardSkeleton.vue'
import ContactCard from '~/components/contact/ContactCard.vue'
import IconClient from '~/components/IconClient.vue'
const { $api } = useNuxtApp()

export interface ExampleUser {
  name: string
  /** Current Position */
  job: string
  email: string
  avatar: string
}

const {
  data: users,
  refresh: reloadExample,
}: {
  data: Ref<api.MetApiResults & { data: ExampleUser[] }>
  refresh: (force?: boolean) => Promise<void>
} = useAsyncData(
  'example',
  () => $api.index<ExampleUser[]>('/example', { count: 9 }),
  { server: false },
)

async function error (): Promise<void> {
  await $api.get('/error')
}

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
      <div class="mt-4">
        <push-button @click="error">
          <icon-client icon="mdi:error" class="w-6 h-6 text-red-600 mr-2.5" />
          Force PHP Error
        </push-button>
      </div>
    </div>
  </div>
</template>
