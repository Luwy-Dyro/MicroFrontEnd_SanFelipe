import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'], 
  },
  optimizeDeps: {
    exclude: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  plugins: [react(),
    tailwindcss(),
     federation({
      name: 'atencion',
      filename: 'remoteEntry.js',
      exposes: { 
        './AtencionApp': './src/remote-entry.tsx',
        './AtencionRoutes': './src/AtencionRoutes.tsx',
       },
       
      remotes: {
        header: 'http://localhost:5103/assets/remoteEntry.js', 
        menu:   'http://localhost:5105/assets/remoteEntry.js', 
        footer:   'http://localhost:5106/assets/remoteEntry.js', 
        datospaciente: 'http://localhost:5203/assets/remoteEntry.js',
        bases:         'http://localhost:5204/assets/remoteEntry.js',
      },
      shared: {
         react: { singleton: true, strictVersion: false  },
        'react-dom': { singleton: true, strictVersion: false },
        'react-router': { singleton: true, strictVersion: false },
        'react-router-dom': { singleton: true, strictVersion: false },
      }as any
    }),
  ],
  server: { port: 5202, strictPort: true, host: true },
  build: { target: 'esnext' },
  preview: { port: 5202, strictPort: true, host: true },
  
})
