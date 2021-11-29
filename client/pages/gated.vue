<template>
  <div class="flex flex-col items-center justify-center">
    <div class="py-12 text-center">
      this uses <i>useAuthMiddleware()</i> <b>pages/gated.vue</b>
    </div>
    <span class="text-xs p-2"> $api.$user </span>
    <pre class="text-xs p-4 bg-gray-200 dark:bg-gray-700 rounded-md max-w-md overflow-hidden"> {{ $api.$user }} </pre>
  </div>
</template>
<script lang="ts" setup>
useAuthMiddleware()
</script>
