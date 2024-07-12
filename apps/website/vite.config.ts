import { standalone } from 'vite-plugin-standalone'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import vike from 'vike/plugin'
import type { UserConfig } from 'vite'
import { vavite } from 'vavite'

export default {
  resolve: {
    alias: {
      '#root': join(__dirname, 'src')
    }
  },
  buildSteps: [
    { name: 'client' },
    {
      name: 'server',
      config: {
        build: { ssr: true }
      }
    }
  ],
  server: {
    port: process.env.PORT && Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
  },
  ssr: {
    noExternal: ['emoji-mart']
  },
  plugins: [
    react(),
    vike({ disableAutoFullBuild: true }),
    vavite({
      serverEntry: './src/server/index.ts',
      serveClientAssetsInDev: true
    }),
    standalone({
      entry: './src/server/index.ts'
    })
  ]
} satisfies UserConfig
