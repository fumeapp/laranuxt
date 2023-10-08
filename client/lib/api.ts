import type { Notification } from '@nuxt/ui/dist/runtime/types'
import { reactive, ref } from 'vue'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { NuxtApp } from '#app'

export interface SearchParameters {
  [key: string]: any;
}

export interface UserLogin {
  token: string
  user: models.User
  provider: string
  error?: string
  action?: LoginAction
}

export interface AuthConfig {
  fetchOptions: any
  webURL: string
  apiURL: string
  redirect: {
    logout: string
    login: undefined | string
  }
  paymentToast?: Partial<Notification>
  echoConfig?: EchoConfig
}

export interface EchoConfig {
  pusherAppKey: string
  pusherAppCluster: string

}

export interface LoginAction {
  action: string
  url: string
}

const authConfigDefaults: AuthConfig = {
  fetchOptions: {},
  webURL: 'https://localhost:3000',
  apiURL: 'https://localhost:8000',
  redirect: {
    logout: '/',
    login: undefined,
  },
}

export default class Api {
  public token = useCookie<string | undefined>('token', { path: '/', maxAge: 60 * 60 * 24 * 30 })
  public config: AuthConfig
  public $user = reactive<models.User>({} as models.User)
  public $echo: undefined | Echo = undefined
  public loggedIn = ref<boolean | undefined>(undefined)
  public modal = ref<boolean>(false)
  public redirect = ref<boolean>(false)
  public action = ref<LoginAction | undefined>(undefined)

  public nuxtApp:NuxtApp|undefined = undefined

  constructor(config: AuthConfig) {
    this.config = { ...authConfigDefaults, ...config }
  }
  setNuxtApp(nuxtApp:NuxtApp) {
    this.nuxtApp = nuxtApp
  }

  on(redirect: boolean, action?: LoginAction | undefined) {
    this.redirect.value = redirect
    this.modal.value = true
    this.action.value = action
  }

  off() {
    this.modal.value = false
  }

  async checkUser() {
    if (this.token.value !== undefined)
      this.loggedIn.value = await this.setUser()
    else this.loggedIn.value = false
  }

  setEcho() {
    if (this.config.echoConfig === undefined) return
    window.Pusher = Pusher
    this.$echo = new Echo({
      broadcaster: 'pusher',
      key: this.config.echoConfig.pusherAppKey,
      cluster: this.config.echoConfig.pusherAppCluster,
      authEndpoint: `${this.config.apiURL}/broadcasting/auth`,
      forceTls: true,
      encrypted: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.token.value || ''}`,
        },
      },
    })
  }

  login(result: UserLogin, discreet = false): undefined | string {
    this.loggedIn.value = true
    this.token.value = result.token
    Object.assign(this.$user, result.user)
    this.setEcho()
    if (!discreet)
      useToast().add({ icon: 'i-mdi-check-bold', color: 'green', title: 'Login Successful' })
    if (result.action && result.action.action === 'redirect')
      return result.action.url
    return this.config.redirect.login
  }

  private fetchOptions(params?: SearchParameters, method = 'GET') {
    const fetchOptions = this.config.fetchOptions
    fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value || ''}`,
      Referer: this.config.webURL,
    }
    fetchOptions.method = method
    if (this.nuxtApp) {
      fetchOptions.onRequest = () => this.nuxtApp?.callHook('page:start').catch(() => { })
      fetchOptions.onResponse = () => this.nuxtApp?.callHook('page:finish').catch(() => { })
    }
    fetchOptions.onResponseError = this.toastError
    delete this.config.fetchOptions.body
    delete this.config.fetchOptions.params
    if (params) {
      if (method === 'POST' || method === 'PUT')
        this.config.fetchOptions.body = params
      else
        this.config.fetchOptions.params = params
    }
    return this.config.fetchOptions
  }

  public async setUser(): Promise<boolean> {
    try {
    const result = await $fetch<api.MetApiResults & { data: models.User }>('/me', this.fetchOptions())
    if (!result || !result.status || result.status !== 'success') return false
    Object.assign(this.$user, result.data)
    } catch (e) { this.invalidate() }
    this.setEcho()
    return true
  }

  public async index<Results>(endpoint: string, params?: SearchParameters): Promise<Results> {
    return await $fetch<Results>(endpoint, this.fetchOptions(params))
  }

  public async get<Results>(endpoint: string, params?: SearchParameters): Promise<Results> {
    return await $fetch<Results>(endpoint, this.fetchOptions(params))
  }

  public async update<Response>(endpoint: string, params?: SearchParameters): Promise<Response | undefined> {
    return await $fetch<Response>(endpoint, this.fetchOptions(params, 'PUT'))
  }

  public async store<Response>(endpoint: string, params?: SearchParameters): Promise<Response | undefined> {
    return await $fetch<Response>(endpoint, this.fetchOptions(params, 'POST'))
  }

  public async delete<Response>(endpoint: string, params?: SearchParameters): Promise<Response | undefined> {
    return await $fetch<Response>(endpoint, this.fetchOptions(params, 'DELETE'))
  }

  public async attempt(token: string | string[]): Promise<UserLogin> {
    if (Array.isArray(token))
      token = token.join('')

      return (await $fetch<api.MetApiResponse & { data: UserLogin }>(`/login/${token}`, this.fetchOptions())).data
  }

  public upload(url: string, params?: SearchParameters) {
    return $fetch(url, { method: 'PUT', body: params })
  }

  public async toastError(error: any): Promise<any> {
    if (error.response?.status === 401) {
     }

    if (error.response?.status === 402 && this.config.paymentToast)
      return useToast().add(this.config.paymentToast)

    if (error.response?._data && error.response._data.errors?.error?.reason) {
      for (const err of error.response._data.errors) {
        useToast().add({ icon: 'i-mdi-alert', title: err.detail ?? err.message ?? '', color: 'red' })
     }
    }

    if (error.response?.status === 403) {
      useToast().add({
        icon: 'i-mdi-account-cancel',
        title: error.response._data.message,
        color: 'red',
      })
    }

    if (error.response?._data.exception) {
      useToast().add({
        ui: {'width': 'sm:w-1/2'},
        icon: 'i-mdi-alert',
        color: 'red',
        title: `
        <b>[${error.response._data.exception}]</b><br />
        ${error.response._data.message}<br />
        <a href="phpstorm://open?file=/${error.response._data.file}&line=${error.response._data.line}">
          ${error.response._data.file}:${error.response._data.line}
        </a>`,
        timeout: 0,
      })
    }
  }

  public async invalidate(): Promise<void> {
    this.token.value = undefined
    this.loggedIn.value = false
    Object.assign(this.$user, {})
    navigateTo(this.config.redirect.logout)
  }

  public async logout(): Promise<void> {
    if (this.$echo)
      this.$echo.disconnect()
    const response = (await $fetch<api.MetApiResponse>('/logout', this.fetchOptions()))
    useToast().add({ icon: 'i-mdi-check-bold', color: 'green', title: response.data.message, timeout: 1 })
    await this.invalidate()
  }

}
