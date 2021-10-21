/*
 * axios.js - plugin to harness MeApi error messages
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import ToastInterface from 'nuxt-tailvue/types/toast'

export default function ({ $axios, $toast, redirect }: { $axios: NuxtAxiosInstance, $toast: ToastInterface, redirect: Function }) {
  $axios.onError((error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      for (const err of error.response.data.errors)
        $toast.show({
          type: 'danger',
          message: err.detail ?? err.message ?? '',
          timeout: false,
        })
      throw (error)
    }

    if (error.response?.status === 403)
      return $toast.show({
        type: 'denied',
        message: error.response.data.message,
        timeout: false,
      })

    if (error.response?.status === 402)
      return $toast.show({
        type: 'denied',
        message: error.response?.data.message,
        primary: { label: 'Billing', action: () => redirect('/billing') },
        timeout: false,
      })

    if (error.response?.status === 401) {
      if (process.browser) {
        window.localStorage.clear()
        document.cookie.split(';').forEach((c) => { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/') })
      }
      return $toast.show({
        type: 'denied',
        message: '401 - Unauthenticated',
        timeout: 3,
      })
    }
    // [ 'token', 'team', 'strategy' ].map(k => $auth.removeUniversal(k))
    // $auth.setUniversal('_token.local', false)

    if (error.response?.data && error.response?.data.message) {
      if (error.response.data.exception.includes('Wanton'))
        return $toast.danger(error.response.data.message)
      $toast.show({
        type: 'danger',
        classToast: 'max-w-3xl bg-white',
        message: `<b>[${error.response.data.exception}]</b> <br /> ${error.response.data.message} <br /> <a href="phpstorm://open?file=/${error.response.data.file}&line=${error.response.data.line}">${error.response.data.file}:${error.response.data.line}</a>`,
        timeout: 0,
      })
      throw (error.response.data.mesage)
    }
    return false
  })
}
