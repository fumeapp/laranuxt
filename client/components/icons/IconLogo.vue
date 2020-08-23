<template lang="pug">
svg#Logo(xmlns='http://www.w3.org/2000/svg', viewBox='0 0 576 512')
  path.logo-primary(d='M192 0h-64a32 32 0 0 0-32 32v352a32 32 0 0 0 32 32h64a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zm304 384h-32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128h-32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM368 384h-32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128h-32a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z')
  path.logo-secondary(d='M528 32H256v352a64.07 64.07 0 0 1-64 64h-64a64.07 64.07 0 0 1-64-64V32H48A48 48 0 0 0 0 80v384a48 48 0 0 0 48 48h480a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zM384 432a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm128 128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-128a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zm0-112H320V96h192z')
</template>

<style lang="stylus">
.logo-primary
  @apply text-orange-400 fill-current
  // animation logo-animated 0.5s ease-in-out infinite
.logo-secondary
  @apply text-orange-500 fill-current
@keyframes logo-animated
  0%
    @apply text-orange-500
  50%
    @apply text-white
</style>
