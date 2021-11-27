
<template>
<header class="bg-indigo-800">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-3 flex items-center justify-between border-b border-indigo-500 lg:border-none">
      <div class="flex items-center">
        <div class="flex w-16 h-8">
          <icon-client icon="cib:laravel" class="w-8 h-8 text-white" />
          <icon-client icon="simple-icons:nuxtdotjs" class="w-8 h-8 text-white -ml-1" />
        </div>
        <div class="hidden ml-10 space-x-8 lg:block">
          <router-link to='/' class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
            Home
          </router-link>

          <router-link
            v-if="$api.loggedIn.value === true"
            to="/gated"
            class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
            Gated
          </router-link>

          <router-link
            v-if="$api.loggedIn.value === true"
            to="/sessions"
            class="text-base font-medium text-white hover:text-indigo-50" key="Sessions">
            User Sessions
          </router-link>

        </div>
      </div>
      <div class="ml-10 space-x-4">
        <push-button theme="indigo" @click="action"> {{ userText }} </push-button>
      </div>
    </div>
  </nav>
</header>
<modal-base v-if="modal" :destroyed="off">
  <header-login-modal @off="off" />
</modal-base>
</template>

<script lang="ts" setup>
import { PushButton, ModalBase } from 'tailvue'
import { useNuxtApp } from '#app'
import { computed, ref } from '@vue/reactivity'
import HeaderLoginModal from '~/components/header/HeaderLoginModal.vue'
import IconClient from '~/components/IconClient.vue'
const { $api, $modal, $toast } = useNuxtApp()
const modal = ref(false)

const userText = computed(() => $api.loggedIn.value === null ? 'Loading' : $api.loggedIn.value === true ? 'Sign Out' : 'Sign In')

function logout() {
  $modal.show({
    type: 'danger',
    title: 'Logging out',
    body: `Are you sure you want to log out as <b>${$api.$user.value.name}</b> ?`,
    primary: {
      label: 'Yes',
      theme: 'indigo',
      action: async () => $toast.show(await $api.logout())
    },
    secondary: {
      label: 'No',
      theme: 'white',
    },
  })
}

const login = () =>  modal.value = true
const off = () => modal.value = false
const  action =  () => $api.loggedIn.value ? logout() : login()

</script>
