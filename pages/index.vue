<template lang="pug">
  .container.p-2.lg_p-8
    .m-8.flex.justify-center.items-center.flex-col.lg_flex-row
      a(href="https://github.com/acidjazz/laranuxt",target="_new")
        img.w-32.h-32(src="laranuxt.png")
    UserSkeleton(v-if="users.length < 1")
    UserList(v-else, :users="users")
    .text-center
      span provided by endpoint
      span &nbsp;
      a.text-blue-400(href="http://localhost:8000/example") /example
    .flex.justify-center.m-4
      PushButton.mr-2(label="Random Toast", @click.native="toastRandom")
      PushButton.mr-2(label="Endpoint Error", @click.native="toastError")
      PushButton.mr-2(label="Global Modal", @click.native="showModal")
      PushButton(label="Custom Modal", @click.native="customModal = true")
    ModalBase(v-if="customModal", :destroy="() => customModal = false")
      .p-6.bg-white
        span this is a test
</template>

<script>
export default {
  data () {
    return {
      users: [],
      customModal: false,
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    async get () {
      this.users = (await this.$axios.get('example')).data.data
    },
    toastRandom () {
      const types = ['info', 'danger', 'warning', 'success']
      this.$toast.show({
        type: types[Math.floor(Math.random() * types.length)],
        message: 'random toast',
      })
    },
    async toastError () {
      await this.$axios.get('/error')
    },
    showModal () {
      this.$modal.show({
        body: 'test modal with actions',
        actions: [
          { name: 'Confirm', action: () => this.$toast.show('confirmed') },
          { name: 'Cancel', action: () => this.$toast.show('canceled') },
        ],
      })
    },
  },
}
</script>
