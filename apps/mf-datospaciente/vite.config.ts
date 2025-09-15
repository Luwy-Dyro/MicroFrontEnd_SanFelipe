import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
   resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'], 
  },
    optimizeDeps: {
    exclude: ['react','react-dom','react-router','react-router-dom'],
  },
  plugins: [react(),
    tailwindcss(),
    federation({
      name: 'datospaciente',
      filename: 'remoteEntry.js',
      exposes: { './DatosPacienteApp': './src/remote-entry.tsx' },
      shared: {
         react: { singleton: true, strictVersion: false  },
        'react-dom': { singleton: true, strictVersion: false },
        'react-router': { singleton: true, strictVersion: false },
        'react-router-dom': { singleton: true, strictVersion: false },
      }as any
    }),
  ],
  server: { port: 5203, strictPort: true, host: true },
  build: { target: 'esnext' },
  preview: { port: 5203, strictPort: true, host: true },
})
