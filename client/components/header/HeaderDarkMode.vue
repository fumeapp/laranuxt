<template>
  <button
    class="text-white flex items-center justify-center p-0.5 rounded-full"
    @click="toggle"
  >
    <span class="w-8 h-8" id="darkModeIcon" />
  </button>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { AnimationItem } from 'lottie-web'
import { useNuxtApp } from '#app'
import { onMounted } from '@vue/runtime-core'
const isDark = useDark()
const toggleDark = useToggle((isDark))
const { $lottie } = useNuxtApp()

let animation:undefined|AnimationItem = undefined

onMounted(() => {
  animation = $lottie.loadAnimation({
    container: document.getElementById('darkModeIcon'),
    path: '/json/darkMode.json',
    loop: false,
    autoplay: false,
  })

  if (isDark.value === true) animation.goToAndStop(114, true)
  else animation.goToAndStop(0, true)
})

const toggle = () => {
  toggleDark()
  setTimeout(() => {
    animation.setSpeed(10000)
    if (isDark.value === true) animation.goToAndStop(114, true)
    else animation.goToAndStop(0, true)
  }, 200)
}
</script>
