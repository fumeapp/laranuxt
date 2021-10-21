<template>
  <div>
    <push-button
      class="flex items-center justify-center"
      @click="show"
    >
      <icon v-if="authed === null" icon="gg:spinner-two" class="w-5 h-5 text-indigo-500 animate-spin" />
      <icon v-else-if="authed === false" icon="mdi:login" class="w-5 h-5 text-indigo-600" />
      <icon v-else-if="authed === true" icon="mdi:home" class="w-5 h-5 text-indigo-500" />
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
