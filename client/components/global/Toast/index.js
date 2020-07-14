import GlobalToast from '@/components/global/Toast/GlobalToast'
import { spawn } from '@/utils/utils.js'

export default (ctx, inject) => {
  const ToastProgrammatic = {
    show (props) {
      if (typeof props === 'string') props = { message: props }
      return spawn('toasts', props, ctx, GlobalToast)
    },
  }
  inject('$toast', ToastProgrammatic)
}
