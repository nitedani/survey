import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';
import { vavite } from 'vavite';
import { telefunc } from 'telefunc/vite';
import vike from "vike/plugin"

export default defineConfig({
  resolve: {
    alias: {
      '#root': join(__dirname, 'src')
    }
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    host: '0.0.0.0',
  },
  ssr: {
    noExternal: ['emoji-mart']
  },
  plugins: [
    vike(),
    react(),
    telefunc(),
    vavite({
      serverEntry: './src/server/index.js',
      serveClientAssetsInDev: true
    }),
  ]
});
