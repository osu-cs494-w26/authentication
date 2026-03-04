import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy server requests whose paths start with "/api" to our API server.
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
})
