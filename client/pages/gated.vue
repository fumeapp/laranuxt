<template>
  <div class="flex flex-col items-center justify-center">
    <div class="py-12 text-center">
      this is a gated route
    </div>
    <pre class="text-xs p-4 bg-gray-200 rounded-md max-w-md overflow-hidden" > {{ $auth.$user }} </pre>
  </div>
</template>
<script lang="ts" setup>
useAuthMiddleware()
</script>
