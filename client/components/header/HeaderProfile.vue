<template>
  <div class="flex-shrink-0 relative mr-5">
    <div class="flex items-center text-white space-x-4">
      <push-button v-if="!$api.loggedIn.value" theme="indigo" @click="login"> Sign In </push-button>
      <button
        v-else
        id="user-menu-button"
        type="button"
        class="max-w-xs bg-blue-300 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
        aria-expanded="false"
        aria-haspopup="true"
        @click="toggle"
      >
        <span class="sr-only">Open user menu</span>
        <client-only>
          <img class="w-8 h-8 rounded-full bg-blue-400" :src="$api.$user?.avatar" alt="User Avatar">
          <template #fallback>
            <div class="w-8 h-8 rounded-full bg-blue-400" />
          </template>
        </client-only>
      </button>
    </div>
    <client-only>
      <transition-scale-in>
        <div
          v-if="profile"
          ref="target"
          class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <header-profile-menu @off="toggle" />
        </div>
      </transition-scale-in>
    </client-only>
  </div>
  <header-login-modal
    v-if="modal"
    :destroyed="off"
    @off="off"
  />
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from '@vue/reactivity'
import { PushButton } from 'tailvue'
import HeaderLoginModal from '~/components/header/HeaderLoginModal.vue'
import TransitionScaleIn from '~/components/transition/TransitionScaleIn.vue'
import HeaderProfileMenu from '~/components/header/HeaderProfileMenu.vue'

const modal = ref(false)
const profile = ref(false)
const target = ref(null)

onClickOutside(target, () => profile.value = false)

const toggle = () => profile.value = !profile.value
const login = () =>  modal.value = true
const off = () => modal.value = false

</script>
