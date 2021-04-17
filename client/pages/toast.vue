<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col justify-center items-center">
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
      <PushButton class="mb-2" @click.native="actionColors">
        <span>Single Action - red cta</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="actions">
        <span>Multiple Actions</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="actionsColors">
        <span>Multiple Actions - custom colors</span>
      </PushButton>
      <PushButton class="mb-2" @click.native="colors">
        <span>Custom Colors</span>
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
        classToast: 'bg-indigo-600',
        classTitle: 'text-indigo-100',
        classMessage: 'text-indigo-200',
        classClose: 'text-indigo-300',
        classTimeout: 'bg-indigo-800',
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
    actionColors () {
      this.$toast.show({
        message: 'Single action toast',
        primary: { label: 'UNDO', action: () => alert('undone') },
        timeout: false,
        classSingle: 'text-red-400 hover:text-red-500',
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
    actionsColors () {
      this.$toast.show({
        title: 'Toast with actions',
        message: 'This toast has multiple actions',
        primary: { label: 'Primary', action: () => alert('primary') },
        secondary: { label: 'Secondary', action: () => alert('secondary') },
        classPrimary: 'text-green-600 hover:text-green-700',
        classSecondary: 'text-indigo-600 hover:text-indigo-700',
        timeout: false,
      })
    },
    async toastError () {
      await this.$axios.get('/error')
    },
  },
}
</script>
