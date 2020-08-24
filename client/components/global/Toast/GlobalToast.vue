<template lang="pug">
transition(
  enter-active-class="transform ease-out duration-300 transition"
  enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
  enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
  leave-active-class="transition ease-in duration-100"
  leave-class="opacity-100"
  leave-to-class="opacity-0")
  .max-w-sm.w-full.bg-white.shadow-lg.rounded-lg.pointer-events-auto.relative.mb-4(
    v-if="active && primary === false")
    .absolute.left-0.bottom-0.h-1(
      v-if="timeout",
      :style="`width: ${timeLeftPercent}%`")
    .rounded-lg.shadow-xs.overflow-hidden.bg-white.z-100
      .p-4
        .flex.items-start
          .flex-shrink-0
            .border-2.border-green-200.rounded-full.p-1(v-if="type === 'success'")
              IconCheck.w-3.h-3(primary="text-green-400", secondary="text-green-300")
            .border-2.border-red-200.rounded-full.p-1(v-if="type === 'danger'")
              IconBang.w-3.h-3(primary="text-red-400", secondary="text-red-300")
            .border-2.border-yellow-200.rounded-full.p-1(v-if="type === 'warning'")
              IconBang.w-3.h-3(primary="text-yellow-400", secondary="text-yellow-300")
          .ml-3.w-0.flex-1(class="pt-0.5")
            p.text-sm.leading-5.font-medium.text-gray-900(v-if="title") {{ title }}
            p.text-sm.leading-5.text-gray-500.overflow-scroll(:class="{'mt-1': title}", v-html="message")
          .ml-4.flex-shrink-0.flex
            button.inline-flex.text-gray-400.transition.ease-in-out.duration-150(
              @click="destroy"
              class="focus:outline-none focus:text-gray-500")
              IconTimes.h-4.w-4(primary="text-gray-400", secondary="text-4ray-300")

  .max-w-md.w-full.bg-white.shadow-lg.rounded-lg.pointer-events-auto.mb-4(
    v-if="active && primary !== false")
    .flex.rounded-lg.shadow-xs
      .w-0.flex-1.flex.items-center.p-4
        .w-full
          p.text-sm.leading-5.font-medium.text-gray-900(v-if="title") {{ title }}
          p.text-sm.leading-5.text-gray-500(:class="{'mt-1': title}", v-html="message")
      .flex.border-l.border-gray-200
        .-ml-px.flex.flex-col
          .h-0.flex-1.flex.border-b.border-gray-200
            button.-mb-px.flex.items-center.justify-center.w-full.rounded-tr-lg.border.border-transparent.px-4.py-3.text-sm.leading-5.font-medium.text-indigo-600.transition.ease-in-out.duration-150(
              class="hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50"
              @click="primaryAction"
              ) {{ primary.label }}
          .-mt-px.h-0.flex-1.flex
            button.flex.items-center.justify-center.w-full.rounded-br-lg.border.border-transparent.px-4.py-3.text-sm.leading-5.font-medium.text-gray-700.transition.ease-in-out.duration-150(
              class="hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
              @click="secondaryAction"
              ) {{ secondary.label }}
</template>

<script>
import { removeElement } from '@/plugins/utils.js'
export default {
  props: {
    title: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
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
    timeout: {
      type: [Boolean, Number],
      required: false,
      default: 2,
    },
    primary: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },
    secondary: {
      type: [Boolean, Object],
      required: false,
      default: false,
    },
  },

  data () {
    return {
      active: false,
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
      return Math.round(((this.timeLeft * 100 / (this.timeout * 1000)) * 100) / 100)
    },

  },

  mounted () {
    if (this.notify)
      this.type = 'white'

    this.active = true
    if (this.timeout > 0) {
      this.timeLeft = (this.timeout * 1000)
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
    primaryAction () {
      this.primary.action()
      this.destroy()
    },
    secondaryAction () {
      this.secondary.action()
      this.destroy()
    },
  },
}
</script>
