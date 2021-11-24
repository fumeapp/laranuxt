<script setup lang="ts">
import { PushButton } from 'tailvue'
import { useFetch } from '#app/composables/fetch'
import { useNuxtApp, useRuntimeConfig } from '#app'
import { ref } from '@vue/reactivity'
const config = useRuntimeConfig()
const url = config.apiURL
const { $auth, $toast } = useNuxtApp()

export interface Example {
  name: string
  /** Current Position */
  job: string
  email: string
  avatar: string
}
export type Examples = Example[]
export interface MetApiExamples extends api.MetApiResults {
  data: Examples
}

const { data: result } = await useFetch<string, MetApiExamples>(
  `/example`, { baseURL: url, params: { count: 2, } })

</script>

<template>
  <div v-if="result" class="mt-12 flex flex-col space-y-2 items-center justify-center">
    <client-only>
      <span> $auth.loggedIn : {{ $auth.loggedIn }}</span>
      <span class="text-xs p-2" > $auth.$user </span>
      <pre class="text-xs p-4 bg-gray-200 rounded-md max-w-md overflow-hidden" > {{ $auth.$user }} </pre>
    </client-only>
    <div> {{ result.benchmark }}</div>
    <div v-for="example of result.data" :key="example.email">
      job: {{ example.job }}
      email: {{ example.email }}
    </div>
  </div>
</template>
