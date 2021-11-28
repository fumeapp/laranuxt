<script setup lang="ts">
import { PushButton } from 'tailvue'
import { useAsyncData, useNuxtApp } from '#app'
import { Ref } from '@vue/reactivity'
import ContactCardSkeleton from '~/components/contact/ContactCardSkeleton.vue'
import ContactCard from '~/components/contact/ContactCard.vue'
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
  { server: true },
)

</script>

<template>
  <div class="container p-2 lg:p-8 flex flex-col">
    <ul v-if="!users" class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card-skeleton v-for="i in 9" :key="`user-${i}`" />
    </ul>
    <ul v-else class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card v-for="(user, index) in users.data" :key="index" :user="user" />
    </ul>
  </div>
</template>
