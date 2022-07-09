import { FetchError, FetchOptions, SearchParams, $fetch } from 'ohmyfetch'
import { reactive, ref } from 'vue'
import { TailvueToast, ToastProps } from 'tailvue'
import { Router } from 'vue-router'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export interface UserLogin {
  token: string
  user: models.User
  provider: string
  error?: string
  action?: LoginAction
}

export interface AuthConfig {
  fetchOptions: FetchOptions<'json'>
  webURL: string
  apiURL: string
  redirect: {
    logout: string
    login: undefined|string
  }
  paymentToast?: ToastProps,
  echoConfig?: EchoConfig,
}

export interface EchoConfig {
  pusherAppKey: string
  pusheAppCluster: string

}

export interface LoginAction {
  action: string
  url: string
}

const authConfigDefaults:AuthConfig = {
  fetchOptions: {},
  webURL: 'https://localhost:3000',
  apiURL: 'https://localhost:8000',
  redirect: {
    logout: '/',
    login: undefined,
  },
}

export default class Api {

  public token = useCookie('token', { path: '/', maxAge: 60*60*24*30 })
  public config: AuthConfig
  public $user = reactive<models.User|Record<string, unknown>>({})
  public $echo:undefined|Echo = undefined
  public $toast:TailvueToast
  public loggedIn = ref<boolean>(false)
  public modal = ref<boolean>(false)
  public redirect = ref<boolean>(false)
  public action = ref<null|LoginAction>(null)

  constructor(config: AuthConfig, toast: TailvueToast) {
    this.$toast = toast
    this.config = { ...authConfigDefaults,...config }
    this.checkUser()
  }

  on(redirect: boolean, action?: LoginAction|null) {
    this.redirect.value = redirect
    this.modal.value = true
    this.action.value = action
  }

  off() {
    this.modal.value = false
  }

  checkUser() {
    if (this.token.value !== undefined)  {
      this.setUser().then()
      this.loggedIn.value = true
    }
    else this.loggedIn.value = false
  }

  setEcho() {
    if (!this.config.echoConfig) return
    if (!process.client) return
    window.Pusher = Pusher
    this.$echo = new Echo({
      broadcaster: 'pusher',
      key: this.config.echoConfig.pusherAppKey,
      cluster: this.config.echoConfig.pusheAppCluster,
      authEndpoint: `${this.config.apiURL}/broadcasting/auth`,
      forceTls: true,
      encrypted: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ` + this.token.value,
        },
      },
    })
  }

  async login (result: UserLogin): Promise<undefined|string> {
    this.loggedIn.value = true
    this.token.value = result.token
    Object.assign(this.$user, result.user)
    this.setEcho()
    this.$toast.show({ type: 'success', message: 'Login Successful', timeout: 1 })
    if (result.action && result.action.action === 'redirect') return result.action.url
    return this.config.redirect.login
  }
  private fetchOptions(params?: SearchParams, method = 'GET'): FetchOptions<'json'> {
    const fetchOptions = this.config.fetchOptions
    fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value}`,
      Referer: this.config.webURL,
    }
    fetchOptions.method = method
    delete this.config.fetchOptions.body
    delete this.config.fetchOptions.params
    if (params)
      if (method === 'POST' || method === 'PUT')
        this.config.fetchOptions.body = params
      else
        this.config.fetchOptions.params = params
    return this.config.fetchOptions
  }

  private async setUser(): Promise<void> {
    try {
      const result = await $fetch<api.MetApiResponse & { data: models.User }>('/me', this.fetchOptions())
      Object.assign(this.$user, result.data)
      this.setEcho()
    } catch (e) {
      await this.invalidate()
    }
  }

  public async index <Results>(endpoint: string, params?: SearchParams): Promise<api.MetApiResults & { data: Results }> {
    try {
      return await $fetch<api.MetApiResults & { data: Results }>(endpoint, this.fetchOptions(params))
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async get <Result>(endpoint: string, params?: SearchParams): Promise<api.MetApiResponse & { data: Result }> {
    if (params?.noCatch)
      return await $fetch<api.MetApiResponse & { data: Result }>(endpoint, this.fetchOptions(params))
    try {
      return await $fetch<api.MetApiResponse & { data: Result }>(endpoint, this.fetchOptions(params))
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async update (endpoint: string, params?: SearchParams): Promise<api.MetApiResponse> {
    try {
      return (await $fetch<api.MetApiResults & { data: api.MetApiResponse}>(endpoint, this.fetchOptions(params, 'PUT'))).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async store <Result>(endpoint: string, params?: SearchParams, cb?: (e: FetchError) => unknown): Promise<api.MetApiResponse & { data: Result }> {
    try {
      return (await $fetch<api.MetApiResults & { data: api.MetApiResponse & { data: Result } }>(endpoint, this.fetchOptions(params, 'POST'))).data
    } catch (error) {
      if (cb) cb(error)
      else await this.toastError(error)
    }
  }

  public async delete (endpoint: string, params?: SearchParams): Promise<api.MetApiResponse> {
    try {
      return (await $fetch<api.MetApiResults & { data: api.MetApiResponse}>(endpoint, this.fetchOptions(params, 'DELETE'))).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  public async attempt (token: string | string[]): Promise<UserLogin> {
    try {
      return (await $fetch<api.MetApiResponse & { data: UserLogin }>('/login', this.fetchOptions({ token }, 'POST'))).data
    } catch (error) {
      await this.toastError(error)
    }
  }

  private async toastError (error: FetchError): Promise<void> {

    if (error.response?.status === 401)
      return await this.invalidate()

    if (error.response?.status === 402 && this.config.paymentToast)
      return this.$toast.show(this.config.paymentToast)


    if (!this.$toast) throw error

    if (error.response._data && error.response._data.errors)
      for (const err of error.response._data.errors)
        this.$toast.show({
          type: 'danger',
          message: err.detail ?? err.message ?? '',
          timeout: 12,
        })

    if (error.response?.status === 403)
      return this.$toast.show({
        type: 'denied',
        message: error.response._data.message,
        timeout: 0,
      })

    if (error.response._data.exception)
      this.$toast.show({
        type: 'danger',
        message: `<b>[${error.response._data.exception}]</b> <br /> ${error.response._data.message} <br /> <a href="phpstorm://open?file=/${error.response._data.file}&line=${error.response._data.line}">${error.response._data.file}:${error.response._data.line}</a>`,
        timeout: 0,
      })
  }

  public async logout (router: Router): Promise<void> {
    if (this.$echo) this.$echo.disconnect()
    const response = (await $fetch<api.MetApiResults>('/logout', this.fetchOptions()))
    this.$toast.show(Object.assign(response.data, { timeout: 1 }))
    await this.invalidate(router)
  }

  public async invalidate (router?: Router): Promise<void> {
    this.token.value = undefined
    this.loggedIn.value = false
    Object.assign(this.$user, {})
    if (router) await router.push(this.config.redirect.logout)
    else if (process.client && document.location.pathname !== this.config.redirect.logout)
      document.location.href = this.config.redirect.logout
  }

}
