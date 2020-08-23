/*
 * axios.js - plugin to harness metapi error messages
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */

import Vue from 'vue'
import Toast from '@/components/global/Toast/GlobalToast.vue'
import { spawn } from '@/plugins/utils.js'

const ToastProgrammatic = {
  show (props) {
    if (typeof props === 'string') props = { message: props }
    return spawn('toasts', props, Toast, Vue)
  },
}

export default function ({ $axios, app, store }, inject) {
  inject('toast', ToastProgrammatic)

  $axios.onError((error) => {
    if (error.response.data && error.response.data.errors) {
      for (const err of error.response.data.errors)
        app.$toast.show({ type: 'danger', message: err.detail, delay: 10 })

      throw (error)
    }

    if (error.response.data && error.response.data.message) {
      app.$toast.show({
        type: 'danger',
        title: error.response.data.exception,
        message: `${error.response.data.message} <br /> <a href="phpstorm://open?file=/${error.response.data.file}&line=${error.response.data.line}">${error.response.data.file}:${error.response.data.line}</a>`,
        timeout: 0,
      })
      throw (error.response.data.mesage)
    }
    return false
  })
}
