import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const { $api } = useNuxtApp()
  window.Pusher = Pusher
  const setEcho = () => {
    if (!$api.token.value) return
    const echo = new Echo({
      broadcaster: 'pusher',
      key: config.pusherAppKey,
      cluster: 'mt1',
      authEndpoint: `${config.apiURL}/broadcasting/auth`,
      forceTls: true,
      encrypted: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ` + $api.token.value,
        },
      },
    })
    nuxtApp.provide('echo', echo)
  }
  if ($api.token.value) setEcho()
  else $api.callback = setEcho

})

declare module '#app' {
  interface NuxtApp {
    $echo: typeof Echo
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $echo: typeof Echo
  }
}
