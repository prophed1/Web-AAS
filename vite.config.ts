import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
	base: '/Web-AAS/',
    server: {
      port: 3000,
      host: '0.0.0.0',
      // ganti string di bawah ini dengan domain ngrok yang muncul di error,
      // misalnya "fc4348620811.ngrok-free.app"
      allowedHosts: ['nondoctrinally-nonsynoptical-keira.ngrok-free.dev'],
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  }
})
