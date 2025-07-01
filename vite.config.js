import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  server: {
    allowedHosts: ['vpn.warungmicky.shop'],
    port: 5173, 
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
