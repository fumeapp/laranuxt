import { FetchError, FetchOptions, SearchParams } from 'ohmyfetch'
import { reactive, ref } from '@vue/reactivity'
import { IncomingMessage } from 'http'
import { useCookie } from 'h3'
import { TailvueToast } from 'tailvue'
import { Router } from 'vue-router'
import Cookies from 'universal-cookie'

export interface UserLogin {
  token: string
  user: models.User
  provider: string
  error?: string
}

export interface AuthConfig {
  fetchOptions: FetchOptions
  req?: IncomingMessage
  redirect: {
    logout: string
    login: undefined|string
  }
}

const authConfigDefaults:AuthConfig = {
  fetchOptions: {},
  req: undefined,
  redirect: {
    logout: '/',
    login: undefined,
  },
}

export default class Api {

  private token = ref<string|undefined>(undefined)
  private cookies:Cookies = new Cookies();
  public config: AuthConfig
  public $user = reactive<models.User|Record<string, unknown>>({})
  public $toast:TailvueToast
  public loggedIn = ref<boolean>(false)

  constructor(config: AuthConfig, toast: TailvueToast) {
    this.$toast = toast
    this.config = { ...authConfigDefaults,...config }
    this.checkUser()
  }

  checkUser() {
    this.token.value = this.getToken()
    if (this.token.value)  {
      this.loggedIn.value = true
      this.setUser().then()
    }
    else this.loggedIn.value = false
  }

  async login (result: UserLogin): Promise<undefined|string> {
    this.loggedIn.value = true
    this.token.value = result.token
    Object.assign(this.$user, result.user)
    this.cookies.set('token', this.token.value, { path: '/', maxAge: 60*60*24*30 })
    this.$toast.show({ type: 'success', message: 'Login Successful' })
    return this.config.redirect.login
  }

  private getToken(): string {
    if (this.config.req) return useCookie(this.config.req, 'token')
    return this.cookies.get('token')
  }

  private fetchOptions(params?: SearchParams, method = 'GET'): FetchOptions {
    const fetchOptions = this.config.fetchOptions
    fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value}`,
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

  public async store <Result>(endpoint: string, params?: SearchParams): Promise<api.MetApiResponse & { data: Result }> {
    try {
      return (await $fetch<api.MetApiResults & { data: api.MetApiResponse & { data: Result } }>(endpoint, this.fetchOptions(params, 'POST'))).data
    } catch (error) {
      await this.toastError(error)
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

    if (error.response.data && error.response.data.errors)
      for (const err of error.response.data.errors)
        this.$toast.show({
          type: 'danger',
          message: err.detail ?? err.message ?? '',
          timeout: 12,
        })

    if (error.response?.status === 401)
      return await this.invalidate()

    if (error.response?.status === 403)
      return this.$toast.show({
        type: 'denied',
        message: error.response.data.message,
        timeout: 0,
      })

    if (error.response.data.exception)
      this.$toast.show({
        type: 'danger',
        message: `<b>[${error.response.data.exception}]</b> <br /> ${error.response.data.message} <br /> <a href="phpstorm://open?file=/${error.response.data.file}&line=${error.response.data.line}">${error.response.data.file}:${error.response.data.line}</a>`,
        timeout: 0,
      })
  }

  public async logout (router: Router): Promise<void> {
    const response = (await $fetch<api.MetApiResults>('/logout', this.fetchOptions()))
    this.$toast.show(response.data)
    await this.invalidate(router)
  }

  private async invalidate (router?: Router): Promise<void> {
    this.token.value = undefined
    this.loggedIn.value = false
    Object.assign(this.$user, {})
    this.cookies.remove('token')
    if (router) await router.push(this.config.redirect.logout)
    else if (!this.config.req) document.location.href = this.config.redirect.logout
  }

}
