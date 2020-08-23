<template lang="pug">
.container.p-2(class="lg:p-8")
  .mb-8.flex.justify-center.items-center.flex-col.lg_flex-row.w-full
    a(href="https://github.com/acidjazz/laranuxt",target="_new")
      img.w-32.h-32(src="laranuxt.png")
  ul.grid.grid-cols-1.gap-6.bg-gray-100.rounded.p-8.w-full(class="sm:grid-cols-2 lg:grid-cols-3")
    ContactCardSkeleton(v-if="users.length === 0", v-for="i in 9" :key="`skel-${i}`")
    ContactCard(v-if="users.length > 0", v-for="(user, index) in users" :key="index" :user="user")
  .text-center.mt-4
    span provided by endpoint
    span &nbsp;
    a.text-blue-400(:href="`${$config.apiUrl}/example?count=9`") /example
    span &nbsp;
    span.text-gray-400.text-sm (2 second delay)
  .flex.justify-center.my-4
    PushButton.mr-2(@click.native="toast('success')")
      IconToast.w-4.h-4.mr-2
      IconCheck.w-4.h-4(primary="text-green-400", secondary="text-green-300")
    PushButton.mr-2(@click.native="toast('warning')")
      IconToast.w-4.h-4.mr-2
      IconBang.w-4.h-4(primary="text-yellow-400", secondary="text-yellow-300")
    PushButton.mr-2(@click.native="toast('danger')")
      IconToast.w-4.h-4.mr-2
      IconBang.w-4.h-4(primary="text-red-400", secondary="text-red-300")
  .flex.justify-center.my-4
    PushButton.mr-2(@click.native="toastError")
      IconToast.w-4.h-4.mr-2
      span API Error
    PushButton.mr-2(@click.native="toastActions")
      IconToast.w-4.h-4.mr-2
      span Actions
  .flex.justify-center.my-4
    PushButton.mr-2( @click.native="customModal = true")
      span Custom Modal
  ModalBase(v-if="customModal", :destroyed="() => customModal = false")
    .p-6.bg-white.text-center.flex.items-center
      span custom modal using &nbsp;
      LinkButton(href="https://github.com/acidjazz/laranuxt/blob/master/client/components/modals/ModalBase.vue")
        span ModalBase.vue
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
    toast (type) {
      this.$toast.show({
        type,
        timeout: false,
        title: 'This is the title',
        message: 'this is the body of the toast',
      })
    },
    toastActions () {
      this.$toast.show({
        title: 'Toast tile with actions',
        message: 'this is the body of the actionable toast',
        primary: { label: 'Primary', action: () => true },
        secondary: { label: 'Secondary', action: () => true },
        timeout: false,
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
