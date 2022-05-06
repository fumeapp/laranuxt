import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const { $api } = useNuxtApp()

  window.Pusher = Pusher
  return {
    provide: {
      echo: new Echo({
        broadcaster: 'pusher',
        key: config.pusherAppKey,
        cluster: config.pusherAppCluster,
        authEndpoint: `${config.apiURL}/broadcasting/auth`,
        forceTls: true,
        encrypted: true,
        auth: {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ` + $api.token.value,
          },
        },
      }),
    },
  }
})


declare module '#app' {
  interface NuxtApp {
    $echo: Echo
  }
}
