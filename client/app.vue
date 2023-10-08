<script lang="ts" setup >
const color = 'repeating-linear-gradient(to right,#00c893 0%,#9c9ae3 50%,#6667ab 100%)'
useApi().setNuxtApp(useNuxtApp())
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <nuxt-layout>
      <NuxtLoadingIndicator :color="color" />
      <header-bar />
      <layout-bread-crumbs>
        <u-container>
          <nuxt-page />
        </u-container>
      </layout-bread-crumbs>
      <u-notifications>
        <template #title="{ title }">
          <span v-html="title" />
        </template>
        <template #description="{ description }">
          <span v-html="description" />
        </template>
      </u-notifications>
      <layout-login-modal />
      <layout-confirm />
    </nuxt-layout>
  </div>
</template>
