<template lang="pug">
a.inline-flex.rounded-md.shadow-sm(:href="href", target="_new")
  button.inline-flex.items-center.px-3.py-2.border.border-gray-300.text-sm.leading-4.font-medium.rounded-md.text-gray-700.bg-white.transition.ease-in-out.duration-150(
    type="button"
    class="hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50")
    slot
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '_self',
    },
  },
}
</script>
