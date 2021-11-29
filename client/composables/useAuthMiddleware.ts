import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'

export const useAuthMiddleware = async () => {
  const { $api } = useNuxtApp()
  const router = useRouter()
  if ($api.loggedIn.value === false)
    await router.push({path: $api.config.redirect.logout})

  watchEffect(async () => {
    if ($api.loggedIn.value === false)
      await router.push({path: $api.config.redirect.logout})
  })
}
