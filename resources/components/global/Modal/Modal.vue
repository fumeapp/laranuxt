<template lang="pug">
transition(name="animodal",v-if="title !== false")
  .modal.is-active(v-if="active")
    .modal-background(@click="destroy")
    .modal-card
      .modal-card-head
        p.modal-card-title(v-html="title")
        button.delete(@click="destroy")
      section.modal-card-body(v-html="body")

      footer.modal-card-foot.justify-end(v-if="buttons")
        ModalButtons(:buttons="buttons",:action="action")

transition(name="animodal",v-else)
  .modal.is-active(v-if="active")
    .modal-background(@click="destroy")
    .modal-content
      .box
        .content(v-html="body")
        ModalButtons(v-if="buttons",:buttons="buttons",:action="action")
    button.modal-close.is-large(autofocus,@click="destroy")
</template>

<script>
import ModalButtons from '@/components/global/Modal/ModalButtons'
import { removeElement } from '@/utils/helpers.js'
export default {
  name: 'GlobalModal',
  components: { ModalButtons },
  props: {
    body: {
      type: String,
      default: 'You need to specify a <b>body</b>',
    },
    title:  {
      type: [String, Boolean],
      default: false,
    },
    buttons: {
      type: [Array, Boolean],
      required: false,
      default: () => false,
    },
    closed: {
      type: Function,
      required: false,
      default: () => {},
    },
  },

  data () {
    return {
      active: false,
    }
  },

  mounted () {
    this.active = true
    setTimeout(() => {
      if (this.$refs && this.$refs.button) {
        this.$refs.button[0].focus()
      }
    }, 300)
  },

  methods: {
    destroy () {
      this.active = false
      setTimeout( () => {
        this.$destroy()
        removeElement(this.$el)
        if (this.closed) this.closed()
      }, 500)
    },
    action (button) {
      if (button.action && typeof button.action === 'function') {
        button.action()
      }
      return this.destroy()
    },
  },


}
</script>
