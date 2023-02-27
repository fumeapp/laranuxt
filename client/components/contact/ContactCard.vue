<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

export interface Props {
  user: models.User
}

defineProps<Props>()

const is_admin = computed(() => Math.random() >= 0.5)
</script>

<template>
  <li class="col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow">
    <div class="w-full flex items-center justify-between p-6 space-x-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="text-gray-900 dark:text-gray-200 text-sm leading-5 font-medium truncate">
            {{ user.name }}
          </h3>
          <span
            v-if="is_admin"
            class="flex-shrink-0 inline-block px-2 text-teal-800 text-xs leading-4 font-medium bg-green-100 dark:bg-green-400 rounded-full py-0.5"
          >
            Admin
          </span>
        </div>
        <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm leading-5 truncate">
          {{ user.job }}
        </p>
      </div>
      <img
        v-if="user.avatar"
        class="w-10 h-10 bg-gray-300 dark:border-gray-600 rounded-full flex-shrink-0"
        :src="user.avatar"
        alt="avatar"
      >
    </div>
    <div class="border-t border-gray-200 dark:border-gray-500">
      <div class="-mt-px flex">
        <div class="w-0 flex-1 flex border-r border-gray-200 dark:border-gray-500">
          <a
            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 dark:text-gray-200 font-medium border border-transparent rounded-bl-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <Icon icon="mdi:envelope" class="w-5 h-5 text-gray-400" />
            <span class="ml-3">Email</span>
          </a>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <a
            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 dark:text-gray-200 font-medium border border-transparent rounded-br-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <Icon icon="mdi:phone" class="w-5 h-5 text-gray-400" />
            <span class="ml-3">Call</span>
          </a>
        </div>
      </div>
    </div>
  </li>
</template>
