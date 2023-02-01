<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { PushButton } from 'tailvue'
import Menu from '@/lib/menu'

const route = useRoute()
const router = useRouter()
const api = useApi()

const modal = ref(false)
const profile = ref(false)
const outside = ref(null)

const menu = new Menu(route, router, api)

onClickOutside(outside, () => profile.value = false)

const toggle = () => profile.value = !profile.value
const login = () => modal.value = true
const off = () => modal.value = false
</script>

<template>
  <div ref="outside" class="flex-shrink-0 relative mr-5">
    <client-only>
      <div class="flex items-center text-white space-x-4">
        <PushButton v-if="!api.loggedIn.value" theme="indigo" @click="login">
          Sign In
        </PushButton>
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
          <img
            v-if="api.$user.avatar" class="w-8 h-8 rounded-full bg-blue-400" :src="api.$user.avatar"
            alt="User Avatar"
          >
        </button>
      </div>
      <transition-dropdown>
        <dropdown-group
          v-if="profile"
          :groups="menu.profileGroup"
          width="w-48"
        />
      </transition-dropdown>
    </client-only>
  </div>
  <header-login-modal
    v-if="modal"
    :destroyed="off"
    @off="off"
  />
</template>
