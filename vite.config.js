import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 5910,      //  默认端口
    strictPort: true //  端口被占用就直接报错
  }
})
