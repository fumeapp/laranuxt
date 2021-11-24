<template>
  <div class="py-12 text-center">
    this is a gated route
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
const router = useRouter()
const { $auth } = useNuxtApp()
console.log($auth.loggedIn.value)
console.log($auth.$user)
onMounted(() => { console.log($auth.loggedIn.value) })

</script>
