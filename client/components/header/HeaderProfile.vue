<script lang="ts" setup>
import Menu from '@/lib/menu'

const route = useRoute()
const router = useRouter()
const api = useApi()

const modal = ref(false)
const profile = ref(false)
const outside = ref(null)

const { loginModalOn } = useModal()

const menu = new Menu(route, router, api)

const toggle = () => profile.value = !profile.value
const login = () => modal.value = true
const off = () => modal.value = false
</script>

<template>
  <div ref="outside" class="flex-shrink-0 relative mr-5">
    <client-only>
      <div class="flex items-center text-white space-x-4">
        <u-button v-if="!api.loggedIn.value" theme="indigo" @click="loginModalOn">
          Sign In
        </u-button>
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
