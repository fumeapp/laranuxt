<template>
  <button
    class="text-white flex items-center justify-center rounded-full"
    @click="toggle"
  >
    <span id="darkModeIcon" class="w-8 h-8" />
  </button>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { getCurrentInstance, onMounted } from 'vue'
import { AnimationItem } from 'lottie-web'

const isDark = useDark()
const toggleDark = useToggle((isDark))

let animation:undefined|AnimationItem = undefined

if (getCurrentInstance() && process.client && window)
  onMounted(() => {
    if (!process.client || !window.lottie) return
    animation = window.lottie.loadAnimation({
      container: document.getElementById('darkModeIcon'),
      path: '/json/darkMode.json',
      loop: false,
      autoplay: false,
    })

    if (isDark.value === true) animation.goToAndStop(114, true)
    else animation.goToAndStop(0, true)
  })

const toggle = () => {
  if (isDark.value === true)animation.playSegments([160, 228], true)
  else animation.playSegments([0, 114], true)
  setTimeout(toggleDark, 200)
}
</script>
