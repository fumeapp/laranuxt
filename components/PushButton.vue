<template lang="pug">
button.py-2.px-3.tran-colors-p1.relative.overflow-hidden(
  @click="click",
  :class="[complete_theme, cursor, is_active, rounded]")
  .flex.items-center.tran-opacity-p5(:class="{'opacity-75': is_loading, 'opacity-25': is_success}")
    .mdi(v-if="icon", :class="[`mdi-${icon}`, label ? 'mr-2' : '']")
    img.w-4.h-4(v-if="image", :src="image", :class="label ? 'mr-2' : ''")
    div(v-if="label") {{ label }}
  .bg-black-o1.button-progressbar(:class="{'hidden': !is_loading || !is_progress}", :style="`width: ${progress}%`")
  .bg-black-o1.button-loadbar.tran-opacity-1(:class="{'opacity-0': !is_loading || is_progress}")
  .absolute.inset-0.flex.items-center.justify-center(v-if="is_success")
    .mdi.mdi-24px.mdi-check-bold.ani-zif
</template>

<script>
export default {
  props: {
    label: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    icon: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    image: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    theme: {
      type: String,
      required: false,
      default: 'black',
    },
    rounded: {
      type: String,
      required: false,
      default: 'rounded',
    },
    state: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    progress: {
      type: [Boolean, Number],
      required: false,
      default: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      themes: {
        black: 'text-black bg-gray-200 focus_outline-none',
        white: 'text-white bg-white-o1 focus_outline-none',
      },
      themes_active: {
        black: 'hover_bg-gray-300 active_bg-gray-400 focus_bg-gray-300',
        white: 'hover_bg-white-o2 active_bg-black-o3 focus_bg-black-o2',
      },
    }
  },
  computed: {
    complete_theme () {
      if (!this.is_loading)
        return this.themes[this.theme] + ' ' + this.themes_active[this.theme]
      return this.themes[this.theme]
    },
    is_loading () { return this.state === 'loading' },
    is_progress () { return this.progress !== false },
    is_success () { return this.state === 'success' },
    cursor () { return this.is_loading ? 'cursor-wait' : 'cursor-pointer' },
    is_active () { return this.active ? 'is_active' : '' },
  },
  methods: {
    click () { return this.state === false ? this.$emit('click') : false },
  },
}
</script>

<style lang="stylus">
.button-loadbar
  @apply absolute left-0 right-0 bottom-0 h-2 w-1_2 ani-loading

.button-progressbar
  @apply absolute left-0 right-0 bottom-0 h-full tran-width

.ani-loading
  animation ani-loading 1.5s linear 0s infinite

.tran-width
  transition width 0.3s linear
</style>
