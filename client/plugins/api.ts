import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import Api from '~/lib/api'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const { $toast } = useNuxtApp()
  const api = new Api({
    req: nuxtApp.ssrContext?.req,
    res: nuxtApp.ssrContext?.res,
    fetchOptions: {
      baseURL: config.apiURL,
    },
    redirect: {
      logout: '/',
      login: '/home',
    },
  }, $toast)
  await api.checkUser()
  nuxtApp.provide('api', api)
})

declare module '#app' {
  interface NuxtApp {
    $api: Api
  }
}
