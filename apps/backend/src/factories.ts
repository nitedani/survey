export { authenticatedEndpointsFactory }

import { defaultEndpointsFactory } from 'express-zod-api'
import { authMiddleware } from './auth'

const authenticatedEndpointsFactory = defaultEndpointsFactory.addMiddleware(authMiddleware)
