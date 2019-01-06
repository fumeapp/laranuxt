import Vue from 'vue'
import Toast from './Toast.vue'
import { spawn } from '@/utils/helpers.js'

const ToastProgrammatic = {
  show (props) {
    if (typeof props === 'string') props = { message: props }
    return spawn('toasts', props, Vue, Toast)
  }
}

const Plugin = {
  install(Vue) {
    Vue.prototype['$toast'] = ToastProgrammatic
  }
}

Vue.use(Plugin)
export default Plugin
