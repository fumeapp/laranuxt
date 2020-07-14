<template lang="pug">
.flex.flex-wrap.-p-4
  .w-full.lg_w-1_3.p-4(v-for="(user, index) in users")
    .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg
      .flex
        img(:src="user.avatar").rounded-full.w-20.h-20.m-2.bg-gray-600.ani-fi.ani-d-1
        .text.ml-2.mt-2.truncate
          .text-lg.mb-1.ani-fi {{ user.name }}
          .text-gray-600.mb-1.ani-fi.ani-d-1
            i.mdi.mdi-email.mr-1
            span {{ user.email }}
          .text-gray-600.mb-1.ani-fi.ani-d-2
            i.mdi.mdi-phone.mr-1
            span {{ user.phone }}
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
}
</script>
