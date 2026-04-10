import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Your app runs inside /oakandsmoke/
  base: '/oakandsmoke/',

  // Vite will copy /public/firebase-messaging-sw.js automatically
  publicDir: 'public'
})
