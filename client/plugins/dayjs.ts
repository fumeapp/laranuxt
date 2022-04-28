import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime)
  return { provide: { dayjs } }
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: typeof dayjs
 }
}
