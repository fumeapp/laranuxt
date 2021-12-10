import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import Api from '~/lib/api'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { $toast } = useNuxtApp()
  nuxtApp.provide('api',
    new Api({
      req: nuxtApp.ssrContext?.req,
      fetchOptions: {
        baseURL: config.apiURL,
      },
      redirect: {
        logout: '/',
        login: '/home',
      },
    }, $toast),
  )
})

declare module '#app' {
  interface NuxtApp {
    $api: Api
  }
}

