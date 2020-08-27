/*
 * axios.js - plugin to harness metapi error messages
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
export default function ({ $axios, $toast, app, store }, inject) {
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
