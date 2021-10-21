<template>
  <div class="mt-12">
    <h1 class="text-center mb-4"> This page is behind auth middleware </h1>
    <span>$auth.user</span>
    <pre class="text-xs border p-4 bg-gray-900 text-gray-100 rounded-lg mb-4"> {{ $auth.user }} </pre>
  </div>
</template>

<script lang="ts">
export default { layout: 'user' }
</script>
