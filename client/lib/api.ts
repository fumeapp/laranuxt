import type { FetchError, FetchOptions, SearchParameters } from 'ofetch'
import { $fetch } from 'ofetch'
import { reactive, ref } from 'vue'
import type { TailvueToast, ToastProps } from 'tailvue'
import type { Router } from 'vue-router'

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
    login: undefined | string
  }
  paymentToast?: ToastProps
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
  public $toast: TailvueToast
  public loggedIn = ref<boolean | undefined>(undefined)
  public modal = ref<boolean>(false)
  public redirect = ref<boolean>(false)
  public action = ref<LoginAction | undefined>(undefined)

  public nuxtApp = useNuxtApp()

  constructor(config: AuthConfig, toast: TailvueToast) {
    this.$toast = toast
    this.config = { ...authConfigDefaults, ...config }
    this.checkUser()
  }

  on(redirect: boolean, action?: LoginAction | undefined) {
    this.redirect.value = redirect
    this.modal.value = true
    this.action.value = action
  }

  off() {
    this.modal.value = false
  }

  checkUser() {
    if (this.token.value !== undefined) {
      this.setUser().then().catch(() => {})
      this.loggedIn.value = true
    }
    else { this.loggedIn.value = false }
  }

  setEcho() {
    if (!this.config.echoConfig)
      return
    if (!process.client)
      return
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
      this.$toast.show({ type: 'success', message: 'Login Successful', timeout: 1 })
    if (result.action && result.action.action === 'redirect')
      return result.action.url
    return this.config.redirect.login
  }

  private fetchOptions(params?: SearchParameters, method = 'GET'): FetchOptions<'json'> {
    const fetchOptions = this.config.fetchOptions
    fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value || ''}`,
      Referer: this.config.webURL,
    }
    fetchOptions.method = method
    fetchOptions.onRequest = () => {
      this.nuxtApp.callHook('page:start').catch(() => { })
    }
    fetchOptions.onResponse = () => {
      this.nuxtApp.callHook('page:finish').catch(() => { })
    }
    fetchOptions.onResponseError = (error) => {
      this.toastError(error as unknown as FetchError).catch(() => { })
    }
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

  public async setUser(): Promise<void> {
    try {
      const result = await $fetch<api.MetApiResponse & { data: models.User }>('/me', this.fetchOptions())
      Object.assign(this.$user, result.data)
      this.setEcho()
    }
    catch (e) {
      await this.invalidate()
    }
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

    try {
      return (await $fetch<api.MetApiResponse & { data: UserLogin }>(`/login/${token}`, this.fetchOptions())).data
    }
    catch (error) {
      await this.toastError(error as FetchError)
      throw (error)
    }
  }

  public upload(url: string, params?: SearchParameters) {
    return $fetch(url, { method: 'PUT', body: params })
  }

  public async toastError(error: FetchError): Promise<void> {
    if (error.response?.status === 401)
      return await this.invalidate()

    if (error.response?.status === 402 && this.config.paymentToast)
      return this.$toast.show(this.config.paymentToast)

    if (!this.$toast)
      throw error

    if (error.response?._data && error.response._data.errors?.error?.reason) {
      for (const err of error.response._data.errors) {
        this.$toast.show({
          type: 'danger',
          message: err.detail ?? err.message ?? '',
          timeout: 12,
        })
      }
    }

    if (error.response?.status === 403) {
      return this.$toast.show({
        type: 'denied',
        message: error.response._data.message,
        timeout: 0,
      })
    }

    if (error.response?._data.exception) {
      this.$toast.show({
        wide: true,
        type: 'danger',
        message: `
        <b>[${error.response._data.exception}]</b><br />
        ${error.response._data.message}<br />
        <a href="phpstorm://open?file=/${error.response._data.file}&line=${error.response._data.line}">
          ${error.response._data.file}:${error.response._data.line}
        </a>`,
        timeout: 0,
      })
    }
  }

  public async logout(router: Router): Promise<void> {
    if (this.$echo)
      this.$echo.disconnect()
    const response = (await $fetch<api.MetApiResults>('/logout', this.fetchOptions()))
    this.$toast.show(Object.assign(response.data as ToastProps, { timeout: 1 }))
    await this.invalidate(router)
  }

  public async invalidate(router?: Router): Promise<void> {
    this.token.value = undefined
    this.loggedIn.value = false
    Object.assign(this.$user, {})
    if (router)
      await router.push(this.config.redirect.logout)
    else if (process.client && document.location.pathname !== this.config.redirect.logout)
      document.location.href = this.config.redirect.logout
  }
}
