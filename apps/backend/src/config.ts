export { config }

import { createConfig } from 'express-zod-api'
import { addAuthjsMiddleware } from './auth'
import { addSwaggerMiddleware } from './swagger'

const config = createConfig({
  server: {
    listen: process.env.PORT || 3000,
    beforeRouting({ app }) {
      addAuthjsMiddleware(app)
      addSwaggerMiddleware(app)
    }
  },

  cors: false,
  logger: { level: 'info', color: true }
})
