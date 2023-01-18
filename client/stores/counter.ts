import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      const { $toast } = useNuxtApp()
      $toast.show({
          type: 'info',
          message: 'This is a toast message',
          timeout: 12,
      })

      this.count++
    },
  },
})
