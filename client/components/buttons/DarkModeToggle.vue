<template>
  <push-button @click="mode" size="xs">
    <span
      id="darkModeButton"
      class="w-9 h-9"
    />
  </push-button>
</template>
<script lang="ts" setup>
import { AnimationItem } from 'lottie-web'
const ctx = useContext()
const darkMode = undefined as undefined|AnimationItem
const isDark = computed(() => ctx.$colorMode.preference === 'dark')
onMounted(() => {
  if (!process.browser || !window.lottie) return
  const span = document.getElementById('darkModeButton')
  const darkMode = window.lottie.loadAnimation({
    span,
    renderer: 'svg',
    path: '/json/darkMode.json',
    loop: false,
    autoplay: false,
  })
  if (isDark) darkMode.goToAndStop(114, true)
  else darkMode.goToAndStop(0, true)
})

async function mode (): Promise<void> {
  if (ctx.$colorMode.preference === 'dark') {
    darkMode?.playSegments([160, 228], true)
    ctx.$colorMode.preference = 'light'
  } else {
    darkMode?.playSegments([0, 114], true)
    ctx.$colorMode.preference = 'dark'
  }
}
</script>
