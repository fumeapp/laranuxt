<template lang="pug">
.flex.items-center.justify-center.w-screen.h-screen
  .flex.flex-col.justify-center.items-center
    PushButton.mb-2(@click.native="simple")
      span Keep it simple
    PushButton.mb-2(@click.native="success")
      span Success
    PushButton.mb-2(@click.native="error")
      span Error
    PushButton.mb-2(@click.native="action")
      span Single Action

</template>

<script>
export default {
  methods: {
    simple () {
      this.$toast.show('Keeping it simple')
    },
    success () {
      this.$toast.show({
        type: 'success',
        title: 'Success',
        message: 'This is a successful toast',
      })
    },
    error () {
      this.$toast.show({
        type: 'danger',
        title: 'Error',
        message: 'Please specify an e-mail address',
      })
    },
    action () {
      this.$toast.show({
        message: 'Single action toast',
        primary: { label: 'UNDO', action: () => alert('undone') },
        timeout: 6,
      })
    },
    actions () {
      this.$toast.show({
        title: 'Toast with actions',
        message: 'This toast has multiple actions',
        primary: { label: 'Primary', action: () => alert('primary') },
        secondary: { label: 'Secondary', action: () => alert('secondary') },
        timeout: false,
      })
    },
    async toastError () {
      await this.$axios.get('/error')
    },
  },
}
</script>
