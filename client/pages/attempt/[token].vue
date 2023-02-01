<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const api = useApi()
const { sleep } = useUtils()
const { $toast } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const verify = async () => {
  try {
    const redirect = await api.login(await api.attempt(route.params.token))
    await sleep(400)
    await router.push(redirect as RouteLocationRaw)
  }
  catch (error) {
    $toast.show({
      message: 'Invalid or expired token.',
      type: 'danger',
    })
    await router.push('/')
  }
}

definePageMeta({
  auth: false,
  middleware: 'guest',
  title: 'Authenticating..',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
})

if (getCurrentInstance())
  onMounted(verify)
</script>

<script lang="ts">
export default { layout: 'public' }
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <icon icon="eos-icons:loading" class="w-12 h-12" />
  </div>
</template>
