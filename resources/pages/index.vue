<template lang="pug">
#page
  .container
    section.section
      .buttons.is-centered
        .button
          span this is a test
          span.icon: i.mdi.mdi-account-box
        .button.is-primary
          span this is a test
          span.icon: i.mdi.mdi-account-box
        .button
          span this is a test
          span.icon: i.mdi.mdi-account-box
      pre.code {{ api }}
</template>

<script>
export default {

  data () {
    return {
      api: [],
    }
  },

  created () {
    this.get()
  },

  methods: {
    async get () {
      this.api = (await this.$axios.get('example')).data.data
    }
  },

}
</script>
