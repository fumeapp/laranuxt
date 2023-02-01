<script lang="ts" setup>
import { PushButton } from 'tailvue'
const api = useApi()
</script>

<template>
  <div class="mt-12">
    <h1 class="text-center mb-4">
      This page is behind auth middleware
    </h1>
    <span>$api.$user</span>
    <pre class="text-xs border p-4 bg-gray-900 text-gray-100 rounded-lg mb-4"> {{ api.$user }} </pre>
    <div class="flex justify-center">
      <router-link to="/">
        <PushButton> Go to Index </PushButton>
      </router-link>
    </div>
  </div>
</template>
