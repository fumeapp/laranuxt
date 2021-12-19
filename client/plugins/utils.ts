import Utils from '~/lib/utils'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('utils', new Utils())
})

declare module '#app' {
  interface NuxtApp {
    $utils: typeof Utils
 }
}
