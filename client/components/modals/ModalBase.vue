<template lang="pug">
#ModalBase.fixed.z-10.inset-0.overflow-y-auto
  .flex.items-end.justify-center.min-h-screen.pt-4.px-4.pb-20.text-center(class="sm:block sm:p-0")
    transition(
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0")
      .fixed.inset-0.transition-opacity(v-if="active", @click="destroy")
        .absolute.inset-0.bg-black.opacity-75
        .fixed.top-0.right-0.p-3
          .p-3.cursor-pointer.rounded-full.transition.ease-in-out.duration-150(
            class="hover:bg-gray-800")
            IconTimes.w-6.h-6(primary="text-gray-200", secondary="text-gray-300")
    span.hidden(class="sm:inline-block sm:align-middle sm:h-screen") &nbsp;
    transition(
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95")
      .inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all(
        class="sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        v-if="active",
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline")
        slot
</template>

<script>
export default {
  props: {
    destroyed: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {
      active: false,
    }
  },
  mounted () {
    this.active = true
  },
  methods: {
    async destroy () {
      this.active = false
      await this.$sleep(200)
      this.destroyed()
    },
  },
}
</script>
