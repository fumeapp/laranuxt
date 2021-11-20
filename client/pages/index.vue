
<script setup lang="ts">
import { useFetch } from '#app/composables/fetch'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const url = config.apiURL

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
  <div v-if="result" class="w-screen h-screen flex flex-col items-center justify-center">
    <span>pages/index.vue</span>
    <div> {{ result.benchmark }}</div>
    <div v-for="example of result.data" :key="example.email">
      job: {{ example.job }}
      email: {{ example.email }}
    </div>
  </div>
</template>
