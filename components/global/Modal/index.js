import Vue from 'vue'
import GlobalModal from './GlobalModal.vue'
import { spawn } from '@/plugins/utils.js'

// programmatic functions available
const ModalProgrammatic = {
  show (props) {
    if (typeof props === 'string') props = { body: props, title: false }
    return spawn('modals', props, Vue, GlobalModal)
  },
}

// .use the programmatic component
const Plugin = {
  install (Vue) {
    Vue.prototype.$modal = ModalProgrammatic
  },
}

Vue.use(Plugin)
export default Plugin
