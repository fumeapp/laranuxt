import Lottie from 'lottie-web'
import { defineNuxtPlugin } from '#app'
import { LottiePlayer } from 'lottie-web'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('lottie', Lottie)
})

declare module '#app' {
  interface NuxtApp {
    $lottie: LottiePlayer
  }
}
