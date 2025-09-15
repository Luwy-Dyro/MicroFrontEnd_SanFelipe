import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'], 
  },
    optimizeDeps: {
    exclude: ['react','react-dom','react-router','react-router-dom'],
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'web_footer',
      filename: 'remoteEntry.js',
      exposes: { './FooterApp': './src/remote-entry.tsx' },
      shared: {
         react: { singleton: true, strictVersion: false  },
        'react-dom': { singleton: true, strictVersion: false },
        'react-router': { singleton: true, strictVersion: false },
        'react-router-dom': { singleton: true, strictVersion: false },
      }as any
    })
  ],
  server: { port: 5106, strictPort: true, host: true },
  build: { target: 'esnext' },
  preview: { port: 5106, strictPort: true, host: true }
})
