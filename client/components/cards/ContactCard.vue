<template lang="pug">
li.col-span-1.bg-white.rounded-lg.shadow
  .w-full.flex.items-center.justify-between.p-6.space-x-6
    .flex-1.truncate
      .flex.items-center.space-x-3
        h3.text-gray-900.text-sm.leading-5.font-medium.truncate {{ user.name }}
        span.flex-shrink-0.inline-block.px-2.text-teal-800.text-xs.leading-4.font-medium.bg-green-100.rounded-full(
          v-if="is_admin" class="py-0.5") Admin
      p.mt-1.text-gray-500.text-sm.leading-5.truncate {{ user.job }}
    img.w-10.h-10.bg-gray-300.rounded-full.flex-shrink-0(:src="user.avatar" alt="avatar")
  .border-t.border-gray-200
    .-mt-px.flex
      .w-0.flex-1.flex.border-r.border-gray-200
        a.relative.-mr-px.w-0.flex-1.inline-flex.items-center.justify-center.py-4.text-sm.leading-5.text-gray-700.font-medium.border.border-transparent.rounded-bl-lg.transition.ease-in-out.duration-150(
          href="#"
          class="hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10")
          IconEnvelope.w-5.h-5
          span.ml-3 Email
      .-ml-px.w-0.flex-1.flex
        a.relative.w-0.flex-1.inline-flex.items-center.justify-center.py-4.text-sm.leading-5.text-gray-700.font-medium.border.border-transparent.rounded-br-lg.transition.ease-in-out.duration-150(
          href="#"
          class="hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10")
          IconPhone.w-5.h-5
          span.ml-3 Call
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    is_admin () { return Math.random() >= 0.5 },
  },
}
</script>
