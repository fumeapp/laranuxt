<script lang="ts" setup>
import type { UserLogin } from '@/types/frontend'

const { loginModal, loginModalOff } = useModal()

const emit = defineEmits<{ (event: 'off'): void }>()

const config = useRuntimeConfig()
const router = useRouter()
const api = useApi()
const email = ref('')
const loading = reactive({
  attempt: false,
  google: false,
} as Record<string, boolean>)

const off = () => emit('off')

async function attempt(): Promise<void> {
  loading.attempt = true
  const result = await api.store('/attempt', { email: email.value })
  loading.attempt = false
  if (!result)
    return
  useToast().add({
    color: 'green',
    title: `Login link sent to <b>${email.value}</b>`,
    timeout: 5,
  })
  email.value = ''
  loginModalOff()
}

const oauthComplete = async (result: UserLogin): Promise<void> => {
  loading[result.provider] = false
  const redirect = await api.login(result)
  navigateTo(redirect)
  loginModalOff()
}

function messageHandler(add: boolean): void {
  if (add)
    return window.addEventListener('message', handleMessage)
  return window.removeEventListener('message', handleMessage)
}

function handleMessage(event: { data: UserLogin }): void {
  if (event.data.user && event.data.token)
    oauthComplete(event.data)
  if (event.data.error)
    useToast().add({ color: 'red', title: event.data.error })
}

function login(provider: 'facebook' | 'google'): void {
  loading[provider] = true
  const width = 640
  const height = 660
  const left = window.screen.width / 2 - (width / 2)
  const top = window.screen.height / 2 - (height / 2)
  const win = window.open(`${config.public.apiURL}/redirect/${provider}`, 'Log In',
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scollbars=no,
      resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`)
  const interval = setInterval(() => {
    if (win === null || win.closed) {
      clearInterval(interval)
      loading[provider] = false
    }
  }, 200)
}

onMounted(() => messageHandler(true))
onBeforeUnmount(() => messageHandler(false))
</script>

<template>
  <u-modal v-model="loginModal">
    <div class="bg-white dark:bg-gray-950 py-8 px-4 sm:px-10">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <u-button class="w-full justify-center" @click="login('google')" color="white">
            <u-icon
              v-if="loading.google"
              name="i-mdi-loading"
              class="w-6 h-6 animate-spin"
            />
            <u-icon
              v-else
              name="i-mdi-google"
              class="w-6 h-6"
            />
          </u-button>
        </div>
        <div>
          <u-button class="w-full justify-center" @click="login('facebook')" color="white">
            <u-icon
              v-if="loading.facebook"
              name="i-mdi-loading"
              class="w-6 h-6 animate-spin"
            />
            <u-icon
              v-else
              name="i-mdi-facebook"
              class="w-6 h-6"
            />
          </u-button>
        </div>
      </div>
      <div class="mt-6 relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div class="relative flex justify-center text-sm leading-5">
          <span class="px-2 bg-white dark:bg-gray-950 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>
      <label class="mt-6 block text-sm font-medium leading-5 text-gray-700 dark:text-gray-500" for="login_email">Email address</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <icon icon="mdi:envelope" class="w-5 h-5 text-gray-400" />
        </div>
        <u-input
          id="login_email"
          ref="input"
          v-model="email"
          :readonly="loading.attempt"
          placeholder="email@address.com"
          type="email"
          @keydown.esc="off"
          @keydown.enter="attempt"
        />
      </div>
      <div class="mt-6">
        <span class="block w-full rounded-md shadow-sm">
          <u-button theme="indigo" class="w-full justify-center" @click="attempt">
            Sign in / Register
            <div v-if="loading.attempt" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <icon icon="gg:spinner-two" class="w-5 h-5 text-indigo-200 animate-spin" />
            </div>
          </u-button>
        </span>
      </div>
    </div>
  </u-modal>
</template>
