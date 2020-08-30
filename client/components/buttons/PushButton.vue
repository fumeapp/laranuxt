<template>
  <span class="inline-flex rounded-md shadow-sm">
    <button
      :disabled="!is_active"
      type="button"
      :class="[sizes[size], state_theme(theme)]"
      class="relative overflow-hidden inline-flex items-center leading-4 font-medium rounded transition ease-in-out duration-150"
    >
      <slot />
      <div
        v-if="state === 'loading'"
        class="absolute left-0 right-0 bottom-0 h-2 w-1/2 animation-loading"
        :class="loading[theme]"
      />
      <div
        v-if="progress !== false"
        :style="`width: ${progress}%`"
        :class="loading[theme]"
        class="absolute inset-0 w-full h-full"
      />
      <div
        v-if="progress !== false"
        class="absolute inset-0 flex items-center justify-center"
      >
        <slot />
      </div>
    </button>
  </span>
</template>

<style>
.animation-loading {
  animation: push-button-loading 1s linear 0s infinite;
}
@keyframes push-button-loading {
  from {
    transform: translate(-100%, 0px);
  }
  to {
    transform: translate(200%, 0px);
  }
}
</style>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'm',
      validate: size => ['xs', 's', 'm', 'l', 'xl'].includes(size),
    },
    theme: {
      type: String,
      default: 'white',
      validate: theme => ['white', 'indigo', 'indigo-light'].includes(theme),
    },
    state: {
      type: String,
      default: 'active',
      validate: state => ['active', 'loading'].includes(state),
    },
    progress: {
      type: [Boolean, Number],
      default: false,
    },
  },
  data () {
    return {
      themes: {
        text: 'text-gray-700 bg-white',
        white: 'border border-gray-300 text-gray-700 bg-white',
        indigo: 'text-white bg-indigo-600',
        'indigo-light': 'text-indigo-700 bg-indigo-100',
        red: 'text-white bg-red-600',
      },
      active: {
        text: 'hover:text-gray-500 focus:outline-none active:text-gray-800 active:bg-gray-50',
        white: 'hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50',
        indigo: 'hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700',
        'indigo-light': 'hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200',
        red: 'hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700',
      },
      sizes: {
        xs: 'px-2.5 py-1.5 text-xs leading-4',
        s: 'px-3 py-2 text-sm leading-4',
        m: 'px-4 py-2 text-sm leading-5',
        l: 'px-4 py-2 text-base leading-6',
        xl: 'px-6 py-3 text-base leading-6',
      },
      loading: {
        white: 'bg-gray-200',
        indigo: 'bg-white bg-indigo-400',
        'indigo-light': 'bg-indigo-300',
        red: 'bg-red-400',
      },
    }
  },
  computed: {
    is_active () {
      return this.state === 'active' && this.progress === false
    },
  },
  methods: {
    state_theme (theme) {
      if (this.is_active)
        return [this.themes[theme], this.active[theme]]
      return this.themes[theme]
    },
  },
}
</script>
