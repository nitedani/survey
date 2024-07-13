import express from 'express'
import { renderPage } from 'vike/server'
import { requestContextMiddleware } from './cls'
import httpDevServer from 'vavite/http-dev-server'
import { telefunc } from 'telefunc'

startServer()

async function startServer() {
  const app = express()
  app.use(requestContextMiddleware)
  if (import.meta.env.PROD) {
    app.use(express.static('client'))
  }
  app.use(express.text())
  app.all('/_telefunc', async (req, res) => {
      const context = {}
      const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body, context })
      const { body, statusCode, contentType } = httpResponse
      res.status(statusCode).type(contentType).send(body)
  })
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
