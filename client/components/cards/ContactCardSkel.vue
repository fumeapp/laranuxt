<template lang="pug">
  li.col-span-1.bg-white.rounded-lg.shadow
    .w-full.flex.items-center.justify-between.p-6.space-x-6
      .flex-1.truncate
        .flex.items-center.space-x-3
          h3.text-gray-900.text-sm.leading-5.font-medium.truncate.skeleton.w-32 &nbsp;
        p.mt-1.text-gray-500.text-sm.leading-5.truncate.skeleton.w-36 &nbsp;
      .w-10.h-10.rounded-full.flex-shrink-0.overflow-hidden.skeleton
    .border-t.border-gray-200
      .-mt-px.flex
        .w-0.flex-1.flex.border-r.border-gray-200
          a.relative.-mr-px.w-0.flex-1.inline-flex.items-center.justify-center.py-4.text-sm.leading-5.text-gray-700.font-medium.border.border-transparent.rounded-bl-lg.transition.ease-in-out.duration-150(
            href="#"
            class="hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10")
            .skeleton.w-20.h-full &nbsp;
        .-ml-px.w-0.flex-1.flex
          a.relative.w-0.flex-1.inline-flex.items-center.justify-center.py-4.text-sm.leading-5.text-gray-700.font-medium.border.border-transparent.rounded-br-lg.transition.ease-in-out.duration-150(
            href="#"
            class="hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10")
            .skeleton.w-20.h-full &nbsp;
</template>

<style lang="stylus">
.skeleton
  @apply text-opacity-0
  background-image linear-gradient(100deg, #edf2f7 0%, #f4f7fa 20%, #edf2f7 40%)
  background-position 50%
  background-size 200%
  animation skeleton 1.5s infinite linear
@keyframes skeleton
  0%
    background-position 50%
  50%, 100%
    background-position -90%
</style>
