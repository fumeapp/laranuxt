<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path :class="[secondary, 'fill-current']" d="M96 512a80 80 0 1 1 80-80 80.09 80.09 0 0 1-80 80z" />
    <path :class="[primary, 'fill-current']" d="M49.22 0h93.56a24 24 0 0 1 24 25.2l-13.63 272a24 24 0 0 1-24 22.8H62.84a24 24 0 0 1-24-22.8l-13.59-272A24 24 0 0 1 49.22 0z" />
  </svg>
</template>

<script>
import icon from '@/mixins/icon'
export default { mixins: [icon] }
</script>
