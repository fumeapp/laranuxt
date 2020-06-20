<template lang="pug">
  a.py-2.px-4.border.border-gray-400.rounded.hover_bg-gray-200(:href="href", target="_blank")
    slot
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
}
</script>
