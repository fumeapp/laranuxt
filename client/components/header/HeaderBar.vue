<script lang="ts" setup>
import Menu from '@/lib/menu'

const route = useRoute()
const router = useRouter()
const api = useApi()

const menu = new Menu(route, router, api)
</script>

<template>
  <header class="bg-white dark:bg-gray-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-3 flex items-center justify-between border-b border-indigo-500 lg:border-none">
        <div class="flex items-center">
          <div class="flex w-16 h-8">
            <icon icon="cib:laravel" class="w-8 h-8 text-red-400" />
            <icon icon="simple-icons:nuxtdotjs" class="w-8 h-8 text-green-400 -ml-1" />
          </div>
          <div class="hidden ml-10 space-x-8 lg:block">
            <client-only>
              <nuxt-link
                v-for="item in menu.main()"
                :key="item.name"
                :to="item.to"
                class="text-base py-2 px-4 rounded-md text-gray-900 dark:text-gray-200 inline-flex items-center"
                :class="{ 'bg-gray-200 dark:bg-gray-600': item.names.includes(route.name as string) }"
              >
                <icon v-if="item.icon" :icon="item.icon" class="w-6 h-6 mr-2.5" />
                {{ item.name }}
              </nuxt-link>
            </client-only>
          </div>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <a href="https://github.com/fumeapp/laranuxt" target="_new">
            <button class="rounded-full w-8 h-8 flex items-center justify-center">
              <icon icon="mdi-github" class="w-6 h-6" />
            </button>
          </a>
          <header-dark-mode />
          <header-profile />
        </div>
      </div>
    </nav>
  </header>
</template>
