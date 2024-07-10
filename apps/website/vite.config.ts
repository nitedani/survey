import { viteNode } from '@nitedani/vite-plugin-node/plugin'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { telefunc } from 'telefunc/vite'
import vike from 'vike/plugin'
import type { UserConfig } from 'vite'

export default {
  resolve: {
    alias: {
      '#root': join(__dirname, 'src')
    }
  },
  ssr: {
    noExternal: ['emoji-mart']
  },
  plugins: [
    react(),
    vike(),
    telefunc(),
    viteNode({
      entry: './src/server/index.ts',
      standalone: true
    })
  ]
} satisfies UserConfig
