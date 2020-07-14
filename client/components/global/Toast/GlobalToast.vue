<template lang="pug">
transition(name="anitoast")
  .toast.border.border-gray-300.bg-gray-200.relative.p-4.shadow-lg.text-white.rounded.overflow-hidden.mb-4(
    :key="message",
    v-if="active")
    .absolute.left-0.bottom-0.h-2.bg-gray-300(
      v-if="delay",
      :style="`width: ${timeLeftPercent}%`")
    button.delete.absolute.top-0.right-0.mt-1.mr-2.text-black-o8.hover_text-black
      .mdi.mdi-close(@click="destroy")
    .flex.flex-row.items-center
      i.mdi.mdi.mdi-24px(:class="`${color} mdi-${icon}`")
      .body.ani-sil.ani-d-3.px-4.text-black(v-html="message")
</template>

<style lang="stylus">
#toasts
  display flex
  flex-flow column
  flex-direction column-reverse
  position fixed
  top 30px
  right 30px
  z-index 60
  min-width 200px
  .toast
    min-width 240px
    transition all 0.3s ease
    .delete
      opacity 0
      transition opacity 0.2s ease-in
    &:hover .delete
      opacity 1

@media all and (min-width: 1px) and (max-width: 1000px)
  #toasts
    width calc(100% - 60px)
    .notification .delete
      opacity 1

.anitoast-enter-active, .anitoast-leave-active, .anitoast-move
  transition transform 0.6s ease

.anitoast-enter, .anitoast-leave-to
  opacity 0
  transform translate(40px, 0)
</style>

<script>
import { removeElement } from '@/plugins/utils.js'
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: 'Please specify a <b>message</b>',
    },
    type: {
      type: String,
      required: false,
      validate: (type) => { return ['success', 'info', 'danger', 'warning', 'ChatMessage'].includes(type) },
      default: '',
    },
    delay: {
      type: [Boolean, Number],
      required: false,
      default: 2,
    },
  },

  data () {
    return {
      active: false,
      timeout: false,
      interval: false,
      timeLeft: false,
      speed: 10,
    }
  },

  computed: {
    icon () {
      switch (this.type) {
        case 'success' :
          return 'check-bold'
        case 'danger' :
          return 'alert-circle'
        case 'warning' :
          return 'alert'
        default :
          return 'information-variant'
      }
    },

    color () {
      switch (this.type) {
        case 'danger' :
          return 'text-red-300'
        case 'warning' :
          return 'text-yellow-400'
        case 'success' :
          return 'text-green-700'
        default :
          return 'text-black-o8'
      }
    },

    timeLeftPercent () {
      return Math.round(((this.timeLeft * 100 / (this.delay * 1000)) * 100) / 100)
    },

  },

  mounted () {
    if (this.notify)
      this.type = 'white'

    this.active = true
    if (this.delay > 0) {
      this.timeLeft = (this.delay * 1000)
      this.interval = setInterval(() => this.updateTime(), this.speed)
    }
  },

  methods: {
    updateTime () {
      this.timeLeft -= this.speed
      if (this.timeLeft === 0)
        this.destroy()
    },
    destroy () {
      this.active = false
      clearInterval(this.interval)
      setTimeout(() => {
        this.$destroy()
        removeElement(this.$el)
      }, 1000)
    },
  },
}
</script>
