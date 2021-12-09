<template>
  <div class="mt-12">
    <h1 class="text-center mb-4"> This page is behind auth middleware </h1>
    <span>$api.$user</span>
    <pre class="text-xs border p-4 bg-gray-900 text-gray-100 rounded-lg mb-4"> {{ $api.$user }} </pre>
    <div class="flex justify-center">
      <router-link to="/">
        <push-button> Go to Index </push-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PushButton } from 'tailvue'
import { useNuxtApp } from '#app'
const { $api } = useNuxtApp()
</script>
