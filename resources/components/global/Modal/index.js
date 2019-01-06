import Vue from 'vue'
import Modal from './Modal.vue'
import { spawn } from '@/utils/helpers.js'

// programmatic functions available
const ModalProgrammatic = {
  show (props) {
    if (typeof props === 'string') props = { body: props, title: false }
    return spawn('modals', props, Vue, Modal)
  }
}

// .use the programmatic component
const Plugin = {
  install(Vue) {
    Vue.prototype['$modal'] = ModalProgrammatic
  }
}

Vue.use(Plugin)
export default Plugin
