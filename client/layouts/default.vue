<template>
  <div class="w-full h-screen overflow-y-auto dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <n-link to="/">
              <logo-header />
            </n-link>
          </div>
          <div class="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
            <dark-mode-toggle />
            <header-login-button />
          </div>
        </div>
      </div>
    </nav>
    <main class="flex items-center justify-center">
      <Nuxt />
    </main>
  </div>
</template>

<style>
html,body {
  @apply bg-gray-100
}
</style>
