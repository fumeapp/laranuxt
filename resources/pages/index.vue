<template lang="pug">
#Examples.page
  .container
    section.section
      .buttons
        .button(@click="modal(false)")
          span.icon: i.mdi.mdi-window-open
          span Modal
        .button(@click="modal(true)")
          span.icon: i.mdi.mdi-window-open
          span Modal with title
        .button(@click="toast(false)")
          span.icon: i.mdi.mdi-toaster-oven
          span Default Toast
        .button(@click="toast(true)")
          span.icon: i.mdi.mdi-toaster-oven
          span Random classed Toast
      .level
        .level-left
          .level-item from endpoint
          .level-item: a.button.is-text(href="/api/example") /api/example
      .columns.is-multiline
        .column.is-one-third(v-for="user in users")
          UserCard(:user="user")
</template>

<script>
import UserCard from '@/components/UserCard'
import ModalExample from '@/components/ModalExample'
export default {

  components: { UserCard, ModalExample },

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
    },
    modal (title=false) {
      console.log(title)
      this.$modal.show({
        title:  title ? 'this is the title ' : false,
        body: 'this is the body of the modal',
        buttons: [
          {name: 'OK', class: 'is-primary'},
          {name: 'Cancel'},
          ],
      })
    },
    toast (random=false) {
      if (!random) {
        this.$toast.show('This is a normal toast')
      } else {
        let types = ['default','success','info','danger']
        let type = types[Math.floor(Math.random() * types.length)]
        this.$toast.show({
          type: type,
          message: `this toast is type ${type}`})
      }
    },
  },
}
</script>
