import Api from '@/lib/api'

let api: Api

export const useApi = () => {
  if (!api) {
    const config = useRuntimeConfig()
    const { $toast } = useNuxtApp()
    api = new Api({
      fetchOptions: {
        baseURL: config.public.apiURL,
      },
      apiURL: config.public.apiURL,
      webURL: config.public.webURL,
      redirect: {
        logout: '/',
        login: '/home',
      },
      /*
      echoConfig: {
        pusherAppKey: config.public.pusherAppKey,
        pusheAppCluster: config.public.pusherAppCluster,
      },
      */
    }, $toast)
  }
  return api
}
