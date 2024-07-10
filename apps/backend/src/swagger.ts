export { addSwaggerMiddleware }

import express from 'express'
import { Documentation } from 'express-zod-api'
import ui from 'swagger-ui-express'
import manifest from '../package.json'
import { config } from './config'
import { routing } from './routing'

function addSwaggerMiddleware(app: express.IRouter) {
  const documentation = new Documentation({
    routing,
    config,
    version: manifest.version,
    title: 'Example API',
    serverUrl: '/api'
  })
  const json = documentation.getSpecAsJson()
  app.use('/docs', ui.serve, ui.setup(documentation.getSpec()))
  app.get('/docs-json', (_, res) => res.send(json))
}
