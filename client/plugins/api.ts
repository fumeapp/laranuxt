import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import Api from '~/lib/api'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { $toast } = useNuxtApp()
  return {
    provide: {
      api: new Api({
          fetchOptions: {
            baseURL: config.public.apiURL,
          },
          webUrl: config.public.webURL,
          redirect: {
            logout: '/',
            login: '/gated',
          },
        }, $toast),
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $api: Api
  }
}
