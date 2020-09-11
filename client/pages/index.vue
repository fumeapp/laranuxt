<template>
  <div class="container p-2 lg:p-8 flex flex-col">
    <div class="m-8 flex items-center justify-center">
      <Logo />
    </div>
    <ul v-if="users.length === 0" class="grid grid-cols-1 gap-6 bg-gray-100 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <ContactCardSkeleton v-for="i in 9" :key="`skel-${i}`" />
    </ul>
    <ul v-if="users.length &gt; 0" class="grid grid-cols-1 gap-6 bg-gray-100 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <ContactCard v-for="(user, index) in users" :key="index" :user="user" />
    </ul>
    <div class="text-center mt-4">
      <span>provided by endpoint</span><span>&nbsp;</span>
      <a class="text-blue-400" :href="`${$config.apiUrl}/example?count=9`">/example</a>
      <span>&nbsp;</span>
      <span class="text-gray-400 text-sm">(2 second delay)</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      count: 9,
    }
  },
  mounted () {
    this.get(this.count)
  },
  methods: {
    async get (count) {
      await this.$sleep(2000)
      this.users = (await this.$axios.get('example', { params: { count } })).data.data
    },
    total (count) {
      this.users = []
      this.count = count
      this.get(this.count)
    },
  },
}
</script>
