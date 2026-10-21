import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  resolve: {
    alias: {
      '@mediapipe/face_detection': fileURLToPath(
        new URL('./src/mediapipe-face-detection-shim.js', import.meta.url),
      ),
    },
  },
})
