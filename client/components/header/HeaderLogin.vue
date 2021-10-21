<template>
  <div>
    <push-button
      class="w-full lg:w-20 justify-center"
      @click="show"
    >
      <div
        v-if="authed === null"
        key="waiting"
      >
        <span data-icon="eos-icons:loading" class="iconify w-5 h-5 text-red-500" />
      </div>
      <div
        v-else-if="authed === false"
        key="login"
      >
        Log In
      </div>
      <div
        v-else-if="authed === true"
        key="user"
      >
        <span
          data-icon="mdi:home"
          class="iconify w-5 h-5 text-green-500"
        />
      </div>
    </push-button>
    <modal-base v-if="modal" ref="modal" :destroyed="off">
      <modal-login @off="off" />
    </modal-base>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from '@nuxtjs/composition-api'
const ctx = useContext()
const authed = ref(null) as Ref<null|boolean>
const modal = ref(false)
const loggedIn = computed((): boolean => ctx.$auth.loggedIn)
watch(loggedIn, (after) => { authed.value = after })
onMounted(async () => {
  await ctx.$sleep(200)
  authed.value = ctx.$auth.loggedIn
})
function show (): void {
  if (authed.value) ctx.app.router?.push('/home')
  else modal.value = true
}
function off (): void {
  modal.value = false
}
</script>
