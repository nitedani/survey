import { viteNode } from '@nitedani/vite-plugin-node/plugin'
import { join } from 'path'
import type { UserConfig } from 'vite'

export default {
  resolve: {
    alias: {
      '#root': join(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext'
  },
  plugins: [
    viteNode({
      entry: './src/index.ts',
      standalone: true
    })
  ]
} satisfies UserConfig
