import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Allows access from other devices on the network
    port: 5173,      // Default Vite port (change if needed)
    watch: {
      ignored: ["**/config.json"], // prevent reload
    },
  },
  esbuild: {
    logLevel: 'silent', // Suppresses TypeScript warnings during build
  },
  base: '/'
})
