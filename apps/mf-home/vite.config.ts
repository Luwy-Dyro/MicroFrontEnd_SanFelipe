import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

// const SHELL = 'http://localhost:5000'

export default defineConfig({
   resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'], 
  },
  
  optimizeDeps: {
    exclude: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'home',
      filename: 'remoteEntry.js',
       exposes: {
          './App': './src/remote-entry.tsx',
          './HomeRoutes': './src/HomeRoutes.tsx', 
        },

      
      remotes: {
        // web_header: `${SHELL}/mfe/web-header/assets/remoteEntry.js`,
        // web_main:   `${SHELL}/mfe/web-main/assets/remoteEntry.js`,
        // web_menu:   `${SHELL}/mfe/web-menu/assets/remoteEntry.js`,
        // web_footer: `${SHELL}/mfe/web-footer/assets/remoteEntry.js`,

        web_header: 'http://localhost:5103/assets/remoteEntry.js',
        web_main:   'http://localhost:5104/assets/remoteEntry.js',
        web_menu:   'http://localhost:5105/assets/remoteEntry.js',
        web_footer: 'http://localhost:5106/assets/remoteEntry.js',
      },
      shared: {
         react: { singleton: true, strictVersion: false  },
        'react-dom': { singleton: true, strictVersion: false },
        'react-router': { singleton: true, strictVersion: false },
        'react-router-dom': { singleton: true, strictVersion: false },
      }as any
    })
  ],
  server: { port: 5102, strictPort: true, host: true, cors: true, headers: { 'Access-Control-Allow-Origin': '*' } },
  build: { target: 'esnext' },
  preview: { port: 5102, strictPort: true, host: true }
})
