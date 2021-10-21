<template>
  <div class="mt-12">
    <h1 class="text-center"> This page is behind the auth middleware </h1>
    <pre class="text-xs"> {{ $auth.user }} </pre>
    <div class="flex flex-col space-y-2 items-center">
      <push-button @click="logout">
        <span data-icon="mdi:logout" class="iconify w-6 h-6 mr-2.5" />
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
