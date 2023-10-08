export default defineAppConfig({
  ui: {
    primary: 'emerald',
    strategy: 'override',
    gray: 'slate',
    notifications: {
      // Show toasts at the top right of the screen for desktop
      position: 'lg:top-0 lg:right-0 lg:justify-start',

    },
    button: {
      default: {
        loadingIcon: 'i-mdi-loading',
      },
    },
    input: {
      default: {
        loadingIcon: 'i-mdi-loading',
      },
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-mdi-check-bold',
      },
    },
  }
})
