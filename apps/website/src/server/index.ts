import express from 'express'
import { renderPage } from 'vike/server'
import { requestContextMiddleware } from './cls'
import httpDevServer from 'vavite/http-dev-server'
import { telefunc } from 'telefunc'
import { supabaseMiddleware } from './supabase'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import shrinkRay from '@nitedani/shrink-ray-current'
startServer()

async function startServer() {
  const app = express()
  app.use(requestContextMiddleware)
  if (process.env.NODE_ENV === 'production') {
    const dirname_ = dirname(fileURLToPath(import.meta.url))
    const clientPath = join(dirname_, '..', 'client')
    app.use(shrinkRay())
    app.use(express.static(clientPath))
  }

  app.use(express.text())
  app.use('*', supabaseMiddleware)
  app.all('/_telefunc', async (req, res) => {
    const context = {}
    const httpResponse = await telefunc({ url: req.originalUrl, method: req.method, body: req.body, context })
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      req,
      // set by supabaseMiddleware on req
      user: req.user,
      session: req.session,
      supabase: req.supabase
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
