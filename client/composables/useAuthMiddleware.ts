import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'

export const useAuthMiddleware = async () => {
  const { $auth } = useNuxtApp()
  const router = useRouter()
  if ($auth.loggedIn.value === false) {
    await router.push({path: $auth.config.redirect.logout})
  }

  watchEffect(async () => {
    if ($auth.loggedIn.value === false)
      await router.push({path: '/'})
  })
}
