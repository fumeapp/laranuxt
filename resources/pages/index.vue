<template lang="pug">
.container.p-2.lg_p-8
  .m-8.text-5xl.flex.justify-center
    a(href="https://github.com/acidjazz/laranuxt",target="_new")
      img.w-32.h-32(src="/laranuxt.png")
  .flex.flex-wrap.-p-4
    .w-full.lg_w-1_3.p-4(v-for="user, index in users")
      .p-2.border.border-gray.rounded.shadow.tran-shadow.hover_shadow-lg.ani-sil(:class="`ani-d-${index}`")
        .flex
          img(:src="user.avatar").rounded-full.w-20.h-20.m-2.bg-gray-600.ani-sil.ani-d-1
          .text.ml-2.mt-2.ani-sil.ani-d-2.truncate
            .text-lg {{ user.name }}
            .text-gray-600 {{ user.email }}
            .text-gray-600 {{ user.phone }}
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
