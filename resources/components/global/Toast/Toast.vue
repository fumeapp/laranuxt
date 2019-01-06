<template lang="pug">
transition(name="toast")
  .notification(:class="`is-${type}`",v-if="active")
    button.delete(@click="destroy")
    .media
      .media-left
        span.icon.is-large.ani-slide-in-left.delay-2(:class="`is-${type}`")
          i.mdi.mdi-48px(:class="icon")
      .media-content.ani-slide-in-left.delay-3.self-center.break-words(v-html="message")
</template>

<script>
import { removeElement } from '@/utils/helpers.js'
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: 'Please specify a <b>message</b>',
    },
    type: {
      type: String,
      required: false,
      validate: (type) => { return ['sucecss','info','danger', 'warning'].indexOf(type) !== -1 },
      default: '',
    },
    delay: {
      type: Number,
      required: false,
      default: 3,
    },
  },

  data () {
    return {
      active: false,
    }
  },

  computed: {
    icon () {
      switch (this.type) {
        case 'success' :
          return 'mdi-check-circle'
          break
        case 'danger' :
          return 'mdi-alert-circle'
          break
        case 'info' :
          return 'mdi-information'
          break
        case 'warning' :
          return 'mdi-alert'
          break
        default :
          return 'mdi-information'
          break
      }
    }
  },

  mounted () {
    this.active = true
    if (this.delay > 0) setTimeout(() =>  this.destroy(), this.delay*1000)
  },





  methods: {
    destroy () {
      this.active = false
      setTimeout( () => {
        this.$destroy()
        removeElement(this.$el)
      }, 500)
    },
  },

}
</script>
