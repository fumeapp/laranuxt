import { FetchOptions } from 'ohmyfetch'
import { ref } from '@vue/reactivity'
import { IncomingMessage, ServerResponse } from 'http'
import { useCookie } from 'h3'

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
}

export default class Auth {

  private token: string|undefined
  private config: AuthConfig
  public loggedIn = ref<null|boolean>(null)
  public $user:models.User

  constructor(config: AuthConfig) {
    this.token = this.get()
    this.config = config
    this.checkUser()
  }

  checkUser(): void {
    this.loggedIn.value = true
  }

  async setOAuthUser (result: OAuthResult): Promise<void> {
    this.setBearer(result.token)
    await Auth.set(result.token)
    this.$user = result.user
    this.loggedIn.value = true
  }

  private static async set(token: string|undefined): Promise<string> {
    return await $fetch('/api/set', { params: { token: token } })
  }

  private get(): string {
    if (this.config.req) return useCookie(this.config.req, 'auth.token')
    return `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift()
  }

  private setBearer(token: string): void {
    this.config.fetchOptions.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  private async getUser (): Promise<models.User> {
    return (await $fetch<api.MetApiResponse & { data: models.User }>('/me', this.config.fetchOptions)).data
  }

  public async logout (): Promise<api.MetApiResponse> {
    const response = (await $fetch<api.MetApiResponse>('/logout', this.config.fetchOptions)).data
    document.cookie = 'auth.token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.loggedIn.value = false
    return response
  }

}
