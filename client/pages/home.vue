<template>
  <div class="mt-12">
    <h1 class="text-center mb-4"> This page is behind auth middleware </h1>
    <span> $auth.user</span>
    <pre class="text-xs border p-4 bg-gray-900 text-gray-100 rounded-lg mb-4"> {{ $auth.user }} </pre>
    <div class="flex flex-col space-y-2 items-center">
      <push-button @click="logout">
        <icon icon="mdi:logout" class="w-6 h-6 text-gray-400 mr-2.5" />
        <span>Logout</span>
      </push-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const ctx = useContext()
function logout (): void {
  ctx.$auth.logout('local')
  ctx.$toast.success('Logout Successful')
}
</script>
