import { createServer } from 'express-zod-api'
import { config } from './config'
import { routing } from './routing'

await createServer(config, routing)
