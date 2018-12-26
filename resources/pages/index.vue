<template lang="pug">
#Examples.page
  .container
    section.section
      .buttons
        .button(@click="modal_open")
          span.icon
            i.mdi.mdi-window-open
          span Modal
    section.section
      .subtitle API driven user list
      .columns.is-multiline
        .column.is-one-third(v-for="user in users")
          UserCard(:user="user")
  ModalExample(v-if="is_modal",:close="modal_close")
</template>

<script>
import UserCard from '@/components/UserCard'
import ModalExample from '@/components/ModalExample'
export default {

  components: { UserCard, ModalExample },

  data () {
    return {
      users: [],
      is_modal: false,
    }
  },

  created () {
    this.get()
  },

  methods: {
    async get () {
      this.users = (await this.$axios.get('example')).data.data
    },
    modal_open () {
      this.is_modal = true
    },
    modal_close () {
      this.is_modal = false
    },
  },
}
</script>
