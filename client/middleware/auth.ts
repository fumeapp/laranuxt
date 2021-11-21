import { IncomingMessage, ServerResponse } from 'http'
import runtimeConfig from '#config'
import Auth from '~/lib/auth'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const config = runtimeConfig
  const $auth = new Auth({
    req: req,
    res: res,
    fetchOptions: {
      baseURL: config.apiURL
    }
  })

  console.log($auth.isLoggedIn)
}
