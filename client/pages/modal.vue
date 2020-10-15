<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col justify-center items-center">
      <PushButton class="mb-2" @click="simple">
        type: success
      </PushButton>
      <PushButton class="mb-2" @click="danger">
        type: danger
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
    danger () {
      this.$modal.show({
        type: 'danger',
        title: 'This is the title property',
        body: 'This is the body property.  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam.',
        primary: {
          label: 'Primary Action',
          theme: 'red',
          action: () => this.$toast.success('Primary Button clicked'),
        },
        secondary: {
          label: 'Secondary Button',
          theme: 'white',
          action: () => this.$toast.info('Clicked Secondary'),
        },
      })
    },
  },
}
</script>
