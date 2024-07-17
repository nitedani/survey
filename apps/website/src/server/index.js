import express from 'express'
import { renderPage } from 'vike/server'
import httpDevServer from 'vavite/http-dev-server'
import { telefunc, config } from "telefunc"
import { supabaseMiddleware } from '../supabase/middleware'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Set Telefunc configuration
config.disableNamingConvention = true

// Initialize and start the server
async function startServer() {
    const app = express()
    app.use('*', supabaseMiddleware)


    // Serve static files in production
    if (import.meta.env.PROD) {
        const dirname_ = dirname(fileURLToPath(import.meta.url))
        const clientPath = join(dirname_, '..', 'client')
        app.use(express.static(clientPath))
    }

    // Middleware for parsing text
    app.use(express.text())
    // Telefunc endpoint
    app.all('/_telefunc', async (req, res) => {
        const context = {}
        const httpResponse = await telefunc({
            url: req.originalUrl,
            method: req.method,
            body: req.body,
            context
        })
        const { body, statusCode, contentType } = httpResponse
        res.status(statusCode).type(contentType).send(body)
    })

    // Handle all other requests with Vike's renderPage
    app.get('*', async (req, res, next) => {
        const pageContextInit = {
            urlOriginal: req.originalUrl,
            headersOriginal: req.headers,
            supabase: req.supabase,
            session: req.session,
            user: req.user
        }
        const pageContext = await renderPage(pageContextInit)
        const { httpResponse } = pageContext
        if (!httpResponse) {
            return next()
        } else {
            const { statusCode, headers } = httpResponse
            headers.forEach(([name, value]) => res.setHeader(name, value))
            res.status(statusCode)
            httpResponse.pipe(res)
        }
    })

    // Development server setup
    if (httpDevServer) {
        httpDevServer.on('request', app)
    } else {
        // Production server setup
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    }
}

// Start the server
startServer().catch(err => {
    console.error('Failed to start server:', err)
})
