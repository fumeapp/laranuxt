<template lang="pug">
transition(name="animodal")
  .fixed.inset-0.z-20(v-if="active")
    .absolute.inset-0.bg-black-o7(@click="destroy")
    .flex.flex-col.items-center.justify-center.w-screen.h-screen
      .relative.animodal-inner
        .rounded.bg-white.overflow-hidden
          slot
    .animodal-inner.absolute.top-0.right-0.cursor-pointer(@click="destroy")
      .text-white.text-lg.p-6
        i.mdi.mdi-close
</template>

<style lang="stylus">
.animodal-enter-active, .animodal-leave-active
  transition opacity 0.2s ease 0s

.animodal-enter-active .animodal-inner, .animodal-leave-active .animodal-inner
  transition transform 0.3s ease 0.1s, opacity 0.2s ease 0.1s

.animodal-enter-active, .animodal-leave-active
  .modal-close
    transition transform 0.2s ease 0.2s, opacity 0.2s ease 0.2s

.animodal-leave-active .animodal-inner
  transition transform 0.2s ease 0s, opacity 0.2s ease 0s

.animodal-enter, .animodal-leave-to
  opacity 0
  .animodal-inner
    transform scale(0.95)
    opacity 0
  .modal-close
    opacity 0
    transform scale(0.95)
</style>

<script>
export default {
  props: {
    destroy: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {
      active: false,
    }
  },
  async mounted () {
    await this.$sleep(20)
    this.active = true
  },
}
</script>
