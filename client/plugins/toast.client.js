import Vue from 'vue'
import GlobalToast from '@/components/global/Toast/GlobalToast'
import { spawn } from '@/plugins/utils.js'

export default (ctx, inject) => {
  const ToastProgrammatic = {
    show (props) {
      if (typeof props === 'string') props = { message: props }
      return spawn('toasts', props, GlobalToast, Vue)
    },
  }
  inject('toast', ToastProgrammatic)
}
