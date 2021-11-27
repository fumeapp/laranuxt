import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  nuxtApp.provide('dayjs', dayjs)
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs
 }
}
