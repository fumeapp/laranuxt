<template lang="pug">
.flex.flex-wrap.-p-4
  .w-full.lg_w-1_3.p-4(v-for="i in 9")
    .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg
      .flex
        .rounded-full.w-20.h-20.m-2.skeleton
        .text.ml-2.mt-2.truncate
          .skeleton.text-lg.mb-1.w-20 &nbsp;
          .skeleton.mb-1.w-32 &nbsp;
          .skeleton.mb-1.w-40 &nbsp;
</template>

<style lang="stylus">
  .skeleton
    background-image linear-gradient(100deg, #edf2f7 0%, #f4f7fa 20%, #edf2f7 40%)
    background-size 200%
    animation skeleton 2s infinite ease-out
    for i in 1..40
      &.skeleton-d-{i}
        animation-delay unit(0.02 * i, 's')
  @keyframes skeleton
    0%
      background-position 50%
    50%, 100%
      background-position -90%
</style>
