<template>
  <div class="w-full h-screen overflow-y-auto dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <n-link to="/">
            <logo-header />
          </n-link>
          <div class="flex items-center justify-center space-x-4">
            <dark-mode-toggle />
            <img :src="$auth.user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full">
            <button @click="logout">
              <icon icon="mdi:logout" class="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="flex items-center justify-center">
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts" setup>
function logout (): void {
  ctx.$auth.logout('local')
  ctx.$toast.success('Logout Successful')
}
</script>
