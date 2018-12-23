<template lang="pug">
#Users.page
  .container
    section.section
      .columns.is-multiline
        .column.is-one-third(v-for="user in users")
          UserCard(:user="user")
</template>

<script>
import UserCard from '@/components/UserCard'
export default {

  components: { UserCard },

  data () {
    return {
      users: [],
    }
  },

  created () {
    this.get()
  },

  methods: {
    async get () {
      this.users = (await this.$axios.get('example')).data.data
    }
  },

}
</script>
