import { IncomingMessage, ServerResponse } from 'http'
import { useCookie } from 'h3'

export default (req: IncomingMessage, res: ServerResponse) => {
  const token = useCookie(req, 'token')
  res.statusCode = 200
  res.end(token)
}
