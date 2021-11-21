import { IncomingMessage, ServerResponse } from 'http'
import { setCookie, useQuery } from 'h3'

export default (req: IncomingMessage, res: ServerResponse) => {
  const token = useQuery(req).token as string
  setCookie(res, 'auth.token', token, { path: '/', maxAge: 9999999999})
  res.end('success')
}
