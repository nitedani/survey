import express from 'express'
import { renderPage } from 'vike/server'
import { requestContextMiddleware } from './cls'
import httpDevServer from 'vavite/http-dev-server'

startServer()

async function startServer() {
  const app = express()
  app.use(requestContextMiddleware)
  if (import.meta.env.PROD) {
    app.use(express.static('client'))
  }

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return next()
    } else {
      const { statusCode, headers, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      httpResponse.pipe(res)
    }
  })

  if (httpDevServer) {
    httpDevServer!.on('request', app)
  } else {
    const port = process.env.PORT || 3000
    app.listen(port)
    console.log(`Server running at http://localhost:${port}`)
  }
}
