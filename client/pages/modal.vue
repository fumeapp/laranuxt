<template lang="pug">
.flex.items-center.justify-center.w-screen.h-screen
  .flex.flex-col.justify-center.items-center
    PushButton.mb-2(@click.native="simple") Simple Modal
</template>

<script>
export default {
  methods: {
    simple () {
      this.$modal.show('this is a basic modal')
    },
  },
}
</script>
