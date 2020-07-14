<template lang="pug">
  .container.p-2.lg_p-8
    .m-8.flex.justify-center.items-center.flex-col.lg_flex-row
      a(href="https://github.com/acidjazz/laranuxt",target="_new")
        img.w-32.h-32(src="laranuxt.png")
    .flex.flex-row.justify-end.items-center
      span.mr-2 Result Count
      PushButton.mr-1(label="9", @click="total(9)", :active="count === 9")
      PushButton.mr-1(label="12", @click="total(12)", :active="count === 12")
      PushButton(label="27", @click="total(29)", :active="count === 27")
    UserSkeleton(v-if="users.length < 1")
    UserList(v-else, :users="users")
    .text-center
      span provided by endpoint
      span &nbsp;
      a.text-blue-400(href="http://localhost:8000/example?count=9") /example
      span &nbsp;
      span.text-gray-400.text-sm (2 second delay)
    .flex.justify-center.m-4
      PushButton.mr-2(label="Random Toast", @click.native="toastRandom")
      PushButton.mr-2(label="Endpoint Error", @click.native="toastError")
      PushButton.mr-2(label="Global Modal", @click.native="showModal")
      PushButton(label="Custom Modal", @click.native="customModal = true")
    ModalBase(v-if="customModal", :destroy="() => customModal = false")
      .p-6.bg-white
        span custom modal using &nbsp;
        a.underline(
          target="_new",
          href="https://github.com/acidjazz/laranuxt/blob/master/components/modals/ModalBase.vue"
          ) ModalBase
</template>

<script>
export default {
  data () {
    return {
      users: [],
      customModal: false,
      count: 9,
    }
  },
  mounted () {
    this.get(this.count)
  },
  methods: {
    async get (count) {
      this.users = (await this.$axios.get('example', { params: { count } })).data.data
    },
    total (count) {
      this.users = []
      this.count = count
      this.get(this.count)
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
