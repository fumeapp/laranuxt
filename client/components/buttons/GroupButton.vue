<template lang="pug">
span.relative.z-0.inline-flex.shadow-sm.rounded-md.group-button
  button(:class="[all, start]", type="button")
    slot(name="start")
  button(v-if="$slots.middle", :class="[all, middle]", type="button")
    slot(name="middle")
  button(:class="[all, end]", type="button")
    slot(name="end")
</template>

<script>
export default {
  data () {
    return {
      all: [
        'relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'border', 'border-gray-300', 'bg-white', 'text-sm', 'leading-5', 'font-medium', 'text-gray-700', 'transition', 'ease-in-out', 'duration-150',
        'hover:text-gray-500', 'focus:z-10', 'focus:outline-none', 'focus:border-blue-300', 'focus:shadow-outline-blue', 'active:bg-gray-100', 'active:text-gray-700'],
      start: ['rounded-l-md'],
      middle: ['-ml-px'],
      end: ['-ml-px', 'rounded-r-md'],
    }
  },
}
</script>
