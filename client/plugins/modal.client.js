import Vue from 'vue'
import GlobalModal from '@/components/global/Modal/GlobalModal'
import { spawn } from '@/plugins/utils.js'

const ModalProgrammatic = {
  show (props) {
    if (typeof props === 'string') props = { body: props }
    return spawn('modals', props, GlobalModal, Vue)
  },
}

const Plugin = {
  install (Vue) {
    Vue.prototype.$modal = ModalProgrammatic
  },
}

Vue.use(Plugin)
export default Plugin
