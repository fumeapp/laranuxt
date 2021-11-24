
<template>
<header class="bg-indigo-800">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-3 flex items-center justify-between border-b border-indigo-500 lg:border-none">
      <div class="flex items-center">
        <icon-client icon="cib:laravel" class="w-10 h-10 text-white" />
        <icon-client icon="simple-icons:nuxtdotjs" class="w-10 h-10 text-white -ml-1" />
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
        <client-only>
          <push-button theme="indigo" @click="action"> {{ userText }} </push-button>
        </client-only>
      </div>
    </div>
    <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
        Solutions
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
        Pricing
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
        Docs
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
        Company
      </a>
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
