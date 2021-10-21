<template>
  <div>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <n-link to="/">
            <logo-header />
          </n-link>
          <header-login-button />
        </div>
      </div>
    </nav>
    <div class="flex items-center justify-center">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html,body {
  @apply bg-gray-100
}
</style>
