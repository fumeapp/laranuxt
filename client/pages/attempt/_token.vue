<template>
  <div />
</template>
<script lang="ts" setup>
const { $axios, $toast, $auth, app, $sleep } = useContext()

const route = useRoute()

onMounted(async () => await verify())

async function verify () {
  const token = route.value.params.token
  let result

  try {
    result = (await $axios.post('/login', { token })).data.data
  } catch (error) {
    app.router?.push('/')
  }

  $auth.$storage.setCookie('token', result.token)
  await $auth.setUserToken(result.token)
  $auth.setUser(result.user)

  $toast.show({ type: 'success', message: 'Login Successful', timeout: 1 })
  await $sleep(400)
  await app.router?.push('/home')
}
</script>

<script lang="ts">
export default {
  layout: 'loading',
  auth: false,
  head () {
    return {
      title: 'One Time Email Attempt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'email-attempt',
          name: 'email-attempt',
          content: 'Email Authentication attempt',
        },
      ],
    }
  },
}
</script>
