<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <n-link to="/">
            <logo-header />
          </n-link>
        </div>
        <div class="flex items-center space-x-4 justify-end md:flex-1 lg:w-0">
          <dark-mode-toggle />
          <header-login-button />
          <header-user v-if="$auth.loggedIn" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
