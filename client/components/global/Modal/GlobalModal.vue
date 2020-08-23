<template lang="pug">
ModalBase(:active="active", :destroyed="destroy")
  .text-lg.bg-black-o1.p-4(v-if="title") {{ title }}
  .p-6.bg-white
    span {{ body }}
  .p-4.flex.justify-end
    .border-black(
      v-for="(action, index) in actions"
      :class="{'border-r': (index+1 !== actions.length)}")
      PushButton(
        :label="action.name",
        :rounded="rounded(index)"
        :id="`modal-button-${index}`",
        @click="choose(index)")
</template>

<script>
import { removeElement } from '@/plugins/utils'
export default {
  props: {
    title: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    body: {
      type: String,
      required: true,
    },
    actions: {
      type: [Boolean, Array],
      required: false,
      default: false,
    },
  },
  data () {
    return {
      active: false,
    }
  },
  async mounted () {
    console.log('firing GlobalModal mounted()')
    await this.$sleep(100)
    this.active = true
    await this.$sleep(100)
    if (this.actions)
      this.focus()
  },
  methods: {
    rounded (index) {
      if (index === 0)
        return 'rounded-l'
      if ((index + 1) === this.actions.length)
        return 'rounded-r'
      return ''
    },
    choose (index) {
      this.actions[index].action()
      this.destroy()
    },
    async focus (index = 0) {
      await this.$sleep(200)
      document.getElementById(`modal-button-${index}`).focus()
    },
    async destroy () {
      this.active = false
      await this.$sleep(100)
      this.$destroy()
      removeElement(this.$el)
    },
  },
}
</script>
