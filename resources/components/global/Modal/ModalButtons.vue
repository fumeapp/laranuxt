<template lang="pug">
.buttons.is-right.has-addons
  button.button(
    v-for="button, index in buttons",
    :autofocus="index === 0",
    :class="button.class",
    ref="button",
    @click="action(button)"): span {{ button.name }}
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
}
</script>
