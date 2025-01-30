import { defineConfig } from 'vite'
import {config} from 'dotenv'
import react from '@vitejs/plugin-react'
import process from 'process'

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure proper base path
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Important for React Router
  },
  define: {
    'process.env': process.env
  }
})
