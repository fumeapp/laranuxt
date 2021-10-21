<template>
  <div class="bg-white py-8 px-4 sm:px-10">
    <div class="grid grid-cols-2 gap-3">
      <div>
        <push-button class="w-full justify-center" @click="login('google')">
          <icon-spinner
            v-if="loading.google"
            class="w-5 h-5 block"
            primary="text-red-500"
            secondary="text-blue-300"
          />
          <span v-else data-icon="flat-color-icons:google" class="iconify w-6 h-6 mr-2.5" />
        </push-button>
      </div>
      <div>
        <push-button class="w-full justify-center" @click="login('facebook')">
          <icon-spinner
            v-if="loading.facebook"
            class="w-5 h-5"
            primary="text-blue-400"
          />
          <span data-icon="logos:facebook" class="iconify w-6 h-6 mr-2.5" />
        </push-button>
      </div>
    </div>
    <dividing-copy>Or continue with</dividing-copy>
    <label class="mt-6 block text-sm font-medium leading-5 text-gray-700" for="login_email">Email address</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <icon-envelope class="w-5 h-5" primary="text-gray-400" secondary="text-gray-300" />
      </div>
      <input
        id="login_email"
        ref="input"
        v-model="email"
        class="form-input appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        :readonly="loading.attempt"
        placeholder="email@address.com"
        type="email"
        required="required"
        @keydown.esc="modalOff"
        @keydown.enter="attempt"
      >
    </div>
    <div class="mt-6">
      <span class="block w-full rounded-md shadow-sm">
        <push-button theme="indigo" class="w-full justify-center" @click="attempt">
          Sign in / Register
          <div v-if="loading.attempt" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <icon-spinner class="w-5 h-5" primary="text-indigo-700" secondary="text-indigo-200" />
          </div>
        </push-button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface User {
  name: string
}

interface OauthResult {
  token: string
  user: User
  provider: string
  error?: string
}
export default Vue.extend({
  props: {
    modalOff: {
      required: true,
      type: Function,
    },
  },
  data () {
    return {
      email: '',
      loading: {
        attempt: false,
        google: false,
        github: false,
        gitlab: false,
        bitbucket: false,
      } as Record<string, boolean>,
    }
  },

  created () { if (process.browser) this.messageHandler(true) },
  destroyed () { if (process.browser) this.messageHandler(false) },

  methods: {
    async attempt (): Promise<void> {
      const email = this.email
      this.loading.attempt = true
      const action = JSON.stringify(this.$store.state.action)
      try {
        await this.$axios.post('/attempt', { email, action })
      } catch (e) {
        this.loading.attempt = false
        return
      }
      this.$toast.show({
        type: 'success',
        title: 'Login E-mail Sent',
        message: `Login link sent to <b>${this.email}</b>`,
        timeout: 5,
      })
      this.email = ''
      this.loading.attempt = false
      this.modalOff()
    },

    messageHandler (add: boolean): void {
      if (add) return window.addEventListener('message', this.handleMessage)
      return window.removeEventListener('message', this.handleMessage)
    },

    handleMessage (event: { data: OauthResult }): void {
      if (event.data.user && event.data.token)
        this.oauthComplete(event.data)
      if (event.data.error)
        this.$toast.show({ type: 'danger', message: event.data.error })
    },

    login (provider: 'facebook'|'google'): void {
      this.loading[provider] = true
      const width = 640
      const height = 660
      const left = window.screen.width / 2 - (width / 2)
      const top = window.screen.height / 2 - (height / 2)
      const win = window.open(`${this.$axios.defaults.baseURL}/redirect/${provider}`, 'Log In',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scollbars=no,
      resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`)
      const interval = setInterval(() => {
        if (win === null || win.closed) {
          clearInterval(interval)
          this.loading[provider] = false
        }
      }, 200)
    },
    async oauthComplete (result: OauthResult): Promise<void> {
      this.loading[result.provider] = false
      await this.$auth.setUserToken(result.token)
      this.$toast.show({ type: 'success', message: 'Login Successful' })
      await this.$router.push('/home')
      this.modalOff()
    },
  },
})
</script>
