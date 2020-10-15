<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col justify-center items-center">
      <PushButton class="mb-2" @click.native="colors">
        <span>Custom Colors</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="simple">
        <span>Keep it simple</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="success">
        <span>Success</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="error">
        <span>Error</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="action">
        <span>Single Action</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="actions">
        <span>Multiple Actions</span>
      </PushButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    colors () {
      this.$toast.show({
        title: 'custom colors',
        message: 'these are custom colors',
        classToast: 'bg-teal-600',
        classTitle: 'text-teal-100',
        classMessage: 'text-teal-200',
        classClose: 'text-teal-300',
        classTimeout: 'bg-teal-800',
      })
    },
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
