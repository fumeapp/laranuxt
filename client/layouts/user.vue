<template>
  <div>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <n-link to="/">
            <logo-header />
          </n-link>
          <div class="flex items-center justify-center space-x-2">
            <img :src="$auth.user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full">
            <span>{{ $auth.user.name }}</span>
            <button @click="logout">
              <icon icon="mdi:logout" class="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex items-center justify-center">
      <Nuxt />
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
