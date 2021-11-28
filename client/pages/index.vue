<script setup lang="ts">
import { PushButton } from 'tailvue'
import { useAsyncData, useNuxtApp } from '#app'
import { Ref } from '@vue/reactivity'
const { $api } = useNuxtApp()

export interface Example {
  name: string
  /** Current Position */
  job: string
  email: string
  avatar: string
}
export type Examples = Example[]

const {
  data: result,
  refresh: reloadExample,
}: {
  data: Ref<api.MetApiResults & { data: Examples }>
  refresh: (force?: boolean) => Promise<void>
} = useAsyncData(
  'example',
  () => $api.index<Examples>('/example', { count: 3 }),
  { server: true },
)

</script>

<template>
  <div class="flex flex-col items-center">
    <div v-if="result" class="mt-12 flex flex-col space-y-2 justify-center">
      <span class="text-xs p-2" > $api.$user </span>
      <pre class="text-xs p-4 bg-gray-200 rounded-md max-w-lg overflow-hidden" > {{ $api.$user }} </pre>
      <div v-if="result">
        <div v-for="example of result.data" :key="example.email">
          example.job: {{ example.job }}
          example.email: {{ example.email }}
        </div>
        <push-button class="mt-2" @click="reloadExample">reload example</push-button>
      </div>
    </div>
  </div>
</template>
