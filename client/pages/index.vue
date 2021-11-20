
<script setup lang="ts">
import { useFetch } from '#app/composables/fetch'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const url = config.apiURL
const { data: example } = await useFetch(`/example`, {
  baseURL: url,
  params: {
    count: 2,
  }
})

</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <span>pages/index.vue</span>
    <pre class="p-4 m-4 bg-green-100">{{ url }}</pre>
    <pre class="p-4 m-4 bg-green-100">{{ example }}</pre>
  </div>
</template>
