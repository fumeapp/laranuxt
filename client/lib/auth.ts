import { FetchOptions } from 'ohmyfetch'
import { ref } from '@vue/reactivity'
import { IncomingMessage, ServerResponse } from 'http'
import { setCookie, useCookie } from 'h3'

export interface OAuthResult {
  token: string
  user: models.User
  provider: string
  error?: string
}

export interface AuthConfig {
  fetchOptions: FetchOptions
  req?: IncomingMessage
  res?: ServerResponse
  redirect: {
    logout: string
    login: undefined|string
  }
}

const authConfigDefaults:AuthConfig = {
  fetchOptions: {},
  req: undefined,
  res: undefined,
  redirect: {
    logout: '/',
    login: undefined,
  }
}

export default class Auth {

  private token = ref<string|undefined>(undefined)
  public config: AuthConfig
  public $user = ref<models.User>(undefined)
  public loggedIn = ref(false)

  constructor(config: AuthConfig) {
    this.config = { ...authConfigDefaults,...config }
    this.token.value = this.get()
    if (this.token.value)  {
      this.loggedIn.value = true
      this.setUser().then()
    }
  }

  async login (result: OAuthResult): Promise<undefined|string> {
    this.loggedIn.value = true
    this.token.value = result.token
    this.$user.value = result.user
    await this.set()
    return this.config.redirect.login
  }

  private async set(): Promise<string> {
    return await $fetch('/api/set', { params: { token: this.token.value } })
  }

  private get(): string {
    if (this.config.req) return useCookie(this.config.req, 'auth.token')
    return `; ${document.cookie}`.split(`; auth.token=`).pop().split(';').shift()
  }

  private fetchOptions(): FetchOptions {
    this.config.fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.value}`,
    }
    return this.config.fetchOptions
  }

  private async setUser(): Promise<void> {
    try {
      this.$user.value = await this.getUser()
    } catch (e) {
      if (e.response.status === 401)
        this.invalidate()
    }
  }

  private async getUser (): Promise<models.User> {
    return (await $fetch<api.MetApiResponse & { data: models.User }>('/me', this.fetchOptions())).data
  }

  public async logout (): Promise<api.MetApiResponse> {
    const response = (await $fetch<api.MetApiResponse>('/logout', this.config.fetchOptions)).data
    // if (this.config.req) setCookie(this.config.res, 'auth.token', '', { maxAge: -99999 })
    this.invalidate()
    return response
  }

  private invalidate (): void {
    this.token = undefined
    this.loggedIn.value = false
    this.$user.value = undefined
    //if (this.config.req) setCookie(this.config.res, 'auth.token', '', { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') })
    if (!this.config.req) document.cookie = 'auth.token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}
