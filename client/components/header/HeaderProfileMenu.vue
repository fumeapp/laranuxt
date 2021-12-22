<template>
  <router-link
    v-for="item in profileMenu"
    :key="item.name"
    :to="item.to"
    class="flex items-center px-4 py-2 leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    :class="props.mobile ? 'text-base' : 'text-sm'"
    role="menuitem"
    @click="off"
  >
    <icon-client
      :icon="item.icon"
      :class="{'w-4 h-4 mr-1.5': !mobile, 'w-6 h-6 mr-3': mobile}"
      class="text-gray-400"
    />
    {{ item.name }}
  </router-link>
  <a
    href="#"
    class="flex items-center px-4 py-2 leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    :class="mobile ? 'text-base' : 'text-sm'"
    role="menuitem"
    @click="logout"
  >
    <icon-client
      icon="mdi-logout"
      :class="{'w-4 h-4 mr-1.5': !mobile, 'w-6 h-6 mr-3': mobile}"
      class="text-gray-400"
    />
    Logout
  </a>
</template>

<script lang="ts" setup>
import IconClient from '~/components/IconClient.vue'
import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
const { $api, $modal } = useNuxtApp()
const router = useRouter()

const props = defineProps({
  mobile: Boolean,
})

const emit = defineEmits(['off'])

const off = () => emit('off')

interface MenuItem {
  name: string
  icon: string
  to: string
  names: string[]
}

const profileMenu:MenuItem[] = [{
  name: 'Sessions',
  icon: 'mdi-devices',
  to: '/sessions',
  names: ['sessions'],
}]

function logout() {
  emit('off')
  $modal.show({
    type: 'danger',
    title: 'Logging out',
    body: `Are you sure you want to log out as <b>${$api.$user.name}</b> ?`,
    primary: {
      label: 'Yes',
      theme: 'indigo',
      action: () => $api.logout(router),
    },
    secondary: {
      label: 'No',
      theme: 'white',
    },
  })
}

</script>
