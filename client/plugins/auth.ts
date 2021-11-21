import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import Auth from '@/lib/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  nuxtApp.provide('auth', new Auth({
    req: nuxtApp.ssrContext?.req,
    res: nuxtApp.ssrContext?.res,
    fetchOptions: {
      baseURL: config.apiURL
    }
  }))
})
