<template lang="pug">
.flex.flex-wrap.-p-4
  .w-full.lg_w-1_3.p-4(v-for="i in 9")
    .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg
      .flex
        .rounded-full.w-20.h-20.m-2.bg-gray-100
        .text.ml-2.mt-2.truncate
          .text-lg.bg-gray-100.mb-1.w-20 &nbsp;
          .bg-gray-100.mb-1.w-32 &nbsp;
          .bg-gray-100.mb-1.w-40 &nbsp;
</template>
