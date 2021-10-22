<template>
  <push-button size="xs" @click="mode">
    <span
      id="darkModeButton"
      class="w-6 h-6"
    />
  </push-button>
</template>
<script lang="ts" setup>
import { AnimationItem } from 'lottie-web'
const ctx = useContext()
let darkMode = undefined as undefined|AnimationItem
const isDark = computed(() => ctx.$colorMode.preference === 'dark')
onMounted(async () => {
  await ctx.$sleep(200)
  if (!process.browser || !window.lottie) return
  darkMode = window.lottie.loadAnimation({
    container: document.getElementById('darkModeButton') as HTMLElement,
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
    await ctx.$sleep(400)
    ctx.$colorMode.preference = 'light'
  } else {
    darkMode?.playSegments([0, 114], true)
    await ctx.$sleep(400)
    ctx.$colorMode.preference = 'dark'
  }
}
</script>
