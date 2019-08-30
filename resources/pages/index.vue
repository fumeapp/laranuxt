<template lang="pug">
.container.p-2.lg_p-8
  .m-8.text-5xl.flex.justify-center
    a(href="https://github.com/acidjazz/laranuxt",target="_new")
      img.w-32.h-32(src="/laranuxt.png")
  .flex.flex-wrap.-p-4(v-if="users.length < 1")
    .w-full.lg_w-1_3.p-4(v-for="i in 9")
      .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg
        .flex
          .rounded-full.w-20.h-20.m-2.bg-gray-100
          .text.ml-2.mt-2.truncate
            .text-lg.bg-gray-100.mb-1.w-20 &nbsp;
            .bg-gray-100.mb-1.w-32 &nbsp;
            .bg-gray-100.mb-1.w-40 &nbsp;
  .flex.flex-wrap.-p-4(v-else)
    .w-full.lg_w-1_3.p-4(v-for="user, index in users")
      .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg
        .flex
          img(:src="user.avatar").rounded-full.w-20.h-20.m-2.bg-gray-600.ani-fi.ani-d-1
          .text.ml-2.mt-2.truncate
            .text-lg.mb-1.ani-fi {{ user.name }}
            .text-gray-600.mb-1.ani-fi.ani-d-1 {{ user.email }}
            .text-gray-600.mb-1.ani-fi.ani-d-2 {{ user.phone }}
  .text-center
    span provided by endpoint
    span &nbsp;
    a.text-blue-400(href="http://localhost:8000/api/example") /api/example
</template>

<script>
export default {
  data () {
    return {
      users: [],
    }
  },
  mounted () {
    console.log('fireing')
    this.get()
  },
  methods: {
    async get () {
      this.users = (await this.$axios.get('example')).data.data
    },
  },
}
</script>
