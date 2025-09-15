import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'], 
  },
  // optimizeDeps: {
  //      disabled: true,
  // },

  server: {
    port: 5000, strictPort: true, host: true,
    proxy: {
      
      '/mfe/web-header': { target: 'http://localhost:5103', changeOrigin: true, rewrite: p => p.replace(/^\/mfe\/web-header/, '') },
      '/mfe/web-main':   { target: 'http://localhost:5104', changeOrigin: true, rewrite: p => p.replace(/^\/mfe\/web-main/, '') },
      '/mfe/web-menu':   { target: 'http://localhost:5105', changeOrigin: true, rewrite: p => p.replace(/^\/mfe\/web-menu/, '') },
      '/mfe/web-footer': { target: 'http://localhost:5106', changeOrigin: true, rewrite: p => p.replace(/^\/mfe\/web-footer/, '') },
    }
  },
  //  server: {
  //   port: 5000,
  //   strictPort: true,
  //   host: true,
  // },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      remotes: {
        login: 'http://localhost:5001/assets/remoteEntry.js',
        home:  'http://localhost:5102/assets/remoteEntry.js',
        atencion: 'http://localhost:5202/assets/remoteEntry.js',
      },
     shared: {
         react: { singleton: true, strictVersion: false  },
        'react-dom': { singleton: true, strictVersion: false },
        'react-router': { singleton: true, strictVersion: false },
        'react-router-dom': { singleton: true, strictVersion: false },
      }as any
    })
  ],
  
  build: { target: 'esnext' }
})
