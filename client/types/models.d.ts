export {}
declare global {
  export namespace models {

    export interface Provider {
      // columns
      id: number
      user_id: number
      avatar: string|null
      name: string
      payload: string[]
      created_at: Date|null
      updated_at: Date|null
    }
    export type Providers = Provider[]
    export type ProviderResults = Modify<api.MetApiResults, { data: Providers }>

    export interface User {
      // columns
      id: number
      email: string
      name: string|null
      avatar: string|null
      job: string
      stripe: string|null
      is_sub: boolean
      created_at: Date|null
      updated_at: Date|null
      // mutators
      is_trial: boolean
      first_name: string
      has_active_session: boolean
      session: Session
      location: Array<unknown>
      // relations
      providers: Providers
      sessions: Sessions
      notifications: DatabaseNotifications
    }
    export type Users = User[]
    export type UserResults = Modify<api.MetApiResults, { data: Users }>

  }
}
