<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col justify-center items-center">
      <PushButton class="mb-2" @click="simple">
        type: success
      </PushButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    simple () {
      this.$modal.show({
        type: 'success',
        title: 'Successful Modal',
        body: 'This is the body property.',
        primary: {
          label: 'OK',
          theme: 'white',
          action: () => this.$toast.success('Primary Button clicked'),
        },
      })
    },
  },
}
</script>
