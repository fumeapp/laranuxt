<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#app'
const { $api } = useNuxtApp()

export interface Example {
  name: string
  /** Current Position */
  job: string
  email: string
  avatar: string
}
export type Examples = Example[]

const { data: result } = await useAsyncData('examples', () => $api.index<Examples>('/example', { count: 3 }))

</script>

<template>
  <div class="flex flex-col items-center">
    <div v-if="result" class="mt-12 flex flex-col space-y-2 justify-center">
      <span> $api.loggedIn : {{ $api.loggedIn }}</span>
      <span class="text-xs p-2" > $api.$user </span>
      <pre class="text-xs p-4 bg-gray-200 rounded-md max-w-lg overflow-hidden" > {{ $api.$user }} </pre>
      <pre class="text-xs p-4 bg-gray-200 rounded-md max-w-lg">
const result = await $api.index&lt;Examples&gt;('/example', { count: 3 })
from endpoint <a target="_new" href="http://localhost:8000/example?count=6" class="text-underline">http://localhost:8000/example</a>
      </pre>
      <div v-for="example of result.data" :key="example.email">
        example.job: {{ example.job }}
        example.email: {{ example.email }}
      </div>
    </div>
  </div>
</template>
