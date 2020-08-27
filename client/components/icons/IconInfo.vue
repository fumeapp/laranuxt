<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path :class="[secondary, 'fill-current']" d="M20 448h152a20 20 0 0 1 20 20v24a20 20 0 0 1-20 20H20a20 20 0 0 1-20-20v-24a20 20 0 0 1 20-20z" />
    <path :class="[primary, 'fill-current']" d="M96 128a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm28 64H20a20 20 0 0 0-20 20v24a20 20 0 0 0 20 20h28v192h96V212a20 20 0 0 0-20-20z" />
  </svg>
</template>

<script>
import icon from '@/mixins/icon'
export default { mixins: [icon] }
</script>
