<script lang="ts" setup>
const api = useApi()
const { setCrumbs } = useCrumbs()

setCrumbs([
  { name: 'Home', to: '/' },
  { name: 'Gated', to: '/gated' },
])
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <span class="text-xs p-2"> api.$user </span>
    <pre class="text-xs p-4 bg-gray-200 dark:bg-gray-700 rounded-md max-w-md overflow-hidden"> {{ api.$user }} </pre>
  </div>
</template>
