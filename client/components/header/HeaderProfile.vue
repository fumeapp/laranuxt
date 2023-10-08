<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const api = useApi()

const modal = ref(false)
const profile = ref(false)
const outside = ref(null)

const { loginModalOn } = useModal()

const toggle = () => profile.value = !profile.value
const login = () => modal.value = true
const off = () => modal.value = false

const profileGroup = [
    [
      {
        icon: 'i-mdi-account',
        label: 'Your Profile',
        click: () => navigateTo('/profile'),
      },
      {
        icon: 'i-mdi-devices',
        label: 'Your Devices',
        click: () => navigateTo('/sessions'),
      },
    ],
    [
      {
        icon: 'i-mdi-logout',
        label: 'Logout',
        click: async () => await useApi().logout()
      },
    ],
  ]
</script>

<template>
  <div ref="outside" class="flex-shrink-0 relative mr-5">
    <div class="flex items-center text-white space-x-4">
      <u-button v-if="!api.loggedIn.value" theme="indigo" @click="loginModalOn">
        Sign In
      </u-button>
      <u-dropdown v-else :items="profileGroup">
        <u-button variant="ghost" color="white" size="xs" :ui="{ rounded: 'rounded-full' }">
          <span class="sr-only">Open user menu</span>
          <img
            v-if="api.$user.avatar" class="w-8 h-8 rounded-full bg-blue-400" :src="api.$user.avatar"
            alt="User Avatar"
          >
        </u-button>
      </u-dropdown>
    </div>
  </div>
</template>
