<template lang="pug">
#page
  .title this is a test
  pre {{ api }}
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
      this.api = (await this.$axios.get('test')).data.data
    }
  },

}
</script>

<style>
</style>
